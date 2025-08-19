 
<?php
header('Content-Type: application/json');

if (!isset($_FILES['file'])) {
    echo json_encode(['status' => 'error', 'message' => 'No file received']);
    exit;
}

$targetDir = __DIR__ . '/';
$targetFile = $targetDir . basename($_FILES['file']['name']);

if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
    echo json_encode(['status' => 'ok', 'file' => $_FILES['file']['name']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Upload failed']);
}
