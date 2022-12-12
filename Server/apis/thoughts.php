<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {

    $table_name = "thoughts";
    $tables = array("thoughts, thoughts_TEMP, users, users_TEMP");
    $linkers = array(new condition(THOUGHTS::ID . " = " . THOUGHTS_TEMP::ID, false), new condition(USERS::ID . " = " . USERS_TEMP::ID, false), new condition(USERS::ID . " = " . THOUGHTS::OWNER_ID, false));
    $option_name = "options";
    $complex = array("*", "CASE WHEN (SELECT EXISTS(SELECT * FROM likes WHERE " . LIKES::USER_ID . " = :user_id1 && " . LIKES::THOUGHT_ID . " = " . THOUGHTS::ID . ")) THEN true ELSE false END as is_liked", "CASE WHEN (SELECT NOT EXISTS(SELECT * FROM answers WHERE " . ANSWERS::USER_ID . " = :user_id2 && " . ANSWERS::THOUGHT_ID . " = " . THOUGHTS::ID . ")) THEN 0 ELSE (SELECT option_chosen FROM answers WHERE " . ANSWERS::USER_ID . " = :user_id3 && " . ANSWERS::THOUGHT_ID . " = " . THOUGHTS::ID . ") END as is_voted", "CASE WHEN (SELECT EXISTS(SELECT * FROM platons WHERE " . PLATONS::USER_ID . " = :user_id4 && " . PLATONS::ROOT_ID . " = " . THOUGHTS::ID . ")) THEN true ELSE false END as is_platoned");

    switch ($_GET["schema"]) {

        case THOUGHTS_SCHEMA::ADD:

            if (check_keys($_POST, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::SHARE_DATE)) {

                switch ($_POST[THOUGHTS::TYPE]) {

                    case 0:

                        if (check_keys($_POST, THOUGHTS::CONTENT)) {
                            $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_ADD;
                            if (array_key_exists(THOUGHTS::ROOT, $_POST)) {

                                if (array_key_exists(THOUGHTS::IS_OPINION, $_POST)) {
                                    $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT, THOUGHTS::IS_OPINION), array());
                                } else {
                                    $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT), array());
                                }
                            } else {

                                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID), array());
                                process($PDO, SQLFunctions::UPDATE, $table_name, [THOUGHTS::ROOT => $id, THOUGHTS::ID => $id], array(THOUGHTS::ROOT), array(new condition(THOUGHTS::ID)));
                            }
                            $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [THOUGHTS::ID => $id], array(), array(new condition(THOUGHTS::ID)));
                        }
                        break;

                    case 1:

                        if (check_keys($_POST, THOUGHTS::MEDIA)) {


                            $output[RESPONSE::STATUS] = EXIT_CODES::USERS_UPLOAD_PROFILE;
                            $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_ADD;

                            if (array_key_exists(THOUGHTS::ROOT, $_POST)) {

                                if (array_key_exists(THOUGHTS::IS_OPINION, $_POST)) {
                                    $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT, THOUGHTS::IS_OPINION), array());
                                } else {
                                    $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT), array());
                                }
                            } else {

                                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID), array());
                                process($PDO, SQLFunctions::UPDATE, $table_name, [THOUGHTS::ROOT => $id, THOUGHTS::ID => $id], array(THOUGHTS::ROOT), array(new condition(THOUGHTS::ID)));
                            }
                            $img = base64_decode($_POST[THOUGHTS::MEDIA]);
                            mkdir("../assets/thoughts/{$id}");
                            file_put_contents("../assets/thoughts/{$id}/img-src.png", $img);
                            $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [THOUGHTS::ID => $id], array(), array(new condition(THOUGHTS::ID)));
                        }
                        break;


                    case 3:

                        if (check_keys($_POST, THOUGHTS::POLL1, THOUGHTS::POLL2, THOUGHTS::CONTENT)) {

                            $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_ADD;
                            if (array_key_exists(THOUGHTS::ROOT, $_POST)) {

                                if (array_key_exists(THOUGHTS::IS_OPINION, $_POST)) {
                                    $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT, THOUGHTS::IS_OPINION), array());
                                } else {
                                    $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID, THOUGHTS::ROOT), array());
                                }
                            } else {

                                $id = process_fetch_id($PDO, SQLFunctions::ADD, $table_name, $_POST, array(THOUGHTS::SHARE_DATE, THOUGHTS::CONTENT, THOUGHTS::TYPE, THOUGHTS::OWNER_ID), array());
                                process($PDO, SQLFunctions::UPDATE, $table_name, [THOUGHTS::ROOT => $id, THOUGHTS::ID => $id], array(THOUGHTS::ROOT), array(new condition(THOUGHTS::ID)));
                            }
                            $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT, $table_name, [THOUGHTS::ID => $id], array(), array(new condition(THOUGHTS::ID)));

                            if ($_POST[THOUGHTS::TYPE] == 3) {
                                process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL1], THOUGHTS::POSITION => 1], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                                process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL2], THOUGHTS::POSITION => 2], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                                process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL3], THOUGHTS::POSITION => 3], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                                process($PDO, SQLFunctions::ADD, $option_name, [OPTIONS::ID => $id, THOUGHTS::CONTENT => $_POST[THOUGHTS::POLL4], THOUGHTS::POSITION => 4], array(OPTIONS::ID, THOUGHTS::CONTENT, THOUGHTS::POSITION), array());
                            }
                        }
                        break;
                }
            }
            break;

        case THOUGHTS_SCHEMA::GET_ALL:

            if (check_keys($_GET, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ALL;
                if (!array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::IS_OPINION . " = 0", false))));
                } else {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT], THOUGHTS::ID => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT, true, true), new condition(THOUGHTS::ID, true, false), new condition(THOUGHTS::IS_OPINION . " = 1", false))));
                }
                $ids = array();
                for ($i = 0; $i < count($output[RESPONSE::THOUGHTS]); $i++) {

                    if($output[RESPONSE::THOUGHTS][$i]->type == 4) {

                        $ids[] = $output[RESPONSE::THOUGHTS][$i]->root_id;

                    }
                    
                    $output[RESPONSE::THOUGHTS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/profiles") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/profiles/", FilesystemIterator::SKIP_DOTS)) : 0;
                    $output[RESPONSE::THOUGHTS][$i]->banner_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/banners") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/banners/", FilesystemIterator::SKIP_DOTS)) : 0;
                }
                $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ID . " IN (" . implode(", ", $ids) . ")", false), new condition(THOUGHTS::IS_OPINION . " = 0", false))), "ORDER BY share_date DESC");
            }
            break;

        case THOUGHTS_SCHEMA::GET_ONE:

            if (check_keys($_GET, THOUGHTS::ID, USERS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_ONE;
                $output[RESPONSE::THOUGHT] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ID => $_GET[THOUGHTS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ID))));

                $output[RESPONSE::THOUGHT][0]->profile_id = is_dir("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][0]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][0]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                $output[RESPONSE::THOUGHT][0]->banner_id = is_dir("../assets/users/banners/{$output[RESPONSE::THOUGHTS][0]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/banners/{$output[RESPONSE::THOUGHTS][0]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;


                if ($output[RESPONSE::THOUGHTS][0]->type) {

                    $options = process_fetch($PDO, SQLFunctions::SELECT, $option_name, [OPTIONS::ID => $output[RESPONSE::THOUGHTS][0]->thought_id], array(), array(new condition(OPTIONS::ID)));
                    if (count($options) > 0) {

                        $output[RESPONSE::THOUGHTS][0]->poll1 = $options[0]->content;
                        $output[RESPONSE::THOUGHTS][0]->votes1 = $options[0]->votes;
                    }

                    if (count($options) > 1) {

                        $output[RESPONSE::THOUGHTS][0]->poll2 = $options[1]->content;
                        $output[RESPONSE::THOUGHTS][0]->votes2 = $options[1]->votes;
                    }

                    if (count($options) > 2) {

                        $output[RESPONSE::THOUGHTS][0]->poll3 = $options[2]->content;
                        $output[RESPONSE::THOUGHTS][0]->votes3 = $options[2]->votes;
                    }

                    if (count($options) > 3) {

                        $output[RESPONSE::THOUGHTS][0]->poll4 = $options[3]->content;
                        $output[RESPONSE::THOUGHTS][0]->votes4 = $options[3]->votes;
                    }
                }
            }
            break;

            // case THOUGHTS_SCHEMA::GET_BY:

            //     if (check_keys($_GET, USERS::ID, THOUGHTS::OWNER_ID)) {

            //         $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_BY;
            //         if (array_key_exists(THOUGHTS::ROOT, $_GET)) {

            //             $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT), new condition(THOUGHTS::OWNER_ID))));

            //         } else {

            //             $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::OWNER_ID))));

            //         }
            //         for ($i = 0; $i < count($output[RESPONSE::THOUGHTS]); $i++) {
            //             $output[RESPONSE::THOUGHTS][$i]->profile_id = is_dir("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/{$output[RESPONSE::THOUGHTS][$i]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
            //         }

            //     }
            //     break;

        case THOUGHTS_SCHEMA::UPDATE:

            if (check_keys($_POST, THOUGHTS::ID, THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_UPDATE;
                process($PDO, SQLFunctions::UPDATE, $table_name, $_POST, array(THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE), array(new condition(THOUGHTS::ID)));
            }
            break;

        case THOUGHTS_SCHEMA::GET_BY:

            if (check_keys($_GET, USERS::ID, THOUGHTS::OWNER_ID, THOUGHTS::OFFSET, THOUGHTS::QUANTITY)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_BY;
                if (array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT), new condition(THOUGHTS::OWNER_ID), new condition(THOUGHTS::IS_OPINION . " = 1", false))));
                } else {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::OWNER_ID => $_GET[THOUGHTS::OWNER_ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::OWNER_ID), new condition(THOUGHTS::IS_OPINION . " = 0", false))), "ORDER BY share_date DESC LIMIT " . $_GET[THOUGHTS::OFFSET] . ", " . $_GET[THOUGHTS::QUANTITY]);
                }
                $ids = array();
                for ($t = 0; $t < count($output[RESPONSE::THOUGHTS]); $t++) {


                    if($output[RESPONSE::THOUGHTS][$t]->type == 4) {

                        $ids[] = $output[RESPONSE::THOUGHTS][$t]->root_id;

                    }
                    $output[RESPONSE::THOUGHTS][$t]->profile_id = is_dir("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][$t]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][$t]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                    $output[RESPONSE::THOUGHTS][$t]->banner_id = is_dir("../assets/users/banners/{$output[RESPONSE::THOUGHTS][$t]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/banners/{$output[RESPONSE::THOUGHTS][$t]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;

                    if ($output[RESPONSE::THOUGHTS][$t]->type) {

                        $options = process_fetch($PDO, SQLFunctions::SELECT, $option_name, [OPTIONS::ID => $output[RESPONSE::THOUGHTS][$t]->thought_id], array(), array(new condition(OPTIONS::ID)));
                        if (count($options) > 0) {

                            $output[RESPONSE::THOUGHTS][$t]->poll1 = $options[0]->content;
                            $output[RESPONSE::THOUGHTS][$t]->votes1 = $options[0]->votes;
                        }

                        if (count($options) > 1) {

                            $output[RESPONSE::THOUGHTS][$t]->poll2 = $options[1]->content;
                            $output[RESPONSE::THOUGHTS][$t]->votes2 = $options[1]->votes;
                        }

                        if (count($options) > 2) {

                            $output[RESPONSE::THOUGHTS][$t]->poll3 = $options[2]->content;
                            $output[RESPONSE::THOUGHTS][$t]->votes3 = $options[2]->votes;
                        }

                        if (count($options) > 3) {

                            $output[RESPONSE::THOUGHTS][$t]->poll4 = $options[3]->content;
                            $output[RESPONSE::THOUGHTS][$t]->votes4 = $options[3]->votes;
                        }
                    }
                }
                $output[RESPONSE::PLATONS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ID . " IN (" . implode(", ", $ids) . ")", false), new condition(THOUGHTS::IS_OPINION . " = 0", false))), "ORDER BY share_date DESC");
            }
            break;


        case THOUGHTS_SCHEMA::GET_BY_USERS:

            if (check_keys($_GET, USERS::ID, THOUGHTS::OWNER_ID, THOUGHTS::OFFSET, THOUGHTS::QUANTITY)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_GET_BY_USERS;
                if (array_key_exists(THOUGHTS::ROOT, $_GET)) {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID], THOUGHTS::ROOT => $_GET[THOUGHTS::ROOT]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ROOT), new condition(THOUGHTS::OWNER_ID . " IN (" . implode(", ", $_GET[THOUGHTS::OWNER_ID]) . ")", false), new condition(THOUGHTS::IS_OPINION . " = 1", false))));
                } else {

                    $output[RESPONSE::THOUGHTS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::OWNER_ID . " IN (" . implode(", ", $_GET[THOUGHTS::OWNER_ID]) . ")", false), new condition(THOUGHTS::IS_OPINION . " = 0", false))), "ORDER BY share_date DESC LIMIT " . $_GET[THOUGHTS::OFFSET] . ", " . $_GET[THOUGHTS::QUANTITY]);

                    $ids = array();
                    for ($t = 0; $t < count($output[RESPONSE::THOUGHTS]); $t++) {

                        if($output[RESPONSE::THOUGHTS][$t]->type == 4) {

                            $ids[] = $output[RESPONSE::THOUGHTS][$t]->root_id;
    
                        }

                        $output[RESPONSE::THOUGHTS][$t]->profile_id = is_dir("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][$t]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][$t]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
                        $output[RESPONSE::THOUGHTS][$t]->banner_id = is_dir("../assets/users/banners/{$output[RESPONSE::THOUGHTS][$t]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/banners/{$output[RESPONSE::THOUGHTS][$t]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;

                        if ($output[RESPONSE::THOUGHTS][$t]->type) {

                            $options = process_fetch($PDO, SQLFunctions::SELECT, $option_name, [OPTIONS::ID => $output[RESPONSE::THOUGHTS][$t]->thought_id], array(), array(new condition(OPTIONS::ID)));
                            if (count($options) > 0) {

                                $output[RESPONSE::THOUGHTS][$t]->poll1 = $options[0]->content;
                                $output[RESPONSE::THOUGHTS][$t]->votes1 = $options[0]->votes;
                            }

                            if (count($options) > 1) {

                                $output[RESPONSE::THOUGHTS][$t]->poll2 = $options[1]->content;
                                $output[RESPONSE::THOUGHTS][$t]->votes2 = $options[1]->votes;
                            }

                            if (count($options) > 2) {

                                $output[RESPONSE::THOUGHTS][$t]->poll3 = $options[2]->content;
                                $output[RESPONSE::THOUGHTS][$t]->votes3 = $options[2]->votes;
                            }

                            if (count($options) > 3) {

                                $output[RESPONSE::THOUGHTS][$t]->poll4 = $options[3]->content;
                                $output[RESPONSE::THOUGHTS][$t]->votes4 = $options[3]->votes;
                            }
                        }
                    }
                    $output[RESPONSE::PLATONS] = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ID . " IN (" . implode(", ", $ids) . ")", false), new condition(THOUGHTS::IS_OPINION . " = 0", false))), "ORDER BY share_date DESC");
                }
            }
            break;

        case THOUGHTS_SCHEMA::UPDATE:

            if (check_keys($_POST, THOUGHTS::ID, THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_UPDATE;
                process($PDO, SQLFunctions::UPDATE, $table_name, $_POST, array(THOUGHTS::CONTENT, THOUGHTS::EDIT_DATE), array(new condition(THOUGHTS::ID)));
            }
            break;

        case THOUGHTS_SCHEMA::DELETE:

            if (check_keys($_GET, THOUGHTS::ID)) {

                $output[RESPONSE::STATUS] = EXIT_CODES::THOUGHTS_DELETE;
                process($PDO, SQLFunctions::DELETE, $table_name, $_GET, array(), array(new condition(THOUGHTS::ID)));
            }
            break;

        default:

            $output[RESPONSE::STATUS] = EXIT_CODES::INCORRECT_SCHEMA;
    }
    echo json_encode($output);
}
