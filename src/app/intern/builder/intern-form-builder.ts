import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Logger } from "src/app/core/helpers/logger";
import { DateValidator } from "src/app/core/validators/date-validator";
import { EmailExistsValidatorService } from "src/app/core/validators/email-exists-validator.service";

export class InternFormBuilder {
  private form: FormGroup | null = null;
  private addPoes : boolean = false;


  public constructor (
    private formBuilder: FormBuilder// composition : class a
    ) {
      this._buildForm();
    }

    //je vais en avoir besoin ailleurs donc GETTER
    public get internForm(): FormGroup {
      return this.form!;
    }

    public toggleAddPoes():void {
      this.addPoes = true;
      const poesControl: FormControl = new FormControl ('', Validators.required);
      this.form?.addControl('poes', poesControl);
    }

  private _buildForm() : void {
  /**
   * Build the intern form with all of controls needed except poes
   */
   this.form = this.formBuilder.group(
    {
      name: [  // controls => control piloter par ele champ de formaulaire
        '', //Defaut value for the fied control
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2)
          ]
        )
      ], firstname: [
        '',
        [
          Validators.required,    // nécessaire car il existe un pipe et directive pour la boule INITIAL
          Validators.minLength(2)
        ]
      ], email: [  // magie.tacher@bigben.co.uk
        '',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'))
          ],
        ),
          EmailExistsValidatorService.emailExists
          //this.emailExistsValidator.alreadyExists.bind(this.emailExistsValidator)
      ], phoneNumber: [
        '',
      ], birthDate: [
        '',
        [
          Validators.required,
          DateValidator.dateNotLessThan
        ]
       ],// poes: [
    //     '',
    //     Validators.required
    //   ],
     }
  );

}


}
