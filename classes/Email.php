<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Email {
	private string $nombre;
	private string $email;

	public function __construct(string $nombre, string $email) {
		$this->nombre = $nombre;
		$this->email = $email;
	}

	public function enviar(): bool {
		$mail = new PHPMailer(true);

		try {
			// Configuración SMTP (Mailtrap)
			$mail->isSMTP();
			$mail->Host = 'sandbox.smtp.mailtrap.io';
			$mail->SMTPAuth = true;
			$mail->Username = 'TU_USUARIO_MAILTRAP'; // ← reemplaza
			$mail->Password = 'TU_PASSWORD_MAILTRAP'; // ← reemplaza
			$mail->Port = 2525;

			// Remitente y destinatario
			$mail->setFrom('noreply@tusitio.com', 'Tu Sitio');
			$mail->addAddress($this->email, $this->nombre);

			// Contenido
			$mail->Subject = 'Saludos desde PHP con OOP';
			$mail->isHTML(true);
			$mail->CharSet = 'UTF-8';
			$mail->Body = "<h1>Hola, {$this->nombre}!</h1><p>Este es un correo enviado desde una clase OOP.</p>";

			$mail->send();
			return true;
		} catch (Exception $e) {
			error_log("Error al enviar correo: " . $mail->ErrorInfo);
			return false;
		}
	}
}
