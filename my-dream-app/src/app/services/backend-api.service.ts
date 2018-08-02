import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListModel } from '../models/list.model';
import { DetailModel } from '../models/detail.model';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private backendListUrl = '/api/list';
  private backendDetailUrl = '/api/detail';
  private listData;

  constructor (private  httpClient:  HttpClient) {}

  // get("/api/contacts")
  getList() {
    if (this.listData) {
      return this.listData;
    } else {
      return this.httpClient.get<ListModel>(this.backendListUrl)
      .pipe(data => this.listData = data);
    }
  }

  getDetail(detailId: String){
    return this.httpClient.get<DetailModel>(this.backendDetailUrl + '/' + detailId)
      .pipe(data => data);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }

}
