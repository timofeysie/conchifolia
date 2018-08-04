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
  title = 'List of Cognitive Biases';
  list: DetailModel[];
  repeats: number = 0;
  media: number = 0;
  constructor(
    private backendApiService: BackendApiService,
    private router: Router) {
     }
  
  ngOnInit() {
    if (!this.list) {
      this.backendApiService.getList().subscribe(
        data => {
          this.list = data['list'];
          this.list.forEach((item) => {
            item.sortName = item.cognitive_biasLabel;
          })
        },
        error => {
          console.error('error',error);
        }
      );
      // get WikiMedia sections
      this.getWikiSection();
    }
  }

  /**
   * Fetch the section list from the server, parse its and add
   * it to the list then re-sort.
   * The three calls and adding items should all complete before the add
   * TODO: use async/await here.  This is just a temporary test to see
   * if it will indeed fix the occasional (list.page.ts:85) error.
   * @param sectionNum Number of section to get
   */
  getWikiSection() {
    this.backendApiService.loadWikiMedia(1).subscribe(
      data => {
        const section = this.parseList(data);
        this.addItems(section);
        this.backendApiService.loadWikiMedia(2).subscribe(
          data => {
            const section = this.parseList(data);
            this.addItems(section);
            this.backendApiService.loadWikiMedia(3).subscribe(
              data => {
                const section = this.parseList(data);
                this.addItems(section);
                // finally sort the list
                this.list.sort(this.dynamicSort('sortName'));
            },
              error => {
                console.error('error in 3',error);
            });
        },
          error => {
            console.error('error in 2',error);
        });
    },
      error => {
        console.error('error in 1',error);
    });
  }

  /**
   * The Ege Özcan solution from [the answer to this question](https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript) 
   * back in 2011.
   * @param property to sort by
   */
  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  /**
   * Take a complete section of names and descriptions and either add the content
   * to a pre-existing item or create a new item if it is not already on the list.
   * 
   * @param section WIkiMedia section
   */
  addItems(section: any) {
    for (let i = 0; i < section.length; i++) {
      //console.log('item:'+i+' ',section[i]);
      let itemName = section[i].name;
      let found = false;
      for(var j = 0; j < this.list.length; j++) {
        if ((typeof this.list[j].cognitive_biasLabel !== 'undefined' && typeof itemName !== 'undefined') && this.list[j].cognitive_biasLabel.toLocaleUpperCase() === itemName.toLocaleUpperCase()) {
          found = true;
          this.list[j].wikiMedia_label = itemName;
          this.list[j].wikiMedia_description = section[i].description;
          this.list[j].wikiMedia_category = section[i].category;
          this.list[j].sortName = itemName;
          this.repeats++;
          break;
        }
      }
      if (!found) {
        let wikiMediaObj = new DetailModel();
        wikiMediaObj.wikiMedia_label = itemName;
        wikiMediaObj.wikiMedia_description = section[i].description;
        wikiMediaObj.wikiMedia_category = section[i].category;
        wikiMediaObj.sortName = itemName.split('"').join('');;
        this.list.push(wikiMediaObj);
        this.media++;
      }
    }
  }

  /**
   * Usually the name of item can be gotten from the inner text of an <a> tag inside the table cell.
   * A few however, like 'frequency illusion' are not links, so are just the contents of the <td> tag.
   * Some, such as 'regression bias' have a <span> inside the tag.
   * @param data result of a WikiMedia section API call
   * @returns Array of name/desc objects
   */
  parseList(data: any) {
    const content = data['parse']['text']['*'];
    let one = this.createElementFromHTML(content);
    const desc:any = one.getElementsByClassName('mw-parser-output')[0].children;
    let descriptions: any [] = [];
    let category = desc[0].getElementsByClassName('mw-headline')[0].innerText;
    // might use category descriptions later
    // if (typeof desc[1].getElementsByTagName('a')[0] !== 'undefined') {
    //   console.log('desc1',desc[1].getElementsByTagName('a')[0].innerText);
    // } else {
    //   console.log(desc[1]);
    // }
    const allDesc = desc[2];
    const tableRows = allDesc.getElementsByTagName('tr');
    for (let i = 0; i < tableRows.length;i++) {
      let tableDiv = tableRows[i].getElementsByTagName('td');
      if (typeof tableDiv[0] !== 'undefined') {
        let itemDesc;
        if (typeof tableDiv[1] !== 'undefined') {
          itemDesc = tableDiv[1].innerText;
        }
        let itemName;
        if (typeof tableDiv[0].getElementsByTagName('a')[0] !== 'undefined') {
          itemName = tableDiv[0].getElementsByTagName('a')[0].innerText;
        } else if (typeof tableDiv[0].getElementsByTagName('span')[0] !== 'undefined') {
          itemName = tableDiv[0].getElementsByTagName('span')[0].innerText;
        } else if (typeof tableDiv[0].innerText !== 'undefined') {
          itemName = tableDiv[0].innerText;
        } else {
          console.log('failed to get',tableDiv[0]);
        }
        let newItem = {
          'name': itemName,
          'desc': itemDesc,
          'category': category
        }
        descriptions.push(newItem);
      }
    }
    return descriptions;
  }

  /**
   * Convert the result content to an html node for easy access to the content.
   * Change this to div.childNodes to support multiple top-level nodes
   * @param htmlString 
   */
  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    let page = '<div>'+htmlString+'</div>';
    div.innerHTML = page.trim();
    return div; 
  }

  /**
   * Remove the [edit] portion of the title.
   * @param HTMLDivElement 
   */
  parseTitle(html: HTMLDivElement) {
    let title =  html.getElementsByTagName('h2')[0].innerText;
    let bracket = title.indexOf('[');
    if (bracket > 0) {
      title = title.substr(0,bracket);
    }
    return title;
  }

  navigateAction(item: string) {
    let itemRoute = item.replace(/\s+/g, '_').toLowerCase();
    this.router.navigate(['detail/'+itemRoute]);
  }
  
}
