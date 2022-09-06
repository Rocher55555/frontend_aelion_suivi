import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';

@Component({
  selector: 'app-intern-detail',
  templateUrl: './intern-detail.component.html',
  styleUrls: ['./intern-detail.component.scss']
})

export class InternDetailComponent implements OnInit {
//exo à effacer pour modif la bulle du DOM
  public bubbleDetailConfig: any = {
    height: '3em',
    width: '3em',
    lineHeight: '3em',
    backgroundColor: 'rgba(138, 43, 226, 0.6)',
    fontWeight: 'bold',
    borderRadius: '50%',
    verticalAlign: 'middle',
    textAlign: 'center',
    color: '#fff'
  }
//


  //objet
  public intern: Intern | null = null;
  private _id!:number;
  //public initials: string ='';

  //injectons des services
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
        try {
          this.internService.findOne(this._id).subscribe((intern:Intern) => {
            this.intern = intern;
            //set Initials
            //this.initials = intern!.firstname!.charAt(0) + intern!.name!.charAt(0);
          });
         } catch (error) {
          Logger.info('You suck!')
         }
        //this.intern = this.internService.findOne(this._id);
      }
    )
  }

  public navigate(): void{
    this.router.navigate(['/', 'interns'])
  }


}
