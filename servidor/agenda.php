<?php
session_start();
require_once 'Person.php';
require_once 'Agenda.php';

// Get username for header
$username = isset($_GET['username']) ? trim($_GET['username']) : 'Guest';

// Create agenda object
$agenda = new Agenda();

// Form variables
$nameValue = '';
$emailValue = '';
$message = '';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';

    // Keep last entered values
    $nameValue = $name;
    $emailValue = $email;

    // Add, update, or delete entry
    $message = $agenda->addOrUpdate($name, $email);
}

// Get all entries
$entries = $agenda->getAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Agenda of <?php echo htmlspecialchars($username); ?></title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 30px auto; }
        input { margin: 5px 0; padding: 5px; width: 100%; }
        button { padding: 7px 15px; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 5px 0; }
        p.message { font-weight: bold; }
    </style>
</head>
<body>
    <h1>Agenda of <?php echo htmlspecialchars($username); ?></h1>

    <?php if ($message): ?>
        <p class="message"><?php echo $message; ?></p>
    <?php endif; ?>

    <h2>Agenda Entries</h2>
    <?php if (count($entries) === 0): ?>
        <p>No entries yet.</p>
    <?php else: ?>
        <ul>
            <?php foreach ($entries as $person): ?>
                <li>
                    <?php 
                        echo htmlspecialchars($person->name);
                        if (!empty($person->email)) {
                            echo " - " . htmlspecialchars($person->email);
                        }
                    ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <h2>Add / Update / Delete Entry</h2>
    <form action="" method="post">
        <input type="text" name="name" placeholder="Name" value="<?php echo htmlspecialchars($nameValue); ?>">
        <input type="email" name="email" placeholder="Email" value="<?php echo htmlspecialchars($emailValue); ?>">
        <button type="submit">Submit</button>
    </form>

    <p><strong>Rules:</strong></p>
    <ul>
        <li>Empty name → Warning</li>
        <li>Name doesn’t exist & valid email → Add</li>
        <li>Name exists & valid email → Update</li>
        <li>Name exists & empty email → Delete</li>
    </ul>
</body>
</html>
