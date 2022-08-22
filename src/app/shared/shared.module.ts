import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule
  ],

  exports: [
    UiModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ]
})

export class SharedModule { }
