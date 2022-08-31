import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICrud } from '../interfaces/i-crud';
import { POE } from '../models/poe';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class POEService implements ICrud<POE> {

  public constructor(
    private httpClient: HttpClient
  ) { }


  public poes: POE[] =[]
    // {
    //   id:1,
    //   title: "fullstack Java",
    //   beginningDate : new Date(2022, 7, 18),
    //   endDate: new Date (2022, 9, 19)
    // },
    // {
    //   id:2,
    //   title: "SAP consultant",
    //   beginningDate : new Date(2022, 5, 1),
    //   endDate: new Date (2022, 8, 30)
    // },
    // {
    //   id:3,
    //   title: "Designer Web",
    //   beginningDate : new Date(2022, 2, 9),
    //   endDate: new Date (2022, 5, 10)
    // }
  //]


  //ajout des méthodes de l'interface Icrud

  // Ajouter une nouvelle poe avec un nouvel id
  add(poe: POE): void {
    if(this.findOne(poe.id!) === null){
      this.poes.push(poe)
    }
  }


/**
 * Update a POE throught its id
 * @param poe
 */
  update(poe: POE): void {
    let oldPoe: POE | null = this.findOne(poe.id!);
    if(oldPoe !== null){
      oldPoe = {id: oldPoe.id, ...poe}
    }
  }


  delete(poe: POE): Observable<HttpResponse<any>> {
    return of(new HttpResponse());
    this.poes.splice(
      this.poes.indexOf(poe),
     1
    )
    // SI la methode slice() n'existait pas sur JS:
    // const newTable: POE[] = []
    // const rowIndex: number = this.poes.indexOf(poe);
    // if (rowIndex !== -1 ){
    //   for (let i = 0; i < this.poes.length; i++) {
    //     if (rowIndex !== i){
    //       newTable.push(this.poes[i])
    //     }
    //   }
    //   this.poes = newTable
    // }
  }



  // findAll(): Observable <POE[]> {
  //   return of(this.poes);
  // }


  findAll(): Observable <POE[]> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}poe`
    ) //recup observable
    .pipe(
      take(1),
      map((rawPoes:any) => {
        return rawPoes.map((rawPoe:any) => {
          const poe: POE = new POE();
          poe.id = rawPoe.id;
          poe.title = rawPoe.title;
          poe.beginningDate = new Date (rawPoe.beginningDate);
          poe.endDate = new Date (rawPoe.birthDate);
          return poe;
        })
      }
      )
    )
  }












/**
 * Find a POE with this id
 *
 * @param {number} id  the ID of the POE i'm looking for
 * @returns POE | null (if not find)
 */

  findOne(id: number): POE | null {                         // poe| null : ce que ça va me return
    //my logic here
    const poe: POE | undefined = this.poes.find (           // arg en paramètre est une fct
      (obj: POE) => obj.id === id                           // condition s'il rencontre cette condition le find (s'arrete de ange dans la const poe)
    )                                                       // si pas trouvé : poe sera undefined
    return (poe === undefined) ? null : poe;                // ? if : sinon
  }



    // ajout un id au nouvel eleve
    public getNextId():number{
      return this.poes.sort(
        (poe1: POE, poe2:POE) => {     //fonction de tri. 3 conditions
          return (poe1.id! - poe2.id!)*-1
        }
      )[0].id! + 1
    }




}
