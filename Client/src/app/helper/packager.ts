import { Interest } from "../linking/models/interest-main";
import { UserRequest, ThoughtRequest, InterestRequest, ResponseReceipt, Option } from "../linking/models/request-models";
import { Thought } from "../linking/models/thought-main";
import { User } from "../linking/models/user-main";
import { OptionParts, UserParts, TempUserParts, ThoughtParts, TempThoughtParts, InterestParts, InterestPivotParts } from "./constants/db_columns";
import { ResponseParts, ExitCodes } from "./constants/db_schemas";

export class Packager {

    public static responseUnpack(data: any): ResponseReceipt {

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

                response.users = this.packUsersInMap(data[ResponseParts.THOUGHTS]);
                response.thoughts = this.packThoughtsInMap(data[ResponseParts.THOUGHTS]);
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

                thought_id: data[OptionParts.ID],
                content: data[OptionParts.CONTENT],
                position: data[OptionParts.POSITION],
                votes: data[OptionParts.VOTES],

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
            }
        });
        return map;

    }
    public static userUnpack(data: any): User | undefined {

        if (data != undefined) {
            return new User(

                data[UserParts.ID],
                data[UserParts.USERNAME],
                data[UserParts.IS_VERIFIED],
                data[UserParts.BIO],
                data[UserParts.EMAIL],
                new Date(data[UserParts.BIRTHDAY]),
                data[UserParts.JOIN],
                data[UserParts.GENDER],
                data[ResponseParts.PROFILE_ID] != 0 ? `http://localhost/Platonia/Server/assets/users/${data[UserParts.ID]}/profiles/profile-${data[ResponseParts.PROFILE_ID] - 1}.png` : `../assets/icon/profile-default.png`,
                data[ResponseParts.BANNER_ID] != 0 ? `http://localhost/Platonia/Server/assets/users/${data[UserParts.ID]}/banners/banner-${data[ResponseParts.BANNER_ID] - 1}.png` : `https://ionicframework.com/docs/img/demos/card-media.png`,
                data[TempUserParts.FOLLOWERS],
                data[TempUserParts.FOLLOWINGS]

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
        if (user.birthday != undefined) form.append(UserParts.BIRTHDAY, user.birthday.toISOString());
        if (user.email != undefined) form.append(UserParts.EMAIL, user.email);
        if (user.gender != undefined) form.append(UserParts.GENDER, String(user.gender));
        if (user.picture != undefined) form.append(UserParts.PICTURE, user.picture);
        if (user.banner != undefined) form.append(UserParts.BANNER, user.banner);
        form.append(UserParts.JOIN, new Date().toISOString());
        return form;

    }


    public static packThoughtsInMap(json: any): Map<number, Thought> {

        const map: Map<number, Thought> = new Map();
        json?.forEach((element: any) => {

            const current: Thought = this.thoughtUnpack(element);
            map.set(current.thought_id, current);

        });
        return map;

    }
    public static thoughtUnpack(data: any): Thought {

        const current: Thought = {

            thought_id: data[ThoughtParts.ID],
            share_date: new Date(data[ThoughtParts.SHARE_DATE]),
            edit_date: new Date(data[ThoughtParts.EDIT_DATE]),
            content: data[ThoughtParts.CONTENT],
            type: data[ThoughtParts.TYPE],
            owner_id: data[ThoughtParts.OWNER_ID],
            root_id: data[ThoughtParts.ROOT],
            likes: data[TempThoughtParts.LIKES],
            platons: data[TempThoughtParts.PLATONS],
            opinions: data[TempThoughtParts.OPINIONS],

            is_liked: data[ThoughtParts.IS_LIKED],
            is_platoned: data[ThoughtParts.IS_PLATONED],
            option_chosen: data[ThoughtParts.OPTION],

            poll1: data[OptionParts.POLL1],
            poll2: data[OptionParts.POLL2],
            poll3: data[OptionParts.POLL3],
            poll4: data[OptionParts.POLL4],

            votes1: data[OptionParts.VOTES1],
            votes2: data[OptionParts.VOTES2],
            votes3: data[OptionParts.VOTES3],
            votes4: data[OptionParts.VOTES4],

            votes: data[OptionParts.VOTES1] + data[OptionParts.VOTES2] + data[OptionParts.VOTES3] + data[OptionParts.VOTES4]
        };

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
        if (thought.poll1 != undefined) form.append(OptionParts.POLL1, thought.poll1);
        if (thought.poll2 != undefined) form.append(OptionParts.POLL2, thought.poll2);
        if (thought.poll3 != undefined) form.append(OptionParts.POLL3, thought.poll3);
        if (thought.poll4 != undefined) form.append(OptionParts.POLL4, thought.poll4);
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

                interest_id: data[InterestParts.ID],
                img_src: data[InterestParts.IMG],
                name: data[InterestParts.NAME],
                is_followed: data[InterestParts.IS_INTERESTED],
                participants: data[InterestParts.PARTICIPANTS],
                logo: `http://localhost/Platonia/Server/assets/interests/${data[InterestParts.ID]}/logo-${data[ResponseParts.PROFILE_ID] - 1}.png`,


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
