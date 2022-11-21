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

}

class EXIT_CODES {

	public const USERS_ADD = 100;
	public const USERS_GET_ALL = 101;
	public const USERS_GET_ONE = 102;
	public const USERS_UPDATE = 103;

}

class THOUGHTS {

	public const ID = "thought_id";
	public const SHARE_DATE = "mine_date";
	public const EDIT_DATE = "edit_date";
	public const CONTENT = "content";
	public const TYPE = "type";
	public const OWNER_ID = "owner_id";
	public const PLATONS = "platons_TEMP";
	public const LIKES = "likes_TEMP";
	public const COMMENTS = "comments_TEMP";
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

class Follows {

	public const USER_ID1 = "user_id1";
	public const USER_ID2 = "user_id2";
	public const FOLLOW_DATE = "follow_date";
}

class Diamonds {

	public const USER_ID = "user_id";
	public const THOUGHT_ID = "thought_id";
	public const LIKE_DATE = "like_date";

}

class Answers {

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

}