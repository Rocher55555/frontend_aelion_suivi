import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import * as moment from 'moment';
import { Logger } from 'src/app/core/helpers/logger';
import { DateValidator } from 'src/app/core/validators/date-validator';
import { POEService } from 'src/app/core/services/poe.service';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { POE } from 'src/app/core/models/poe';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmailExistsValidatorService } from 'src/app/core/validators/email-exists-validator.service';
import { InternFormBuilder } from '../../builder/intern-form-builder';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})


// ! Oninit : initialize !== On destroy => delete
export class InternAddComponent implements OnInit, OnDestroy {

  public internForm!: FormGroup;
  public poes: POE[] = [];
  private subscription!: Subscription;
  private search$:Subject<string> = new Subject()
  private addressApiUrl: string = "https://api-adresse.data.gouv.fr/search/"
  public addressList: string[] =[];

  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private router: Router,
    private snacBar: AddSnackService,
    private poeService: POEService,
    private emailExistsValidator: EmailExistsValidatorService,
    private httpClient: HttpClient
  ) { }
// methode qui permet d'eviter les type et d'ecrire "internForm.controls" dans le html =>remplacer par 'c'
  public get c(): {[key: string]: AbstractControl} {
    return this.internForm!.controls;
  }

  ngOnInit(): void {
    const myInternForm: InternFormBuilder = new InternFormBuilder(this.formBuilder, this.poeService);
    this.internForm = myInternForm.internForm; // grâce au methode "magique" on omet les pararentheses apres methode
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe({
      next: (address :string) =>{
        this.callAddressApi(address)
      },
      error:(msg:string) =>{
        console.log('Error Getting Location: ', msg);
      }
    })

    //je voudrai bien les poes
    myInternForm.toggleAddPoes()
    .subscribe(
      (poes: POE[])=> {
        this.poes = poes;
      }
    )
  }
/**
 *
 */
// ? subscription??  je souscrit à un fi d'intern
    public onSubmit(): void {
    console.log(`Bout to send : ${JSON.stringify(this.internForm.value)}`);

    //We'll have to pass brand new intern to the add method of our service and all affected  POEs
    // We’ll need to pass an Intern with all affected POEs
    this.subscription = this.internService.add(this.internForm!.value).subscribe((intern: Intern) => {
      Logger.info(`An Intern was created: ${JSON.stringify(intern)}`);
      //Load a snackbar(afficher le snackbar, on peut l'utiliser ou on veut)
      this.snacBar.show(`Intern added successfully`);

      //Finally go to the intern table component
      this.router.navigate(['/', 'interns']);
    });
  }


/**
 *
 */
// ? Ca sert à quoi ?  ngOnDestroy cycle de vie d'un composant / take one : prend et s'arrete et si pas de take one .... il faut arrete de souscrire/
// ? unsubscribe() : desinscription

  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public onAddressChange(event:Event):void{
    // conversion de type, de Event à HTMLInputValue pour pouvoir appeler target.value
    const addressInputValue=(event.target as HTMLInputElement).value 

    const search: string = addressInputValue.trim()
    if (search.length >= 3) {
      this.search$.next(addressInputValue)
    }else{
      this.addressList=[]
    }

  }

  // call https://adresse.data.gouv.fr/api-doc/adresse and return possibles results
  public callAddressApi(address: string) {
  this.httpClient.get(
    this.addressApiUrl,
    {
      params : new HttpParams().set('q',address),
      observe:"response"
    }
  ).subscribe(
    (response:HttpResponse<any>)=>{
      if (response.ok){
        this.extractAddressList(response.body)
      }else{
        console.log('callAddressApi failed ')
      }
    }
  )
  }

  public extractAddressList(apiResponse: any): string[] {
    this.addressList =[]
    for ( const feature of apiResponse.features){
      this.addressList.push(feature.properties.label)
    }
    return this.addressList
  }


}





  //    public static validateBirthDate(control: AbstractControl): {[key: string]: any} | null {
  //      const userEnteredDate: moment.Moment = moment(control.value);   //recup la valeur
  //      const today: moment.Moment = moment();
  //      return userEnteredDate.isSameOrAfter(today) ? {dateNotLessThan: true} : null;
  //      }




