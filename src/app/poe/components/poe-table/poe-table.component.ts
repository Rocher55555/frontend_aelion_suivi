import { Component, OnInit } from '@angular/core';
import { POEService } from './../../../core/services/poe.service';
import { POE } from 'src/app/core/models/poe';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class POETableComponent implements OnInit {

  public poes : POE[] = [];

  constructor(
    public poeService: POEService  //dependency Injection (D de solid)
  ) { }


  ngOnInit(): void {
    this.poeService.findAll()
    .pipe(
      take(1)
    )
    .subscribe((poes: POE[]) => {
      this.poes = poes;
      })
  }
/**
 * return 204 if ok, 404 if the POE is not found or a 401 status
 * @param poe
 */
  public delete (poe:POE):void {
    console.log('Hey delete fonctionne')
    this.poeService.delete(poe)
    .pipe(
      take(1)
    ).subscribe((Response:HttpResponse<any>) => {
      if(Response.status === 204){
        this.poes.splice(
          this.poes.findIndex((obj: POE) => obj.id === poe.id),
          1
        );
      }
    })
  }


}
