import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { POEType } from '../models/poe-type';

@Injectable({
  providedIn: 'root'
})
export class PoeTypeService {

  constructor(
    private httpClient: HttpClient
  ) { }


  public findAll(): Observable<POEType[]> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}poetype`
    ) //catch the Observable
    .pipe(
      take(1),
      map((rawPoeTypes: any) => {
        return rawPoeTypes.map((rawPoeType: any) => {
          const poeType:POEType = new POEType();
          poeType.id = rawPoeType.id;
          poeType.title = rawPoeType.title
          return poeType
        })
      })
    )
  }

}
