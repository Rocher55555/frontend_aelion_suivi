import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import * as moment from 'moment';
import { Logger } from 'src/app/core/helpers/logger';
import { DateValidator } from 'src/app/core/validators/date-validator';
import { POEService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})
export class InternAddComponent implements OnInit {

  public internForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private router: Router,
    private snacBar: AddSnackService,
    private poeService: POEService
  ) { }

  ngOnInit(): void {
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
        ], firstName: [
          '',
          [
            Validators.minLength(2)
          ]
        ], email: [
          '',
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(2)
            ]
          )
        ], phoneNumber: [
          '',
          [
            Validators.minLength(10)

          ]
        ], birthDate: [
          '',
          [
            Validators.required,
            DateValidator.dateNotLessThan
          ]
        ]
      }
    )
  }

  //methode
  public onSubmit(): void {
    console.log(`Bout to send :  ${JSON.stringify(this.internForm.value)}`);


    //next we will have to create a new Intern Instance
    const intern: Intern = new Intern();
    intern.name = this.internForm.value.name;

    // we will have to pass brand new intern to add method of our service
    this.internService.add(intern).subscribe()

    //snackbar
    this.snacBar.show(`l'intern a bien été enregistrée`)

    //Finally go to the intern table component
    this.router.navigate(['/', 'interns']);
  }



  //    public static validateBirthDate(control: AbstractControl): {[key: string]: any} | null {
  //      const userEnteredDate: moment.Moment = moment(control.value);   //recup la valeur
  //      const today: moment.Moment = moment();
  //      return userEnteredDate.isSameOrAfter(today) ? {dateNotLessThan: true} : null;
  //      }


}

