
<?php
define('_JET', 1);
define('INC', __DIR__ . '/inc/');
define('DATA', __DIR__ . '/data/');
session_start();

require_once __DIR__ . '/inc/dev.php';

// === INSTALLATION CHECK ===
if (!file_exists(__DIR__ . '/inc/config.php')) {
    require_once __DIR__ . '/inc/install.php';
    exit;
}

// === LOAD CORE FILES ===
require_once __DIR__ . '/inc/config.php';
require_once __DIR__ . '/inc/functions.php';

// === ROUTING ===
// Get the current URL path
$uriPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$slug = trim($uriPath, '/');

// Normalize default
$slug = ($slug === '' || $slug === 'index.php') ? 'homepage' : $slug;

// === HANDLE LOGIN PAGE FIRST ===
if ($slug === $config['login_url']) {
    loginSite($config);
}

// === LOAD PAGE DATA ===
$page = loadPage($slug);

// Fallback to homepage if page not found
if (!$page) {
    $page = loadPage('homepage');
    if (!$page) {
        http_response_code(404);
        echo 'Page not found.';
        exit;
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($page['title'] ?? 'Landing Page') ?></title>

    <link rel="stylesheet" crossorigin href="assets/css/jet.min.css">
    <!-- todo move in admin or join with jet -->
    <link rel="stylesheet" crossorigin href="assets/css/admin.css">
    <link rel="stylesheet" crossorigin href="assets/css/all.min.css">
</head>

<body>
    <div class="w-container-c p-1 mv-2 bs-2">
        <h1>Test Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptates deserunt culpa soluta veritatis dolor minima aut. Error excepturi, debitis facere dolorem nulla aperiam inventore delectus ut sunt quam ipsa!</p>
    </div>
       TEST STRING
        <div id="app"></div>
        <script src="assets-classic/js/lpm.js"></script>

    <!-- Admin Area -->
    <!-- TODO FIX LOGIN -->
    <!-- <?php if (isAdmin()): ?> -->
        <?php
        // Handle page save POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require_once __DIR__ . '/inc/save.php';
        }
        ?>
 



    <!-- <?php endif; ?> -->


</body>

</html>