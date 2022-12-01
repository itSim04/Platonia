<?php

require '../helper/root.php';

if (check_keys($_GET, "schema")) {


    switch ($_GET["schema"]) {

        case UTILITIES::EMAIL:

            //if(check_keys(EMAIL::MESSAGE)) {

            $msg = "First line of text\nSecond line of text";

            // use wordwrap() if lines are longer than 70 characters
            $msg = wordwrap($msg, 70);

            // send email

        //}
    }}