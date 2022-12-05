import { Injectable } from '@angular/core';
import * as localforage from 'localforage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    localforage.config({
      name: 'App Storage'
    });
  }

  public get<T>(key: string): Promise<T> {
    return <Promise<T>>localforage.getItem(key);
  }

  public set(key: string, value: any) {
    return localforage.setItem(key, value);
  }

  public remove(key: string) {
    return localforage.removeItem(key);
  }

  public clear() {
    return localforage.clear();
  }

  public listKeys() {
    return localforage.keys();
  }

}