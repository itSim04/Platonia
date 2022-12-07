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

