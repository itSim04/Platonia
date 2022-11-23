<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "likes";

    switch ($_GET["schema"]) {

        case LIKES_SCHEMA::LIKE:

            if (check_keys($_GET, LIKES::USER_ID, LIKES::THOUGHT_ID)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::LIKE_ADD;
                process($PDO, SQLFunctions::ADD, $table_name, $_GET, array(LIKES::USER_ID, LIKES::THOUGHT_ID), array());
            }
            break;

        case LIKES_SCHEMA::UNLIKE:

            if (check_keys($_GET, LIKES::USER_ID, LIKES::THOUGHT_ID)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::LIKE_REMOVE;
                process($PDO, SQLFunctions::DELETE, $table_name, $_GET, array(), array(new condition(LIKES::USER_ID), new condition(LIKES::THOUGHT_ID)));
            }
            break;

        case LIKES_SCHEMA::GET_LIKES_BY_USER:

            if (check_keys($_GET, LIKES::USER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::LIKE_GET_ALL_BY_USER;
                $output[RESPONSE::LIKES] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(LIKES::USER_ID)));

            }
            break;

        case LIKES_SCHEMA::GET_LIKES_ON_THOUGHT:

            if (check_keys($_GET, LIKES::THOUGHT_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::LIKE_GET_ALL_BY_USER;
                $output[RESPONSE::LIKES] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(LIKES::THOUGHT_ID)));

            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);
}