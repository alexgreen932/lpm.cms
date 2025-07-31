<?php
/**
 * newpage.php
 * Create a new page:
 * 1. Add entry to pages_list.json
 * 2. Create a blank page JSON file
 */

defined('_JET') or die('Restricted Access');

$title = trim($_POST['title'] ?? '');
$slug  = trim($_POST['slug'] ?? '');

// Validate
if (!$title || !$slug) {
    echo json_encode(['status' => 'error', 'message' => 'Missing title or slug']);
    exit;
}

// Paths
$pagesListFile = DATA . "pages_list.json";
$newPageFile   = DATA . "{$slug}.json";

// --- 1. Update pages_list.json ---
$list = [];
if (file_exists($pagesListFile)) {
    $list = json_decode(file_get_contents($pagesListFile), true) ?: [];
}
// Add new page if not already exists
foreach ($list as $p) {
    if ($p['slug'] === $slug) {
        echo json_encode(['status' => 'error', 'message' => 'Page already exists']);
        exit;
    }
}
$list[] = ['title' => $title, 'slug' => $slug];
file_put_contents($pagesListFile, json_encode($list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// --- 2. Create empty page file ---
$emptyPage = [
    'title'       => $title,
    'slug'        => $slug,
    'description' => '',
    'edit'        => false,
    'sections'    => [[
        'edit' => false,
        'w'    => 'w-container',
        'bg'   => 'bg-white',
        'p'    => 'p-1',
        'img'  => null,
        'ib'   => null,
        'i0'   => null,
        'col'  => 'tx-gray-d3',
        'jc'   => 'jc-c',
        'ai'   => 'ai-c',
        'g'    => 'g-1',
        'fd'   => 'fd-c',
        'content' => []
    ]]
];
file_put_contents($newPageFile, json_encode($emptyPage, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['status' => 'success', 'message' => 'Page created']);
