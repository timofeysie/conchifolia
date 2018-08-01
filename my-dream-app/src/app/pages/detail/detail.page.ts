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
  descriptions:any = [];
  wikiMediaCategory: string;

  constructor(private route: ActivatedRoute,
    private backendApiService: BackendApiService) { }

  ngOnInit() {
    this.itemName = this.route.snapshot.paramMap.get('id');
    this.title = this.itemName.split('_').join(' ');
    this.backendApiService.getDetail(this.itemName).subscribe(
      data => {
        this.descriptions = data['description'];
        console.log('this.descriptions',this.descriptions);
      },
      error => {
        console.error('error',error);
      }
    );
  }

}
