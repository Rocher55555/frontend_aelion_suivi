import { Component, OnDestroy, OnInit } from '@angular/core';
import { POEService } from 'src/app/core/services/poe.service';
//import { POE } from 'src/app/core/models/poe';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POE } from 'src/app/core/models/poe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import { Subscription } from 'rxjs';
import { Logger } from 'src/app/core/helpers/logger';

@Component({
  selector: 'app-poe-add',
  templateUrl: './poe-add.component.html',
  styleUrls: ['./poe-add.component.scss']
})
export class POEAddComponent implements OnInit, OnDestroy {

  public poeForm!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private poeService: POEService,
    private router: Router,
    private formBuilder : FormBuilder,
    private snacBar: AddSnackService
  ) { }

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
            //


          ]
        )
      ],
      endDate:[
        '',
        Validators.compose(
          [

          ]
        )
      ]
    })
  }

  // Addmethode perso
  public onSubmit():void {
    console.log(`Bout to send : { ${JSON.stringify(this.poeForm.value)}}`);

  //next we will have tocreate a new POE Instance
    /*const poe: POE = new POE();
    poe.name = this.poeForm.value.name;*/

 // we will have to pass brand new POE to add method of our service
   this.subscription = this.poeService.add(this.poeForm!.value).subscribe((poe: POE) => {
    Logger.info(`A POE was created: ${JSON.stringify(poe)}`);
  })

   //snackbar
   this.snacBar.show('POE added successfully')

   //Finally go to the POE table component
   this.router.navigate(['/', 'poes']);
  }

  //  unsubscribe() : desinscription
  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }




 //Da cancellare
  /*public onSubmit():void {
    console.log(`Bout to send : { ${JSON.stringify(this.poeForm.value)}}`);

  //next we will have tocreate a new Intern Instance
    const poe: POE = new POE();
    poe.name = this.poeForm.value.name;

 // we will have to pass brand new intern to add method of our service
   this.poeService.add(poe)

   //snackbar
   this.snacBar.show('la poe a bien été enregistrée')

   //Finally go to the intern table component
   this.router.navigate (['/', 'poes']);
  }
  */
}









