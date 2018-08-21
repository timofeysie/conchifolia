import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListModel } from '../models/list.model';
import { DetailModel } from '../models/detail.model';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private backendListUrl = '/api/list';
  private backendWikiListUrl = '/api/wiki-list';
  private backendDetailUrl = '/api/detail';
  private listData;

  constructor (private  httpClient:  HttpClient) {}

  // get("/api/contacts")
  getList(lang) {
      return this.httpClient.get<ListModel>(this.backendListUrl+'/'+lang)
      .pipe(data => this.listData = data);
  }

  getDetail(detailId: string, lang: string){
    return this.httpClient.get<DetailModel>(this.backendDetailUrl + '/' + detailId + '/' + lang)
      .pipe(data => data);
  }

  loadWikiMedia(sectionNum, lang: string) {
    return this.httpClient.get(this.backendWikiListUrl + '/' + sectionNum + '/' + lang)
      .pipe(data => data)
  }

  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    let page = '<div>'+htmlString+'</div>';
    div.innerHTML = page.trim();
    return div; 
  }

}
