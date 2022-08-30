import { Component, OnDestroy, OnInit } from '@angular/core';
import { POEService } from './../../../core/services/poe.service';
import { POE } from 'src/app/core/models/poe';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poe-detail',
  templateUrl: './poe-detail.component.html',
  styleUrls: ['./poe-detail.component.scss']
})

export class POEDetailComponent implements OnInit, OnDestroy {

  // pay attention to un
  private subscribers : Subscription[] = []

  // objet
  public poe: POE | null = null
  private _id! : number;

  //injection du service ()
  constructor(
    private poeService: POEService,
    private activatedRoute: ActivatedRoute // voir explication JL
  ) {}

  ngOnInit(): void {
    this.subscribers.push(this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this._id = +paramMap.get('id')!;
        this.poe = this.poeService.findOne(this._id);
      }
    ))
  }

//destruction
  ngOnDestroy():void{
    this.subscribers.forEach(
      (s: Subscription) => {s.unsubscribe}
    )

  }
  //ajout de la route avec navigate()

}
