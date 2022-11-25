export interface Interest {

    interest_id: number;
    interest_date: Date;
    name: string;
    img_src: string;
    participants: string;

}

export interface INTEREST_RESPONSE {

    user_id?: number;
    interest_id?: number;
    img_src?: string;
    name?: string;

}