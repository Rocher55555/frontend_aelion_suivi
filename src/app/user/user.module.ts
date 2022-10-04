import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSigninComponent } from './components/user-signin/user-signin.component';
import { SharedModule } from '../shared/shared.module';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserSigninComponent,
    ForgottenPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule { }
