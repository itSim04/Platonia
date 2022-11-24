export interface THOUGHTS {

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

    thought_id: number;
    root_id?: number;
    owner_id?: number;

}