export interface THOUGHT {

    thought_id: number;
    share_date: Date;
    edit_date?: Date;
    content: String;
    type: number;
    owner_id: number;
    root_id: number;
    likes: number;
    platons: number;
    opinions: number;

    poll1?: string;
    poll2?: string;
    poll3?: string;
    poll4?: string;

    votes1?: number;
    votes2?: number;
    votes3?: number;
    votes4?: number;

}

export interface THOUGHTS_RESPONSE {

    thought_id?: number;
    content?: string;

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

export interface ANSWERS {

    thought_id: number;
    user_id: number;
    answer_date: Date;
    option_chosen: number;

}

