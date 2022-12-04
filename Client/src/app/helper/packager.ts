import { USERS, USERS_TEMP, THOUGHTS, THOUGHTS_TEMP, OPTIONS, INTERESTS, INTERESTED_IN } from "./constants/db_columns";
import { Interest, INTEREST_RESPONSE } from "../models/interests-model";
import { RESPONSE_MODEL } from "../models/response-model";
import { Option, Thought, THOUGHTS_RESPONSE } from "../models/thoughts-model";
import { User, USER_RESPONSE } from "../models/users-model";
import { RESPONSE, EXIT_CODES } from "./constants/db_schemas";

export class Packager {

    public static responseUnpack(data: any): RESPONSE_MODEL {

        const response: RESPONSE_MODEL = {

            status: data[RESPONSE.STATUS],
            error_message: data[RESPONSE.ERROR],
            missing_params: data[RESPONSE.MISSING_PARAMS],
            email_taken: data[RESPONSE.EMAIL_AVAILABLE],
            username_taken: data[RESPONSE.USERNAME_AVAILABLE],
            name_taken: data[RESPONSE.NAME_AVAILABLE],
            options: this.packOptionsInMap(data[RESPONSE.OPTIONS]),
            profile_id: data[RESPONSE.PROFILE_ID],
            banner_id: data[RESPONSE.BANNER_ID],
            follows: data[RESPONSE.FOLLOWS],

        }

        switch (response.status) {

            case EXIT_CODES.USERS_ADD:
            case EXIT_CODES.USERS_AUTHENTICATE:
            case EXIT_CODES.USERS_GET_ONE:
            case EXIT_CODES.USERS_UPDATE:

                response.user = this.userUnpack(data[RESPONSE.USER][0]);
                break;

            case EXIT_CODES.USERS_GET_ALL:
            case EXIT_CODES.INTERESTS_GET_USERS:

                response.users = this.packUsersInMap(data[RESPONSE.USERS]);
                break;

            case EXIT_CODES.THOUGHTS_ADD:
            case EXIT_CODES.THOUGHTS_GET_ONE:

                response.user = this.userUnpack(data[RESPONSE.THOUGHT][0]);
                response.thought = this.thoughtUnpack(data[RESPONSE.THOUGHT][0]);
                break;

            case EXIT_CODES.THOUGHTS_GET_ALL:
            case EXIT_CODES.THOUGHTS_GET_BY:
            case EXIT_CODES.THOUGHTS_GET_BY_USERS:

                response.users = this.packUsersInMap(data[RESPONSE.THOUGHTS]);
                response.thoughts = this.packThoughtsInMap(data[RESPONSE.THOUGHTS]);
                break;

            case EXIT_CODES.INTERESTS_ADD:
            case EXIT_CODES.INTERESTS_GET_ONE:

                response.interest = this.interestUnpack(data[RESPONSE.INTEREST][0]);
                break;

            case EXIT_CODES.INTERESTS_GET_INTERESTS_BY_USER:
            case EXIT_CODES.INTERESTS_GET_ALL:

                response.interests = this.packInterestsInMap(data[RESPONSE.INTERESTS]);
                break;

            case EXIT_CODES.FOLLOW_GET_FOLLOWERS:

                response.users = this.packUsersInMap(data[RESPONSE.FOLLOWERS]);
                break;

            case EXIT_CODES.FOLLOW_GET_FOLLOWINGS:

                response.users = this.packUsersInMap(data[RESPONSE.FOLLOWINGS]);
                break;

            case EXIT_CODES.LIKE_GET_ALL_BY_USER:

                response.thoughts = this.packThoughtsInMap(data[RESPONSE.LIKES]);
                break;

            case EXIT_CODES.LIKE_GET_ALL_ON_THOUGHT:


                response.users = this.packUsersInMap(data[RESPONSE.LIKES]);
                break;

            case EXIT_CODES.PLATON_GET_ALL_BY_USER:

                response.thoughts = this.packThoughtsInMap(data[RESPONSE.PLATONS]);
                break;

            case EXIT_CODES.PLATON_GET_ALL_ON_THOUGHT:

                response.users = this.packUsersInMap(data[RESPONSE.PLATONS]);
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

                thought_id: data[OPTIONS.ID],
                content: data[OPTIONS.CONTENT],
                position: data[OPTIONS.POSITION],
                votes: data[OPTIONS.VOTES],

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
            const current: User = {

                user_id: data[USERS.ID],
                username: data[USERS.USERNAME],
                bio: data[USERS.BIO],
                birthday: new Date(data[USERS.BIRTHDAY]),
                email: data[USERS.EMAIL],
                followers: data[USERS_TEMP.FOLLOWERS],
                followings: data[USERS_TEMP.FOLLOWINGS],
                is_verified: data[USERS.IS_VERIFIED],
                picture: data[RESPONSE.PROFILE_ID] != 0 ? `http://localhost/Platonia/Server/assets/users/${data[USERS.ID]}/profiles/profile-${data[RESPONSE.PROFILE_ID] - 1}.png` : `../assets/icon/profile-default.png`,
                banner: data[RESPONSE.PROFILE_ID] != 0 ? `http://localhost/Platonia/Server/assets/users/${data[USERS.ID]}/banners/banner-${data[RESPONSE.BANNER_ID] - 1}.png` : `https://ionicframework.com/docs/img/demos/card-media.png`,
                gender: data[USERS.GENDER],
                join: data[USERS.JOIN]

            };

            return current;
        } else {

            return undefined;

        }
    }



    public static packUserForPOST(user: USER_RESPONSE): FormData {

        const form = new FormData();
        if (user.user_id != undefined) form.append(USERS.ID, String(user.user_id));
        if (user.username != undefined) form.append(USERS.USERNAME, user.username);
        if (user.password != undefined) form.append(USERS.PASSWORD, user.password);
        if (user.is_verified != undefined) form.append(USERS.IS_VERIFIED, String(user.is_verified ? 1 : 0));
        if (user.bio != undefined) form.append(USERS.BIO, user.bio);
        if (user.birthday != undefined) form.append(USERS.BIRTHDAY, user.birthday.toISOString());
        if (user.email != undefined) form.append(USERS.EMAIL, user.email);
        if (user.gender != undefined) form.append(USERS.GENDER, String(user.gender));
        if (user.picture != undefined) form.append(USERS.PICTURE, user.picture);
        if (user.banner != undefined) form.append(USERS.BANNER, user.banner);
        form.append(USERS.JOIN, new Date().toISOString());
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

            thought_id: data[THOUGHTS.ID],
            share_date: new Date(data[THOUGHTS.SHARE_DATE]),
            edit_date: new Date(data[THOUGHTS.EDIT_DATE]),
            content: data[THOUGHTS.CONTENT],
            type: data[THOUGHTS.TYPE],
            owner_id: data[THOUGHTS.OWNER_ID],
            root_id: data[THOUGHTS.ROOT],
            likes: data[THOUGHTS_TEMP.LIKES],
            platons: data[THOUGHTS_TEMP.PLATONS],
            opinions: data[THOUGHTS_TEMP.OPINIONS],

            is_liked: data[THOUGHTS.IS_LIKED],
            is_platoned: data[THOUGHTS.IS_PLATONED],
            option_chosen: data[THOUGHTS.OPTION],

            poll1: data[OPTIONS.POLL1],
            poll2: data[OPTIONS.POLL2],
            poll3: data[OPTIONS.POLL3],
            poll4: data[OPTIONS.POLL4],

            votes1: data[OPTIONS.VOTES1],
            votes2: data[OPTIONS.VOTES2],
            votes3: data[OPTIONS.VOTES3],
            votes4: data[OPTIONS.VOTES4],

            votes: data[OPTIONS.VOTES1] + data[OPTIONS.VOTES2] + data[OPTIONS.VOTES3] + data[OPTIONS.VOTES4]
        };

        return current;
    }


    public static packThoughtForPOST(thought: THOUGHTS_RESPONSE): FormData {

        const form = new FormData();
        form.append(THOUGHTS.SHARE_DATE, new Date().toISOString());
        form.append(THOUGHTS.EDIT_DATE, new Date().toISOString());
        if (thought.thought_id != undefined) form.append(THOUGHTS.ID, String(thought.thought_id));
        if (thought.user_id != undefined) form.append(USERS.ID, String(thought.user_id));
        if (thought.content != undefined) form.append(THOUGHTS.CONTENT, thought.content);
        if (thought.type != undefined) form.append(THOUGHTS.TYPE, String(thought.type));
        if (thought.owner_id != undefined) form.append(THOUGHTS.OWNER_ID, String(thought.owner_id));
        if (thought.root_id != undefined) form.append(THOUGHTS.ROOT, String(thought.root_id));
        if (thought.poll1 != undefined) form.append(OPTIONS.POLL1, thought.poll1);
        if (thought.poll2 != undefined) form.append(OPTIONS.POLL2, thought.poll2);
        if (thought.poll3 != undefined) form.append(OPTIONS.POLL3, thought.poll3);
        if (thought.poll4 != undefined) form.append(OPTIONS.POLL4, thought.poll4);
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
            const current: Interest = {

                interest_id: data[INTERESTS.ID],
                img_src: data[INTERESTS.IMG],
                name: data[INTERESTS.NAME],
                is_followed: data[INTERESTS.IS_INTERESTED],
                participants: data[INTERESTS.PARTICIPANTS],
                logo: `http://localhost/Platonia/Server/assets/interests/${data[INTERESTS.ID]}/logo-${data[RESPONSE.PROFILE_ID] - 1}.png`,


            };
            return current;
        } else {

            return undefined;

        }

    }
    public static packInterestForPOST(interest: INTEREST_RESPONSE): FormData {

        const form = new FormData();
        form.append(INTERESTED_IN.INTEREST_DATE, new Date().toISOString());
        if (interest.user_id != undefined) form.append(USERS.ID, String(interest.user_id));
        if (interest.img_src != undefined) form.append(INTERESTS.IMG, String(interest.img_src));
        if (interest.interest_id != undefined) form.append(INTERESTS.ID, String(interest.interest_id));
        if (interest.name != undefined) form.append(INTERESTS.NAME, interest.name);
        if (interest.logo != undefined) form.append(INTERESTS.LOGO, String(interest.logo));
        return form;

    }

}
