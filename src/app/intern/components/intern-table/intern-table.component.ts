import { Component, OnInit } from '@angular/core';
import { InternService } from './../../../core/services/intern.service';
import { Logger } from './../../../core/helpers/logger';
import { Intern } from './../../../core/models/intern';

@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss']
})
export class InternTableComponent implements OnInit {
 public static sortOrder: number = 1;

 // injection du service
  constructor(
    public internService: InternService //dependency Injection (D de solid)
  ) { }

  ngOnInit(): void {
  }

  public onDelete (intern: Intern): void {
    this.internService.delete(intern);
  }


 //trier par ordre croissant
  public sortByName(): void {
    Logger.info(`Before sort, sortOder is ${InternTableComponent.sortOrder}`)
    this.internService.interns.sort(
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
