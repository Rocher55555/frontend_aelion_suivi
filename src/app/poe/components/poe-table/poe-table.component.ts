import { Component, OnInit } from '@angular/core';
import { POEService } from './../../../core/services/poe.service';
import { POE } from 'src/app/core/models/poe';
import { take } from 'rxjs';

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
}
