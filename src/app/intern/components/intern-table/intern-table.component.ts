import { Component, OnInit } from '@angular/core';
import { InternService } from './../../../core/services/intern.service';
import { Logger } from './../../../core/helpers/logger';
import { Intern } from './../../../core/models/intern';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { POEService } from 'src/app/core/services/poe.service';
import { POE } from 'src/app/core/models/poe';


@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss']
})
export class InternTableComponent implements OnInit {
 public static sortOrder: number = 1;
 public poes: POE[] = [];
 public interns: Intern[] = [];

 public bubbleConfig: any = {
  height: '3em',
  width: '3em',
  lineHeight: '3em',
  backgroundColor: 'rgba(236, 123, 28, 0.8)',
  //backgroundColor: 'rgba(200, 10, 127, 0.7)',
  fontWeight: 'bold',
  borderRadius: '50%',
  verticalAlign: 'middle',
  textAlign: 'center',
  color: '#fff'
}




 // injection du service
  constructor(
    private internService: InternService, //dependency Injection (D de solid)
    private poeService: POEService
  ) { }

  ngOnInit(): void {
    this.internService.findAll()
      .subscribe((interns: Intern[]) => {
        this.interns = interns;
        Logger.info(`je viens d'être notifie`)
      })
      Logger.info(`Hello, je poursuis l'execution`)
      this.poeService.findAll()
        .subscribe((poes: POE[]) => {
          this.poes = poes;
        })
  }

  public onDelete (intern: Intern): void {
    this.internService.delete(intern)    // on veut just recup l'observable qui observe une rep http
      .pipe(
        take(1)    //take dans le pipe
      ).subscribe((response: HttpResponse<any>) => {
        if (response.status === 204){
          this.interns.splice(
            this.interns.findIndex((obj: Intern) => obj.id === intern.id),
            1
          );
        }
      })
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
