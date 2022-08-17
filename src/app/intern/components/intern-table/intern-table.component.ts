import { Component, OnInit } from '@angular/core';
import { Logger } from './../../../core/helpers/logger';
import { Intern } from './../../../core/models/intern';

@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss']
})
export class InternTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public static sortOrder: number = 1;

  public intern : Intern = {
    name: 'Aubert',
    firstname: 'Jean-Luc',
    email: 'jla.webprojet@gmail.com',
    phoneNumber: ' +(33)6 52 54 52 55'
  }

  public interns: Intern[] = [
    this.intern,
    {
      name: 'Pina',
      firstname: 'Monica',
      email: 'ola@hotmail.com',
      phoneNumber: '+(33) 00 22 11 55 54'
    },
    {
      name: 'Castanie',
      firstname: 'Piotr',
      email: 'pedro@hotmail.com',
      phoneNumber: '+(33) 51 47 54 0025'
    },
    {
      name: 'jeagr',
      firstname: 'Jean',
      email: 'jeanneau@hotmail.com',
      phoneNumber: '+(33) 00 00 0 00 25'
    },
  ]



  public onDelete (intern: Intern): void {
    this.interns.splice(
      this.interns.indexOf(intern),
      1
    );
  }


 //trier par ordre croissant
  public sortByName(): void {
    Logger.info(`Before sort, sortOder is ${InternTableComponent.sortOrder}`)
    this.interns.sort(
      InternTableComponent.sortName
    );
    InternTableComponent.sortOrder = InternTableComponent.sortOrder * -1;
    console.log(`After sort, sortOder is ${InternTableComponent.sortOrder}`)
  }


  //Static
  private static sortName(intern1: Intern, intern2: Intern): number {
    if (intern1.name > intern2.name){
      return 1 * InternTableComponent.sortOrder;
    } else if (intern1.name < intern2.name) {
      return -1 * InternTableComponent.sortOrder;
    } else {
      return 0 * InternTableComponent.sortOrder;
    }
  }











}
