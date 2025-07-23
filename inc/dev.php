<?php

// Prevent direct access
defined('_JET') or die('Restricted Access');



// Enable strict error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Optional: output buffer to catch fatal errors
ob_start();

// Custom error handler for non-fatal warnings/notices
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    echo "<b>PHP Error:</b> [$errno] $errstr<br>";
    echo "File: $errfile<br>Line: $errline<br>";
    exit;
});

// Custom exception handler for thrown errors
set_exception_handler(function ($e) {
    echo "<b>Uncaught Exception:</b> " . $e->getMessage() . "<br>";
    echo "File: " . $e->getFile() . "<br>Line: " . $e->getLine() . "<br>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
    exit;
});

// Shutdown handler for catching fatal errors like syntax issues
register_shutdown_function(function () {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        echo "<b>Fatal Error:</b> {$error['message']}<br>";
        echo "File: {$error['file']}<br>Line: {$error['line']}<br>";
    }
    ob_end_flush();
});


/**
 * Safe debug function that prevents 500 errors.
 * Use: dd($var, true) for die-after-debug.
 *
 * @param mixed $data
 * @param bool $die
 */
function dd($data, $note = false): void {
    echo "<pre style='background:#111;color:#0f0;padding:10px;border:2px solid #0f0;'>";

    if ($note !== false) {
        echo "<strong>Log: $note</strong>\n\n";
    }

    print_r($data);
    echo "</pre>";

    if ($note === false) {
        exit;
    }
}

