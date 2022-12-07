export class Thought {

    private thought_id: number;
    private share_date: Date;
    private edit_date?: Date;
    private content: string;
    private type: number;
    private owner_id: number;
    private root_id: number;
    private likes: number;
    private platons: number;
    private opinions: number;

    private is_liked: boolean;
    private is_platoned: boolean;
    private option_chosen: number;

    private poll1?: string;
    private poll2?: string;
    private poll3?: string;
    private poll4?: string;

    private votes1?: number;
    private votes2?: number;
    private votes3?: number;
    private votes4?: number;

    private votes?: number;

}