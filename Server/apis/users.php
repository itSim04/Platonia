<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    switch ($_GET["schema"]) {

        case USERS_SCHEMA::ADD:

            if (check_keys($_POST, USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_ADD;
                $id = process_fetch_id($mysqli, sprintf("INSERT INTO Users (%s, %s, %s, %s, %s) VALUES (?, ?, ?, ?, ?)", USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER), $_POST[USERS::USERNAME], $_POST[USERS::PASSWORD], $_POST[USERS::BIRTHDAY], $_POST[USERS::EMAIL], $_POST[USERS::GENDER]);
                $output[RESPONSE::USER] = process_fetch($mysqli, sprintf("SELECT * FROM Users WHERE %s = ?", USERS::ID), $id);

            }
            break;

        case USERS_SCHEMA::GET_ALL:

            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ALL;
            $output[RESPONSE::USERS] = process_fetch($mysqli, "SELECT * FROM Users");
            break;

        case USERS_SCHEMA::GET_ONE:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ONE;
                $output[RESPONSE::USER] = process_fetch($mysqli, sprintf("SELECT * FROM Users WHERE %s = ?", USERS::ID), $_GET[USERS::ID]);

            }
            break;

        case USERS_SCHEMA::UPDATE:

            if (check_keys($_POST, USERS::ID, USERS::USERNAME, USERS::PASSWORD, USERS::EMAIL, USERS::BIO, USERS::BIRTHDAY, USERS::GENDER, USERS::PICTURE, USERS::BANNER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_UPDATE;
                process($mysqli, sprintf("UPDATE users SET %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ? WHERE %s = ?", USERS::USERNAME, USERS::PASSWORD, USERS::EMAIL, USERS::BIO, USERS::BIRTHDAY, USERS::GENDER, USERS::PICTURE, USERS::BANNER, USERS::ID), $_POST[USERS::USERNAME], $_POST[USERS::PASSWORD], $_POST[USERS::EMAIL], $_POST[USERS::BIO], $_POST[USERS::BIRTHDAY], $_POST[USERS::GENDER], $_POST[USERS::PICTURE], $_POST[USERS::BANNER], $_POST[USERS::ID]);

            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
            
            
            
        }
        echo json_encode($output);

}