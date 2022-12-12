<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "platons";
    $user_table = "users";
    $thoughts_table = "thoughts";
    $user_temp = "users_TEMP";
    $thoughts_temp = "thoughts_TEMP";

    switch ($_GET["schema"]) {

        case PLATONS_SCHEMA::PLATON:

            if (check_keys($_GET, PLATONS::USER_ID, PLATONS::THOUGHT_ID, PLATONS::PLATON_DATE)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_ADD;

                $id = process_fetch_id($PDO, SQLFunctions::ADD, $thoughts_table, [THOUGHTS::SHARE_DATE => $_GET[PLATONS::PLATON_DATE], THOUGHTS::CONTENT => "", THOUGHTS::TYPE => 4, THOUGHTS::OWNER_ID => $_GET[PLATONS::USER_ID], THOUGHTS::ROOT => $_GET[PLATONS::THOUGHT_ID]], array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT), array());
                process($PDO, SQLFunctions::ADD, $table_name, [PLATONS::USER_ID => $_GET[PLATONS::USER_ID], PLATONS::THOUGHT_ID => $id, PLATONS::PLATON_DATE => $_GET[PLATONS::PLATON_DATE], PLATONS::ROOT_ID => $_GET[PLATONS::THOUGHT_ID]], array(PLATONS::USER_ID, PLATONS::THOUGHT_ID, PLATONS::PLATON_DATE, PLATONS::ROOT_ID), array());
            }
            break;

        case PLATONS_SCHEMA::UNPLATON:

            if (check_keys($_GET, PLATONS::USER_ID, PLATONS::ROOT_ID)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_REMOVE;
                $id = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(PLATONS::USER_ID), new condition(PLATONS::ROOT_ID)))[0]->thought_id_fk_platons;
                echo $id;
                process($PDO, SQLFunctions::DELETE, $thoughts_table, [THOUGHTS::ID => $id], array(), array(new condition(THOUGHTS::ID)));
            }
            break;

        case PLATONS_SCHEMA::GET_PLATONS_BY_USER:

            if (check_keys($_GET, PLATONS::USER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_GET_ALL_BY_USER;
                $output[RESPONSE::PLATONS] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $thoughts_table, $thoughts_temp), $_GET, array(), array(new condition(PLATONS::USER_ID), new condition(THOUGHTS::ID . " = " . PLATONS::THOUGHT_ID, false), new condition(THOUGHTS::ID . " = " . THOUGHTS_TEMP::ID, false)));
            }
            break;

        case PLATONS_SCHEMA::GET_PLATONS_ON_THOUGHT:

            if (check_keys($_GET, PLATONS::THOUGHT_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_GET_ALL_ON_THOUGHT;
                $output[RESPONSE::PLATONS] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $user_table, $user_temp), $_GET, array(), array(new condition(PLATONS::THOUGHT_ID), new condition(PLATONS::USER_ID . " = " . USERS::ID, false), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
                for ($i = 0; $i < count($output[RESPONSE::LIKES]); $i++) {
                    $output[RESPONSE::LIKES][$i]->profile_id = is_dir("../assets/users/profiles/{$output[RESPONSE::LIKES][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/profiles/{$output[RESPONSE::LIKES][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                    $output[RESPONSE::LIKES][$i]->profile_id = is_dir("../assets/users/banners/{$output[RESPONSE::LIKES][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/banners/{$output[RESPONSE::LIKES][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
    }
    echo json_encode($output);
}
