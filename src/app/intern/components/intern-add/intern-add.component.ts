import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})
export class InternAddComponent implements OnInit {

  public internForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.internForm = this.formBuilder.group({
      name:[
        '', //Defaut value for the fied control
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2)
          ]
        )
      ]
    })
  }

  //methode
  public onSubmit():void {
    console.log(`Bout to send : {JSON.stringfy ${this.internForm.value}}`);
    const nextId: number = this.internService.getNextId();

  //next we will have tocreate a new Intern Instance
   const intern: Intern = new Intern();
   intern.id = nextId;
   intern.name = this.internForm.value.name;

 // we will have to pass brand new intern to add method of our service
   this.internService.add(intern)

   //Finally go to the intern table component
   this.router.navigate (['/', 'interns']);
  }
}

