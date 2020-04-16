<?php 
require_once 'correo.php';

$correo = new correo($_POST['to'],$_POST['subject'],$_POST['body']);

ob_end_clean();
ignore_user_abort();
ob_start();
header("Connection: close");
echo json_encode(['success'=>1]);
header("Content-Length: " . ob_get_length());
ob_end_flush();
flush();

    switch ($_POST['accion']) {
    	case 1:
    		$correo->enviar();
    		break;
    	case 2:
    		$correo->enviar_general();
    		break;
    	case 3:
    		$correo->enviar_adjunto($_POST['adjunto']);
            break;
        default:
    		break;
    }


 ?>