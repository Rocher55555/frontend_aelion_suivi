import { Component, Output, OnInit, EventEmitter, Input  } from '@angular/core';
import { POE } from 'src/app/core/models/poe';
import { POEService } from 'src/app/core/services/poe.service';
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
  @Output() public findAllInterns = new EventEmitter<Intern[]>();
  @Output() public poes = new EventEmitter<POE[]>();
  @Input() public selectedPOE!: POE | null;

  constructor(
    private internService: InternService,
    private poeService: POEService
  ) {

  }

  ngOnInit(): void {
    this.internService.findAll()
      .subscribe((interns: Intern[]) => {
        this.allInterns = interns;
        this.findAllInterns.emit(interns);
        this.interns.emit(interns);
      })

      this.poeService.findAll()
        .subscribe((poes: POE[]) => {
          this.poes.emit(poes);
    })
  }

  public internFiltered(event: Event): void {
    const stockInterns: Intern[]= [];

    if(this.selectedPOE) {
      this.selectedPOE.interns.forEach((intern) => {
        if(intern.name.toLowerCase().includes((event.target as HTMLInputElement).value)  || intern.email?.toLowerCase().includes((event.target as HTMLInputElement).value)){
          stockInterns.push(intern);
          this.interns.emit(stockInterns);
        }
      })
    } else {
      this.allInterns.forEach((intern: Intern) => {
          if(intern.name.toLowerCase().includes((event.target as HTMLInputElement).value)  || intern.email?.toLowerCase().includes((event.target as HTMLInputElement).value)) {
            stockInterns.push(intern);
            this.interns.emit(stockInterns);
          }
      })
    }
  }
}

