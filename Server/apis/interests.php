<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "interests";
    $pivot_table = "interested_in";
    $user_table = "users";
    $user_temp = "users_TEMP";

    $complex = array("*", "CASE WHEN (SELECT EXISTS(SELECT * FROM interested_in WHERE " . INTERESTED_IN::USER_ID . " = :user_id && " . INTERESTED_IN::INTEREST_ID . " = " . INTERESTS::ID . ")) THEN true ELSE false END as is_interested");

    switch ($_GET["schema"]) {

        case INTERESTS_SCHEMA::ADD:

            if (check_keys($_POST, INTERESTS::NAME, INTERESTS::IMG)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_ADD;
                $id = process_fetch_id($PDO, SQLFunctions::ADD, array($table_name), $_POST, array(INTERESTS::NAME, INTERESTS::IMG), array());
                $output[RESPONSE::INTEREST] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name), [INTERESTS::ID => $id], array(), array(new condition(INTERESTS::ID)));

            }
            break;

        case INTERESTS_SCHEMA::GET_ALL:

            if (check_keys($_GET, INTERESTED_IN::USER_ID)) {
                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_GET_ALL;
                $output[RESPONSE::INTERESTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, array($table_name), [USERS::ID => $_GET[INTERESTED_IN::USER_ID]], $complex, array());
                for ($i = 0; $i < count($output[RESPONSE::INTERESTS]); $i++) {
                    $output[RESPONSE::INTERESTS][$i]->profile_id = is_dir("../assets/interests/{$output[RESPONSE::INTERESTS][$i]->interest_id}") ? iterator_count(new FilesystemIterator("../assets/interests/{$output[RESPONSE::INTERESTS][$i]->interest_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
            }
            break;

        case INTERESTS_SCHEMA::GET_ONE:

            if (check_keys($_GET, INTERESTS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_GET_ONE;
                $output[RESPONSE::INTEREST] = process_fetch($PDO, SQLFunctions::SELECT, array($table_name), $_GET, array(), array(new condition(INTERESTS::ID)));
                $output[RESPONSE::INTEREST][0]->profile_id = is_dir("../assets/interests/{$output[RESPONSE::INTEREST][0]->interest_id}") ? iterator_count(new FilesystemIterator("../assets/interests/{$output[RESPONSE::INTEREST][0]->interest_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
            }
            break;

        case INTERESTS_SCHEMA::GET_USERS:

            if (check_keys($_GET, INTERESTED_IN::INTEREST_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_GET_USERS;
                $output[RESPONSE::USERS] = process_fetch($PDO, SQLFunctions::SELECT, array($pivot_table, $user_table, $user_temp), $_GET, array(), array(new condition(INTERESTED_IN::INTEREST_ID), new condition(INTERESTED_IN::USER_ID . " = " . USERS::ID, false), new condition(USERS::ID . " = " . USERS_TEMP::ID, false)));
                for ($i = 0; $i < count($output[RESPONSE::USERS]); $i++) {
                    $output[RESPONSE::USERS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::USERS][$i]->user_id}/profiles") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::USERS][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
            }
            break;


        case INTERESTS_SCHEMA::ENROLL_USER:

            if (check_keys($_GET, INTERESTED_IN::USER_ID, INTERESTED_IN::INTEREST_ID, INTERESTED_IN::INTEREST_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_ENROLL_USER;
                process($PDO, SQLFunctions::ADD, array($pivot_table), $_GET, array(INTERESTED_IN::USER_ID, INTERESTED_IN::INTEREST_ID, INTERESTED_IN::INTEREST_DATE), array());

            }
            break;

        case INTERESTS_SCHEMA::UNENROLL_USER:

            if (check_keys($_GET, INTERESTED_IN::USER_ID, INTERESTED_IN::INTEREST_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_UNENROLL_USER;
                process($PDO, SQLFunctions::DELETE, array($pivot_table), $_GET, array(), array(new condition(INTERESTED_IN::INTEREST_ID)));

            }
            break;


        case INTERESTS_SCHEMA::CHECK_NAME:

            if (check_keys($_GET, INTERESTS::NAME)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::USERS_CHECK;

                $output[RESPONSE::NAME_AVAILABLE] = process_availability($PDO, SQLFunctions::SELECT, array($table_name), $_GET, array(), array(new condition(INTERESTS::NAME)));
            }
            break;

        case INTERESTS_SCHEMA::GET_INTERESTS:

            if (check_keys($_GET, INTERESTED_IN::USER_ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_GET_INTERESTS_BY_USER;
                $output[RESPONSE::INTERESTS] = process_fetch($PDO, SQLFunctions::SELECT, array($pivot_table, $table_name), $_GET, array(), array(new condition(INTERESTED_IN::USER_ID), new condition(INTERESTED_IN::INTEREST_ID . " = " . INTERESTS::ID, false)));

                for ($i = 0; $i < count($output[RESPONSE::INTERESTS]); $i++) {
                    $output[RESPONSE::INTERESTS][$i]->profile_id = is_dir("../assets/interests/{$output[RESPONSE::INTERESTS][$i]->interest_id}") ? iterator_count(new FilesystemIterator("../assets/interests/{$output[RESPONSE::INTERESTS][$i]->interest_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
            }
            break;

        case INTERESTS_SCHEMA::UPLOAD_LOGO:

            if (check_keys($_POST, INTERESTS::LOGO, INTERESTS::ID)) {

                $img = base64_decode($_POST[INTERESTS::LOGO]);
                $id = 0;
                if (!is_dir("../assets/interests/{$_POST[INTERESTS::ID]}")) {

                    mkdir("../assets/interests/{$_POST[INTERESTS::ID]}");

                } else {

                    $id = iterator_count(new FilesystemIterator("../assets/interests/{$_POST[INTERESTS::ID]}/", FilesystemIterator::SKIP_DOTS));
                }
                file_put_contents("../assets/interests/{$_POST[INTERESTS::ID]}/logo-{$id}.png", $img);
                $output[RESPONSE::MAX_PROFILE] = $id + 1;
                $output[RESPONSE::STATUS] = EXIT_CODES::INTERESTS_UPLOAD_LOGO;


            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
            $output[RESPONSE::ERROR_MESSAGE] = "Incorrect Schema: " . $_GET['schema'];

    }


    echo json_encode($output);
}