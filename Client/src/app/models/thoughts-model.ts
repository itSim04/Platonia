import * as internal from "stream";

export interface Thought {

    thought_id: number;
    share_date: Date;
    edit_date?: Date;
    content: string;
    type: number;
    owner_id: number;
    root_id: number;
    likes: number;
    platons: number;
    opinions: number;

    is_liked: boolean;
    is_platoned: boolean;
    option_chosen: number;
    

    poll1?: string;
    poll2?: string;
    poll3?: string;
    poll4?: string;

    votes1?: number;
    votes2?: number;
    votes3?: number;
    votes4?: number;

    votes?: number;

}

export interface THOUGHTS_RESPONSE {

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

