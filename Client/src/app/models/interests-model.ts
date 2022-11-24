export interface INTERESTS {

    interest_id: number;
    name: string;
    img_src: string;
    participants: string;

}

export interface INTERESTED_IN {

    user_id: number;
    interest_id: number;
    interest_date: Date;

}