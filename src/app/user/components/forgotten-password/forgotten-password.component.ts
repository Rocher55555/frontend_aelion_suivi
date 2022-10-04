import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from 'src/app/core/helpers/logger';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  public passwordForgottenForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,  //creer des objet qui permetten de piloter des formulaire
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.passwordForgottenForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });   // passwordForgottenForm deveint un nouvel objet de type formgroupe
  }

    public onSubmit(): void{
      const email: string = this.passwordForgottenForm.controls['email'].value;
      Logger.info(`User entereer ${email}`);
      this.userService.checkEmail(email);
    }
}
