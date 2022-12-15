import { BuildAPIs } from 'src/app/helper/constants/db_schemas';
import { PlatonedThought } from './../linking/models/thought-main';
import { Injector } from "@angular/core";
import { Interest } from "../linking/models/interest-main";
import { UserRequest, ThoughtRequest, InterestRequest, ResponseReceipt, Option } from "../linking/models/request-models";
import { ImageThought, PollThought, TextThought, Thought, VideoThought } from "../linking/models/thought-main";
import { User } from "../linking/models/user-main";
import { OptionParts, UserParts, TempUserParts, ThoughtParts, TempThoughtParts, InterestParts, InterestPivotParts } from "./constants/db_columns";
import { ResponseParts, ExitCodes } from "./constants/db_schemas";

export class Packager {

    public static responseUnpack(data: any): ResponseReceipt {
        console.log(data);
        const response: ResponseReceipt = {

            status: data[ResponseParts.STATUS],
            error_message: data[ResponseParts.ERROR],
            missing_params: data[ResponseParts.MISSING_PARAMS],
            email_taken: data[ResponseParts.EMAIL_AVAILABLE],
            username_taken: data[ResponseParts.USERNAME_AVAILABLE],
            name_taken: data[ResponseParts.NAME_AVAILABLE],
            options: this.packOptionsInMap(data[ResponseParts.OPTIONS]),
            profile_id: data[ResponseParts.PROFILE_ID],
            banner_id: data[ResponseParts.BANNER_ID],
            follows: data[ResponseParts.FOLLOWS],

        }

        switch (response.status) {

            case ExitCodes.USERS_ADD:
            case ExitCodes.USERS_AUTHENTICATE:
            case ExitCodes.USERS_GET_ONE:
            case ExitCodes.USERS_UPDATE:
            case ExitCodes.USERS_GET_FROM_EMAIL:

                if (data[ResponseParts.USER])
                    response.user = this.userUnpack(data[ResponseParts.USER][0]);
                break;

            case ExitCodes.USERS_GET_ALL:
            case ExitCodes.INTERESTS_GET_USERS:

                response.users = this.packUsersInMap(data[ResponseParts.USERS]);
                break;

            case ExitCodes.THOUGHTS_ADD:
            case ExitCodes.THOUGHTS_GET_ONE:

                response.user = this.userUnpack(data[ResponseParts.THOUGHT][0]);
                response.thought = this.thoughtUnpack(data[ResponseParts.THOUGHT][0]);
                break;

            case ExitCodes.THOUGHTS_GET_ALL:
            case ExitCodes.THOUGHTS_GET_BY:
            case ExitCodes.THOUGHTS_GET_BY_USERS:

                const platons_TEMP: Map<number, Thought> = this.packThoughtsInMap(data[ResponseParts.PLATONS]);
                response.users = this.packUsersInMap(data[ResponseParts.THOUGHTS]);
                response.thoughts = this.packThoughtsInMap(data[ResponseParts.THOUGHTS], platons_TEMP);
                break;

            case ExitCodes.INTERESTS_ADD:
            case ExitCodes.INTERESTS_GET_ONE:

                response.interest = this.interestUnpack(data[ResponseParts.INTEREST][0]);
                break;

            case ExitCodes.INTERESTS_GET_INTERESTS_BY_USER:
            case ExitCodes.INTERESTS_GET_ALL:

                response.interests = this.packInterestsInMap(data[ResponseParts.INTERESTS]);
                break;

            case ExitCodes.FOLLOW_GET_FOLLOWERS:

                response.users = this.packUsersInMap(data[ResponseParts.FOLLOWERS]);
                break;

            case ExitCodes.FOLLOW_GET_FOLLOWINGS:

                response.users = this.packUsersInMap(data[ResponseParts.FOLLOWINGS]);
                break;

            case ExitCodes.LIKE_GET_ALL_BY_USER:

                response.thoughts = this.packThoughtsInMap(data[ResponseParts.LIKES]);
                break;

            case ExitCodes.LIKE_GET_ALL_ON_THOUGHT:


                response.users = this.packUsersInMap(data[ResponseParts.LIKES]);
                break;

            case ExitCodes.PLATON_GET_ALL_BY_USER:

                response.thoughts = this.packThoughtsInMap(data[ResponseParts.PLATONS]);
                break;

            case ExitCodes.PLATON_GET_ALL_ON_THOUGHT:

                response.users = this.packUsersInMap(data[ResponseParts.PLATONS]);
                break;


        }
        return response;

    }

    public static packOptionsInMap(json: any): Map<number, Option> {

        const map: Map<number, Option> = new Map();
        json?.forEach((element: any) => {

            const current: Option | undefined = this.optionUnpack(element);
            if (current != undefined) {
                map.set(current.position, current);
            }
        });
        return map;

    }
    public static optionUnpack(data: any): Option | undefined {

        if (data != undefined) {
            const current: Option = {

                thought_id: Number.parseInt(data[OptionParts.ID]),
                content: String(data[OptionParts.CONTENT]),
                position: Number.parseInt(data[OptionParts.POSITION]),
                votes: Number.parseInt(data[OptionParts.VOTES]),

            };
            return current;
        } else {

            return undefined;

        }
    }

    public static packUsersInMap(json: any): Map<number, User> {

        const map: Map<number, User> = new Map();
        json?.forEach((element: any) => {

            const current: User | undefined = this.userUnpack(element);
            if (current != undefined) {
                map.set(current.user_id, current);
                map.get(current.user_id)!.interests = this.packInterestsInMap(element.interests);
            }
        });
        return map;

    }
    public static userUnpack(data: any): User | undefined {

        if (data != undefined) {
            return new User(

                Number.parseInt(data[UserParts.ID]),
                String(data[UserParts.USERNAME]),
                String(data[UserParts.IS_VERIFIED]) == "1",
                String(data[UserParts.BIO]),
                String(data[UserParts.EMAIL]),
                new Date(data[UserParts.BIRTHDAY]),
                new Date(data[UserParts.JOIN]),
                Number.parseInt(data[UserParts.GENDER]),
                Number.parseInt(data[ResponseParts.PROFILE_ID]) != 0 ? `${BuildAPIs.MAIN}/Server/assets/users/${Number.parseInt(data[UserParts.ID])}/profiles/profile-${Number.parseInt(data[ResponseParts.PROFILE_ID]) - 1}.png` : "../../assets/icon/profile-default.png",
                Number.parseInt(data[ResponseParts.BANNER_ID]) != 0 ? `${BuildAPIs.MAIN}/Server/assets/users/${Number.parseInt(data[UserParts.ID])}/banners/banner-${Number.parseInt(data[ResponseParts.BANNER_ID]) - 1}.png` : `https://ionicframework.com/docs/img/demos/card-media.png`,
                Number.parseInt(data[TempUserParts.FOLLOWERS]),
                Number.parseInt(data[TempUserParts.FOLLOWINGS])

            );

        } else {

            return undefined;

        }
    }



    public static packUserForPOST(user: UserRequest): FormData {

        const form = new FormData();
        if (user.user_id != undefined) form.append(UserParts.ID, String(user.user_id));
        if (user.username != undefined) form.append(UserParts.USERNAME, user.username);
        if (user.password != undefined) form.append(UserParts.PASSWORD, user.password);
        if (user.is_verified != undefined) form.append(UserParts.IS_VERIFIED, String(user.is_verified ? 1 : 0));
        if (user.bio != undefined) form.append(UserParts.BIO, user.bio);
        if (user.birthday != undefined) form.append(UserParts.BIRTHDAY, user.birthday.toISOString().slice(0, 10));
        if (user.email != undefined) form.append(UserParts.EMAIL, user.email);
        if (user.gender != undefined) form.append(UserParts.GENDER, String(user.gender));
        if (user.picture != undefined) form.append(UserParts.PICTURE, user.picture);
        if (user.banner != undefined) form.append(UserParts.BANNER, user.banner);
        form.append(UserParts.JOIN, new Date().toISOString().slice(0, 10));
        return form;

    }


    public static packThoughtsInMap(json: any, platons: Map<number, Thought> = new Map()): Map<number, Thought> {

        const map: Map<number, Thought> = new Map();
        const ids: Set<number> = new Set();
        json?.forEach((element: any) => {

            ids.add(element[ThoughtParts.ID]);

        });
        json?.forEach((element: any) => {

            const current: Thought = this.thoughtUnpack(element, platons);
            map.set(current.thought_id, current);

        });
        for (let element of map.values()) {
            if (element.type == 4 && ids.has(element.thought_id) && map.has(element.root_id)) {

                (element as PlatonedThought).root = map.get(element.root_id)!;

            }
        };
        return map;

    }
    public static thoughtUnpack(data: any, platons: Map<number, Thought> = new Map()): Thought {

        let current: Thought;

        switch (Number.parseInt(data[ThoughtParts.TYPE])) {

            case 0:

                // Text
                current = new TextThought(String(data[ThoughtParts.CONTENT]));
                break;

            case 1:

                // Image
                current = new ImageThought(String(data[ThoughtParts.CONTENT]));
                break;

            case 2:

                // Video
                current = new VideoThought(String(data[ThoughtParts.CONTENT]));
                break;

            case 3:

                // Poll
                current = new PollThought(

                    String(data[ThoughtParts.CONTENT]),
                    Number.parseInt(data[ThoughtParts.OPTION]),
                    String(data[OptionParts.POLL1]),
                    String(data[OptionParts.POLL2]),
                    String(data[OptionParts.POLL3]),
                    String(data[OptionParts.POLL4]),
                    Number.parseInt(data[OptionParts.VOTES1]),
                    Number.parseInt(data[OptionParts.VOTES2]),
                    Number.parseInt(data[OptionParts.VOTES3]),
                    Number.parseInt(data[OptionParts.VOTES4])

                );
                break;

            case 4:

                // Platoned
                if (platons.has(data[ThoughtParts.ROOT])) {
                    current = new PlatonedThought(platons.get(data[ThoughtParts.ROOT])!);
                } else {
                    current = new TextThought("Connection Error");
                }
                break;


            default:

                throw new Error("Illegal Type " + data[ThoughtParts.TYPE] + " " + typeof data[ThoughtParts.TYPE]);

        }

        current.type = Number.parseInt(data[ThoughtParts.TYPE]);
        current.thought_id = Number.parseInt(data[ThoughtParts.ID]);
        current.share_date = new Date(data[ThoughtParts.SHARE_DATE]);
        current.edit_date = new Date(data[ThoughtParts.EDIT_DATE]);
        current.is_liked = String(data[ThoughtParts.IS_LIKED]) == "1";
        current.is_platoned = String(data[ThoughtParts.IS_PLATONED]) == "1";
        current.likes = Number.parseInt(data[TempThoughtParts.LIKES]);
        current.opinions = Number.parseInt(data[TempThoughtParts.OPINIONS]);
        current.owner_id = Number.parseInt(data[ThoughtParts.OWNER_ID]);
        current.root_id = Number.parseInt(data[ThoughtParts.ROOT]);
        current.is_opinion = String(data[ThoughtParts.IS_OPINION]) == "1";
        current.platons = Number.parseInt(data[TempThoughtParts.PLATONS]);

        return current;
    }


    public static packThoughtForPOST(thought: ThoughtRequest): FormData {

        const form = new FormData();
        form.append(ThoughtParts.SHARE_DATE, new Date().toISOString());
        form.append(ThoughtParts.EDIT_DATE, new Date().toISOString());
        if (thought.thought_id != undefined) form.append(ThoughtParts.ID, String(thought.thought_id));
        if (thought.user_id != undefined) form.append(UserParts.ID, String(thought.user_id));
        if (thought.content != undefined) form.append(ThoughtParts.CONTENT, thought.content);
        if (thought.type != undefined) form.append(ThoughtParts.TYPE, String(thought.type));
        if (thought.owner_id != undefined) form.append(ThoughtParts.OWNER_ID, String(thought.owner_id));
        if (thought.root_id != undefined) form.append(ThoughtParts.ROOT, String(thought.root_id));
        if (thought.media != undefined) form.append(ThoughtParts.MEDIA, thought.media);
        if (thought.poll1 != undefined) form.append(OptionParts.POLL1, thought.poll1);
        if (thought.poll2 != undefined) form.append(OptionParts.POLL2, thought.poll2);
        if (thought.poll3 != undefined) form.append(OptionParts.POLL3, thought.poll3);
        if (thought.poll4 != undefined) form.append(OptionParts.POLL4, thought.poll4);
        if (thought.is_opinion != undefined) form.append(ThoughtParts.IS_OPINION, String(thought.is_opinion ? 1 : 0));
        return form;

    }

    public static packInterestsInMap(json: any): Map<number, Interest> {

        const map: Map<number, Interest> = new Map();
        json?.forEach((element: any) => {

            const current: Interest | undefined = this.interestUnpack(element);
            if (current != undefined) {
                map.set(current.interest_id, current);
            }

        });
        return map;

    }

    public static interestUnpack(data: any): Interest | undefined {

        if (data != undefined) {
            return new Interest(

                Number.parseInt(data[InterestParts.ID]),
                String(data[InterestParts.NAME]),
                `http://${BuildAPIs.MAIN}/Server/assets/interests/${Number.parseInt(data[InterestParts.ID])}/logo-${Number.parseInt(data[ResponseParts.PROFILE_ID]) - 1}.png`,
                Number.parseInt(data[InterestParts.PARTICIPANTS]),
                String(data[InterestParts.IS_INTERESTED]) == "1",


            );

        } else {

            return undefined;

        }

    }
    public static packInterestForPOST(interest: InterestRequest): FormData {

        const form = new FormData();
        form.append(InterestPivotParts.INTEREST_DATE, new Date().toISOString());
        if (interest.user_id != undefined) form.append(UserParts.ID, String(interest.user_id));
        if (interest.img_src != undefined) form.append(InterestParts.IMG, String(interest.img_src));
        if (interest.interest_id != undefined) form.append(InterestParts.ID, String(interest.interest_id));
        if (interest.name != undefined) form.append(InterestParts.NAME, interest.name);
        if (interest.logo != undefined) form.append(InterestParts.LOGO, String(interest.logo));
        return form;

    }

}
