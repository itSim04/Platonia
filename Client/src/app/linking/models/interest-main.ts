export class Interest {

    private _interest_id: number;
    private _name: string;
    private _img_src: string;
    private _logo: string;
    private _participants: number;
    private _is_followed: boolean;

    constructor(interest_id: number, name: string, img_src: string, logo: string, participants: number, is_followed: boolean) {
        this._interest_id = interest_id
        this._name = name
        this._img_src = img_src
        this._logo = logo
        this._participants = participants
        this._is_followed = is_followed
    }

    public get interestid(): number {
        return this._interest_id;
    }

    public set interestid(interestid: number) {
        this._interest_id = interestid;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get img_src(): string {
        return this._img_src;
    }

    public set img_src(imgsrc: string) {
        this._img_src = imgsrc;
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