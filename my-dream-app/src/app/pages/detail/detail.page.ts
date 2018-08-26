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
  showSpinner: boolean = true;
  message: any;
  constructor(
    private route: ActivatedRoute,
    private backendApiService: BackendApiService) { }

  ngOnInit() {
    this.itemName = this.route.snapshot.paramMap.get('id');
    const listLanguage = this.route.snapshot.paramMap.get('listLanguage');
    const backupTitle = this.route.snapshot.paramMap.get('title');
    console.log('backupTitle',backupTitle);
    this.title = this.itemName.split('_').join(' ');
    this.backendApiService.getDetail(this.itemName,listLanguage, false).subscribe(
      data => {
        this.description = data['description'].toString();
        this.description = this.description.split('href="/wiki/')
          .join('href="https://en.wikipedia.org/wiki/');
        this.showSpinner = false;
      },
      error => {
        console.error('error',error);
        this.showSpinner = false;
        this.message = error.status+': trying to redirect to';
        if (backupTitle) {
          this.message += backupTitle;
          this.getAlternateTitle(listLanguage, backupTitle);
        }
      }
    );
  }

  getAlternateTitle(listLanguage: string, backupTitle: string) {
    this.showSpinner = true;
    this.backendApiService.getDetail(backupTitle,listLanguage,true).subscribe(
      data => {
        this.description = data['description'].toString();
        this.description = this.description.split('href="/wiki/')
          .join('href="https://en.wikipedia.org/wiki/');
        this.showSpinner = false;
      },
      error => {
        console.error('redirect error',error);
        this.showSpinner = false;
        this.message = error.status+' '+backupTitle+' redirect error '+error.statusText;
      }
    );
  }

}
