import { Component } from '@angular/core';
import { Logger } from './core/helpers/logger';
import { Intern } from './core/models/intern';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello Angular 13';

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

  public getTitle(): string{
    return this.title
  }

  public onDelete (intern: Intern): void {
    this.interns.splice(
      this.interns.indexOf(intern),
      1
    );
  }


 //trier par ordre croissant
  public sortByName(): void {
    Logger.info(`Before sort, sortOder is ${AppComponent.sortOrder}`)
    this.interns.sort(
      AppComponent.sortName
    );
    AppComponent.sortOrder = AppComponent.sortOrder * -1;
    console.log(`After sort, sortOder is ${AppComponent.sortOrder}`)
  }


  //Static
  private static sortName(intern1: Intern, intern2: Intern): number {
    if (intern1.name > intern2.name){
      return 1 * AppComponent.sortOrder;
    } else if (intern1.name < intern2.name) {
      return -1 * AppComponent.sortOrder;
    } else {
      return 0 * AppComponent.sortOrder;
    }
  }






  //  public onDelete (intern: Intern): void {
  //    const remainingInterns : Intern[] = []

  //    for(let inArrayIntern of this.interns){
  //     if (inArrayIntern !== intern) {
  //       remainingInterns.push(inArrayIntern)
  //     }
  //    }
  //    this.interns = remainingInterns
  // }




}
