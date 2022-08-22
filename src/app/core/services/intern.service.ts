import { Injectable } from '@angular/core';
import { Logger } from '../helpers/logger';
import { ICrud } from '../interfaces/i-crud';
import { Intern } from '../models/intern';

@Injectable({
  providedIn: 'root'
})

export class InternService implements ICrud<Intern>{

  public interns: Intern[] = [
    {
      id:125,
      name: 'Shalala',
      firstname: 'Paula',
      email: 'opaula@hotmail.com',
      phoneNumber: '+(33) 55 55 50 55 05',
      birthDate: new Date(1989, 10, 15),
      address: '1, place du champs de Mars'
    },
    {
      id:2,
      name: 'Pina',
      firstname: 'Monica',
      email: 'ola@hotmail.com',
      phoneNumber: '+(33) 00 22 11 55 54',
      birthDate: new Date(1992, 6, 1),
      address: '1, rue de la revolution'
    },
    {
      id:3,
      name: 'Castanie',
      firstname: 'Piotr',
      email: 'pedro@hotmail.com',
      phoneNumber: '+(33) 51 47 54 0025',
      birthDate: new Date(1995, 12, 12),
      address: '10, boulevard de la charette'
    },
    {
      id:4,
      name: 'Bear',
      firstname: 'Jean',
      email: 'jeanneau@hotmail.com',
      phoneNumber: '+(33) 00 00 0 00 25',
      birthDate: new Date(19, 3, 16),
      address: '15, chemin de la galette'
    },
  ]

  public constructor() {
    Logger.info('I am a Sigleton')
   }

   //ajout des methodes de l'interface Icrud
  findAll(): Intern []  {
    //Your logic here
    return this.interns;
  }

  findOne(id: number): Intern | null {
    const intern: Intern | undefined = this.interns.find(
      (obj: Intern) => obj.id === id
    )
    return (intern === undefined) ? null : intern;
/*
ou
    if (intern === undefined) {
      return null;
    }
    return intern;
*/

  }


  public getItemNumber(): number {
    return this.interns.length
  }

  public delete(intern: Intern): void {
    this.interns.splice(
      this.interns.indexOf(intern),
      1
    );
  }

  public add(intern: Intern): void{
    if (this.findOne(intern.id!) === null) {
      this.interns.push(intern);
    }
  }

  public update(intern:Intern): void{
    let oldIntern: Intern | null = this.findOne(intern.id!);
    if (oldIntern !== null) {
      oldIntern = {id: oldIntern.id, ...intern};
    }
  }

  public getAll(): Intern[] {
    return this.interns
  }

  public getOne(index: number) : Intern {
    return this.interns[index]
  }


  // ajout un id au nouvel eleve
  public getNextId():number{
    return this.interns.sort(
      (intern1:Intern, intern2:Intern) => {     //fonction de tri. 3 conditions
        return (intern1.id! -intern2.id!)*-1
      }
    )[0].id! + 1
  }

}
