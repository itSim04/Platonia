<?php

require '../helper/root.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../helper/PHPMailer/Exception.php';
require '../helper/PHPMailer/PHPMailer.php';
require '../helper/PHPMailer/SMTP.php';

if (check_keys($_GET, "schema")) {


    switch ($_GET["schema"]) {

        case UTILITIES::EMAIL:
            try {
                $mail = new PHPMailer(true);

                $mail->Port = 465;

                $mail->SetFrom("mo@domain.co","my name", 0);
                $mail->addAddress("moawadsimon@gmail.com");

                $mail->isHTML(true);
                $mail->Subject = 'Here is the subject';
                $mail->Body = 'This is the HTML message body <b>in bold!</b>';

                $mail->send();
                echo 'Message has been sent';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        //}
    }}