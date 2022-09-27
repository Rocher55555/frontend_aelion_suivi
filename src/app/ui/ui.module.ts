import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  //declarations: [],
  imports: [
    CommonModule
  ] ,
  exports: [
    ...UiModule.materials,
  ]
})

export class UiModule {

    public static materials = [
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatToolbarModule,
      MatSnackBarModule,
      MatListModule,
      MatProgressSpinnerModule,
      MatMenuModule
    ]

 }
