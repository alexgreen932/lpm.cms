<?php
/**
 * save.php
 * 
 * Handles saving JSON data from Vue form.
 * Creates or updates a JSON file based on the given slug.
 */

defined('_JET') or die('Restricted Access');

// Sanitize slug (used as filename)
$slug = preg_replace('/[^a-z0-9_-]/i', '', $_POST['slug'] ?? '');
$json = $_POST['string'] ?? '';

if (!$slug || !$json) {
    echo '<div style="color:red">❌ Missing slug or content</div>';
    return;
}

// Validate JSON format
if (json_decode($json, true) === null) {
    echo '<div style="color:red">❌ Invalid JSON format</div>';
    return;
}

// Ensure data folder exists
if (!defined('DATA')) {
    define('DATA', __DIR__ . '/../data/');
}
if (!is_dir(DATA)) {
    mkdir(DATA, 0777, true);
}

$file = DATA . "{$slug}.json";

// Save JSON data (creates new file if doesn't exist)
if (file_put_contents($file, $json) === false) {
    echo '<div style="color:red">❌ Failed to save file</div>';
    return;
}

echo '<div style="color:green">✅ Page saved successfully</div>';
