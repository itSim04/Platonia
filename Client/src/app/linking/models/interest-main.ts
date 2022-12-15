export class Interest {

    // Holds an interest

    private _interest_id: number; // id of the interest
    private _name: string; // Name of the interest
    private _logo: string; // Logo of the interest
    private _participants: number; // Number of participants
    private _is_followed: boolean; // Whether the logged in user is enrolled in this interest

    constructor(interest_id: number, name: string, logo: string, participants: number, is_followed: boolean) {
        this._interest_id = interest_id
        this._name = name
        this._logo = logo
        this._participants = participants
        this._is_followed = is_followed
    }

    public get interest_id(): number {
        return this._interest_id;
    }

    public set interest_id(interest_id: number) {
        this._interest_id = interest_id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }
    
    public get logo(): string {
        return this._logo;
    }

    public set logo(logo: string) {
        this._logo = logo;
    }

    public get participants(): number {
        return this._participants;
    }

    public set participants(participants: number) {
        this._participants = participants;
    }

    public get is_followed(): boolean {
        return this._is_followed;
    }

    public set is_followed(is_followed: boolean) {
        this._is_followed = is_followed;
    }

}