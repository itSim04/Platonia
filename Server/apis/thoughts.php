<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "thoughts";

    switch ($_GET["schema"]) {

        case THOUGHTS_SCHEMA::ADD:

            if (check_keys($_POST, THOUGHTS::SHARE_DATE, THOUGHTS::EDIT_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_ADD;
                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::EDIT_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID), array());
                process($PDO, SQLFunctions::UPDATE, $table_name, [THOUGHTS::ROOT => $id], array(THOUGHTS::ROOT), array(THOUGHTS::ID));
                $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [THOUGHTS::ID => $id], array(), array(THOUGHTS::ID));

            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);

}