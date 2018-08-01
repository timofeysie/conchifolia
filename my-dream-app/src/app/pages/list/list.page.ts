import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { DetailModel } from '../../models/detail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage implements OnInit  {
  title = 'List of Cognitive Bias';
  list: DetailModel[];
  constructor(
    private backendApiService: BackendApiService,
    private router: Router) { }
  
  ngOnInit() {
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

  navigateAction(item: string) {
    let itemRoute = item.replace(/\s+/g, '_').toLowerCase();
    this.router.navigate(['detail/'+itemRoute]);
  }
  
  clickEvent(cognitive_biasLabel: string) {
    this.backendApiService.getDetail(cognitive_biasLabel).subscribe(
      data => {
        console.log('data',data);
      },
      error => {
        console.error('error',error);
      }
    );
  }
}
