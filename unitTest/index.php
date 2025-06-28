<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Enviar Correo</title>
</head>

<body>
    <h1>Formulario para enviar correo</h1>
    <form action="enviar.php" method="POST">
        <input type="email" name="email" placeholder="Correo del destinatario" required>
        <input type="text" name="nombre" placeholder="Tu nombre" required>
        <button type="submit">Enviar correo</button>
    </form>
</body>

</html>