<?php
header('Content-Type: application/json');

// Get all JSON files from current directory
$files = glob(__DIR__ . '/*.json');

$result = [];

foreach ($files as $file) {
    // Skip this index.php itself if somehow named as json
    $content = file_get_contents($file);
    $json = json_decode($content, true);

    // Ensure valid JSON and has required keys
    if (is_array($json) && isset($json['title'], $json['slug'], $json['category'])) {
        $result[] = [
            'title'    => $json['title'],
            'description'    => $json['description'],
            'slug'     => $json['slug'],
            'category' => $json['category'],
        ];
    }
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
