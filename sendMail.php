<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "./phpMailer/src/Exception.php";
require "./phpMailer/src/PHPMailer.php";

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->isHTML(true);

$mail->setFrom('PlanVoyage@mail.com', 'New client');
$mail->addAddress('yanatraveladvisor@gmail.com');
$mail->Subject = 'Email from Plan Voyage';

$body = '<h1>New client</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong> Name : ' . $_POST['name'] . '</strong></p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong> Email : ' . $_POST['email'] . '</strong></p>';
}
if (trim(!empty($_POST['phone']))) {
    $body .= '<p><strong> phone : ' . $_POST['phone'] . '</strong></p>';
}
if (trim(!empty($_POST['numder of travellers']))) {
    $body .= '<p><strong> numder of travellers : ' . $_POST['numder of travellers'] . '</strong></p>';
}
if (trim(!empty($_POST['destination']))) {
    $body .= '<p><strong> destination : ' . $_POST['destination'] . '</strong></p>';
}
if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong> message : ' . $_POST['message'] . '</strong></p>';
}

$mail->body = $body;

if (!$mail->send()) {
    $message = 'Error';
} else {
    $message = 'Information was sent';
}

$response = ['message' => $message];

header('Content-Type: application/json');
echo json_encode($response);
?>
