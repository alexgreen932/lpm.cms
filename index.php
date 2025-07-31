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
// $page = (object) $page; //to object
// dd($page);
// Fallback to homepage if page not found
if (!$page) {
    $page = loadPage('homepage');
    if (!$page) {
        http_response_code(404);
        echo 'Page not found.';
        exit;
    }
}
// dd($page->sections, 'log 1');

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dev</title>

    <link rel="stylesheet" crossorigin href="assets/css/jet.min.css">
    <!-- todo move in admin or join with jet -->
    <!-- <link rel="stylesheet" crossorigin href="assets/css/admin.css"> -->
    <link rel="stylesheet" crossorigin href="assets/css/all.min.css">
</head>

<body class="full-height">
    <header id="header" class="bg-blue-grey-d3 tx-white">
        <div class="w-container ai-c p-1 g-1">Header(dev version)</div>
    </header>
    <main id="main" class="fg-1">
        <?php
        // dd($page->sections);
        foreach ($page['sections'] as $section) {
            $i = 0;

            // dd($key);
            $i++;
            echo '<div id="section-' . $i . '" class="jet-section ' . classes($section['sec']) . '">';
            echo '<div class="' . classes($section['cont']) . '">';
            //elements rendering
            foreach ($section['content'] as $element) {
                $function = 'com_' . $element['type'];
                if (function_exists($function)) {
                    echo $function($element);
                } else {
                    echo "<!-- Unknown component: {$element['type']} -->";
                }
            }
            echo '</div>';
            $img = $section['img'];
            if ($img['src']) {
                echo '<div class="img-bg ' . classes($img, 'src') . '" style="background-image: url(\'' . $img['src'] . '\')"></div>';
            }
            echo '</div>';
        }
        ?>
    </main>

    <footer id="footer" class="bg-blue-grey-d3 tx-white">
        <div class="w-container ai-c p-1 g-1">Footer(dev version)</div>
    </footer>
    <?php
    if (isAdmin()) {
        // Handle page save POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $action = $_POST['action'] ?? '';
            if ($action === 'newpage') {
                require_once __DIR__ . '/inc/newpage.php';
            } elseif ($action === 'savepage') {
                require_once __DIR__ . '/inc/save.php';
            }
        }
    ?>
        <div id="app"></div>
        <script src="assets-classic/js/lpm.js"></script>
    <?php
    }
    ?>



</body>

</html>