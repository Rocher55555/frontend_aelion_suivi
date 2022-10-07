import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Logger } from 'src/app/core/helpers/logger';
import { environment } from 'src/environments/environment';
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
/**
 * Class constant always uppercase
 */
  private readonly STORAGE_KEY: string = 'auth_token';

  constructor(
    private router: Router,
    private httpClient: HttpClient

  ) { }

  /**
   *
   * @param credentials From signinForm (login and password user entered)
   * credetials : {login : 'toto', pass: 'titi'} <= this.signiForm.value
   * Je dois passer {userName: ?, userPass:?}
   */
  public signin(credentials: any): Observable<any> {
    const payload: any = {
      userName: credentials.login,
      userPass: credentials.pass
    };
    return this.httpClient.post<any>(
      `${environment.apiRoot}user/signin`,
      payload
    )
    .pipe(
      tap((response) => {
        this.user = new UserModel();
        this.user.setLogin(credentials.login);
        this.user.setToken(response.token);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user))
      })
    )
  }


  /*public signin(credentials: any): void {
    Logger.info(JSON.stringify(credentials));

    for (const inUser of this.users) {
      if(inUser.login === credentials.login && inUser.pass === credentials.pass) {
        //user was found
        this.user = new UserModel()
        this.user.setLogin(credentials.login);
        this.user.setToken(credentials.login + 'crypto.validité');

        // Persist in Local or Session storage user that found
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user));

        break;
      }
    }
    //soit this.user est une instance de UserModel soit il est null
  }*/



  public signout(): void {
    this.user = null;

    // Remove the key in Local or Session storage
    localStorage.removeItem(this.STORAGE_KEY)

    this.router.navigate(['/', 'signin']);

  }

  /**
   *
   * @returns  Yes or No a user was authenticated
   */

  public isAuthenticated(): boolean {
    if(this.user === null) {
      return false
    }
    return true;
  }

  public getUser(): UserModel | null {
    return this.user
  }

  public getToken(): void {
        //1er solution
        const userAsString: string | null = localStorage.getItem(this.STORAGE_KEY);
        if (userAsString !== null) {

          //il y a bien qq dans le localStorage à la cle auth_token
          this.user = new UserModel();  // Je refais une instance d'un UserModel

          //Je parse la chaine user pour récupérer un objet
          const persistentUser: any = JSON.parse(userAsString) //Parse is the inverse of Stringify

          // Je finis de définir this.user
          this.user.setLogin(persistentUser.login)
          this.user.setToken(persistentUser.token)
        }

  }

}
