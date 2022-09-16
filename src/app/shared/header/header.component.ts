import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InternService } from 'src/app/core/services/intern.service';
import { UserService } from 'src/app/user/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

public itemNumber$!: BehaviorSubject<number>

// injection du service
public constructor(
  public userService: UserService,        //connected or not?  public visibilité dans le html, si private seulement dans le ts
  private internService: InternService
) {}

  ngOnInit(): void {
    this.itemNumber$ = this.internService.itemNumber;
  }

}







