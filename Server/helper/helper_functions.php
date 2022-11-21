<?php

declare(strict_types=1);

function check_keys(array $check, string...$keys): bool
{

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

function warnMissing(array $miss)
{

    $output[Response::STATUS] = 400;
    $output[Response::MISSING_PARAMS] = $miss;
    echo json_encode($output);

}

function warnMisc(int $code)
{

    $output[Response::STATUS] = $code;
    echo json_encode($output);

}

function process(mysqli $mysqli, string $sql)
{

    $query = $mysqli->prepare($sql);
    $query->execute();
    $result = $query->get_result();
    $output = array();
    while ($row = mysqli_fetch_assoc($result)) {

        $output[] = $row;

    }
    return $output;

}