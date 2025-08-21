<?php
header('Content-Type: application/json');

$files = glob(__DIR__ . '/*.json');
$result = [];

foreach ($files as $file) {
    $json = json_decode(file_get_contents($file), true);
    if (is_array($json) && isset($json['title'], $json['slug'])) {
        $result[] = [
            'title' => $json['title'],
            'slug'  => $json['slug'],
            // 'category' => $json['category'],
        ];
    }
}

/**
 * Move any rows whose slug is in $priority (case-insensitive) to the front,
 * preserving order of everything else.
 */
$priority = ['homepage'];
$priorityLower = array_map('strtolower', $priority);

$front = [];
$rest  = [];

foreach ($result as $row) {
    if (isset($row['slug']) && in_array(strtolower($row['slug']), $priorityLower, true)) {
        $front[] = $row;
    } else {
        $rest[] = $row;
    }
}

$result = array_merge($front, $rest);

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
