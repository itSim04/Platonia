<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "thoughts";
    $complex = array("*", "CASE WHEN (SELECT EXISTS(SELECT * FROM likes WHERE likes.user_id = :user_id1 && likes.thought_id = thoughts.thought_id)) THEN true ELSE false END as is_liked", "CASE WHEN (SELECT NOT EXISTS(SELECT * FROM answers WHERE answers.user_id = :user_id2 && answers.thought_id = thoughts.thought_id)) THEN 0 ELSE (SELECT option_chosen FROM answers WHERE answers.user_id = :user_id3 && answers.thought_id = thoughts.thought_id) END as is_voted", "CASE WHEN (SELECT EXISTS(SELECT * FROM platons WHERE platons.user_id = :user_id4 && platons.thought_id = thoughts.thought_id)) THEN true ELSE false END as is_platoned");

    switch ($_GET["schema"]) {

        case THOUGHTS_SCHEMA::ADD:

            if (check_keys($_POST, THOUGHTS::SHARE_DATE, THOUGHTS::EDIT_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_ADD;
                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::EDIT_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID), array());
                process($PDO, SQLFunctions::UPDATE, $table_name, [THOUGHTS::ROOT => $id], array(THOUGHTS::ROOT), array(new condition(THOUGHTS::ID)));
                $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [THOUGHTS::ID => $id], array(), array( new condition(THOUGHTS::ID)));

            }
            break;

        case THOUGHTS_SCHEMA::GET_ALL:

            if (check_keys($_GET, USERS::ID)) {

                if (!array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ALL;
                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $table_name, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array(new condition(THOUGHTS::ID  . " = " . THOUGHTS::ROOT, false)));

                } else {

                    $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ALL;
                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $table_name, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT], THOUGHTS::ID => $_GET[THOUGHTS::ROOT]], $complex, array(new condition(THOUGHTS::ROOT, true, true), new condition(THOUGHTS::ID, true, false)));
                
                }
            }
            break;

        case THOUGHTS_SCHEMA::GET_ONE:

            if (check_keys($_GET, THOUGHTS::ID, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ONE;
                $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $table_name, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ID => $_GET[THOUGHTS::ID]], $complex, array(new condition(THOUGHTS::ID)));

            }
            break;

        case THOUGHTS_SCHEMA::GET_BY:

            if (check_keys($_GET, USERS::ID, THOUGHTS::OWNER_ID)) {

                if (array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ONE;
                    $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $table_name, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT]], $complex, array( new condition(THOUGHTS::ROOT),  new condition(THOUGHTS::OWNER_ID)));

                } else {

                    $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ONE;
                    $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $table_name, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID]], $complex, array( new condition(THOUGHTS::OWNER_ID)));

                }
            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);

}