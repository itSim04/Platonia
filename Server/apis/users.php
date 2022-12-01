<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "users";
    $temp_table = "users_TEMP";

    switch ($_GET["schema"]) {

        case USERS_SCHEMA::ADD:

            if (check_keys($_POST, USERS::USERNAME, USERS::JOIN, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_ADD;
                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(USERS::USERNAME, USERS::JOIN, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER), array());
                $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $temp_table), [USERS::ID => $id], array(), array(new condition(USERS::ID), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));

            }
            break;

        case USERS_SCHEMA::GET_ALL:

            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ALL;
            $output[RESPONSE::USERS] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $temp_table), $_GET, array(), array(new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
            for ($i = 0; $i < count($output[RESPONSE::USERS]); $i++) {
                $output[RESPONSE::USERS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::USERS][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::USERS][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
            }
            break;

        case USERS_SCHEMA::GET_ONE:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ONE;
                $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $temp_table), $_GET, array(), array(new condition(USERS::ID), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
                $output[RESPONSE::USER][0]->profile_id = is_dir("../assets/users/{$output[RESPONSE::USER][0]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::USER][0]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;


            }
            break;

        case USERS_SCHEMA::UPDATE:

            if (check_keys($_POST, USERS::ID)) {

                $keys = array(USERS::USERNAME, USERS::EMAIL, USERS::BIO, USERS::BIRTHDAY, USERS::GENDER, USERS::IS_VERIFIED);
                $keys_to_take = array();
                for ($i = 0, $j = 0; $i < count($keys); $i++) {
                    if (array_key_exists($keys[$i], $_POST)) {
                        $keys_to_take[$j++] = $keys[$i];
                    }
                }
                if (count($keys_to_take) == 0) {

                    $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
                    $output[RESPONSE::ERROR_MESSAGE] = "Nothing to Update";

                } else {

                    $output[RESPONSE::STATUS] = EXIT_CODES::USERS_UPDATE;
                    process($PDO, SQLFunctions::UPDATE, $table_name, $_POST, $keys_to_take, array(new condition(USERS::ID)));
                    $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $temp_table), [USERS::ID => $_POST[USERS::ID]], array(), array(new condition(USERS::ID), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
                    $output[RESPONSE::USER][0]->profile_id = is_dir("../assets/users/{$output[RESPONSE::USER][0]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::USER][0]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
            }
            break;

        case USERS_SCHEMA::CHECK:

            if (check_keys($_GET, USERS::USERNAME, USERS::EMAIL)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_CHECK;

                $output[RESPONSE::USERNAME_AVAILABLE] = process_availability($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(USERS::USERNAME)));
                $output[RESPONSE::EMAIL_AVAILABLE] = process_availability($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(USERS::EMAIL)));
            }
            break;

        case USERS_SCHEMA::AUTHENTICATE:

            if (check_keys($_POST, USERS::USERNAME, USERS::PASSWORD)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_AUTHENTICATE;
                $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $temp_table), $_POST, array(), array(new condition(USERS::USERNAME), new condition(USERS::PASSWORD), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
                if ($output[RESPONSE::USER] != null)
                    $output[RESPONSE::USER][0]->profile_id = is_dir("../assets/users/{$output[RESPONSE::USER][0]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::USER][0]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;



            }
            break;

        case USERS_SCHEMA::UPLOAD_PROFILE:

            if (check_keys($_POST, USERS::PICTURE, USERS::ID)) {

                $img = base64_decode($_POST[USERS::PICTURE]);
                $id = 0;
                if (!is_dir("../assets/users/{$_POST[USERS::ID]}")) {
                    mkdir("../assets/users/{$_POST[USERS::ID]}");
                } else {

                    $id = iterator_count(new FilesystemIterator("../assets/users/{$_POST[USERS::ID]}/", FilesystemIterator::SKIP_DOTS));
                }
                file_put_contents("../assets/users/{$_POST[USERS::ID]}/profile-{$id}.png", $img);
                $output[RESPONSE::MAX_PROFILE] = $id + 1;
                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_UPLOAD_PROFILE;

            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    if (count($output) > 0) {
        echo json_encode($output);
    }

}