import { Component, OnInit } from '@angular/core';
import { InternService } from 'src/app/core/services/intern.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

// injection du service
public constructor(
  public internService: InternService
) {}

  ngOnInit(): void {
  }

}







