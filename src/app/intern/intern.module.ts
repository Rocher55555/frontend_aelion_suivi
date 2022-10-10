import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternRoutingModule } from './intern-routing.module';
import { InternTableComponent } from './components/intern-table/intern-table.component';
import { InternDetailComponent } from './components/intern-detail/intern-detail.component';
import { InternAddComponent } from './components/intern-add/intern-add.component';
import { SharedModule } from '../shared/shared.module';
import { InternSearchBarComponent } from './search-bar/intern-search-bar/intern-search-bar.component';




@NgModule({
  declarations: [
    InternTableComponent,
    InternDetailComponent,
    InternAddComponent,
    InternSearchBarComponent
  ],
  imports: [
    CommonModule,
    InternRoutingModule,
    SharedModule
  ]
})
export class InternModule { }
