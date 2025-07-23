<!-- <script>
    //todo rm development only
    setInterval(() => {
        fetch('/reload.txt')
            .then(r => r.text())
            .then(time => {
                if (!window.lastReloadTime) window.lastReloadTime = time;
                if (window.lastReloadTime != time) location.reload();
            });
    }, 1000);
</script> -->
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
    <link rel="stylesheet" href="/assets/css/jet.min.css">
</head>

<body>

    <!-- Admin Area -->
    <?php if (isAdmin()): ?>
        <?php
        // Handle page save POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require_once __DIR__ . '/inc/save.php';
        }
        ?>
        <div id="jet-site">
            <h1>Rendered data</h1>
            <h3>{{test.title}}</h3>
            <p>{{test.content}}</p>
            <input type="text" v-model="test.title" />

            <h3>Edit JSON</h3>
            <form id="edit-form" method="post" action="">
              <!--   <textarea id="page-json" style="width:100%; height:200px;">{{strinedData()}}</textarea>
                <button type="submit">Save</button>
            </form> -->

            <form method="post" action="" style="margin-top: 2rem;">
                    <textarea name="page_json" style="width:100%; height:200px;">{{pageJson()}}</textarea>

                    <!-- <?= htmlspecialchars(json_encode($page, JSON_PRETTY_PRINT)) ?></textarea> -->
                <input type="hidden" name="slug" value="<?= $slug ?>">
                <button type="submit">Save</button>
            </form>
        </div>
        <script src="/dev-app/vue.js"></script>
        <script src="/dev-app/dev.js" type="module"></script>

    <?php endif; ?>


</body>

</html>