import { USERS, USERS_TEMP, RESPONSE } from "./constants";
import { RESPONSE_MODEL } from "./models/response-model";
import { USER, USER_RESPONSE } from "./models/users-model";

export class Packager {

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

    public static packForPOST(user: USER_RESPONSE): FormData {

        const form = new FormData();
        console.log(user);
        form.append(USERS.ID, user.user_id + "");
        if (user.username != undefined) form.append(USERS.USERNAME, user.username);
        if (user.password != undefined) form.append(USERS.PASSWORD, user.password);
        if (user.bio != undefined) form.append(USERS.BIO, user.bio);
        if (user.birthday != undefined) form.append(USERS.BIRTHDAY, user.birthday + "");
        if (user.email != undefined) form.append(USERS.EMAIL, user.email);
        if (user.followers != undefined) form.append(USERS_TEMP.FOLLOWERS, user.followers + "");
        if (user.followings != undefined) form.append(USERS_TEMP.FOLLOWINGS, user.followings + "");
        if (user.gender != undefined) form.append(USERS.GENDER, user.gender + "");
        if (user.join != undefined) form.append(USERS.JOIN, user.join + "");
        return form;

    }

}
