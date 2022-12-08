import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { User } from '../models/user-main';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    localforage.config({
      name: 'App Storage'
    });
  }

  public async getSessionUser(): Promise<User> {

    let user: User;
    await localforage.getItem("loggedInUser").then((r: any|undefined) => {

      user = new User(
        r?._user_id,
        r?._username,
        r?._is_verified,
        r?._bio,
        r?._email,
        r?._birthday,
        r?._join,
        r?._gender,
        r?._picture,
        r?._banner,
        r?._followers,
        r?._followings
      );

    });
    return user!;

  }

  // public get<T>(key: string): Promise<T> {
  //   return <Promise<T>>localforage.getItem(key);
  // }

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