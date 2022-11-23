<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "users";

    switch ($_GET["schema"]) {

        case USERS_SCHEMA::ADD:

            if (check_keys($_POST, USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_ADD;
                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER), array());
                $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [USERS::ID => $id], array(), array(USERS::ID));

            }
            break;

        case USERS_SCHEMA::GET_ALL:

            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ALL;
            $output[RESPONSE::USERS] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array());
            break;

        case USERS_SCHEMA::GET_ONE:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ONE;
                $output[RESPONSE::USER] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(USERS::ID));

            }
            break;

        case USERS_SCHEMA::UPDATE:

            if (check_keys($_POST, USERS::ID, USERS::USERNAME, USERS::PASSWORD, USERS::EMAIL, USERS::BIO, USERS::BIRTHDAY, USERS::GENDER, USERS::PICTURE, USERS::BANNER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_UPDATE;
                process($PDO, SQLFunctions::UPDATE, $table_name, $_POST, array(USERS::USERNAME, USERS::PASSWORD, USERS::EMAIL, USERS::BIO, USERS::BIRTHDAY, USERS::GENDER, USERS::PICTURE, USERS::BANNER), array(USERS::ID));

            }
            break;

        case USERS_SCHEMA::CHECK:

            if (check_keys($_GET, USERS::USERNAME, USERS::EMAIL)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_CHECK;

                $output[RESPONSE::USERNAME_AVAILABLE] = process_availability($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(USERS::USERNAME));
                $output[RESPONSE::EMAIL_AVAILABLE] = process_availability($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(USERS::EMAIL));
            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);

}