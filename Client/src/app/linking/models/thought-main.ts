export abstract class Thought {

    private _thought_id: number;
    private _share_date: Date;
    private _edit_date: Date;
    private _owner_id: number;
    private _type: number;

    private _likes: number;
    private _platons: number;
    private _opinions: number;

    private _root_id: number;
    private _is_liked: boolean;
    private _is_platoned: boolean;

    constructor(thought_id: number = -1, share_date: Date = new Date(), edit_date: Date = new Date(), owner_id: number = -1, type: number = -1, likes: number = -1, platons: number = -1, opinions: number = -1, root_id: number = -1, is_liked: boolean = false, is_platoned: boolean = false) {

        this._thought_id = thought_id;
        this._share_date = share_date;
        this._edit_date = edit_date;
        this._owner_id = owner_id;
        this._type = type;
        this._root_id = root_id;

        this._likes = likes;
        this._platons = platons;
        this._opinions = opinions;

        this._is_liked = is_liked;
        this._is_platoned = is_platoned;

    }

    public get thought_id(): number {
        return this._thought_id;
    }

    public set thought_id(thought_id: number) {
        this._thought_id = thought_id;
    }

    public get share_date(): Date {
        return this._share_date;
    }

    public set share_date(share_date: Date) {
        this._share_date = share_date;
    }

    public get edit_date(): Date {
        return this._edit_date;
    }

    public set edit_date(edit_date: Date) {
        this._edit_date = edit_date;
    }

    public get owner_id(): number {
        return this._owner_id;
    }

    public set owner_id(owner_id: number) {
        this._owner_id = owner_id;
    }

    public get type(): number {
        return this._type;
    }

    public set type(type: number) {
        this._type = type;
    }

    public get likes(): number {
        return this._likes;
    }

    public set likes(likes: number) {
        this._likes = likes;
    }

    public get platons(): number {
        return this._platons;
    }

    public set platons(platons: number) {
        this._platons = platons;
    }

    public get opinions(): number {
        return this._opinions;
    }

    public set opinions(opinions: number) {
        this._opinions = opinions;
    }

    public get root_id(): number {
        return this._root_id;
    }

    public set root_id(root_id: number) {
        this._root_id = root_id;
    }

    public get is_liked(): boolean {
        return this._is_liked;
    }

    public set is_liked(is_liked: boolean) {
        this._is_liked = is_liked;
    }

    public get is_platoned(): boolean {
        return this._is_platoned;
    }

    public set is_platoned(is_platoned: boolean) {
        this._is_platoned = is_platoned;
    }

}

export class TextThought extends Thought {

    private _content: string;

    // constructor(content: string, thought_id: number, share_date: Date, edit_date: Date, owner_id: number, type: number, likes: number, platons: number, opinions: number, root_id: number, is_liked: boolean, is_platoned: boolean) {

    //     super(thought_id, share_date, edit_date, owner_id, type, likes, platons, opinions, root_id, is_liked, is_platoned);
    //     this._content = content;

    // }

    constructor(content: string) {

        super();
        this._content = content;

    }

    public get content(): string {
        return this._content;
    }

    public set content(content: string) {
        this._content = content;
    }

}

export class ImageThought extends Thought {

    private _img: string;

    // constructor(thought_id: number, share_date: Date, edit_date: Date, owner_id: number, type: number, likes: number, platons: number, opinions: number, root_id: number, is_liked: boolean, is_platoned: boolean, img: string) {

    //     super(thought_id, share_date, edit_date, owner_id, type, likes, platons, opinions, root_id, is_liked, is_platoned);
    //     this._img = img;

    // }

    constructor(img: string) {

        super();
        this._img = img;

    }

    public get img(): string {
        return this._img;
    }

    public set img(content: string) {
        this._img = content;
    }

}

export class VideoThought extends Thought {

    private _vid: string;

    // constructor(thought_id: number, share_date: Date, edit_date: Date, owner_id: number, type: number, likes: number, platons: number, opinions: number, root_id: number, is_liked: boolean, is_platoned: boolean, vid: string) {

    //     super(thought_id, share_date, edit_date, owner_id, type, likes, platons, opinions, root_id, is_liked, is_platoned);
    //     this._vid = vid;

    // }

    constructor(vid: string) {

        super();
        this._vid = vid;

    }

    public get vid(): string {
        return this._vid;
    }

    public set vid(content: string) {
        this._vid = content;
    }

}

export class PollThought extends Thought {

    private _prompt: string;

    private _option_chosen: number;

    private _poll1: string;
    private _poll2: string;
    private _poll3: string;
    private _poll4: string;

    private _votes1: number;
    private _votes2: number;
    private _votes3: number;
    private _votes4: number;

    // constructor(thought_id: number, share_date: Date, edit_date: Date, owner_id: number, type: number, likes: number, platons: number, opinions: number, root_id: number, is_liked: boolean, is_platoned: boolean, prompt: string, option_chosen: number, poll1: string, poll2: string, poll3: string, poll4: string, votes1: number, votes2: number, votes3: number, votes4: number, votes: number) {

    //     super(thought_id, share_date, edit_date, owner_id, type, likes, platons, opinions, root_id, is_liked, is_platoned);
    //     this._prompt = prompt;
    //     this._option_chosen = option_chosen;
    //     this._poll1 = poll1;
    //     this._poll2 = poll2;
    //     this._poll3 = poll3;
    //     this._poll4 = poll4;
    //     this._votes1 = votes1;
    //     this._votes2 = votes2;
    //     this._votes3 = votes3;
    //     this._votes4 = votes4;
    //     this._votes = votes;
    // }
    
    constructor(prompt: string, option_chosen: number, poll1: string, poll2: string, poll3: string, poll4: string, votes1: number, votes2: number, votes3: number, votes4: number) {

        super();
        this._prompt = prompt;
        this._option_chosen = option_chosen;
        this._poll1 = poll1;
        this._poll2 = poll2;
        this._poll3 = poll3;
        this._poll4 = poll4;
        this._votes1 = votes1;
        this._votes2 = votes2;
        this._votes3 = votes3;
        this._votes4 = votes4;
    }


    public get prompt(): string {
        return this._prompt;
    }

    public set prompt(prompt: string) {
        this._prompt = prompt;
    }

    public get option_chosen(): number {
        return this._option_chosen;
    }

    public set option_chosen(option_chosen: number) {
        this._option_chosen = option_chosen;
    }

    public get poll1(): string {
        return this._poll1;
    }

    public set poll1(poll1: string) {
        this._poll1 = poll1;
    }

    public get poll2(): string {
        return this._poll2;
    }

    public set poll2(poll2: string) {
        this._poll2 = poll2;
    }

    public get poll3(): string {
        return this._poll3;
    }

    public set poll3(poll3: string) {
        this._poll3 = poll3;
    }

    public get poll4(): string {
        return this._poll4;
    }

    public set poll4(poll4: string) {
        this._poll4 = poll4;
    }

    public get votes1(): number {
        return this._votes1;
    }

    public set votes1(votes1: number) {
        this._votes1 = votes1;
    }

    public get votes2(): number {
        return this._votes2;
    }

    public set votes2(votes2: number) {
        this._votes2 = votes2;
    }

    public get votes3(): number {
        return this._votes3;
    }

    public set votes3(votes3: number) {
        this._votes3 = votes3;
    }

    public get votes4(): number {
        return this._votes4;
    }

    public set votes4(votes4: number) {
        this._votes4 = votes4;
    }

    public get totalVotes() {
        return this._votes1 + this._votes2 + this._votes3 + this._votes4;
    }


}

