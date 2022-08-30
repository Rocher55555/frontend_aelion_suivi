import { Injectable } from '@angular/core';
import { Logger } from '../helpers/logger';
import { ICrud } from '../interfaces/i-crud';
import { Intern } from '../models/intern';

@Injectable({
  providedIn: 'root'
})

export class InternService implements ICrud<Intern>{

  public interns: Intern[] = []

  public constructor() {}

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
