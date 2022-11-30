
export enum USERS {

    ID = "user_id",
    USERNAME = "username",
    PASSWORD = "password",
    EMAIL = "email",
    BIO = "bio",
    BIRTHDAY = "birthday",
    JOIN = "join_date",
    GENDER = "gender",
    PICTURE = "picture",
    BANNER = "banner",

}



export enum THOUGHTS {

    ID = "thought_id",
    SHARE_DATE = "share_date",
    EDIT_DATE = "edit_date",
    CONTENT = "content",
    TYPE = "type",
    OWNER_ID = "owner_id",
    ROOT = "root_id",
    IS_LIKED = "is_liked",
    IS_PLATONED = "is_platoned",
    OPTION = "is_voted",

}

export enum THOUGHTS_TEMP {

    ID = "thought_id_fk_temp",
    LIKES = "likes",
    PLATONS = "platons",
    OPINIONS = "opinions"

}
export enum USERS_TEMP {

    ID = "user_id_fk_temp",
    FOLLOWINGS = "followings",
    FOLLOWERS = "followers"

}

export enum OPTIONS {

    ID = "thought_id_fk_options",
    POSITION = "position",
    VOTES = "votes",
    CONTENT = "content",
    POLL1 = "poll1",
    POLL2 = "poll2",
    POLL3 = "poll3",
    POLL4 = "poll4",
    VOTES1 = "votes1",
    VOTES2 = "votes2",
    VOTES3 = "votes3",
    VOTES4 = "votes4"

}

export enum INTERESTS {

    ID = "interest_id",
    NAME = "name",
    IMG = "img_src",
    LOGO = "logo",
    PARTICIPANTS = "participants_TEMP"

}

export enum INTERESTED_IN {

    USER_ID = "user_id_fk_interested",
    INTEREST_ID = "interest_id_fk",
    INTEREST_DATE = "interest_date"

}

export enum PLATONS {

    USER_ID = "user_id_fk_platons",
    THOUGHT_ID = "thought_id_fk_platons",
    PLATON_DATE = "platon_date"

}

export enum FOLLOWS {

    USER_ID1 = "user_id1",
    USER_ID2 = "user_id2",
    FOLLOW_DATE = "follow_date"

}

export enum LIKES {

    USER_ID = "user_id_fk_likes",
    THOUGHT_ID = "thought_id_fk_likes",
    LIKE_DATE = "like_date"

}

export enum ANSWERS {

    USER_ID = "user_id_fk_ans",
    THOUGHT_ID = "thought_id_fk_ans",
    ANSWER_DATE = "answer_date",
    OPTION_CHOSEN = "option_chosen"


}