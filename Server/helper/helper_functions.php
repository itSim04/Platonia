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

}

function warnMisc(int $code) {

    $output[Response::STATUS] = $code;
    echo json_encode($output);

}

function process_fetch(PDO $PDO, SQLFunctions $type, array |string $table_name, array $provider, array $params, array $conditions): array {
    try {
        $query = $PDO->prepare(build_simple_sql($type, is_array($table_name) ? $table_name : array($table_name), $params, $conditions));
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

    }
    return $result;

}

function process_availability(PDO $PDO, SQLFunctions $type, array |string $table_name, array $provider, array $params, array $conditions): bool {

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
        
    }
    return !!$result;

}

function process_fetch_id(PDO $PDO, SQLFunctions $type, array |string $table_name, array $provider, array $params, array $conditions): string {

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
        
    }
    return $PDO->lastInsertId();

}

function process(PDO $PDO, SQLFunctions $type, array |string $table_name, array $provider, array $params, array $conditions): void {

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

    }

}

enum SQLFunctions {

    case UPDATE;
    case ADD;
    case SELECT;
    case SELECT_COMPLEX;
    case DELETE;

}

enum SQLStyle {

    case CONDITION;
    case INJECTABLE_CONDITION;
    case VALUES_SEPERATED;
    case ENUMERATION;
    case INJECTABLE_ENUMERATION;

}

function build_simple_sql(SQLFunctions $type, array $table_name, array $params, array $conditions): string {

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
            break;
    }
    return $result;


}

function build_params(SQLStyle $style, array |string $labels): string {

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