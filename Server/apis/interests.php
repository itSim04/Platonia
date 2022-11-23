<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "interests";
    $pivot_name = "interested_in";

    switch ($_GET["schema"]) {

        case INTERESTS_SCHEMA::ADD:

            if (check_keys($_GET, INTERESTS::NAME, INTERESTS::IMG)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_ADD;
                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_GET, array(INTERESTS::NAME, INTERESTS::IMG), array());
                $output[RESPONSE::INTEREST] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [INTERESTS::ID => $id], array(), array(new condition(INTERESTS::ID)));

            }
            break;

        case INTERESTS_SCHEMA::GET_ALL:

            $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_GET_ALL;
            $output[RESPONSE::INTERESTS] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array());
            break;

        case INTERESTS_SCHEMA::GET_ONE:

            if (check_keys($_GET, INTERESTS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_GET_ONE;
                $output[RESPONSE::INTEREST] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(INTERESTS::ID)));

            }
            break;

        case INTERESTS_SCHEMA::ENROLL_USER:

            if (check_keys($_GET, INTERESTED_IN::USER_ID, INTERESTED_IN::INTEREST_ID, INTERESTED_IN::INTEREST_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_ENROLL_USER;

                process($PDO, SQLFunctions::ADD, $pivot_name, $_GET, array(INTERESTED_IN::USER_ID, INTERESTED_IN::INTEREST_ID, INTERESTED_IN::INTEREST_DATE), array());
                //$participants = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(INTERESTED_IN::INTEREST_ID)))[0]->participants_TEMP;
                //process($PDO, SQLFunctions::UPDATE, $table_name, [INTERESTS::PARTICIPANTS => $participants + 1, INTERESTS::ID => $_GET[INTERESTS::ID]], array(INTERESTS::PARTICIPANTS), array(new condition(INTERESTED_IN::INTEREST_ID)));

            }
            break;

        case INTERESTS_SCHEMA::UNENROLL_USER:

            if (check_keys($_GET, INTERESTED_IN::USER_ID, INTERESTED_IN::INTEREST_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_UNENROLL_USER;

                process($PDO, SQLFunctions::DELETE, $pivot_name, $_GET, array(), array(new condition(INTERESTED_IN::INTEREST_ID)));
                //$participants = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(INTERESTED_IN::INTEREST_ID)))[0]->participants_TEMP;
                //process($PDO, SQLFunctions::UPDATE, $table_name, [INTERESTS::PARTICIPANTS => $participants - 1, INTERESTS::ID => $_GET[INTERESTS::ID]], array(INTERESTS::PARTICIPANTS), array(new condition(INTERESTED_IN::INTEREST_ID)));

            }
            break;


    }

    echo json_encode($output);
}