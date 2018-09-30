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
    //this.route.paramMap.subscribe(pmap => this.getHero(pmap.get('id')));
    
    this.itemName = this.route.snapshot.paramMap.get('id');
    const listLanguage = this.route.snapshot.paramMap.get('listLanguage');
    const backupTitle = this.route.snapshot.paramMap.get('title');
    const qCode = this.route.snapshot.paramMap.get('qCode');
    console.log('backupTitle',backupTitle);
    console.log('qCode',qCode);
    if (qCode === null) {
      this.getQCode(listLanguage);
    }
    this.title = this.itemName.split('_').join(' '); // fix the title
    this.backendApiService.getDetail(this.itemName,listLanguage, false).subscribe(
      data => {
        this.showSpinner = false;
        if (typeof data['description'] !== 'undefined') {
          this.description = data['description'].toString();
        } else {
          this.description = data.toString();
        }
        this.description = this.description.split('href="/wiki/')
            .join('href="https://en.wikipedia.org/wiki/');
      },
      error => {
        console.error('error',error);
        if (typeof error['error'] !== 'undefined') {
          console.log('error msg',error['error']);
          if (error['error'] === 'Redirect to data uri value') {
            this.message = error['error'];
            this.getWikiDataUriValue(listLanguage, backupTitle);
          }
        } else {
          this.message = error.status+': trying to redirect to ';
          if (backupTitle) {
            this.message += backupTitle;
            this.getAlternateTitle(listLanguage, backupTitle);
          }
        }
      }
    );
  }

  getQCode(listLanguage: string) {
    this.backendApiService.getData(this.itemName,listLanguage).subscribe(data => {
      console.log('qCode data',data);
    },
    error => {
      console.error('qCode error',error);
    })
  }

  getWikiDataUriValue(listLanguage: string, backupTitle: string) {
    if (!backupTitle.indexOf('http')) {
      
    }
    this.backendApiService.getData(backupTitle, listLanguage).subscribe(
      data => {
        console.log('data2',data);
        this.showSpinner = false;
        this.description = data;
      }, error => {
        console.log('error',error);
        //this.message = 'Redirect failed';
        this.showSpinner = false;
      }
    )
  }

  /**
   * 
   * @param listLanguage 
   * @param backupTitle 
   */
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
