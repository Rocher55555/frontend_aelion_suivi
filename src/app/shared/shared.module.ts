import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from './pipes/age.pipe';
import { InitialsDirective } from './directives/initials.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AgePipe,
    InitialsDirective
  ],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
  ],

  exports: [
    UiModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    AgePipe,
    InitialsDirective
  ]
})

export class SharedModule { }
