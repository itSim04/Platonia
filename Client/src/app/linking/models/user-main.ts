import { Genders } from "src/app/helper/constants/general";

export class User {


    private _user_id: number;
    private _username: string;
    private _is_verified: boolean;
    private _bio: string;
    private _email: string;
    private _birthday: Date;
    private _join: Date;
    private _gender: number;
    private _picture: string;
    private _banner: string;
    private _followers: number;
    private _followings: number;

    constructor(user_id: number, username: string, is_verified: boolean, bio: string, email: string, birthday: Date, join: Date, gender: number, picture: string, banner: string, followers: number, followings: number) {

        this._user_id = user_id;
        this._username = username;
        this._is_verified = is_verified;
        this._bio = bio;
        this._email = email;
        this._birthday = birthday;
        this._join = join;
        this._gender = gender;
        this._picture = picture;
        this._banner = banner;
        this._followers = followers;
        this._followings = followings;

    }

    public get user_id(): number {
        return this._user_id;
    }

    public set user_id(userid: number) {
        this._user_id = userid;
    }

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }

    public get is_verified(): boolean {
        return this._is_verified;
    }

    public set is_verified(isverified: boolean) {
        this._is_verified = isverified;
    }

    public get bio(): string {
        return this._bio;
    }

    public set bio(bio: string) {
        this._bio = bio;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get birthday(): Date {
        return this._birthday;
    }

    public set birthday(birthday: Date) {
        this._birthday = birthday;
    }

    public get join(): Date {
        return this._join;
    }

    public set join(join: Date) {
        this._join = join;
    }

    public get gender(): number {
        return this._gender;
    }

    public set gender(gender: number) {
        this._gender = gender;
    }

    public get picture(): string {
        return this._picture;
    }

    public set picture(picture: string) {
        this._picture = picture;
    }

    public get banner(): string {
        return this._banner;
    }

    public set banner(banner: string) {
        this._banner = banner;
    }

    public get followers(): number {
        return this._followers;
    }

    public set followers(followers: number) {
        this._followers = followers;
    }

    public get followings(): number {
        return this._followings;
    }

    public set followings(followings: number) {
        this._followings = followings;
    }

    static numericalGender(value: string): number {

        switch (value) {

            case Genders[0]:

                return 0;

            case Genders[1]:

                return 1;

            case Genders[2]:

                return 2;

            case Genders[3]:

                return 3;

            default:

                throw new Error("Illegal argument");

        }
    }


}