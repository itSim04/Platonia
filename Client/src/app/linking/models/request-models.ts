import { Interest } from "./interest-main";
import { Thought } from "./thought-main";
import { User } from "./user-main";

export interface InterestRequest {

    // Request for an Interest api
    user_id?: number;
    interest_id?: number;
    img_src?: string;
    name?: string;
    logo?: string;

}

export interface UserRequest {

    // Request for a User api
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

export interface ThoughtRequest {

    // Request for a thought API
    user_id?: number;
    thought_id?: number;
    content?: string;
    type?: number;
    owner_id?: number;
    owner_ids?: number[];
    root_id?: number;

    is_opinion?: boolean;
    media?: string;

    poll1?: string;
    poll2?: string;
    poll3?: string;
    poll4?: string;

    offset?: number;
    quantity?: number;

}

export interface Option {

    thought_id: number;
    position: number;
    content: string;
    votes: number;

}

export interface ResponseReceipt {

    // Received from every API
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