import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from './pipes/age.pipe';
import { InitialsDirective } from './directives/initials.directive';
import { InitialPipe } from './pipes/initial.pipe';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AgePipe,
    InitialsDirective,
    InitialPipe
  ],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SearchPipeModule
  ],

  exports: [
    UiModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    AgePipe,
    InitialPipe,
    InitialsDirective,
    Ng2SearchPipeModule
  ]
})

export class SharedModule { }
