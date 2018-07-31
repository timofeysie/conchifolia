import { Component } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';
import { Observable } from "rxjs";
import { DetailModel } from './models/detail.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private backendApiService: BackendApiService) { 
    this.backendApiService.getList().subscribe(
      data => {
        console.log('data',data);
        this.list = data['list'];
      },
      error => {
        console.error('error',error);
      }
    );
  }
  title = 'List of Cognitive Bias';
  list: DetailModel[];
}
