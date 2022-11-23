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

class USERS_SCHEMA {

	public const ADD = 0;
	public const GET_ALL = 1;
	public const GET_ONE = 2;
	public const UPDATE = 3;
	public const CHECK = 4;
	public const AUTHENTICATE = 5;

}

class THOUGHTS_SCHEMA {

	public const ADD = 0;
	public const GET_ALL = 1;
	public const GET_ONE = 2;
	public const GET_BY = 3;
	public const UPDATE = 4;
	public const DELETE = 5;

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

}

class PLATONS {

	public const ID = "user_id";
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
	public const EMAIL_AVAILABLE = "email_taken";
	public const USERNAME_AVAILABLE = "username_taken";

}