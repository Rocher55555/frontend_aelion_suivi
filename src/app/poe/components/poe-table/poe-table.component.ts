import { Component, OnInit } from '@angular/core';
import { POEService } from './../../../core/services/poe.service';
import { POE } from 'src/app/core/models/poe';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class POETableComponent implements OnInit {

  constructor(
    public poeService: POEService//dependency Injection (D de solid)
  ) { }

  public poes : POE[] = [];

  ngOnInit(): void {
    this.poeService.findAll()
      .subscribe((poes: POE[]) => {
        this.poes = poes;
      })
  }

}
