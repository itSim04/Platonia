import { Interest } from "./interest-main";
import { Thought } from "./thought-main";
import { User } from "./user-main";

export interface InterestRequest {

    user_id?: number;
    interest_id?: number;
    img_src?: string;
    name?: string;
    logo?: string;

}

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


export interface Follow {

    user_id1: number;
    user_id2: number;
    follow_date: Date;

}

export interface ThoughtRequest {

    user_id?: number;
    thought_id?: number;
    content?: string;
    type?: number;
    owner_id?: number;
    owner_ids?: number[];
    root_id?: number;

    poll1?: string;
    poll2?: string;
    poll3?: string;
    poll4?: string;

    offset?: number;
    quantity?: number;

}

export interface LIKES {

    thought_id: number;
    user_id: number;
    like_date: Date;

}

export interface PLATON {

    thought_id: number;
    user_id: number;
    platon_date: Date;

}

export interface Answers {

    thought_id: number;
    user_id: number;
    answer_date: Date;
    option_chosen: number;

}

export interface Option {

    thought_id: number;
    position: number;
    content: string;
    votes: number;

}

export interface ResponseReceipt {

    status: number;
    error_message?: string;
    username_taken: boolean;
    email_taken?: boolean;
    name_taken?: boolean;
    user?: User;
    users?: Map<number, User>;
    thought?: Thought;
    thoughts?: Map<number, Thought>;
    interest?: Interest;
    interests?: Map<number, Interest>;
    options?: Map<number, Option>;
    missing_params?: string;
    profile_id?: number;
    banner_id?: number;
    follows?: boolean;

}