export enum EXIT_CODES {

    USERS_ADD = 100,
    USERS_GET_ALL = 101,
    USERS_GET_ONE = 102,
    USERS_UPDATE = 103,
    USERS_CHECK = 104,
    USERS_AUTHENTICATE = 105,
    USER_UPLOAD_PROFILE = 106,

    THOUGHTS_ADD = 110,
    THOUGHTS_GET_ALL = 111,
    THOUGHTS_GET_ONE = 112,
    THOUGHTS_GET_BY = 113,
    THOUGHTS_UPDATE = 114,
    THOUGHTS_DELETE = 115,
    THOUGHTS_GET_BY_USERS = 116,

    INTERESTS_ADD = 120,
    INTERESTS_GET_ALL = 121,
    INTERESTS_GET_ONE = 122,
    INTERESTS_GET_USERS = 123,
    INTERESTS_ENROLL_USER = 124,
    INTERESTS_UNENROLL_USER = 125,
    INTERESTS_CHECK_NAME = 126,
    INTERESTS_GET_INTERESTS_BY_USER = 127,
    INTERESTS_UPLOAD_LOGO = 128,

    LIKE_ADD = 130,
    LIKE_REMOVE = 131,
    LIKE_GET_ALL_BY_USER = 132,
    LIKE_GET_ALL_ON_THOUGHT = 133,

    PLATON_ADD = 140,
    PLATON_REMOVE = 141,
    PLATON_GET_ALL_BY_USER = 142,
    PLATON_GET_ALL_ON_THOUGHT = 143,

    POLLS_ANSWER_POLL = 150,
    POLLS_GET_OPTION = 151,

    FOLLOW_ADD = 160,
    FOLLOW_REMOVE = 161,
    FOLLOW_GET_FOLLOWERS = 162,
    FOLLOW_GET_FOLLOWINGS = 163,
    FOLLOW_IS_FOLLOWING = 164,

    MISSING_PARAMS = 400,
    INCORRECT_SCHEMA = 405

}

export enum RESPONSE {

    STATUS = "status",
    ERROR = "error_message",
    MISSING_PARAMS = "missing_parameters",
    USERS = "users",
    USER = "user",
    THOUGHT = "thought",
    THOUGHTS = "thoughts",
    LIKES = "likes",
    PLATONS = "platons",
    RETWEETS = "retweets",
    OPTIONS = "options",
    INTEREST = "interest",
    INTERESTS = "interests",
    FOLLOWERS = "followers",
    EMAIL_AVAILABLE = "email_taken",
    FOLLOWINGS = "followings",
    USERNAME_AVAILABLE = "username_taken",
    NAME_AVAILABLE = "name_taken",
    PROFILE_ID = "profile_id",
    BANNER_ID = "banner_id",
    FOLLOWS = "is_following"

}

export enum INTERESTS_SCHEMA {


    ADD = 0,
    GET_ALL = 1,
    GET_ONE = 2,
    GET_USERS = 3,
    ENROLL_USER = 4,
    UNENROLL_USER = 5,
    CHECK_NAME = 6,
    GET_INTERESTS = 7,
    UPLOAD_LOGO = 8

}

export enum USERS_SCHEMA {

    ADD = 0,
    GET_ALL = 1,
    GET_ONE = 2,
    UPDATE = 3,
    CHECK = 4,
    AUTHENTICATE = 5,
    UPLOAD_PROFILE = 6,
    UPLOAD_BANNER = 7

}

export enum LIKES_SCHEMA {

    LIKE = 0,
    UNLIKE = 1,
    GET_LIKES_BY_USER = 2,
    GET_LIKES_ON_THOUGHT = 3
}

export enum FOLLOW_SCHEMA {

    FOLLOW = 0,
    UNFOLLOW = 1,
    GET_FOLLOWERS = 2,
    GET_FOLLOWINGS = 3,
    IS_FOLLOWING = 4
}
export enum PLATONS_SCHEMA {

    PLATON = 0,
    UNPLATON = 1,
    GET_PLATONS_BY_USER = 2,
    GET_PLATONS_ON_THOUGHT = 3
}

export enum THOUGHTS_SCHEMA {

    ADD = 0,
    GET_ALL = 1,
    GET_ONE = 2,
    GET_BY = 3,
    UPDATE = 4,
    DELETE = 5,
    GET_BY_USERS = 6

}

export enum POLLS_SCHEMA {

    ANSWER_POLL = 0,
    GET_OPTION = 1

}

export class APIS {

    private static BASE_URL = "http://localhost/Platonia/Server/apis/"
    public static build_url(schema: number, api: string, params: string = ""): string {

        return this.BASE_URL + `${api}.php?schema=${schema}` + params;

    }


}