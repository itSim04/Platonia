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



    }

    echo json_encode($output);
}