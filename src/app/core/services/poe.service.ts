import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICrud } from '../interfaces/i-crud';
import { POE } from '../models/poe';
import { map, take, throwIfEmpty } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Logger } from '../helpers/logger';



@Injectable({
  providedIn: 'root'
})

export class POEService implements ICrud<POE> {



  public constructor(
    private httpClient: HttpClient     //transporteur des requete http vers le Front
  ) { }


  //ajout des méthodes de l'interface Icrud

  // Ajouter une nouvelle poe avec un nouvel id
  add(item: POE): Observable<POE> {
    return this.httpClient.post<POE>(
      `${environment.apiRoot}poe`,
      item
    ).pipe(
      take(1),
      map((rawPOE: any) => {
        const poe: POE = new POE();
        poe.id = rawPOE.id;
        poe.name = rawPOE.name;
        poe.beginDate = new Date(rawPOE.beginDate);
        poe.endDate = new Date(rawPOE.endDate);
        return poe;   //vrai objet
      })
    );
  }


  /**
   * Update a POE throught its id
   * @param poe
   */
  update(poe: POE): void {
    // let oldPoe: POE | null = this.findOne(poe.id!);
    // if(oldPoe !== null){
    //   oldPoe = {id: oldPoe.id, ...poe}
    // }
  }


  delete(poe: POE): Observable<any> {
    return of(new HttpResponse());
  }

   // FINALL BEFORE DESERIALIZE
  // findAll(): Observable<POE[]> {
  //   return this.httpClient.get<POE[]>(
  //     `${environment.apiRoot}poe`
  //   ) //recup observable
  //     .pipe(
  //       take(1),
  //       map((rawPoes: any[]) => {            //transforme tableau de ça d'où le any[]
  //         return rawPoes.map((rawPoe: any) => {
  //           const poe: POE = new POE();
  //           poe.id = rawPoe.id;
  //           poe.title = rawPoe.name;
  //           poe.beginningDate = new Date(rawPoe.beginDate);
  //           poe.endDate = new Date(rawPoe.endDate);
  //           return poe;
  //         })
  //       }
  //       )
  //     )
  // }

  findAll(): Observable<POE[]> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}poe`
    )//recup observable
      .pipe(
        take(1),
        map((rawPoes: any) => {                     //transforme tableau de ça d'où le any[]
          return rawPoes.map((rawPoe: any) => {

            const asClass: POE = new POE().deserialize(rawPoe);

            Logger.info(`Deserialized POE ${JSON.stringify(asClass)}`);
            return asClass;
          })
        })
      )
  }


  /**
   * Find a POE with this id
   *
   * @param {number} id  the ID of the POE i'm looking for
   * @returns POE | null (if not find)
   */

   findOne(id: number): Observable<POE> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}poe/${id}`,  //http://127.0.0.1/poe/idDeLaPoe
      {
       observe: 'response'    // si on observe pas la rep, on aura pas le status
      }
    )
      .pipe(
        take(1),
        map((response: HttpResponse<any>) => {
          if (response.status ===200) {
            const rawPoe: any = response.body;
            return new POE().deserialize(rawPoe);
          } else {
            throw new Error(`Poe with ${id} was not found!`)
          }
        }),
        throwIfEmpty(() => new Error (`Poe with ${id} was not found! `))
      )
    }








}


