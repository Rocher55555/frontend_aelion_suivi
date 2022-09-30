import { Component, Output, OnInit, EventEmitter  } from '@angular/core';
// import { Intern } from 'src/app/core/models/intern';
// import { InternService } from 'src/app/core/services/intern.service';
import { Intern } from './../../../core/models/intern';
import { InternService } from './../../../core/services/intern.service';



@Component({
  selector: 'app-intern-search-bar',
  templateUrl: './intern-search-bar.component.html',
  styleUrls: ['./intern-search-bar.component.scss']
})
export class InternSearchBarComponent implements OnInit {

  @Output() public interns = new EventEmitter<Intern[]>();
  public allInterns: Intern[] = [];
  public searchIntern!: Intern;

  constructor(
    private internService: InternService
  ) {

  }

  ngOnInit(): void {
    this.internService.findAll()
      .subscribe((interns: Intern[]) => {
        this.allInterns = interns;
        this.interns.emit(this.allInterns);
      })
  }

  public internFilter(event: Event): void {
    const stockInterns: Intern[]= [];

    // this.allInterns.forEach((intern: Intern) => {

    //     if(intern.name.toLowerCase().includes((event.target as HTMLInputElement).value)  || intern.email?.toLowerCase().includes((event.target as HTMLInputElement).value)) {
    //       stockInterns.push(intern);
    //       console.log(stockInterns, 'stockInterns');
    //       this.interns.emit(stockInterns);
    //     }
    // })
  }


}

