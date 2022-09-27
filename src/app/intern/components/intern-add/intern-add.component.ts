import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import * as moment from 'moment';
import { Logger } from 'src/app/core/helpers/logger';
import { DateValidator } from 'src/app/core/validators/date-validator';
import { POEService } from 'src/app/core/services/poe.service';
import { take } from 'rxjs/operators';
import { POE } from 'src/app/core/models/poe';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmailExistsValidatorService } from 'src/app/core/validators/email-exists-validator.service';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})


// ! Oninit : initialize !== On destroy => delete
export class InternAddComponent implements OnInit, OnDestroy {

  public internForm!: FormGroup;
  public poes: POE[] = [];
  private subscription!: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private router: Router,
    private snacBar: AddSnackService,
    private poeService: POEService,
    private emailExistsValidator: EmailExistsValidatorService
  ) { }

  ngOnInit(): void {

    this.poeService.findAll()
      .pipe(
        take(1)
      )
      .subscribe((poes: POE[]) => {
        Logger.info(`Got ${poes.length} poes`);
        this.poes = poes;
      })

    this.internForm = this.formBuilder.group(
      {
        name: [
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
            this.emailExistsValidator.alreadyExists.bind(this.emailExistsValidator)
        ], phoneNumber: [
          '',
        ], birthDate: [
          '',
          [
            Validators.required,
            DateValidator.dateNotLessThan
          ]
        ], poes: [
          '',
          Validators.required
        ],
      }
    );
  }



  // MY 1st methode
  // public onSubmit(): void {
  //   console.log(`Bout to send :  ${JSON.stringify(this.internForm.value)}`);

  //   //next we will have to create a new Intern Instance
  //   const intern: Intern = new Intern();
  //   intern.name = this.internForm.value.name;

  //   // we will have to pass brand new intern to add method of our service
  //   this.internService.add(this.internForm.value).subscribe(() => {
  //     //snackbar
  //     this.snacBar.show(`l'intern a bien été enregistrée`)

  //     //Finally go to the intern table component
  //     this.router.navigate(['/', 'interns']);
  //   })


/**
 *
 */
// ? subscription??  je souscrit à un fi d'intern
    public onSubmit(): void {
    console.log(`Bout to send : ${JSON.stringify(this.internForm.value)}`);

    //We'll have to pass brand new intern to the add method of our service and all affected  POEs
    // We’ll need to pass an Intern with all affected POEs
    this.subscription = this.internService.add(this.internForm!.value).subscribe((intern: Intern) => {
      Logger.info(`An Intern was created: ${JSON.stringify(intern)}`);
      //Load a snackbar(afficher le snackbar, on peut l'utiliser ou on veut)
      this.snacBar.show(`Intern added successfully`);

      //Finally go to the intern table component
      this.router.navigate(['/', 'interns']);
    });
  }


/**
 *
 */
// ? Ca sert à quoi ?  ngOnDestroy cycle de vie d'un composant / take one : prend et s'arrete et si pas de take one .... il faut arrete de souscrire/
// ? unsubscribe() : desinscription

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }













}








  //    public static validateBirthDate(control: AbstractControl): {[key: string]: any} | null {
  //      const userEnteredDate: moment.Moment = moment(control.value);   //recup la valeur
  //      const today: moment.Moment = moment();
  //      return userEnteredDate.isSameOrAfter(today) ? {dateNotLessThan: true} : null;
  //      }




