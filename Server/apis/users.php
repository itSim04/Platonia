<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    switch ($_GET["schema"]) {

        case USERS_SCHEMA::GET_ALL:

            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ALL;
            $output[RESPONSE::USERS] = process($mysqli, "SELECT * FROM Users");
            echo json_encode($output);
            break;

        case USERS_SCHEMA::GET_ONE:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_GET_ONE;
                $output[RESPONSE::USER] = process($mysqli, sprintf("SELECT * FROM Users WHERE %s = ?", USERS::ID), $_GET[USERS::ID]);
                echo json_encode($output);
                break;

            }

    }

}