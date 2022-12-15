import { PlatonService } from './../apis/platon.service';
import { Observable, Subscription } from 'rxjs';
import { ExitCodes } from "src/app/helper/constants/db_schemas";
import { AnswerService } from "../apis/answer.service";
import { LikeService } from "../apis/like.service";
import { StorageService } from "../apis/storage.service";
import { ThoughtService } from "../apis/thought.service";
import { ResponseReceipt } from './request-models';

export abstract class Thought {

    // Holds a thought
    protected _thought_id: number; // The id of the thought
    protected _share_date: Date; // The date the thought was shared
    protected _edit_date: Date; // The date the thought was edited (WIP)
    protected _owner_id: number; // The id of the owner
    protected _type: number; // The type of the thought (0: Text | 1: Image | 2: Video (WIP) | 3: Poll | 4: Platoned)

    protected _likes: number; // Likes on this thought
    protected _platons: number; // Platons on this thought
    protected _opinions: number; // Opinions on this thought

    protected _root_id: number; // The id of the root (if applicable)
    protected _is_liked: boolean; // Whether the logged in user liked this thought
    protected _is_platoned: boolean; // Whether the logged in user platoned this thought
    protected _is_opinion: boolean;// Whether this thought is an opinion

    constructor (thought_id: number = -1, share_date: Date = new Date(), edit_date: Date = new Date(), owner_id: number = -1, type: number = -1, likes: number = -1, platons: number = -1, opinions: number = -1, root_id: number = -1, is_liked: boolean = false, is_platoned: boolean = false, is_opinion = false) {

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
        this._is_opinion = is_opinion;

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

    public get is_opinion(): boolean {
        return this._is_opinion;
    }

    public set is_opinion(is_opinion: boolean) {
        this._is_opinion = is_opinion;
    }

    // Toggles a like on this thought
    public toggleLike(likeService: LikeService, storageService: StorageService) {

        storageService.getSessionUser().then(session_user => {

            if (this.is_liked) {

                this.is_liked = false;
                this.likes--;
                likeService.unlike(session_user.user_id, this.thought_id).subscribe(r => {

                    if (r.status != ExitCodes.LIKE_REMOVE) {
                        this.is_liked = true;
                        this.likes++;
                    }

                });


            } else {

                this.is_liked = true;
                this.likes++;
                likeService.like(session_user.user_id, this.thought_id).subscribe(r => {

                    if (r.status != ExitCodes.LIKE_ADD) {
                        this.is_liked = false;
                        this.likes--;
                    }

                })
            }
        });
    }

    // Toggles a platon on this thought
    public togglePlaton(platonService: PlatonService, user_id: number): Observable<ResponseReceipt> {

        if (this.is_platoned) {

            this.is_platoned = false;
            this.platons--;
            return platonService.unplaton(user_id, this.thought_id);


        } else {

            this.is_platoned = true;
            this.platons++;
            return platonService.platon(user_id, this.thought_id);

        }
    }

    // Posts a comment on this thought
    public postComment(content: string, user_id: number, thoughtService: ThoughtService): Observable<ResponseReceipt> {

        this.opinions++;
        return thoughtService.addThought({ content: content, owner_id: user_id, root_id: this.thought_id, type: 0, is_opinion: true });

    }

    // Deletes a comment on this thought
    public deleteComment(thought_id: number, thoughtService: ThoughtService): Observable<ResponseReceipt> {

        this.opinions--;
        return thoughtService.delete({ thought_id: thought_id });

    }

}

export class TextThought extends Thought {

    // Text thoughts
    private _content: string; // The text

    constructor (content: string) {

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

    // Image thought
    private _img: string; // The image source

    constructor (img: string) {

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

    // Video thoughts (WIP)
    private _vid: string; // The video source

    constructor (vid: string) {

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

    // Poll Thoughts
    private _prompt: string; // The prompt

    private _option_chosen: number; // The answered option

    private _poll1: string; // The first poll
    private _poll2: string; // The second poll
    private _poll3: string; // The third poll
    private _poll4: string; // The fourth poll

    private _votes1: number; // The votes on the first poll
    private _votes2: number; // The votes on the second poll
    private _votes3: number; // The votes on the third poll
    private _votes4: number; // The votes on the fourth poll

    constructor (prompt: string, option_chosen: number, poll1: string, poll2: string, poll3: string, poll4: string, votes1: number, votes2: number, votes3: number, votes4: number) {

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

    public get votes1_percentage(): number {
        return Math.round(this.votes1 * 100 / (this.totalVotes == 0 ? 1 : this.totalVotes));
    }

    public set votes1(votes1: number) {
        this._votes1 = votes1;
    }

    public get votes2(): number {
        return this._votes2;
    }

    public get votes2_percentage(): number {
        return Math.round(this.votes2 * 100 / (this.totalVotes == 0 ? 1 : this.totalVotes));
    }

    public set votes2(votes2: number) {
        this._votes2 = votes2;
    }

    public get votes3(): number {
        return this._votes3;
    }

    public get votes3_percentage(): number {
        return Math.round(this.votes3 * 100 / (this.totalVotes == 0 ? 1 : this.totalVotes));
    }

    public set votes3(votes3: number) {
        this._votes3 = votes3;
    }

    public get votes4(): number {
        return this._votes4;
    }

    public get votes4_percentage(): number {
        return Math.round(this.votes4 * 100 / (this.totalVotes == 0 ? 1 : this.totalVotes));
    }

    public set votes4(votes4: number) {
        this._votes4 = votes4;
    }

    public get totalVotes() {
        return this._votes1 + this._votes2 + this._votes3 + this._votes4;
    }

    // Answers a poll
    answerPoll(position: number, user_id: number, optionService: AnswerService) {

        if (this.incrementPoll(position)) {
            optionService.answer_poll(user_id, this.thought_id, position).subscribe(p => {

                if (p.status != ExitCodes.POLLS_ANSWER_POLL) {

                    this.option_chosen = 0;
                    this.decrementPoll(position);

                }
            });
        }

    }

    // Increments an option in the poll
    incrementPoll(position: number): boolean {

        if (this.option_chosen == 0) {

            this.option_chosen = position;

            switch (position) {

                case 1:

                    this.votes1++;
                    break;

                case 2:

                    this.votes2++;
                    break;

                case 3:

                    this.votes3++;
                    break;

                case 4:

                    this.votes4++;
                    break;

            }
            return true;

        } else {

            return false;

        }

    }

    // Gets highest vote count
    getMax(): number {

        return Math.max(this.votes1, this.votes2, this.votes3, this.votes4);

    }

    // Gets highest voted poll
    getMaxPosition(): number {

        if (this.votes1! == this.getMax()) {

            return 1;

        }

        if (this.votes2! == this.getMax()) {

            return 2;

        }

        if (this.votes3! == this.getMax()) {

            return 3;

        }

        if (this.votes4! == this.getMax()) {

            return 4;

        }

        return 0;

    }

    // Checks whether the poll is single voted
    isSingleValued(): boolean {

        return this.totalVotes == this.votes1 || this.totalVotes == this.votes2 || this.totalVotes == this.votes3 || this.totalVotes == this.votes4;

    }

    // Decrements the poll
    decrementPoll(position: number) {

        this.option_chosen = position;

        switch (position) {

            case 1:

                this.votes1--;
                break;

            case 2:

                this.votes2--;
                break;

            case 3:

                this.votes3--;
                break;

            case 4:

                this.votes4--;
                break;

        }


    }

    // Changes a poll
    updatePollSubject(position: number, e: string) {

        switch (position) {

            case 1:

                this.poll1 = e;

                break;

            case 2:

                this.poll2 = e;

                break;

            case 3:

                this.poll3 = e;

                break;

            case 4:

                this.poll4 = e;

                break;


        }


    }

}

export class PlatonedThought extends Thought {

    // Platoned thoughts
    private _root: Thought; // The original thought

    constructor (root: Thought) {

        super();
        this._root = root;

    }

    public get root(): Thought {
        return this._root;
    }

    public set root(content: Thought) {
        this._root = content;
    }

}

