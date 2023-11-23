<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");

require 'phpMailer/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// require 'phpmailer/PHPMailer.php';
// require 'phpmailer/SMTP.php';
// require 'phpmailer/Exception.php';


$name = $_POST['name'];
$email = $_POST['email'];
$quantity = $_POST['quantity'];
$destination = $_POST['destination'];
$message = $_POST['message'];

// Формування листа
$title = "Mail from Plan Voyage";
$body = "
<b>name:</b> $name<br>
<b>email:</b> $email<br>
<b>Number of travelers:</b> $quantity<br>
<b>destination:</b> $destination<br><br>
<b>message:</b><br>$message
";

// Настройки PHPMailer
$mail = new PHPMailer(true);

echo ($title . '________' . $body);

try {
    //Set PHPMailer to use SMTP.
    $mail->isSMTP();
    //Set SMTP host name                      
    $mail->Host = 'smtp2go.com';
    //Set this to true if SMTP host requires authentication to send email
    $mail->SMTPAuth = true;
    //Provide username and password
    $mail->Username = 'freelancer-smtp';
    $mail->Password = 'Devsenior0312!!!';
    //If SMTP requires TLS encryption then set it
    $mail->SMTPSecure = "tls";
    //Set TCP port to connect to
    $mail->Port = 587;
    $mail->From = 'devsonspree@gmail.com';
    $mail->FromName = 'Plan Voyage';
    $mail->addAddress('t0n9hua@gmail.com', "Ugur");
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;
    $mail->send();
    echo "Mail has been sent successfully!";
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
