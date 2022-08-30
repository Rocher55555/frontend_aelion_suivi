import { Component, OnInit } from '@angular/core';
import { POEService } from 'src/app/core/services/poe.service';
//import { POE } from 'src/app/core/models/poe';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { POE } from 'src/app/core/models/poe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddSnackService } from 'src/app/core/services/add-snack.service';

@Component({
  selector: 'app-poe-add',
  templateUrl: './poe-add.component.html',
  styleUrls: ['./poe-add.component.scss']
})
export class POEAddComponent implements OnInit {

  public poeForm!: FormGroup;

  constructor(
    private poeService: POEService,
    private router: Router,
    private formBuilder : FormBuilder,
    private snacBar: AddSnackService
  ) { }

  ngOnInit(): void {
    this.poeForm = this.formBuilder.group({
      title:[
        '', //Defaut value for the field control
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2)
          ]
        )
      ]
    })
  }

  //methode perso
  public onSubmit():void {
    console.log(`Bout to send : { ${JSON.stringify(this.poeForm.value)}}`);
    const nextId: number = this.poeService.getNextId();

  //next we will have tocreate a new Intern Instance
    const poe: POE = new POE();
    poe.id = nextId;
    poe.title = this.poeForm.value.title;

 // we will have to pass brand new intern to add method of our service
   this.poeService.add(poe)

   //snackbar
   this.snacBar.show('la poe a bien été enregistrée')

   //Finally go to the intern table component
   this.router.navigate (['/', 'poes']);
  }
}









