import { Injectable } from '@angular/core';
import {StorageMap} from "@ngx-pwa/local-storage";
import {StorageConfig} from "@ngx-pwa/local-storage";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: StorageMap) { }

  set(key: string, value: any): Observable<undefined> {
    return this.storage.set(key, value);
  }

  get(key: string): Observable<any> {
    return this.storage.get(key);
  }


  delete(key: string): Observable<undefined> {
    return this.storage.delete(key);
  }

}
