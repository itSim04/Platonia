<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "follows";

    switch ($_GET["schema"]) {

        case FOLLOW_SCHEMA::FOLLOW:

            if (check_keys($_GET, FOLLOWS::USER_ID1, FOLLOWS::USER_ID2, FOLLOWS::FOLLOW_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::FOLLOW_ADD;
                if ($_GET[FOLLOWS::USER_ID1] != $_GET[FOLLOWS::USER_ID2]) {
                    process($PDO, SQLFunctions::ADD, $table_name, $_GET, array(FOLLOWS::USER_ID1, FOLLOWS::USER_ID2), array());
                } else {
                    $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
                }
            }

            break;

        case FOLLOW_SCHEMA::UNFOLLOW:

            if (check_keys($_GET, FOLLOWS::USER_ID1, FOLLOWS::USER_ID2, FOLLOWS::FOLLOW_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::FOLLOW_REMOVE;
                process($PDO, SQLFunctions::DELETE, $table_name, $_GET, array(), array(new condition(FOLLOWS::USER_ID1), new condition(FOLLOWS::USER_ID2)));

            }
            break;

        case FOLLOW_SCHEMA::GET_FOLLOWERS:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::FOLLOW_GET_FOLLOWERS;
                $output[RESPONSE::FOLLOWERS] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [FOLLOWS::USER_ID2 => $_GET[USERS::ID]], array(), array(new condition(FOLLOWS::USER_ID2)));

            }
            break;

        case FOLLOW_SCHEMA::GET_FOLLOWINGS:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::FOLLOW_GET_FOLLOWINGS;
                $output[RESPONSE::FOLLOWINGS] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [FOLLOWS::USER_ID1 => $_GET[USERS::ID]], array(), array(new condition(FOLLOWS::USER_ID1)));

            }
            break;
        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);
}