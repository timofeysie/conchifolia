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
  descriptions:any = [];
  wikiMediaCategory: string;

  constructor(private route: ActivatedRoute,
    private backendApiService: BackendApiService) { }

    ngOnInit() {
    this.itemName = this.route.snapshot.paramMap.get('id');
    this.backendApiService.getDetail(this.itemName).subscribe(
      data => {
        console.log('data',data);
        this.descriptions = data;
      },
      error => {
        console.error('error',error);
      }
    );
  }

}
