<?php
defined('_JET') or die('Restricted Access');

$slug = preg_replace('/[^a-z0-9_-]/i', '', $_POST['slug'] ?? '');
$json = $_POST['string'] ?? '';

if (!$slug || !$json) {
    echo '<div style="color:red">❌ Missing slug or content</div>';
    return;
}

$file = DATA . "{$slug}.json";
// if (!file_exists($file)) {
// 		echo filesize('test.txt');
// 	}

// Optional: validate JSON before saving
if (json_decode($json) === null) {
    echo '<div style="color:red">❌ Invalid JSON format</div>';
    return;
}

$fh = fopen($file, 'w');
fwrite($fh, $json);
fclose($fh);

echo '<div style="color:green">✅ Page saved successfully</div>';
