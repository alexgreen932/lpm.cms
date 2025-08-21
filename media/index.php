 <?php
$dir = __DIR__;
$files = array_filter(scandir($dir), function ($file) use ($dir) {
    if (in_array($file, ['.', '..', 'index.php', 'upload.php'])) return false;
    if (pathinfo($file, PATHINFO_EXTENSION) === 'php') return false;
    return is_file($dir . '/' . $file);
});

$data = [];

foreach ($files as $file) {
    $path = $dir . '/' . $file;
    if (is_file($path)) {
        $data[] = [
            'name' => $file,
            'url' => 'media/' . $file,
            'type' => pathinfo($file, PATHINFO_EXTENSION),
            'size' => filesize($path)
        ];
    }
}

header('Content-Type: application/json');
echo json_encode($data);

