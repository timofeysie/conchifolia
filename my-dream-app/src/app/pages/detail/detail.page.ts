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
          console.log('2. data[description] !== undefined');
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
            this.message = 'Possibly no page exists for this item.';
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

  /**
   * If the backup title is used to fetch a re-direct detail  with the
   * backendApiService.getData() function and the result is something like this:
   * item:
   *  type: "uri"
   * value: "http://www.wikidata.org/entity/Q2556417"
   * itemLabel:
   *   type: "literal"
   * value: "observer-expectancy effect"
   * xml:lang: "en"
   *
   * Then we want to grab that itemLabel.value and use THAT as the re-direct.
   *  
   * @param data 
   */
  checkForItemCodeAsValue(data) {
    if (typeof data.value !== 'undefined') {
      const possibleQCode = this.findQCodeFromUrl(data.value);
      if (possibleQCode === null) {
        return null;
      } else {
        // we have a q-code
        return possibleQCode;
      }
    } else {
      return null;
    }
  }

  /**
   * Extract a Q-code from a URI like this:
   * value: "http://www.wikidata.org/entity/Q2556417"
   * @param value 
   */
  findQCodeFromUrl(uri: string) {
    const lastSlash = uri.lastIndexOf('/');
    const possibleQCode = uri.substr(lastSlash+1, uri.length);
    console.log('8.1. possible',possibleQCode);
    if (lastSlash !== -1) {
      let first = possibleQCode.substr(0,1);
      let second = parseInt(possibleQCode.substr(1,2));
      if (first === 'Q' && !isNaN(second) || typeof possibleQCode === 'undefined') {
          // we have a QCode
          console.log('8.2. Q-code confirmed');
          return possibleQCode;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Get the item label value and use that as a redirect
   * @param data 
   */
  itemCodeValueRedirect(data) {
    if (typeof data.itemLabel !== 'undefined') {
      const itemValue = data.itemLabel.value;
      console.log('8.3. itemValue to use as re-direct',itemValue);
        this.showSpinner = false;
        const listLanguage = this.route.snapshot.paramMap.get('listLanguage');
        this.backendApiService.getDetail(itemValue,listLanguage, false).subscribe(
          data => {
            this.description = data['description'];
            this.showSpinner = false;
          })
    } else {
      console.log('8.4. data',data);
    }
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
        console.log('12. qCode data',data);
        // re-set the qCode from the data here 
      },  
      error => {
        this.showSpinner = false;
        console.error('13. qCode error',error);
      })
    } else {
      console.log('14. qCode is  not null',qCode);
    }
    // now we should have a q-code we can use to get the WikiData page
  }

  getWikiDataUriValue(listLanguage: string, backupTitle: string) {
    if (!backupTitle.indexOf('http')) {
      
    }
    this.backendApiService.getData(backupTitle, listLanguage).subscribe(
      data => {
        console.log('15. data',data);
        
        //this.showSpinner = false;
        
        if (typeof data['results']['bindings'] !== 'undefined') {
          const bindings = data['results']['bindings'];
          const possibleItem = bindings[0];
          if (possibleItem && typeof possibleItem !== 'undefined') {
            console.log('15.1. possibleItem',possibleItem);
            if (this.checkForItemCodeAsValue(possibleItem.item) !== null) {
              this.itemCodeValueRedirect(data['results']['bindings'][0]); 
            } else {
              this.description = data['results']['bindings'][0];
            }
          } else {
            console.log('Form function attribution bias is empty',bindings);
            this.message = 'No detail page exists for this item.';
          }
        }
      }, error => {
        console.log('16. error',error);
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
        console.log('17. data description')
      },
      error => {
        console.error('18. redirect error',error);
        this.showSpinner = false;
        this.message = error.status+' '+backupTitle+' redirect error '+error.statusText;
      }
    );
  }

}
