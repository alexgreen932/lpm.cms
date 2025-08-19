<?php
$dir = __DIR__;
$lastCheck = [];

while (true) {
    $changed = false;
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir)) as $file) {
        if ($file->isFile() && pathinfo($file, PATHINFO_EXTENSION) === 'php') {
            $time = $file->getMTime();
            $path = $file->getRealPath();
            if (!isset($lastCheck[$path]) || $lastCheck[$path] !== $time) {
                $lastCheck[$path] = $time;
                $changed = true;
            }
        }
    }

    if ($changed) {
        echo "Change detected, reloading...\n";
        // Use WebSocket, JS polling, or touch a reload file
        file_put_contents(__DIR__ . '/reload.txt', time());
    }

    sleep(1);
}



//command 
// cd /opt/lampp/htdocs/componentor.main/jet-engine
//cd jet-engine
//php watcher.php
