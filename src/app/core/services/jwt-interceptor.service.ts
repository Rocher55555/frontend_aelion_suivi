import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/user/models/user-model';
import { UserService } from 'src/app/user/services/user.service';
import { environment } from 'src/environments/environment';
import { Logger } from '../helpers/logger';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(
    private userService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    Logger.info(`Intercept a HTTP Request from Interceptor`);
    //We have to add an Authorization header to the HTTP Reques if a user was authenticated
    if (this.userService.isAuthenticated()) {
      if (req.url.includes(environment.apiRoot)) {
        Logger.info(`JwtInterceptorService-20:: A user was authenticated`);
        //Faudrait que je recpere le token
        const authenticatedUser: UserModel | null = this.userService.getUser();
        //Cloner la requete en lui ajoutant 'en-tête souhaitée
        if (authenticatedUser !== null) {
          if (!req.headers.has('Authorization')) {
            req = req.clone(
              { headers: req.headers.set('Authorization', `Bearer ${authenticatedUser.getToken()}`) }
            );
          }
        }
      }
    }
    return next.handle(req)
  }
}
