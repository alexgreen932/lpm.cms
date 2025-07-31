<?php

// Prevent direct access
defined('_JET') or die('Restricted Access');

function com_title($args) {
    $tag = $args['el']['tag'] ?? 'h2';
    $text = $args['el']['text'] ?? '';
    $classes = classes($args['classes'] ?? []);
    return "<$tag class='$classes'>$text</$tag>";
}

function com_paragraph($args) {
    $text = $args['el']['text'] ?? '';
    $classes = classes($args['classes'] ?? []);
    return "<p class='$classes'>$text</p>";
}

function com_button($args) {
    $text = $args['el']['text'] ?? '';
    $url = $args['el']['url'] ?? '#';
    $target = $args['el']['target'] ?? '_self';
    $classes = classes($args['classes'] ?? []);
    return "<a href='$url' target='$target' class='$classes'>$text</a>";
}


