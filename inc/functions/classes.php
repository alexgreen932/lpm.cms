<?php

// Prevent direct access
defined('_JET') or die('Restricted Access');

/**
 * Add classes from an array,
 * @param mixed $arr
 * @param mixed $exclude
 * @return string
 */
function classes($arr, $exclude = null) {
    if (!is_array($arr) || empty($arr)) {
        return '';
    }

    // Convert exclude to array (supports comma-separated string)
    if (is_string($exclude)) {
        $excludedKeys = array_map('trim', explode(',', $exclude));
    } elseif (is_array($exclude)) {
        $excludedKeys = $exclude;
    } else {
        $excludedKeys = [];
    }

    // Pick source: nested classes key or the array itself
    $source = (isset($arr['classes']) && is_array($arr['classes']))
        ? $arr['classes']
        : $arr;

    $output = [];

    foreach ($source as $k => $v) {
        if (!in_array($k, $excludedKeys, true) && !empty($v)) {
            $output[] = $v;
        }
    }

    return implode(' ', $output);
}
