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
    foreach ($params as $l) {
        $query->bindParam($l, $provider[$l]);
    }
    foreach ($conditions as $l) {
        $query->bindParam($l, $provider[$l]);
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
        $query->bindParam($l, $provider[$l]);
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
        $query->bindParam($l, $provider[$l]);
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
        $query->bindParam($l, $provider[$l]);
    }
    $query->execute();

}

enum SQLFunctions {

    case UPDATE;
    case ADD;
    case SELECT;


}

function build_simple_sql(SQLFunctions $type, string $table_name, array $params, array $conditions): string {

    $result = "";
    switch ($type) {

        case SQLFunctions::UPDATE:

            $result = "UPDATE {$table_name} SET ";
            $result .= build_params(null, ...$params);
            $result .= " WHERE ";
            $result .= build_params(null, ...$conditions);
            break;

        case SQLFunctions::ADD:

            $result = "INSERT INTO {$table_name} ";
            $result .= build_params(SQLFunctions::ADD, ...$params);
            break;

        case SQLFunctions::SELECT:

            $result = "SELECT ";
            if (count($params) > 0) {

                $result .= build_params(SQLFunctions::SELECT, ...$params);

            } else {

                $result .= " * ";

            }
            $result .= " FROM ";
            $result .= $table_name;
            if (count($conditions) > 0) {

                $result .= " WHERE ";
                $result .= build_params(null, ...$conditions);

            }
    }
    echo $result;
    return $result;


}

function build_params(SQLFunctions|null $with_values, string...$labels): string {

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


        default:

            for ($i = 0; $i < count($labels) - 1; $i++) {

                $result .= "{$labels[$i]} = :{$labels[$i]}, ";

            }
            $result .= "{$labels[$i]} = :{$labels[$i]}";


    }

    return $result;

}