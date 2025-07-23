<?php
// Prevent direct access
defined('_JET') or die('Restricted Access');

/**
 * Install page shown if config.php does not exist.
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'] ?? 'admin';
    $password = $_POST['password'] ?? '';
    $email = $_POST['email'] ?? '';
    $login_url = $_POST['login_url'] ?? 'login';

    $configContent = <<<PHP
<?php
defined('_JET') or die('Restricted Access');

\$config = [
    'login'      => '$login',
    'password'   => '$password',
    'email'      => '$email',
    'login_url'  => '$login_url',
];
PHP;

    $file = __DIR__ . '/config.php';
    $success = @file_put_contents($file, $configContent);

    if ($success) {
        sleep(1);
        // Let index.php handle proper redirect
        header("Location: /");
        exit;
    } else {
        die('<div style="color:red;font-weight:bold;">❌ Failed to write config.php. Check folder permissions.</div>');
    }
}
?>


<!DOCTYPE html>
<html>

<head>
    <title>Install Landing Maker</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../assets/css/jet.min.css">
    <style>
        .form-control {
            display: flex;
            gap: 1rem;
        }

        .form-control label {
            display: inline-flex;
            min-width: 200px;
            width: 200px;
            font-weight: 600;
        }

        button {
            border-width: 0;
        }
    </style>
</head>

<body class="bg-blue-grey-l5">
    <div class="w-center w-50 bg-white br-8 p-2 mv-5 bs-2 fd-c g-1">
        <h2>Install Landing Maker</h2>
        <form method="post" class="fd-c g-1">
            <div class="form-control">
                <label>Login:</label> <input name="login" value="admin" required>
            </div>
            <div class="form-control">
                <label>Password:</label> <input name="password" required>
            </div>
            <div class="form-control">
                <label>Email:</label> <input name="email" type="email" required>
            </div>
            <div class="form-control">
                <label>Login Page URL:</label> <input name="login_url" value="login" required>
            </div>
            <div class="form-control">

            </div>
            <button class="but-blue br-4 fs-12" type="submit">Install</button>
        </form>
    </div>
</body>

</html>