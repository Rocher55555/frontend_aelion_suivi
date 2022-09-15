import { Injectable } from '@angular/core';
import { Logger } from 'src/app/core/helpers/logger';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private users: any[] = [
    {
      login: 'bond',
      pass: '007'
    },
    {
      login: 'casper',
      pass: 'ghost'
    }
  ];

  private user: UserModel | null = null;   // on part du principe que par default il set null

  constructor() { }

  /**
   *
   * @param credentials From signinForm (login and password user entered)
   * credetials : {login : 'toto', pass: 'titi'}
   */
  public signin(credentials: any): void {
    Logger.info(JSON.stringify(credentials));
    // Yassine : approche 1 boucle et comparaison

    for (const inUser of this.users) {
      if(inUser.login === credentials.login && inUser.pass === credentials.pass) {
        //user was found
        this.user = new UserModel()
        this.user.setLogin(credentials.login);
        this.user.setToken(credentials.login + 'crypto.validité');
        break;
      }
    }
    //soit this.user est une instance de UserModel soit il est null
  }

    // Jean_Luc : find
    /*
    const foundUser: any = this.users.find(
      (inUser: any) => inUser.login === credentials.login && inUser.pass ===credentials.pass
      );
    if (foundUser) {
      this.user = new UserModel()
      this.user.setLogin(credentials.login);
      this.user.setToken(credentials.login + 'xxxxx.yyyyyy');
    }
    */

  public signout(): void {
    this.user = null;
  }

  /**
   *
   * @returns  Yes or No a user was authenticated
   */

  public isAuthenticated(): boolean {
    return this.user !== null;
  }


}
