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

            if (check_keys($_GET, "email", "code")) {
                try {
                    $mail = new PHPMailer(true);

                    $mail->Port = 465;

                    $mail->SetFrom("platonia.customers@gmail.com", "Platonia", 0);
                    $mail->addAddress($_GET["email"]);

                    $mail->isHTML(true);
                    $mail->Subject = 'Here is the subject';
                    $mail->Body = "<html><body>
<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; background: white; width: fit-content; padding: 25px; border-radius: 35px;\">
<h2>Your Verification Code:</h2>
<h5 style=\"color: gray; border: 1px solid black; padding: 12px;\">" . $_GET["code"] . "</h5></div></body><html>";

                    $mail->send();
                    echo [RESPONSE::STATUS => 200];
                } catch (Exception $e) {
                    echo [RESPONSE::ERROR_MESSAGE => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"];
                }
            }
            //}
    }
}
