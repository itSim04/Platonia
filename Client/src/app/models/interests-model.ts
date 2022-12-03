export interface Interest {

    interest_id: number;
    name: string;
    img_src: string;
    logo: string;
    participants: number;
    is_followed: boolean;

}

export interface INTEREST_RESPONSE {

    user_id?: number;
    interest_id?: number;
    img_src?: string;
    name?: string;
    logo?: string;

}