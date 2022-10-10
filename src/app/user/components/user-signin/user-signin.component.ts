import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {

  public signinForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    //injection du service
    private userService: UserService,
    //injection du router
    private router: Router,
    private snacBar: AddSnackService
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      login: [
        '',  //Default value of login : ''
        Validators.required
      ],
      pass: [
        '',
        Validators.required
      ]
    });
  }

/* appel la methode signin() de userservicepass lui les info saisies par l'user*/
  public onSubmit(): void {
    this.userService.signin(this.signinForm.value)   //déclanche le procce d'identification:  le trigger the signin process
    .subscribe({
      next: (response: any) => {
        //Your stuff here is 200
        this.router.navigate (['/', 'interns']);
        Logger.info(`User was found`)
      },
      error: (error: any) => {
        //Your stuff here is not 200
        this.signinForm.reset();
        //snackbar en cas de mauviase identification
      this.snacBar.show('Mauvaise identification')
        //Your stuff here is not 200
        Logger.info(`User NOT found ! `)
      }
    })
  }

}
