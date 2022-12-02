<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "thoughts";
    $tables = array("thoughts, thoughts_TEMP, users, users_TEMP");
    $linkers = array(new condition(THOUGHTS::ID . " = " . THOUGHTS_TEMP::ID, false), new condition(USERS::ID . " = " . USERS_TEMP::ID, false), new condition(USERS::ID . " = " . THOUGHTS::OWNER_ID, false));
    $option_name = "options";
    $complex = array("*", "CASE WHEN (SELECT EXISTS(SELECT * FROM likes WHERE " . LIKES::USER_ID . " = :user_id1 && " . LIKES::THOUGHT_ID . " = " . THOUGHTS::ID . ")) THEN true ELSE false END as is_liked", "CASE WHEN (SELECT NOT EXISTS(SELECT * FROM answers WHERE " . ANSWERS::USER_ID . " = :user_id2 && " . ANSWERS::THOUGHT_ID . " = " . THOUGHTS::ID . ")) THEN 0 ELSE (SELECT option_chosen FROM answers WHERE " . ANSWERS::USER_ID . " = :user_id3 && " . ANSWERS::THOUGHT_ID . " = " . THOUGHTS::ID . ") END as is_voted", "CASE WHEN (SELECT EXISTS(SELECT * FROM platons WHERE " . PLATONS::USER_ID . " = :user_id4 && " . PLATONS::THOUGHT_ID . " = " . THOUGHTS::ID . ")) THEN true ELSE false END as is_platoned");

    switch ($_GET["schema"]) {

        case THOUGHTS_SCHEMA::ADD:

            if (check_keys($_POST, THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID)) {

                if ($_POST[THOUGHTS::TYPE] == 3 && check_keys($_POST, THOUGHTS::POLL1, THOUGHTS::POLL2) || $_POST[THOUGHTS::TYPE] != 3) {

                    $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_ADD;
                    if (array_key_exists(THOUGHTS::ROOT, $_POST)) {

                        $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT), array());

                    } else {

                        $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID), array());
                        process($PDO, SQLFunctions::UPDATE, $table_name, [THOUGHTS::ROOT => $id, THOUGHTS::ID => $id], array(THOUGHTS::ROOT), array(new condition(THOUGHTS::ID)));

                    }
                    $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [THOUGHTS::ID => $id], array(), array(new condition(THOUGHTS::ID)));

                    if ($_POST[THOUGHTS::TYPE] == 3) {
                        process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL1], THOUGHTS::POSITION => 1], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                        process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL2], THOUGHTS::POSITION => 2], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                        process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL3], THOUGHTS::POSITION => 3], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                        process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL4], THOUGHTS::POSITION => 4], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                    }

                }

            }

            break;

        case THOUGHTS_SCHEMA::GET_ALL:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ALL;
                if (!array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ID . " = " . THOUGHTS::ROOT, false))));

                } else {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT], THOUGHTS::ID => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT, true, true), new condition(THOUGHTS::ID, true, false))));

                }
                for ($i = 0; $i < count($output[RESPONSE::THOUGHTS]); $i++) {
                    $output[RESPONSE::THOUGHTS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
            }
            break;

        case THOUGHTS_SCHEMA::GET_ONE:

            if (check_keys($_GET, THOUGHTS::ID, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ONE;
                $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ID => $_GET[THOUGHTS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ID))));

                $output[RESPONSE::THOUGHT][0]->profile_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][0]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][0]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;


            }
            break;

        case THOUGHTS_SCHEMA::GET_BY:

            if (check_keys($_GET, USERS::ID, THOUGHTS::OWNER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_BY;
                if (array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT), new condition(THOUGHTS::OWNER_ID))));

                } else {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::OWNER_ID))));

                }
                for ($i = 0; $i < count($output[RESPONSE::THOUGHTS]); $i++) {
                    $output[RESPONSE::THOUGHTS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }

            }
            break;

        case THOUGHTS_SCHEMA::UPDATE:

            if (check_keys($_POST, THOUGHTS::ID, THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_UPDATE;
                process($PDO, SQLFunctions::UPDATE, $table_name, $_POST, array(THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE), array(new condition(THOUGHTS::ID)));

            }
            break;

        case THOUGHTS_SCHEMA::GET_BY:

            if (check_keys($_GET, USERS::ID, THOUGHTS::OWNER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_BY;
                if (array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT), new condition(THOUGHTS::OWNER_ID))));

                } else {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::OWNER_ID))));

                }
                for ($i = 0; $i < count($output[RESPONSE::THOUGHTS]); $i++) {
                    $output[RESPONSE::THOUGHTS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }

            }
            break;


        case THOUGHTS_SCHEMA::GET_BY_USERS:

            if (check_keys($_GET, USERS::ID, THOUGHTS::OWNER_ID, USERS::OFFSET, USERS::QUANTITY)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_BY_USERS;
                if (array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT), new condition(THOUGHTS::OWNER_ID . " IN (" . implode(", ", $_GET[THOUGHTS::OWNER_ID]) . ")", false))));

                } else {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::OWNER_ID . " IN (" . implode(", ", $_GET[THOUGHTS::OWNER_ID]) . ")", false))), "ORDER BY share_date LIMIT " . $_GET[USERS::OFFSET] . ", " . $_GET[USERS::QUANTITY]);

                }
                for ($i = 0; $i < count($output[RESPONSE::THOUGHTS]); $i++) {
                    $output[RESPONSE::THOUGHTS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }

            }
            break;

        case THOUGHTS_SCHEMA::UPDATE:

            if (check_keys($_POST, THOUGHTS::ID, THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_UPDATE;
                process($PDO, SQLFunctions::UPDATE, $table_name, $_POST, array(THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE), array(new condition(THOUGHTS::ID)));

            }

        case THOUGHTS_SCHEMA::DELETE:

            if (check_keys($_GET, THOUGHTS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_DELETE;
                process($PDO, SQLFunctions::DELETE, $table_name, $_GET, array(), array(new condition(THOUGHTS::ID)));

            }
            break;
        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);

}