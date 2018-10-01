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
    let backupTitle = this.route.snapshot.paramMap.get('title');
    let qCode = this.route.snapshot.paramMap.get('qCode').toString();
    if (qCode === 'null') { qCode = null; }
    this.title = this.itemName.split('_').join(' '); // fix the title
    this.backendApiService.getDetail(this.title,listLanguage, false).subscribe(
      data => {
        this.showSpinner = false;
        if (typeof data['redirectTitle'] !== 'undefined') {
          console.log('1.redirectTitle',data['redirectTitle'] );
          backupTitle = data['redirectTitle'];
        }
        if (typeof data['description'] !== 'undefined') {
          this.description = data['description'].toString();
          console.log('2. data[descriptio] !== undefined')
        } else {
          console.log('3. else');
          this.description = data.toString();
        }
        this.description = this.description.split('href="/wiki/')
            .join('href="https://en.wikipedia.org/wiki/');
        this.availableLanguages(qCode, listLanguage, backupTitle);
      },
      error => {
        console.error('4. error',error);
        if (typeof error['error'] !== 'undefined') {
          this.showSpinner = false;
          console.log('5. error msg',error['error']);
          if (error['error'] === 'Redirect to data uri value') {
            this.message = error['error'];
            console.log('6. Redirect to data uri value');
            this.getWikiDataUriValue(listLanguage, backupTitle);
          }
        } else {
          this.message = error.status+': trying to redirect to ';
          if (backupTitle) {
            this.message += backupTitle;
            console.log('7. if backup');
            this.getAlternateTitle(listLanguage, backupTitle);
          } else {
            console.log('8. else nothing')
          }
        }
      }
    );
  }

  availableLanguages(qCode: string, listLanguage: string, label: string) {
    console.log('9. qCode',qCode);
    if (qCode === null) {
      console.log('10. this.itemName',this.itemName);
      let searchString = this.itemName;
      if (label) {
        searchString = label.split('_').join(' ');
      }
      console.log('11. availableLanguages searchString',searchString);
      this.backendApiService.getData(searchString,listLanguage).subscribe(data => {
        console.log('12.qCode data',data);
        // re-set the qCode from the data here 
      },  
      error => {
        this.showSpinner = false;
        console.error('13.qCode error',error);
      })
    } else {
      console.log('14.qCode is  not null',qCode);
    }
    // now we should have a q-code we can use to get the WikiData page
  }

  getWikiDataUriValue(listLanguage: string, backupTitle: string) {
    if (!backupTitle.indexOf('http')) {
      
    }
    this.backendApiService.getData(backupTitle, listLanguage).subscribe(
      data => {
        console.log('13.data',data);
        this.showSpinner = false;
        this.description = data;
      }, error => {
        console.log('14.error',error);
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
        console.log('15. data description')
      },
      error => {
        console.error('16. redirect error',error);
        this.showSpinner = false;
        this.message = error.status+' '+backupTitle+' redirect error '+error.statusText;
      }
    );
  }

}
