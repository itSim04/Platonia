<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    switch ($_GET["schema"]) {

        case USERS_SCHEMA::ADD:

            if(check_keys($_POST, USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_ADD;
                $id = process_fetch_id($mysqli, sprintf("INSERT INTO Users (%s, %s, %s, %s, %s) VALUES (?, ?, ?, ?, ?)", USERS::USERNAME, USERS::PASSWORD, USERS::BIRTHDAY, USERS::EMAIL, USERS::GENDER), $_POST[USERS::USERNAME], $_POST[USERS::PASSWORD], $_POST[USERS::BIRTHDAY], $_POST[USERS::EMAIL], $_POST[USERS::GENDER]);
                $output[RESPONSE::USER] = process_fetch($mysqli, sprintf("SELECT * FROM Users WHERE %s = ?", USERS::ID), $id);
                echo json_encode($output);

            }    
            break;

        case USERS_SCHEMA::GET_ALL:

            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ALL;
            $output[RESPONSE::USERS] = process_fetch($mysqli, "SELECT * FROM Users");
            echo json_encode($output);
            break;

        case USERS_SCHEMA::GET_ONE:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ONE;
                $output[RESPONSE::USER] = process_fetch($mysqli, sprintf("SELECT * FROM Users WHERE %s = ?", USERS::ID), $_GET[USERS::ID]);
                echo json_encode($output);
                
            }
            break;
            
        

    }

}