<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// composer require phpmailer/phpmailer
// require "./phpMailer/src/Exception.php";
// require "./phpMailer/src/PHPMailer.php";
// require 'path/to/PHPMailer/src/SMTP.php';

//  $mail = new PHPMailer(true);
// $mail->isSMTP();
// $mail->Host = 'sandbox.smtp.mailtrap.io';
// $mail->SMTPAuth = true;
// $mail->SMTPSecure = 'tls';
// $mail->Port = 587;
// $mail->Charset = 'UTF-8';
// $mail->isHTML(true);
// $mail->setFrom('PlanVoyage@mail.com', 'New client');
// $mail->addAddress('Natkamonte1992@gmail.com');
// $mail->Subject = 'Email from Plan Voyage';

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {

//     $body = '<h1>New client</h1>';

// if (trim(!empty($_POST['name']))) {
//     $body .= '<p><strong> Name : ' . $_POST['name'] . '</strong></p>';
// }
// if (trim(!empty($_POST['email']))) {
//     $body .= '<p><strong> Email : ' . $_POST['email'] . '</strong></p>';
// }
// if (trim(!empty($_POST['phone']))) {
//     $body .= '<p><strong> phone : ' . $_POST['phone'] . '</strong></p>';
// }
// if (trim(!empty($_POST['quantity']))) {
//     $body .= '<p><strong> numder of travellers : ' . $_POST['quantity'] . '</strong></p>';
// }
// if (trim(!empty($_POST['destination']))) {
//     $body .= '<p><strong> destination : ' . $_POST['destination'] . '</strong></p>';
// }
// if (trim(!empty($_POST['message']))) {
//     $body .= '<p><strong> message : ' . $_POST['message'] . '</strong></p>';
// }

// $mail->body = $body;

// try {
//         $mail->send();
//         $message = 'Information was sent';
//     } catch (Exception $e) {
//         $message = 'Error: ' . $mail->ErrorInfo;
//     }

//     $response = ['message' => $message];
//     header('Content-Type: application/json');
//     echo json_encode($response);
// } else {
 
//     http_response_code(405); 
//     echo 'Method Not Allowed';
// }

?>




<?php
// Файлы phpmailer

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';


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
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки пошти
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPSecure = ‘ssl’;
    $mail->Port       = 465;
    $mail->setFrom('PL@mail.com', 'new client'); // Адрес пошти
    $mail->addAddress('yanatraveladvisor@gmail.com');  


// Відправка
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Перевірка
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

echo json_encode(["result" => $result, "status" => $status]);
