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

function process_fetch(mysqli $mysqli, string $sql, mixed ...$params): array {

    $query = $mysqli->prepare($sql);
    $query->execute($params);
    $result = $query->get_result();
    while ($row = mysqli_fetch_assoc($result)) {

        $output[] = $row;

    }
    return $output;

}

function process_availability(mysqli $mysqli, string $sql, mixed ...$params): bool {

    $query = $mysqli->prepare($sql);
    $query->execute($params);
    $result = $query->get_result();
    return mysqli_num_rows($result) <= 0;

}

function process_fetch_id(mysqli $mysqli, string $sql, mixed ...$params): int {

    $query = $mysqli->prepare($sql);
    $query->execute($params);
    return $mysqli->insert_id;

}

function process(mysqli $mysqli, string $sql): void {

    $query = $mysqli->prepare($sql);
    $query->execute();

}

enum SQLFunctions {

    case UPDATE;


}

function build_simple_sql(SQLFunctions $type, string $table_name, array $provider, array $params, array $conditions): string {

    $result = "";
    switch($type) {

        case SQLFunctions::UPDATE:

            $result = "UPDATE {$table_name} SET ";
            $result = $result . build_params(false, $provider, ...$params);
            $result = $result . " WHERE ";
            $result = $result . build_params(false, $provider, ...$conditions);
            break;




    }
    echo $result;
    return $result;


}

function build_params(bool $with_values, array $provider, string ...$labels): string {

    $result = "";
    if(!$with_values) {

        for ($i = 0; $i < count($labels) - 1; $i++) { 

            $result = $result . "{$labels[$i]} = " . (strlen($provider[$labels[$i]]) == 0 ? "null" : "'". $provider[$labels[$i]] . "'") . ", ";
            
        }
        $result = $result . $labels[$i] . " = " . (strlen($provider[$labels[$i]]) == 0 ? "null" : "'". $provider[$labels[$i]] . "'");

    } else {

        $result = "(";
        for ($i = 0; $i < count($labels) - 1; $i++) { 
            $result = $result . "{$labels[$i]}, ";
        }
        $result = $result . "{$labels[$i]}) VALUES (";

        for ($i = 0; $i < count($labels) - 1; $i++) { 
            $result = $result . (strlen($provider[$labels[$i]]) == 0 ? "null" : "'". $provider[$labels[$i]] . "'") . ", ";
        }
        $result = $result . (strlen($provider[$labels[$i]]) == 0 ? "null" : "'". $provider[$labels[$i]] . "'");


    }

    return $result;

}

