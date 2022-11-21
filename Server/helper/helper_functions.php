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

function process(mysqli $mysqli, string $sql, mixed ...$params): void {

    $query = $mysqli->prepare($sql);
    $query->execute($params);

}