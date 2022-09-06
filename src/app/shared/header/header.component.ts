import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InternService } from 'src/app/core/services/intern.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

public itemNumber$!: BehaviorSubject<number>

// injection du service
public constructor(
  private internService: InternService
) {}

  ngOnInit(): void {
    this.itemNumber$ = this.internService.itemNumber;
  }

}







