import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private userService: UserService
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
    this.userService.signin(this.signinForm.value);
  }

}
