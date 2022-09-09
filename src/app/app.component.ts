import { Component, OnInit } from '@angular/core';
import { InternService } from './core/services/intern.service';
import { StringHelper } from './core/helpers/string-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Hello Angular 13';

  public getTitle(): string{
    return this.title
  }

// injection du service
  public constructor(
    public internService: InternService
  ) {}



  ngOnInit(): void {
    this.internService.findAll().subscribe();
    console.log(StringHelper.sanitizePonctuation('Cc you            : how are you!'))
  }
}
