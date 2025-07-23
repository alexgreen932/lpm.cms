<?php
/**
 * Check if user is logged in as admin
 * @return bool
 */
function isAdmin(): bool {
    return isset($_SESSION['admin']) && $_SESSION['admin'] === true;
}

/**
 * Attempt to log in
 */
function loginSite($config): void {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (
            $_POST['user'] === $config['login'] &&
            $_POST['pass'] === $config['password']
        ) {
            $_SESSION['admin'] = true;
            header("Location: /");
            exit;
        }
    }
    ?>
    <style>
        form{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 100px auto;
            max-width: 500px;
            padding: 2rem;
            background: #f0f1f5;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.1);
        }
        button{
            background: #1e87f0;
            border-width: 0;
            padding: 1rem;
            color:#fff;
        }
    </style>
    <form method="post"  style="padding:2rem;max-width:300px;">
        <input name="user" placeholder="Login" style="display:block;width:100%;margin-bottom:10px;">
        <input name="pass" type="password" placeholder="Password" style="display:block;width:100%;margin-bottom:10px;">
        <button>Login</button>
    </form>
    <?php
    exit;
}

/**
 * Load page content from JSON file
 * @param string $slug
 * @return array|null
 */
function loadPage(string $slug): ?array {
    $file = __DIR__ . "/../data/{$slug}.json"; // Note: correct relative path
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return null;
}

