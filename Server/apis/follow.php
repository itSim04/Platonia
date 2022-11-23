<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "follows";

    switch ($_GET["schema"]) {

        case FOLLOW_SCHEMA::FOLLOW:

            if (check_keys($_GET, FOLLOWS::USER_ID1, FOLLOWS::USER_ID2, FOLLOWS::FOLLOW_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::FOLLOW_ADD;
                if ($_GET[FOLLOWS::USER_ID1] != $_GET[FOLLOWS::USER_ID2]) {
                    process($PDO, SQLFunctions::ADD, $table_name, $_GET, array(FOLLOWS::USER_ID1, FOLLOWS::USER_ID2), array());
                } else {
                    $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
                }
            }

            break;

        case FOLLOW_SCHEMA::UNFOLLOW:

            if (check_keys($_GET, FOLLOWS::USER_ID1, FOLLOWS::USER_ID2, FOLLOWS::FOLLOW_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::FOLLOW_REMOVE;
                process($PDO, SQLFunctions::DELETE, $table_name, $_GET, array(), array(new condition(FOLLOWS::USER_ID1), new condition(FOLLOWS::USER_ID2)));

            }
            break;


        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);
}