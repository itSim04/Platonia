<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "users";
    $temp_table = "users_TEMP";

    switch ($_GET["schema"]) {

        case USERS_SCHEMA::ADD:

            if (check_keys($_POST, USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_ADD;
                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER), array());
                $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [USERS::ID => $id], array(), array(new condition(USERS::ID)));

            }
            break;

        case USERS_SCHEMA::GET_ALL:

            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ALL;
            $output[RESPONSE::USERS] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $temp_table), $_GET, array(), array(new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
            break;

        case USERS_SCHEMA::GET_ONE:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ONE;
                $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name, $temp_table), $_GET, array(), array(new condition(USERS::ID), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));

            }
            break;

        case USERS_SCHEMA::UPDATE:

            if (check_keys($_POST, USERS::ID, USERS::USERNAME, USERS::PASSWORD, USERS::EMAIL, USERS::BIO, USERS::BIRTHDAY, USERS::GENDER, USERS::PICTURE, USERS::BANNER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_UPDATE;
                process($PDO, SQLFunctions::UPDATE, $table_name, $_POST, array(USERS::USERNAME, USERS::PASSWORD, USERS::EMAIL, USERS::BIO, USERS::BIRTHDAY, USERS::GENDER, USERS::PICTURE, USERS::BANNER), array(new condition(USERS::ID)));

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

            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    if (count($output) > 0) {
        echo json_encode($output);
    }

}