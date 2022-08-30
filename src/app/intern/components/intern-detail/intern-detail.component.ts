import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';

@Component({
  selector: 'app-intern-detail',
  templateUrl: './intern-detail.component.html',
  styleUrls: ['./intern-detail.component.scss']
})

export class InternDetailComponent implements OnInit {

  //objet
  //private _id!: number;
  public intern: Intern | null = null;
  private _id!:number;

  //injecte le sevice
  constructor (
    private router: Router,
    private internService: InternService,
    private activatedRoute: ActivatedRoute
    ) {
      //this.intern = this.internService.findOne(125);
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this._id = +paramMap.get('id')!;
        this.intern = this.internService.findOne(this._id);
      }
    )
  }

  public navigate(): void{
    this.router.navigate(['/', 'interns'])
  }


}
