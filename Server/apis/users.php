<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    switch ($_GET["schema"]) {

        case 1:

            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_QUERY;
            $output[RESPONSE::USERS] = process($mysqli, "SELECT * FROM Users");
            echo json_encode($output);
            break;



    }

}