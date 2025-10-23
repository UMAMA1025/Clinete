<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Agenda Entry</title>
</head>
<body>
    <h1>Enter your name to access your agenda</h1>
    <form action="agenda.php" method="get">
        <input type="text" name="username" placeholder="Your name" required>
        <button type="submit">Go to Agenda</button>
    </form>
</body>
</html>
