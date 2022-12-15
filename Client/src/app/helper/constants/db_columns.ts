
export enum UserParts {

    // All user properties

    ID = "user_id",
    USERNAME = "username",
    PASSWORD = "password",
    EMAIL = "email",
    BIO = "bio",
    BIRTHDAY = "birthday",
    JOIN = "join_date",
    GENDER = "gender", // 0: Male | 1: Female | 2: Other | 3: Not disclosed
    PICTURE = "picture",
    BANNER = "banner",
    IS_VERIFIED = "is_verified" // Whether the user has verified their email

}



export enum ThoughtParts {

    // All thought properties

    ID = "thought_id",
    SHARE_DATE = "share_date",
    EDIT_DATE = "edit_date",
    CONTENT = "content",
    TYPE = "type",
    OWNER_ID = "owner_id",
    ROOT = "root_id", // The original thought
    IS_LIKED = "is_liked", // Whether the logged in user liked this thought
    IS_PLATONED = "is_platoned", // Whether the logged in user platoned this thought
    OPTION = "is_voted", // The option answered by the logged in user (if any)
    IS_OPINION = "is_opinion", // Whether the thought is an opinion
    OFFSET = "offset", // Used for pagination
    QUANTITY = "quantity", // Used for pagination
    MEDIA = "media" // The Media displayed by this thought

}

export enum TempThoughtParts {

    // Temporary thought properties (might not always be accurate)

    ID = "thought_id_fk_temp",
    LIKES = "likes",
    PLATONS = "platons",
    OPINIONS = "opinions"

}
export enum TempUserParts {

    // Temporary user properties (might not always be accurate)

    ID = "user_id_fk_temp",
    FOLLOWINGS = "followings",
    FOLLOWERS = "followers"

}

export enum OptionParts {

    // All properties of a poll option

    ID = "thought_id_fk_options", // Id of the thought this belongs to
    POSITION = "position", // Index of the option
    CONTENT = "content", // Prompt
    VOTES = "votes",
    POLL1 = "poll1",
    POLL2 = "poll2",
    POLL3 = "poll3",
    POLL4 = "poll4",
    VOTES1 = "votes1",
    VOTES2 = "votes2",
    VOTES3 = "votes3",
    VOTES4 = "votes4"

}


export enum InterestParts {

    // All properties of an interest 

    ID = "interest_id",
    NAME = "name",
    IMG = "img_src",
    LOGO = "logo",
    PARTICIPANTS = "participants_TEMP",
    IS_INTERESTED = "is_interested" // Whether the logged in user is enrolled in the thought
}

export enum InterestPivotParts {

    // Links users to their interests

    USER_ID = "user_id_fk_interested",
    INTEREST_ID = "interest_id_fk",
    INTEREST_DATE = "interest_date"

}

export enum PlatonParts {

    // All platon properties

    USER_ID = "user_id_fk_platons",
    THOUGHT_ID = "thought_id_fk_platons", // The platoned thought
    PLATON_DATE = "platon_date",
    ROOT_ID = "root_id_fk_platons" // The original thought

}

export enum FollowParts {

    // All follow properties

    USER_ID1 = "user_id1",
    USER_ID2 = "user_id2",
    FOLLOW_DATE = "follow_date"

}

export enum LikeParts {

    // All like properties

    USER_ID = "user_id_fk_likes",
    THOUGHT_ID = "thought_id_fk_likes",
    LIKE_DATE = "like_date"

}

export enum AnswerParts {

    // All answer properties
    
    USER_ID = "user_id_fk_ans",
    THOUGHT_ID = "thought_id_fk_ans",
    ANSWER_DATE = "answer_date",
    OPTION_CHOSEN = "option_chosen"


}