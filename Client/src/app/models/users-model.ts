export interface User {

    user_id: number;
    username: string;
    bio: string;
    email: string;
    birthday: Date;
    join: Date;
    gender: number;
    picture?: string;
    followers: number;
    followings: number;

}

export interface USER_RESPONSE {

    user_id?: number;
    username?: string;
    email?: string;
    password?: string;
    bio?: string;
    birthday?: Date;
    gender?: number;

}

export interface FOLLOWS {

    user_id1: number;
    user_id2: number;
    follow_date: Date;

}