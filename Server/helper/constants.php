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
	public const PROFILE_ID = "profile_id";
	public const IS_VERIFIED = "is_verified";
	

}



class THOUGHTS {

	public const ID = "thought_id";
	public const SHARE_DATE = "share_date";
	public const EDIT_DATE = "edit_date";
	public const CONTENT = "content";
	public const TYPE = "type";
	public const OWNER_ID = "owner_id";
	public const ROOT = "root_id";
	public const IS_LIKED = "is_liked";
	public const IS_PLATONED = "is_platoned";
	public const OPTION = "is_voted";

	public const MEDIA = "media";


	public const POSITION = "position";
	public const POLL1 = "poll1";
	public const POLL2 = "poll2";
	public const POLL3 = "poll3";
	public const POLL4 = "poll4";

	
	public const OFFSET = "offset";
	public const QUANTITY = "quantity";

}

class THOUGHTS_TEMP {

	public const ID = "thought_id_fk_temp";

	public const LIKES = "likes";
	public const PLATONS = "platons";
	public const OPINIONS = "opinions";

}
class USERS_TEMP {

	public const ID = "user_id_fk_temp";
	public const FOLLOWINGS = "followings";
	public const FOLLOWERS = "followers";

}

class OPTIONS {

	public const ID = "thought_id_fk_options";
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
	public const LOGO = "logo";
	public const PARTICIPANTS = "participants_TEMP";

}

class INTERESTED_IN {

	public const USER_ID = "user_id_fk_interested";
	public const INTEREST_ID = "interest_id_fk";
	public const INTEREST_DATE = "interest_date";

}

class PLATONS {

	public const USER_ID = "user_id_fk_platons";
	public const THOUGHT_ID = "thought_id_fk_platons";
	public const PLATON_DATE = "platon_date";

}

class FOLLOWS {

	public const USER_ID1 = "user_id1";
	public const USER_ID2 = "user_id2";
	public const FOLLOW_DATE = "follow_date";
}

class LIKES {

	public const USER_ID = "user_id_fk_likes";
	public const THOUGHT_ID = "thought_id_fk_likes";
	public const LIKE_DATE = "like_date";

}

class ANSWERS {

	public const USER_ID = "user_id_fk_ans";
	public const THOUGHT_ID = "thought_id_fk_ans";
	public const ANSWER_DATE = "answer_date";
	public const OPTION_CHOSEN = "option_chosen";


}

class EXIT_CODES {

	public const USERS_ADD = 100;
	public const USERS_GET_ALL = 101;
	public const USERS_GET_ONE = 102;
	public const USERS_UPDATE = 103;
	public const USERS_CHECK = 104;
	public const USERS_AUTHENTICATE = 105;
	public const USERS_UPLOAD_PROFILE = 106;

	public const THOUGHTS_ADD = 110;
	public const THOUGHTS_GET_ALL = 111;
	public const THOUGHTS_GET_ONE = 112;
	public const THOUGHTS_GET_BY = 113;
	public const THOUGHTS_UPDATE = 114;
	public const THOUGHTS_DELETE = 115;
	public const THOUGHTS_GET_BY_USERS = 116;

	public const INTERESTS_ADD = 120;
	public const INTERESTS_GET_ALL = 121;
	public const INTERESTS_GET_ONE = 122;
	public const INTERESTS_GET_USERS = 123;
	public const INTERESTS_ENROLL_USER = 124;
	public const INTERESTS_UNENROLL_USER = 125;
	public const INTERESTS_CHECK_NAME = 126;
	public const INTERESTS_GET_INTERESTS_BY_USER = 127;
	public const INTERESTS_UPLOAD_LOGO = 128;

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

	public const FOLLOW_ADD = 160;
	public const FOLLOW_REMOVE = 161;
	public const FOLLOW_GET_FOLLOWERS = 162;
	public const FOLLOW_GET_FOLLOWINGS = 163;
	public const FOLLOW_IS_FOLLOWING = 164;

	public const MISSING_PARAMS = 400;
	public const INCORRECT_SCHEMA = 405;

}

class EMAIL {

	public const MESSAGE = "message";


}

class RESPONSE {

	public const STATUS = "status";
	public const ERROR_MESSAGE = "error_message";
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
	public const FOLLOWERS = "followers";
	public const FOLLOWINGS = "followings";
	public const EMAIL_AVAILABLE = "email_taken";
	public const USERNAME_AVAILABLE = "username_taken";
	public const NAME_AVAILABLE = "name_taken";
	public const FOLLOWS = "is_following";
	public const MAX_PROFILE = "profile_id";
	public const MAX_BANNER = "banner_id";

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
	public const UPLOAD_LOGO = 8;

}

class USERS_SCHEMA {

	public const ADD = 0;
	public const GET_ALL = 1;
	public const GET_ONE = 2;
	public const UPDATE = 3;
	public const CHECK = 4;
	public const AUTHENTICATE = 5;
	public const UPLOAD_PROFILE = 6;
	public const UPLOAD_BANNER = 7;

}

class LIKES_SCHEMA {

	public const LIKE = 0;
	public const UNLIKE = 1;
	public const GET_LIKES_BY_USER = 2;
	public const GET_LIKES_ON_THOUGHT = 3;
}

class FOLLOW_SCHEMA {

	public const FOLLOW = 0;
	public const UNFOLLOW = 1;
	public const GET_FOLLOWERS = 2;
	public const GET_FOLLOWINGS = 3;
	public const IS_FOLLOWING = 4;
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
	public const GET_BY_USERS = 6;

}

class POLLS_SCHEMA {

	public const ANSWER_POLL = 0;
	public const GET_OPTION = 1;

}

class UTILITIES {

	public const EMAIL = 0;

}