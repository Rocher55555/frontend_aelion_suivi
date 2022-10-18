import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Logger } from 'src/app/core/helpers/logger';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class HasUserGuard implements CanActivate {

  public constructor(
    private userService: UserService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return this.userService.isAuthenticated() ? false : true;

      if(this.userService.isAuthenticated()){
        // Mean that User was autentificated, so, don't allow to go to SigninComponent
        //this.router.navigate(['/', 'interns'])
        return false
      } else {
        Logger.info(`J'ai Pas un user, donc je peux log in`)
        return true
      }
    }
}
