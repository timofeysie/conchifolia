import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { DetailModel } from '../../models/detail.model';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-page-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage implements OnInit  {
  title = 'Cognitive Biases';
  list: DetailModel[];
  elemList: any[];
  repeats: number = 0;
  media: number = 0;
  listLanguage: string;
  listName = 'list';
  optionsName = 'options';
  constructor(
    private backendApiService: BackendApiService,
    private router: Router,
    private dataService: DataService) {
     }
  
  /**
   *  Get the options find the current language settings, then get the list from storage.
   */   
  ngOnInit() {
    this.elemList = [];
    this.getOptionsViaStorage().then(() => {
      this.getListViaStorage();
    });
  }

  detailsToggle() {
    console.log('detailsToggle');
  }

  /**
   * Load the list again via http which will overwrite the current list including options.
   */
  refreshList() {
    this.getListViaHttp();
  }

  /**
   * Get the options from local storage.
   */
  getOptionsViaStorage() {
    return new Promise((resolve, reject) => {
      this.dataService.getItemViaStorage(this.optionsName).then((result:any) => {
        if (result) {
          this.listLanguage = result;
          resolve();
        }
      }).catch(() => {
        this.listLanguage = 'en';
        resolve();
      });
    })
  }

  /**
   * Get the list from local storage or if it doesn't exist, from the http service.
   */
  getListViaStorage() {
    this.dataService.getItemViaStorage(this.listLanguage+'-'+this.listName).then((result:any) => {
      if (result) {
        this.list = result;
      }
    }).catch(() => {
      this.getListViaHttp();
    }); 
  }

  /**
   * Get a list of items from the server using the language settings.
   */
  getListViaHttp() {
    this.list = [];
      this.backendApiService.getList(this.listLanguage).subscribe(
        data => {
          this.list = data['list'];
          // remove items that do not have a page in the requested language
          this.list.slice().reverse().forEach((item, index, object) => {
            if (!this.languagePageDoesNotExist(item, index)) {
              this.list.splice(object.length - 1 - index, 1);
            } else {
              item.sortName = item.cognitive_biasLabel;
            }
          });
          this.getWikiSections();
      },
      error => {
        console.error('error'+error);
      }
    );
  }

  /**
   * If a page only has a Q-code, it does not have data for that item in the language requested.
   * Example:
   * "cognitive_biasLabel" : {
   *     "type" : "literal",
   *     "value" : "Q177603"
   * }
   * @param item WikiData item to check if a language page exists
   */
  languagePageDoesNotExist(item, index) {
    let label = item.cognitive_biasLabel;
    let first = label.substr(0,1);
    let second = label.substr(1,2);
    if (first === 'Q' && !isNaN(second) || typeof label === 'undefined') {
        // no page exists
        return false;
    } else {
      // page exists
      return true;
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
  getWikiSections() {
    this.backendApiService.loadWikiMedia(1,this.listLanguage).subscribe(
      data => {
        const section = this.parseSectionList(data);
          if (section) {
          this.addItems(section);
          this.backendApiService.loadWikiMedia(2,this.listLanguage).subscribe(
            data => {
              const section = this.parseSectionList(data);
              this.addItems(section);
              this.backendApiService.loadWikiMedia(3,this.listLanguage).subscribe(
                data => {
                  const section = this.parseSectionList(data);
                  this.addItems(section);
                  // finally sort the list and store it
                  this.list.sort(this.dynamicSort('sortName'));
                  this.dataService.setItem(this.listLanguage+'-'+this.listName,this.list);
            },
              error => {
                console.error('error in 3',error);
            });
        },
          error => {
            console.error('error in 2',error);
        });
      }
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
      let itemName = section[i].name;
      let backupTitle;
      if (typeof section[i]['backupTitle'] !== 'undefined') {
        backupTitle = section[i]['backupTitle'];
        console.log(itemName+' -> '+backupTitle);
      }
      if (itemName === 'Actor-observer bias') {
        console.log('item',section[i]);
      }
      let found = false;
      for(var j = 0; j < this.list.length; j++) {
        if ((typeof this.list[j].cognitive_biasLabel !== 'undefined' && typeof itemName !== 'undefined') && this.list[j].cognitive_biasLabel.toLocaleUpperCase() === itemName.toLocaleUpperCase()) {
          found = true;
          this.list[j].wikiMedia_label = itemName;
          this.list[j].wikiMedia_description = this.removeFootnotes(section[i].desc);
          if (typeof section[i].desc === 'undefined' || section[i].desc === ''  || section[i].desc === null) {
            console.log('found itemName:'+itemName+' '+section[i].desc);
          }
          this.list[j].wikiMedia_category = section[i].category;
          this.list[j].sortName = itemName.charAt(0).toUpperCase() + itemName.substr(1);
          if (backupTitle) {
           this.list[j].backupTitle = backupTitle;
          }
          this.repeats++;
          break;
        }
      }
      if (!found) {
        let wikiMediaObj = new DetailModel();
        wikiMediaObj.wikiMedia_label = itemName;
        wikiMediaObj.wikiMedia_description = this.removeFootnotes(section[i].desc);
        if (typeof section[i].desc === 'undefined' || section[i].desc === '  '  || section[i].desc === '   '  || section[i].desc === null) {
          console.log('found itemName:'+itemName+' '+section[i].desc);
        }
        wikiMediaObj.wikiMedia_category = section[i].category;
        wikiMediaObj.sortName = itemName.split('"').join('');
        wikiMediaObj.sortName.charAt(0).toUpperCase() + wikiMediaObj.sortName.substr(1);
        if (backupTitle) {
          wikiMediaObj.backupTitle = backupTitle;
        }
        this.list.push(wikiMediaObj);
        this.media++;
      }
    }
  }

  /**
   * @param description 
   * @returns the description without any [1] footnote markers.
   */
  removeFootnotes(description: string) {
    if (description) {
      const indexOfBracket = description.indexOf('[');
      if (indexOfBracket !== -1) {
        return description.substring(0, indexOfBracket);
      } else {
        return description;
      }
    }
  }

  /**
   * Usually the name of item can be gotten from the inner text of an <a> tag inside the table cell.
   * A few however, like 'frequency illusion' are not links, so are just the contents of the <td> tag.
   * Some, such as 'regression bias' have a <span> inside the tag.
   * The category descriptions can be had like this:
   * if (typeof desc[1].getElementsByTagName('a')[0] !== 'undefined') {
   *    console.log('desc1',desc[1].getElementsByTagName('a')[0].innerText);
   * } 
   * @param data result of a WikiMedia section API call
   * @returns Array of name/desc objects
   */
  parseSectionList(data: any) {
    if (data['parse']) {
      const content = data['parse']['text']['*'];
      console.log('content',content);
      let one = this.createElementFromHTML(content);
      const desc:any = one.getElementsByClassName('mw-parser-output')[0].children;
      let descriptions: any [] = [];
      let category = desc[0].getElementsByClassName('mw-headline')[0].innerText;
      const allDesc = desc[2];
      const tableRows = allDesc.getElementsByTagName('tr');
      for (let i = 0; i < tableRows.length;i++) {
        let tableDiv = tableRows[i].getElementsByTagName('td');
        if (typeof tableDiv[0] !== 'undefined') {
          let itemDesc;
          if (typeof tableDiv[1] !== 'undefined') {
            itemDesc = tableDiv[1].innerText;
          }
          let itemName = this.findItemName(tableDiv[0]);
          let backupTitle = this.getAnchorTitleForBackupTitle(tableDiv[0],itemName);
          let backupLink = this.getAnchorTitleForBackupLink(tableDiv[0],itemName);
          let newItem = this.createNewItem(itemName, itemDesc, category, backupTitle)
          descriptions.push(newItem);
          this.elemList.push(tableDiv); // for the list of elements
        }
      }
      return descriptions;
    }
  }

  /**
   * The name to use can be in a few places on the table div element.
   * Usually the name of item can be got this way:
   * itemName = tableDiv[0].getElementsByTagName('a')[0].innerText;
   * A few however, like 'frequency illusion' are not links, 
   * so are just the contents of the <td> tag.
   * Some, such as 'regression bias' have a <span> inside the tag.
   */
  findItemName(tableDiv0: any): string {
    let itemName;
    if (typeof tableDiv0.getElementsByTagName('a')[0] !== 'undefined') {
      itemName = tableDiv0.getElementsByTagName('a')[0].innerText;
    } else if (typeof tableDiv0.getElementsByTagName('span')[0] !== 'undefined') {
      itemName = tableDiv0.getElementsByTagName('span')[0].innerText;
    } else if (typeof tableDiv0.innerText !== 'undefined') {
      itemName = tableDiv0.innerText;
    } else {
      console.log('failed to get a name for div: ',tableDiv0);
    }
    return itemName;
  }

  createNewItem(itemName, itemDesc, category, backupTitle) {
    let newItem = {
      'name': itemName,
      'desc': itemDesc,
      'category': category
    }
    if (backupTitle) {
      newItem['backupTitle'] = backupTitle;
    }
    return newItem;
  }

  /**
   * Parse the anchor tag for the title of the item used in the tag,
   * which can be different from the name of the item.
   * @param tableDiv the DOM element
   * @param itemName the item name
   */
  getAnchorTitleForBackupTitle(tableDiv: any, itemName: string) {
    if (typeof tableDiv.getElementsByTagName('a')[0] !== 'undefined') {
      let titleProp = tableDiv.getElementsByTagName('a')[0].title;
      let backupLink;
      let backupTitle;
      let href:string = tableDiv.getElementsByTagName('a')[0].href;
      if (href) {
        let slash = href.lastIndexOf('/');
        backupLink = href.substr(slash+1,href.length);
      }
      if (href.indexOf('index.php') !== -1) {
        backupTitle = -1; // we have a missing detail page
      }
      if (itemName !== titleProp && backupTitle !== -1) {
        backupTitle = titleProp;
      }
      if ((backupTitle !== null) 
        && (typeof backupTitle !== 'undefined')
        && (backupTitle !== -1) 
        && (backupTitle.indexOf('(psychology)') !== -1)) {
        backupTitle = backupTitle.substr(0,backupTitle.indexOf('('));
        //compare the names again without the
        if (backupTitle !== itemName) {
          backupTitle = null;
        }
      }
      return backupTitle;
    } else {
      if (typeof tableDiv.getElementsByTagName('td')[0] !== 'undefined') {
        return tableDiv.getElementsByTagName('td')[0].innerText();
      }
    }
  }

  /**
   * Parse the anchor tag for the link section of the item title similar to the
   * getAnchorTitleForBackupTitle() function.  The element can look like this:
   * <tr>
   *  <td>
   *      <a href=\"/wiki/Zero-sum_thinking\" 
   *          title=\"Zero-sum thinking\">Zero-sum bias</a>
   *  </td>
   * </tr>
   * Even though the title is a bias, the link and page redirects to thinking.
   * This will be used if the item name used as a link and lower-cased returns
   * a 500 error from the server.
   * @param tableDiv the DOM element
   * @param itemName the item name
   * @returns backup link which can be used in case of a redirect
   */
  getAnchorTitleForBackupLink(tableDiv: any, itemName: string) {
    let backupLink;
    if (tableDiv.getElementsByTagName('a')[0]) {
      let titleProp = tableDiv.getElementsByTagName('a')[0].title;
      let href = tableDiv.getElementsByTagName('a')[0].href;
      if (href) {
        let slash = href.lastIndexOf('/');
        backupLink = href.substr(slash+1,href.length);
      }
      if (href.indexOf('index.php') !== -1) {
        backupLink = null; // we have a missing detail page
      }
      // this will tell us if the name and the title are different
      // if they are then we want to add a backupTitle.
      // if they aren't then we will return null
      if (itemName !== titleProp && backupLink) {
        //console.log('backupLink',backupLink);
        return backupLink;
      } else  {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Set the lang, delete the list and call on init again.
   * This will have to change for local storage.
   * @param value event from the lang select
   */
  onLanguageChange(value) {
    this.listLanguage = value;
    this.list = null;
    this.dataService.setItem(this.optionsName,this.listLanguage);
    this.ngOnInit();
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

  /**
   * Go to the detail page.  If an item has a backup title, add that to the route.
   * @param item Set state as viewed, get language setting, create list name, and/or title
   * And pass on to the detail page.
   * @param i item index
   */
  navigateAction(item: string, i: number) {
    this.list[i].detailState = 'viewed';
    this.dataService.setItem(this.listLanguage+'-'+this.listName, this.list);
    let itemRoute = item.replace(/\s+/g, '_').toLowerCase();
    if (typeof this.list[i]['backupTitle'] !== 'undefined') {
      let backupTitle = this.list[i]['backupTitle'];
      this.router.navigate(['detail/'+itemRoute+'/'+this.listLanguage+'/'+backupTitle]);
    } else {
      this.router.navigate(['detail/'+itemRoute+'/'+this.listLanguage]);    
    }
  }
  
}
