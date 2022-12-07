export interface UserRequest {

    user_id?: number;
    username?: string;
    is_verified?: boolean;
    email?: string;
    password?: string;
    bio?: string;
    birthday?: Date;
    gender?: number;
    picture?: string;
    banner?: string;


}


export interface FOLLOWS {

    user_id1: number;
    user_id2: number;
    follow_date: Date;

}