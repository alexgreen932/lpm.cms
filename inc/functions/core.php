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
function com_html($args) {
    $html = $args['el']['html'] ?? '';
    $classes = classes($args['classes'] ?? []);
    return "<div class='$classes'>$html</div>";
}

function com_button($args) {
    $text = $args['el']['text'] ?? '';
    $url = $args['el']['url'] ?? '#';
    $target = $args['el']['target'] ?? '_self';
    $classes = classes($args['classes'] ?? []);
    return "<a href='$url' target='$target' class='$classes'>$text</a>";
}


function com_image($args) {
    $el = $args['el'] ?? [];
    $src = $el['src'] ?? '';
    $text = $el['text'] ?? 'Image';
    $classes = classes($args['classes'] ?? []);

    // Style building
    $styleArgs = $args['style'] ?? [];
    $style = '';

    if (!empty($styleArgs['pos_a'])) {
        // Base absolute positioning
        $styles = ['position: absolute;'];

        // Conditional properties (like Vue spread syntax)
        if (!empty($styleArgs['use_top']))    $styles[] = "top: {$styleArgs['top']}px;";
        if (!empty($styleArgs['use_bottom'])) $styles[] = "bottom: {$styleArgs['bottom']}px;";
        if (!empty($styleArgs['use_left']))   $styles[] = "left: {$styleArgs['left']}px;";
        if (!empty($styleArgs['use_right']))  $styles[] = "right: {$styleArgs['right']}px;";

        // Combine into one string
        $style = 'style="' . implode(' ', $styles) . '"';
    }

    // HTML Output
    $html = [];
    $html[] = '<figure class="element ' . $classes . '" ' . $style . '>';
    $html[] = '<img src="' . $src . '" alt="' . $text . '">';
    if (!empty($el['show_caption'])) {
        $html[] = '<figcaption>' . $text . '</figcaption>';
    }
    $html[] = '</figure>';

    return implode("\n", $html);
}



