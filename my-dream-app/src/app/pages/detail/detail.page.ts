import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  itemName: string;
  title: string;
  description:any = [];
  wikiMediaCategory: string;

  constructor(
    private route: ActivatedRoute,
    private backendApiService: BackendApiService) {
      console.log('constructed');  
     }

  ngOnInit() {
    console.log('ngOnInit');
    this.itemName = this.route.snapshot.paramMap.get('id');
    this.title = this.itemName.split('_').join(' ');
    this.backendApiService.getDetail(this.itemName).subscribe(
      data => {
        this.description = data['description'].toString();
        console.log('this.descriptions',this.description.length);
        this.description = this.description.split('href="/wiki/')
          .join('href="https://en.wikipedia.org/wiki/');
        console.log('this.descriptions',this.description.length);
      },
      error => {
        console.error('error',error);
      }
    );
  }

}
