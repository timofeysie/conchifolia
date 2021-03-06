import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListModel } from '../models/list.model';
import { DetailModel } from '../models/detail.model';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private backendListUrl = '/api/list';
  private backendWikiListUrl = '/api/wiki-list';
  private backendDetailUrl = '/api/detail';
  private backendDataUrl = '/api/data';
  private backendDataQuery = '/api/data/query';
  private listData;

  constructor (private  httpClient:  HttpClient) {}

  // /api/data/uri(with *s instead of /s)
  getData(label: string, lang: string) {
    const newLines = /\r?\n|\r/g
    const newLabel = label.replace(newLines,'');
    console.log('label',this.backendDataQuery+'/'+newLabel+'/'+lang);
    return this.httpClient.get(encodeURI(this.backendDataQuery+'/'+newLabel+'/'+lang))
    .pipe((data) => {
      return data;
    });
  }

  // /api/contacts
  getList(lang) {
      return this.httpClient.get<ListModel>(this.backendListUrl+'/'+lang)
      .pipe(data => this.listData = data);
  }

  // /api/detail/id/lang/leaveCaseAlone
  getDetail(detailId: string, lang: string, leaveCaseAlone: boolean) {
    return this.httpClient.get<DetailModel>(encodeURI(this.backendDetailUrl+'/'+detailId+'/'+lang+'/'+leaveCaseAlone))
      .pipe(data => data);
  }

  loadWikiMedia(sectionNum, lang: string) {
    return this.httpClient.get(
      encodeURI(
        this.backendWikiListUrl + '/' + sectionNum + '/' + lang))
      .pipe(data => data)
  }

  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    let page = '<div>'+htmlString+'</div>';
    div.innerHTML = page.trim();
    return div; 
  }

}
