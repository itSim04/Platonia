import { User } from './user-main';
export class Message {

    // Holds a message

    private _date: Date; // The date of the message 
    private _owner_id: number; // The owner id
    private _content: string; // The content of the message

    constructor(date: Date, owner_id: number, content: string) {

        this._date = date;
        this._owner_id = owner_id;
        this._content = content;

    }

    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }
    public get owner_id(): number {
        return this._owner_id;
    }
    public set owner_id(value: number) {
        this._owner_id = value;
    }
    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }

}

export class Chat {

    // Holds a chat

    private _user_1: User; // The first user (typically the logged in user)
    private _user_2: User; // The second user
    private _start: Date; // The start date of the conversation
    private _last_message: Message; // The last message in the chat
    private _messages: Array<Message>; // The messages held by this chat

    constructor(user_1: User, user_2: User, start: Date, last_message: Message, messages: Array<Message>) {

        this._user_1 = user_1;
        this._user_2 = user_2;
        this._start = start
        this._last_message = last_message;
        this._messages = messages;

    }
    public get user1(): User {
        return this._user_1;
    }
    public set user1(value: User) {
        this._user_1 = value;
    }
    public get user2(): User {
        return this._user_2;
    }
    public set user2(value: User) {
        this._user_2 = value;
    }
    public get start(): Date {
        return this._start;
    }
    public set start(value: Date) {
        this._start = value;
    }
    public get last_message(): Message {
        return this._last_message;
    }
    public set last_message(value: Message) {
        this._last_message = value;
    }
    public get messages(): Array<Message> {
        return this._messages;
    }
    public set messages(value: Array<Message>) {
        this._messages = value;
    }




}