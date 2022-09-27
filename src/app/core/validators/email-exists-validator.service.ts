import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { InternService } from '../services/intern.service';
import { take } from 'rxjs'
import { Logger } from '../helpers/logger';

@Injectable({
  providedIn: 'root'
})
export class EmailExistsValidatorService {

  constructor(
    private internService: InternService
  ) { }

  // ! pourquoi control : AbstractControl ?

  public alreadyExists(control: AbstractControl): Promise<ValidationErrors
    | null> {

    const validationError: ValidationErrors = { alreadyExists: true };

    return new Promise((emailExists) => {
      this.internService.emailAlreadyExists(control.value)  //control value => email ici
        .pipe(
          take(1)
        )
        .subscribe(
          {
            // ! next / error ? => propriete de  httpResponse ?
            next: (response: HttpResponse<any>) => {
              Logger.info(`Got a ${response.status} so, all is okay`);
              emailExists(null);
            },
            error: (error: any) => {
              Logger.error(`email ${control.value} is already taken`);
              emailExists(validationError);
            }
          }
        );
    })
  }




}
