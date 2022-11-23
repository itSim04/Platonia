<?php

class USERS {

	public const ID = "user_id";
	public const USERNAME = "username";
	public const PASSWORD = "password";
	public const EMAIL = "email";
	public const BIO = "bio";
	public const BIRTHDAY = "birthday";
	public const JOIN = "join_date";
	public const GENDER = "gender";
	public const PICTURE = "picture";
	public const BANNER = "banner";
	public const FOLLOWINGS = "followings_TEMP";
	public const FOLLOWERS = "followers_TEMP";

}

class INTERESTS_SCHEMA {


	public const ADD = 0;
	public const GET_ALL = 1;
	public const GET_ONE = 2;
	public const GET_USERS = 3;
	public const ENROLL_USER = 4;
	public const UNENROLL_USER = 5;
	public const CHECK_NAME = 6;
	public const GET_INTERESTS = 7;

}

class USERS_SCHEMA {

	public const ADD = 0;
	public const GET_ALL = 1;
	public const GET_ONE = 2;
	public const UPDATE = 3;
	public const CHECK = 4;
	public const AUTHENTICATE = 5;

}

class LIKES_SCHEMA {

	public const LIKE = 0;
	public const UNLIKE = 1;
	public const GET_LIKES_BY_USER = 2;
	public const GET_LIKES_ON_THOUGHT = 3;
}
class PLATONS_SCHEMA {

	public const PLATON = 0;
	public const UNPLATON = 1;
	public const GET_PLATONS_BY_USER = 2;
	public const GET_PLATONS_ON_THOUGHT = 3;
}

class THOUGHTS_SCHEMA {

	public const ADD = 0;
	public const GET_ALL = 1;
	public const GET_ONE = 2;
	public const GET_BY = 3;
	public const UPDATE = 4;
	public const DELETE = 5;

}

class POLLS_SCHEMA {

	public const ANSWER_POLL = 0;
	public const GET_OPTION = 1;

}

class EXIT_CODES {

	public const USERS_ADD = 100;
	public const USERS_GET_ALL = 101;
	public const USERS_GET_ONE = 102;
	public const USERS_UPDATE = 103;
	public const USERS_CHECK = 104;
	public const USERS_AUTHENTICATE = 105;

	public const THOUGHTS_ADD = 110;
	public const THOUGHTS_GET_ALL = 111;
	public const THOUGHTS_GET_ONE = 112;
	public const THOUGHTS_GET_BY = 113;
	public const THOUGHTS_UPDATE = 114;
	public const THOUGHTS_DELETE = 115;

	public const INTERESTS_ADD = 120;
	public const INTERESTS_GET_ALL = 121;
	public const INTERESTS_GET_ONE = 122;
	public const INTERESTS_GET_USERS = 123;
	public const INTERESTS_ENROLL_USER = 124;
	public const INTERESTS_UNENROLL_USER = 125;
	public const INTERESTS_CHECK_NAME = 126;

	public const LIKE_ADD = 130;
	public const LIKE_REMOVE = 131;
	public const LIKE_GET_ALL_BY_USER = 132;
	public const LIKE_GET_ALL_ON_THOUGHT = 133;

	public const PLATON_ADD = 140;
	public const PLATON_REMOVE = 141;
	public const PLATON_GET_ALL_BY_USER = 142;
	public const PLATON_GET_ALL_ON_THOUGHT = 143;

	public const POLLS_ANSWER_POLL = 150;
	public const POLLS_GET_OPTION = 151;

	public const MISSING_PARAMS = 400;
	public const INCORRECT_SCHEMA = 405;

}

class THOUGHTS {

	public const ID = "thought_id";
	public const SHARE_DATE = "share_date";
	public const EDIT_DATE = "edit_date";
	public const CONTENT = "content";
	public const TYPE = "type";
	public const OWNER_ID = "owner_id";
	public const PLATONS = "platons_TEMP";
	public const LIKES = "likes_TEMP";
	public const COMMENTS = "opinions_TEMP";
	public const ROOT = "root_id";
	public const IS_LIKED = "is_liked";
	public const IS_PLATONED = "is_platoned";
	public const OPTION = "is_voted";


	public const POSITION = "position";
	public const POLL1 = "poll1";
	public const POLL2 = "poll2";
	public const POLL3 = "poll3";
	public const POLL4 = "poll4";

}

class INTERESTS {

	public const ID = "interest_id";
	public const NAME = "name";
	public const IMG = "img_src";
	public const PARTICIPANTS = "participants_TEMP";

}

class INTERESTED_IN {

	public const USER_ID = "user_id";
	public const INTEREST_ID = "interest_id";
	public const INTEREST_DATE = "interest_date";

}

class PLATONS {

	public const USER_ID = "user_id";
	public const THOUGHT_ID = "thought_id";
	public const PLATON_DATE = "platon_date";

}

class FOLLOWS {

	public const USER_ID1 = "user_id1";
	public const USER_ID2 = "user_id2";
	public const FOLLOW_DATE = "follow_date";
}

class LIKES {

	public const USER_ID = "user_id";
	public const THOUGHT_ID = "thought_id";
	public const LIKE_DATE = "like_date";

}

class ANSWERS {

	public const USER_ID = "user_id";
	public const THOUGHT_ID = "thought_id";
	public const ANSWER_DATE = "answer_date";
	public const OPTION_CHOSEN = "option_chosen";


}

class RESPONSE {

	public const STATUS = "status";
	public const MISSING_PARAMS = "missing_parameters";
	public const USERS = "users";
	public const USER = "user";
	public const THOUGHT = "thought";
	public const THOUGHTS = "thoughts";
	public const LIKES = "likes";
	public const PLATONS = "platons";
	public const RETWEETS = "retweets";
	public const OPTIONS = "options";
	public const INTEREST = "interest";
	public const INTERESTS = "interests";
	public const EMAIL_AVAILABLE = "email_taken";
	public const USERNAME_AVAILABLE = "username_taken";
	public const NAME_AVAILABLE = "name_taken";

}