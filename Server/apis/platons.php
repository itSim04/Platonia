<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "platons";

    switch ($_GET["schema"]) {

        case PLATONS_SCHEMA::PLATON:

            if (check_keys($_GET, PLATONS::USER_ID, PLATONS::THOUGHT_ID)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_ADD;
                process($PDO, SQLFunctions::ADD, $table_name, $_GET, array(PLATONS::USER_ID, PLATONS::THOUGHT_ID), array());
            }
            break;

        case PLATONS_SCHEMA::UNPLATON:

            if (check_keys($_GET, PLATONS::USER_ID, PLATONS::THOUGHT_ID)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_REMOVE;
                process($PDO, SQLFunctions::DELETE, $table_name, $_GET, array(), array(new condition(PLATONS::USER_ID), new condition(PLATONS::THOUGHT_ID)));
            }
            break;

        case PLATONS_SCHEMA::GET_PLATONS_BY_USER:

            if (check_keys($_GET, PLATONS::USER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_GET_ALL_BY_USER;
                $output[RESPONSE::PLATONS] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(PLATONS::USER_ID)));

            }
            break;

        case PLATONS_SCHEMA::GET_PLATONS_ON_THOUGHT:

            if (check_keys($_GET, PLATONS::THOUGHT_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::PLATON_GET_ALL_BY_USER;
                $output[RESPONSE::PLATONS] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, $_GET, array(), array(new condition(PLATONS::THOUGHT_ID)));

            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);
}