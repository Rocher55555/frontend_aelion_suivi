import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AddSnackService {

  private readonly config: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition:'top'
  }

  constructor(
    private snackBar: MatSnackBar
  ) { }

  //snacBar
  public show(message:string):void{
    this.snackBar.open(message, '', this.config)
  }
}
