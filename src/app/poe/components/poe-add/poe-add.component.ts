import { Component, OnDestroy, OnInit } from '@angular/core';
import { POEService } from 'src/app/core/services/poe.service';
//import { POE } from 'src/app/core/models/poe';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POE } from 'src/app/core/models/poe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import { Subscription } from 'rxjs';
import { Logger } from 'src/app/core/helpers/logger';
import { POEType } from 'src/app/core/models/poe-type';
import { PoeTypeService } from '../../../core/services/poe-type.service'



@Component({
  selector: 'app-poe-add',
  templateUrl: './poe-add.component.html',
  styleUrls: ['./poe-add.component.scss']
})
export class POEAddComponent implements OnInit, OnDestroy {

  public poeForm!: FormGroup;
  private subscription!: Subscription;
  public allPoeType: POEType[] = [];
  public title: string = "poe";

  constructor(
    private poeService: POEService,
    private router: Router,
    private formBuilder : FormBuilder,
    private snacBar: AddSnackService,
    private poeTypeService: PoeTypeService
  ) { }

  // methode qui permet d'eviter les type et d'ecrire "poeForm.controls" dans le html => remplacer par 'c'
  public get c(): {[key: string]: AbstractControl} {
    return this.poeForm!.controls;
  }

  ngOnInit(): void {
    this.poeForm = this.formBuilder.group({
      name:[
        '', //Defaut value for the field control
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2)
          ]
        )
      ],
      beginDate:[
        '',
        Validators.compose(
          [
            Validators.required,
          ]
        )
      ],
      endDate:[
        '',
        Validators.compose(
          [
            Validators.required,
          ]
        )
      ],
      poeType:[
        '',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2)
          ]
        )
      ]
    })
    this.findAllPoeType();
  }

  // Add a POE
  public onSubmit():void {
    console.log(`Bout to send : { ${JSON.stringify(this.poeForm.value)}}`);

  //next we will have tocreate a new POE Instance
    /*const poe: POE = new POE();
    poe.name = this.poeForm.value.name;*/

 // we will have to pass brand new POE to add method of our service
   this.subscription = this.poeService.add(this.poeForm!.value).subscribe((poe: POE) => {
    Logger.info(`A POE was created: ${JSON.stringify(poe)}`);

      //snackbar
      this.snacBar.show('POE added successfully')

      //Finally go to the POE table component
      this.router.navigate(['/', 'poes']);
      })
  }


  //findAll() for POEType
  public findAllPoeType(): void {
    this.subscription = this.poeTypeService.findAll() //observable => findAll()
    .subscribe((poeTypes: POEType[]) => {
      //recup list de type de poe
      this.allPoeType = poeTypes
    })
  }


//  unsubscribe() : desinscription
  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}









