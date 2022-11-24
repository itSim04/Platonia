export interface USER {

    user_id: number;
    username: string;
    bio: string;
    email: string;
    birthday: Date;
    join: Date;
    gender: number;
    picture?: string;
    banner?: string
    followers: number;
    followings: number;

}

export interface USER_AUTHENTICATION_RESPONSE {

    user_id: number;
    username: string;
    password: string;

}