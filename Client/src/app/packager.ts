import { USERS, USERS_TEMP, RESPONSE, THOUGHTS, THOUGHTS_TEMP, ANSWERS, OPTIONS } from "./constants";
import { RESPONSE_MODEL } from "./models/response-model";
import { THOUGHT, THOUGHTS_RESPONSE } from "./models/thoughts-model";
import { USER, USER_RESPONSE } from "./models/users-model";

export class Packager {

    public static responseUnpack(data: any): RESPONSE_MODEL {

        const response: RESPONSE_MODEL = {

            status: data[RESPONSE.STATUS],
            error_message: data[RESPONSE.ERROR],
            email_available: data[RESPONSE.EMAIL_AVAILABLE],
            username_available: data[RESPONSE.USERNAME_AVAILABLE],
            user: data[RESPONSE.USER] != undefined && data[RESPONSE.USER][0] != undefined ? this.userUnpack(data[RESPONSE.USER][0]) : undefined,
            users: data[RESPONSE.USERS]?.map((user: USER) => this.userUnpack(user)),
            missing_params: data[RESPONSE.MISSING_PARAMS]

        }
        return response;

    }

    public static userUnpack(data: any): USER {

        const current: USER = {

            user_id: data[USERS.ID],
            username: data[USERS.USERNAME],
            bio: data[USERS.BIO],
            birthday: data[USERS.BIRTHDAY],
            email: data[USERS.EMAIL],
            followers: data[USERS_TEMP.FOLLOWERS],
            followings: data[USERS_TEMP.FOLLOWINGS],
            gender: data[USERS.GENDER],
            join: data[USERS.JOIN]

        };

        return current;
    }


    public static packUserForPOST(user: USER_RESPONSE): FormData {

        const form = new FormData();
        form.append(USERS.ID, String(user.user_id));
        if (user.username != undefined) form.append(USERS.USERNAME, user.username);
        if (user.password != undefined) form.append(USERS.PASSWORD, user.password);
        if (user.bio != undefined) form.append(USERS.BIO, user.bio);
        if (user.birthday != undefined) form.append(USERS.BIRTHDAY, String(user.birthday));
        if (user.email != undefined) form.append(USERS.EMAIL, user.email);
        if (user.gender != undefined) form.append(USERS.GENDER, String(user.gender));
        return form;

    }


    public static thoughtUnpack(data: any): THOUGHT {

        const current: THOUGHT = {

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
        form.append(THOUGHTS.ID, String(thought.thought_id));
        if (thought.content != undefined) form.append(THOUGHTS.CONTENT, thought.content);
        form.append(USERS.PASSWORD, Date());
        return form;

    }

}
