<?php

declare(strict_types=1);

function check_keys(array $check, string...$keys): bool {

    $miss = array();
    foreach ($keys as $v) {

        if (!array_key_exists($v, $check)) {

            $miss[] = $v;

        }


    }

    if (count($miss)) {

        warnMissing($miss);
        return false;

    }
    return true;

}

function warnMissing(array $miss) {

    $output[Response::STATUS] = 400;
    $output[Response::MISSING_PARAMS] = $miss;
    echo json_encode($output);
    exit();

}

function warnMisc(int $code, string $error = "") {

    $output[Response::STATUS] = $code;
    $output[RESPONSE::ERROR_MESSAGE] = $error;
    echo json_encode($output);
    exit($code);

}

function process_fetch(PDO $PDO, string $type, array $table_name, array $provider, array $params, array $conditions, string $postfix = null): array {
    try {
        $query = $PDO->prepare(build_simple_sql($type, is_array($table_name) ? $table_name : array($table_name), $params, $conditions, $postfix));
        if ($type == SQLFunctions::SELECT_COMPLEX) {

            foreach (array_keys($provider) as $l) {

                $query->bindParam($l, $provider[$l]);

            }

        } else {

            foreach ($params as $l) {

                $query->bindParam($l, $provider[$l]);

            }

            foreach ($conditions as $l) {

                if ($l->injectable) {

                    $query->bindParam($l->term, $provider[$l->term]);

                }

            }
        }
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_CLASS);

    } catch (Exception $e) {

        warnMisc(401, $e->getMessage());

    }
    return $result;

}

function process_availability(PDO $PDO, string $type, array $table_name, array $provider, array $params, array $conditions): bool {

    try {
        $query = $PDO->prepare(build_simple_sql($type, is_array($table_name) ? $table_name : array($table_name), $params, $conditions));
        foreach ($params as $l) {

            $query->bindParam($l, $provider[$l]);

        }

        foreach ($conditions as $l) {

            if ($l->injectable) {

                $query->bindParam($l->term, $provider[$l->term]);

            }
        }

        $query->execute();
        $result = $query->fetchColumn();

    } catch (Exception $e) {

        warnMisc(401, $e->getMessage());

    }
    return !!$result;

}

function process_fetch_id(PDO $PDO, string $type, array $table_name, array $provider, array $params, array $conditions): string {

    try {
        $query = $PDO->prepare(build_simple_sql($type, is_array($table_name) ? $table_name : array($table_name), $params, $conditions));

        foreach ($params as $l) {

            $query->bindParam($l, $provider[$l]);

        }
        foreach ($conditions as $l) {

            if ($l->injectable) {

                $query->bindParam($l->term, $provider[$l->term]);

            }
        }

        $query->execute();

    } catch (Exception $e) {

        warnMisc(401, $e->getMessage());

    }
    return $PDO->lastInsertId();

}

function process(PDO $PDO, string $type, array $table_name, array $provider, array $params, array $conditions): void {

    try {
        $query = $PDO->prepare(build_simple_sql($type, is_array($table_name) ? $table_name : array($table_name), $params, $conditions));
        foreach ($params as $l) {

            $query->bindParam($l, $provider[$l]);

        }
        foreach ($conditions as $l) {

            if ($l->injectable) {

                $query->bindParam($l->term, $provider[$l->term]);

            }
        }

        $query->execute();

    } catch (Exception $e) {

        warnMisc(401, $e->getMessage());

    }

}

class SQLFunctions {

    public const UPDATE = "update";
    public const ADD = "add";
    public const SELECT = "select";
    public const SELECT_COMPLEX = "select_complex";
    public const DELETE = "delete";

}

class SQLStyle {

    public const CONDITION = "condition";
    public const INJECTABLE_CONDITION = "injectable_condition";
    public const VALUES_SEPERATED = "values_seperated";
    public const ENUMERATION = "enumeration";
    public const INJECTABLE_ENUMERATION = "injectable_enumeration";

}

function build_simple_sql(string $type, array $table_name, array $params, array $conditions, string $postfix = null): string {

    $result = "";
    switch ($type) {

        case SQLFunctions::UPDATE:

            $result = "UPDATE " . implode(', ', $table_name) . " SET ";
            $result .= build_params(SQLStyle::CONDITION, $params);
            $result .= " WHERE ";
            $result .= build_params(SQLStyle::INJECTABLE_CONDITION, $conditions);
            break;

        case SQLFunctions::DELETE:

            $result = "DELETE FROM " . implode(', ', $table_name);
            $result .= " WHERE ";
            $result .= build_params(SQLStyle::INJECTABLE_CONDITION, $conditions);
            break;

        case SQLFunctions::ADD:

            $result = "INSERT INTO " . implode(', ', $table_name);
            $result .= build_params(SQLStyle::VALUES_SEPERATED, $params);
            break;

        case SQLFunctions::SELECT:
        case SQLFunctions::SELECT_COMPLEX:

            $result = "SELECT ";

            if (count($params) > 0) {

                $result .= build_params(SQLStyle::ENUMERATION, $params);

            } else {

                $result .= " * ";

            }
            $result .= " FROM ";
            $result .= implode(", ", $table_name);
            if (count($conditions) > 0) {

                $result .= " WHERE ";
                $result .= build_params(SQLStyle::INJECTABLE_CONDITION, $conditions);

            }
            if ($postfix != null) {
                $result .= " " . $postfix;
            }
            break;
    }
    //echo $result;
    return $result;


}

function build_params(string $style, array $labels): string {

    $result = "";
    switch ($style) {

        case SQLStyle::VALUES_SEPERATED:

            $result = "(";
            for ($i = 0; $i < count($labels) - 1; $i++) {
                $result .= "{$labels[$i]}, ";
            }
            $result .= "{$labels[$i]}) VALUES (";

            for ($i = 0; $i < count($labels) - 1; $i++) {
                $result .= ":{$labels[$i]}, ";
            }
            $result .= ":{$labels[$i]})";
            break;

        case SQLStyle::ENUMERATION:

            for ($i = 0; $i < count($labels) - 1; $i++) {
                $result .= "{$labels[$i]}, ";
            }
            $result .= "{$labels[$i]}";
            break;

        case SQLStyle::INJECTABLE_ENUMERATION:

            for ($i = 0; $i < count($labels) - 1; $i++) {

                $result .= $labels[$i]->extract() . ", ";

            }
            $result .= $labels[$i]->extract();
            break;

        case SQLStyle::CONDITION:
            for ($i = 0; $i < count($labels) - 1; $i++) {

                $result .= "{$labels[$i]} = :{$labels[$i]}, ";

            }
            $result .= "{$labels[$i]} = :{$labels[$i]}";
            break;

        case SQLStyle::INJECTABLE_CONDITION:

            for ($i = 0; $i < count($labels) - 1; $i++) {

                $result .= $labels[$i]->extract() . " AND ";

            }
            $result .= $labels[$i]->extract();
            break;

    }

    return $result;

}

function fixPlatons(PDO $PDO, array $ids, array $output, array $tables, array $linkers, array $complex) {

    if (count($ids)) {
        $result = process_fetch($PDO, SQLFunctions::SELECT_COMPLEX, $tables, [USERS::ID . 1 => $_GET[USERS::ID], USERS::ID . 2 => $_GET[USERS::ID], USERS::ID . 3 => $_GET[USERS::ID], USERS::ID . 4 => $_GET[USERS::ID]], $complex, array_merge($linkers, array(new condition(THOUGHTS::ID . " IN (" . implode(", ", $ids) . ")", false), new condition(THOUGHTS::IS_OPINION . " = 0", false))), "ORDER BY share_date DESC");

        for ($t = 0; $t < count($result); $t++) {



            $result[$t]->profile_id = is_dir("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][$t]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/profiles/{$output[RESPONSE::THOUGHTS][$t]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;
            $result[$t]->banner_id = is_dir("../assets/users/banners/{$output[RESPONSE::THOUGHTS][$t]->user_id}") ? iterator_count(new FilesystemIterator("../assets/users/banners/{$output[RESPONSE::THOUGHTS][$t]->user_id}/", FilesystemIterator::SKIP_DOTS)) : 0;

            if ($result[$t]->type == 3) {

                $options = process_fetch($PDO, SQLFunctions::SELECT, array("options"), [OPTIONS::ID => $result[$t]->thought_id], array(), array(new condition(OPTIONS::ID)));
                if (count($options) > 0) {

                    $result[$t]->poll1 = $options[0]->content;
                    $result[$t]->votes1 = $options[0]->votes;
                }

                if (count($options) > 1) {

                    $result[$t]->poll2 = $options[1]->content;
                    $result[$t]->votes2 = $options[1]->votes;
                }

                if (count($options) > 2) {

                    $result[$t]->poll3 = $options[2]->content;
                    $result[$t]->votes3 = $options[2]->votes;
                }

                if (count($options) > 3) {

                    $result[$t]->poll4 = $options[3]->content;
                    $result[$t]->votes4 = $options[3]->votes;
                }
            }
        }
        return $result;
    }

}