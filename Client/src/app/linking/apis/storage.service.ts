import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { setFlagsFromString } from 'v8';
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
    await localforage.getItem("loggedInUser").then((r: any | undefined) => {

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

  public setRefreshFlag(flag: boolean) {

    return localforage.setItem("refreshFlag", flag);

  }

  public async getRefreshFlag(): Promise<boolean> {

    let flag: boolean = false;
    await localforage.getItem<boolean>("refreshFlag").then(r => {

      if (r != undefined) {

        flag = r;

      }
      this.setRefreshFlag(false);

    });
    return flag;

  }

  public async isAuthenticated(): Promise<boolean> {

    return await localforage.getItem("loggedInUser").then((r: any | undefined) => {

      if (r) {
        return true;
      } else {
        return false;
      }

    });

  }

}