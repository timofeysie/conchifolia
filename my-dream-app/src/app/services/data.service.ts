import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable()
export class DataService {
    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

    setItem(itemName: string, item:any) {
      return this.storage.set(itemName, item);
    }
  
    getItemViaStorage(itemName: string) {
      return new Promise((resolve, reject) => {
        if (this.storage.get(itemName)) {
            resolve((this.storage.get(itemName)));
        } else {
            reject();
        }
      });
    }
}