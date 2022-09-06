import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  public constructor(
    private httpClient: HttpClient
  ){}

  transform(value: Date, ...args: unknown[]): Observable<string> {
    return this._ageComputing(value);
  }


  private _ageComputing(value: Date): Observable<string> {
    return this.httpClient.get<any>(
      `${environment.worldClockApi}`
    ).pipe(
      take(1),
      map((utcDate: any) => {
        const today: moment.Moment = moment(utcDate.currentDateTime);
        const birthDate: moment.Moment = moment(value);

        return today.diff(birthDate, 'years').toString() + ' years old';
      }
      )
    );
  }
}
