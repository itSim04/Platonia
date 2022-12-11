<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "likes";
    $user_table = "users";
    $thoughts_table = "thoughts";
    $user_temp = "users_TEMP";
    $thoughts_temp = "thoughts_TEMP";

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
                $output[RESPONSE::LIKES] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $thoughts_table, $thoughts_temp), $_GET, array(), array(new condition(LIKES::USER_ID), new condition(THOUGHTS::ID . " = " . LIKES::THOUGHT_ID, false), new condition(THOUGHTS::ID . " = " . THOUGHTS_TEMP::ID, false)));
            }
            break;

        case LIKES_SCHEMA::GET_LIKES_ON_THOUGHT:

            if (check_keys($_GET, LIKES::THOUGHT_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::LIKE_GET_ALL_ON_THOUGHT;
                $output[RESPONSE::LIKES] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $user_table, $user_temp), $_GET, array(), array(new condition(LIKES::THOUGHT_ID), new condition(LIKES::USER_ID . " = " . USERS::ID, false), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
                for ($i = 0; $i < count($output[RESPONSE::LIKES]); $i++) {
                    $output[RESPONSE::LIKES][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::LIKES][$i]->user_id}/profiles/") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::LIKES][$i]->user_id}/profiles/", FilesystemIterator::SKIP_DOTS)) : 0;
                    $output[RESPONSE::LIKES][$i]->banner_id = is_dir("../assets/users/{$output[RESPONSE::LIKES][$i]->user_id}/banners/") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::LIKES][$i]->user_id}/banners/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
    }
    echo json_encode($output);
}
