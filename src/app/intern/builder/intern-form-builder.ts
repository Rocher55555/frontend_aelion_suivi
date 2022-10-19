import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { map, Observable, take } from "rxjs";
import { Logger } from "src/app/core/helpers/logger";
import { Intern } from "src/app/core/models/intern";
import { POE } from "src/app/core/models/poe";
import { POEService } from "src/app/core/services/poe.service";
import { DateValidator } from "src/app/core/validators/date-validator";
import { EmailExistsValidatorService } from "src/app/core/validators/email-exists-validator.service";

export class InternFormBuilder {
  private form: FormGroup | null = null;
  private addPoes : boolean = false;
  private _poes: POE[] | null = null
  private _intern: Intern= new Intern();     // the intern we want to manage (empty Model first)



  public constructor (
    private formBuilder: FormBuilder,// composition : class a
    private poeService: POEService
    ) {
      //this._intern.name = 'Andreotti';
      //his._intern.firstname = 'Pio'
      //this._intern.birthDate = new Date ('01/08/2020');
      this._buildForm();
    }


    //je vais en avoir besoin ailleurs donc GETTER
    public get internForm(): FormGroup {
      return this.form!;
    }

    public toggleAddPoes(): Observable<POE[]> {
      return this.poeService.findAll()                        // retour tout le reste !
      .pipe(
        take(1),
        map((poes: POE[]) => {
        this.addPoes = true;
        this._poes = poes;
        const poesControl: FormControl = new FormControl ('', Validators.required);
        this.form?.addControl('poes', poesControl);
        return poes
        })
      )
    }

    public get poes(): POE[] | null {
      return this._poes;
    }

  private _buildForm() : void {
  /**
   * Build the intern form with all of controls needed except poes
   */
   this.form = this.formBuilder.group(
    {
      name: [  // controls => control piloter par ele champ de formaulaire
        this._intern.name, //Defaut value for the fied control
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2)
          ]
        )
      ], firstname: [
        this._intern.firstname,
        [
          Validators.required,    // nécessaire car il existe un pipe et directive pour la boule INITIAL
          Validators.minLength(2)
        ]
      ], email: [  // magie.tacher@bigben.co.uk
        this._intern.email,
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
        this._intern.phoneNumber,
      ], birthDate: [
       this._intern.birthDate ? moment(this._intern.birthDate).format('YYYY-MM-DD') : '',
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
