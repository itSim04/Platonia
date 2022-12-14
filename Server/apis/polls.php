<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "answers";
    $option_name = "options";

    switch ($_GET["schema"]) {

        case POLLS_SCHEMA::ANSWER_POLL:

            if (check_keys($_POST, ANSWERS::THOUGHT_ID, ANSWERS::USER_ID, ANSWERS::OPTION_CHOSEN, ANSWERS::ANSWER_DATE)) {
                
                $output[RESPONSE::STATUS] = EXIT_CODES::POLLS_ANSWER_POLL;
                process($PDO, SQLFunctions::ADD, array($table_name), $_POST, array(ANSWERS::USER_ID, ANSWERS::THOUGHT_ID, ANSWERS::ANSWER_DATE, ANSWERS::OPTION_CHOSEN), array());
            
            }
            break;

            case POLLS_SCHEMA::GET_OPTION: 

                if (check_keys($_GET, OPTIONS::ID)) {

                    $output[RESPONSE::STATUS] = EXIT_CODES::POLLS_GET_OPTION;
                    $output[RESPONSE::OPTIONS] = process_fetch($PDO, SQLFunctions::SELECT, array($option_name), $_GET, array(), array(new condition(OPTIONS::ID)));
    
                }
                break;
        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;

    }
    echo json_encode($output);
}