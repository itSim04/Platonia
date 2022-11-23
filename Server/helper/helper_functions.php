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

function process_fetch(PDO $PDO, SQLFunctions $type, string $table_name, array $provider, array $params, array $conditions): array {

    $query = $PDO->prepare(build_simple_sql($type, $table_name, $params, $conditions));
    if ($type == SQLFunctions::SELECT_COMPLEX) {
        foreach (array_keys($provider) as $l) {
            $query->bindParam($l, $provider[$l]);
        }
    } else {
        foreach ($params as $l) {
            $query->bindParam($l, $provider[$l]);
        }
        foreach ($conditions as $l) {
            if ($l->injectable)
                $query->bindParam($l->term, $provider[$l->term]);
        }
    }
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_CLASS);
    return $result;

}

function process_availability(PDO $PDO, SQLFunctions $type, string $table_name, array $provider, array $params, array $conditions): bool {

    $query = $PDO->prepare(build_simple_sql($type, $table_name, $params, $conditions));
    foreach ($params as $l) {

        $query->bindParam($l, $provider[$l]);
    }
    foreach ($conditions as $l) {
        if ($l->injectable)
            $query->bindParam($l->term, $provider[$l->term]);
    }

    $query->execute();
    $result = $query->fetchColumn();
    return !!$result;

}

function process_fetch_id(PDO $PDO, SQLFunctions $type, string $table_name, array $provider, array $params, array $conditions): string {

    $query = $PDO->prepare(build_simple_sql($type, $table_name, $params, $conditions));

    foreach ($params as $l) {


        $query->bindParam($l, $provider[$l]);
    }
    foreach ($conditions as $l) {

        if ($l->injectable)
            $query->bindParam($l->term, $provider[$l->term]);
    }

    $query->execute();
    return $PDO->lastInsertId();

}

function process(PDO $PDO, SQLFunctions $type, string $table_name, array $provider, array $params, array $conditions): void {

    $query = $PDO->prepare(build_simple_sql($type, $table_name, $params, $conditions));
    foreach ($params as $l) {

        $query->bindParam($l, $provider[$l]);
    }
    foreach ($conditions as $l) {
        if ($l->injectable)
            $query->bindParam($l->term, $provider[$l->term]);
    }
    $query->execute();

}

enum SQLFunctions {

    case UPDATE;
    case ADD;
    case SELECT;
    case SELECT_COMPLEX;
    case DELETE;

}

function build_simple_sql(SQLFunctions $type, string $table_name, array $params, array $conditions): string {

    $result = "";
    switch ($type) {

        case SQLFunctions::UPDATE:

            $result = "UPDATE {$table_name} SET ";
            $result .= build_params(SQLFunctions::UPDATE, $params);
            $result .= " WHERE ";
            $result .= build_params(null, $conditions);
            break;

        case SQLFunctions::DELETE:

            $result = "DELETE FROM {$table_name}";
            $result .= " WHERE ";
            $result .= build_params(null, $conditions);
            break;

        case SQLFunctions::ADD:

            $result = "INSERT INTO {$table_name} ";
            $result .= build_params(SQLFunctions::ADD, $params);
            break;

        case SQLFunctions::SELECT:
        case SQLFunctions::SELECT_COMPLEX:

            $result = "SELECT ";


            if (count($params) > 0) {

                $result .= build_params(SQLFunctions::SELECT, $params);

            } else {

                $result .= " * ";

            }

            $result .= " FROM ";
            $result .= $table_name;
            if (count($conditions) > 0) {

                $result .= " WHERE ";
                $result .= build_params(SQLFunctions::SELECT_COMPLEX, $conditions);

            }
            break;
    }
    return $result;


}

function build_params(SQLFunctions|null $with_values, array $labels): string {

    $result = "";
    switch ($with_values) {

        case SQLFunctions::ADD:

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

        case SQLFunctions::SELECT:

            for ($i = 0; $i < count($labels) - 1; $i++) {
                $result .= "{$labels[$i]}, ";
            }
            $result .= "{$labels[$i]}";
            break;

        case SQLFunctions::UPDATE:
            for ($i = 0; $i < count($labels) - 1; $i++) {

                $result .= "{$labels[$i]} = :{$labels[$i]}, ";

            }
            $result .= "{$labels[$i]} = :{$labels[$i]}";
            break;

        case SQLFunctions::SELECT_COMPLEX:

            for ($i = 0; $i < count($labels) - 1; $i++) {

                $result .= $labels[$i]->extract() . " AND ";

            }
            $result .= $labels[$i]->extract();
            break;

        default:

            for ($i = 0; $i < count($labels) - 1; $i++) {

                $result .= $labels[$i]->extract() . ", ";

            }
            $result .= $labels[$i]->extract();


    }

    return $result;

}