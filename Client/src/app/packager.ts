import { formatNumber } from "@angular/common";
import { USERS, USERS_TEMP, RESPONSE, THOUGHTS, THOUGHTS_TEMP, ANSWERS, OPTIONS, EXIT_CODES, APIS, INTERESTS, INTERESTED_IN } from "./constants";
import { Interest, INTEREST_RESPONSE } from "./models/interests-model";
import { RESPONSE_MODEL } from "./models/response-model";
import { Option, Thought, THOUGHTS_RESPONSE } from "./models/thoughts-model";
import { User, USER_RESPONSE } from "./models/users-model";

export class Packager {

    public static responseUnpack(data: any): RESPONSE_MODEL {

        console.log(data);
        const response: RESPONSE_MODEL = {

            status: data[RESPONSE.STATUS],
            error_message: data[RESPONSE.ERROR],
            missing_params: data[RESPONSE.MISSING_PARAMS],
            email_taken: data[RESPONSE.EMAIL_AVAILABLE],
            username_taken: data[RESPONSE.USERNAME_AVAILABLE],
            name_taken: data[RESPONSE.NAME_AVAILABLE],
            options: this.packOptionsInMap(data[RESPONSE.OPTIONS]),
            profile_id: data[RESPONSE.PROFILE_ID],

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

                response.users = this.packUsersInMap(data[RESPONSE.THOUGHTS]);
                response.thoughts = this.packThoughtsInMap(data[RESPONSE.THOUGHTS]);
                break;

            case EXIT_CODES.INTERESTS_ADD:
            case EXIT_CODES.INTERESTS_GET_ONE:

                response.interest = data[RESPONSE.INTEREST][0];
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

        console.log(data);
        if (data != undefined) {
            const current: User = {

                user_id: data[USERS.ID],
                username: data[USERS.USERNAME],
                bio: data[USERS.BIO],
                birthday: data[USERS.BIRTHDAY],
                email: data[USERS.EMAIL],
                followers: data[USERS_TEMP.FOLLOWERS],
                followings: data[USERS_TEMP.FOLLOWINGS],
                picture: `http://localhost/Platonia/Server/assets/${data[USERS.ID]}/profile-${data[USERS.MAX_PROFILE] - 1}.png`,
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
        if (user.bio != undefined) form.append(USERS.BIO, user.bio);
        if (user.birthday != undefined) form.append(USERS.BIRTHDAY, String(user.birthday));
        if (user.email != undefined) form.append(USERS.EMAIL, user.email);
        if (user.gender != undefined) form.append(USERS.GENDER, String(user.gender));
        if (user.picture != undefined) form.append(USERS.PICTURE, String(user.picture));
        form.append(USERS.JOIN, new Date().toISOString().slice(0, 10).replace('T', ' '));
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
            share_date: data[THOUGHTS.SHARE_DATE],
            edit_date: data[THOUGHTS.EDIT_DATE],
            content: data[THOUGHTS.CONTENT],
            type: data[THOUGHTS.TYPE],
            owner_id: data[THOUGHTS.OWNER_ID],
            root_id: data[THOUGHTS.ROOT],
            likes: data[THOUGHTS_TEMP.LIKES],
            platons: data[THOUGHTS_TEMP.PLATONS],
            opinions: data[THOUGHTS_TEMP.OPINIONS],

            poll1: data[OPTIONS.POLL1],
            poll2: data[OPTIONS.POLL2],
            poll3: data[OPTIONS.POLL3],
            poll4: data[OPTIONS.POLL4],

            votes1: data[OPTIONS.VOTES1],
            votes2: data[OPTIONS.VOTES2],
            votes3: data[OPTIONS.VOTES3],
            votes4: data[OPTIONS.VOTES4]
        };

        return current;
    }


    public static packThoughtForPOST(thought: THOUGHTS_RESPONSE): FormData {

        const form = new FormData();
        form.append(THOUGHTS.SHARE_DATE, String(new Date().toISOString().slice(0, 19).replace('T', ' ')));
        form.append(THOUGHTS.EDIT_DATE, String(new Date().toISOString().slice(0, 19).replace('T', ' ')));
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
                participants: data[INTERESTS.PARTICIPANTS]

            };
            return current;
        } else {

            return undefined;

        }

    }
    public static packInterestForPOST(interest: INTEREST_RESPONSE): FormData {

        const form = new FormData();
        form.append(INTERESTED_IN.INTEREST_DATE, String(new Date().toISOString().slice(0, 19).replace('T', ' ')));
        if (interest.user_id != undefined) form.append(USERS.ID, String(interest.user_id));
        if (interest.img_src != undefined) form.append(INTERESTS.IMG, String(interest.img_src));
        if (interest.interest_id != undefined) form.append(INTERESTS.ID, String(interest.interest_id));
        if (interest.name != undefined) form.append(INTERESTS.NAME, interest.name);
        return form;

    }

}
