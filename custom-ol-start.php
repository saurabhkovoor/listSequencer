<?php
/*
Plugin Name: Custom OL Start
Description: Adds a button to the classic editor toolbar for setting the start attribute of ordered lists.
Version: 1.0
*/

// Enqueue JavaScript and CSS files
function custom_ol_start_enqueue_scripts() {
    wp_enqueue_script('custom-ol-start-script', plugins_url('custom-ol-start.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('admin_enqueue_scripts', 'custom_ol_start_enqueue_scripts');

// Add button to the classic editor toolbar
function custom_ol_start_add_editor_button() {
    add_filter('mce_external_plugins', 'custom_ol_start_add_plugin');
    add_filter('mce_buttons', 'custom_ol_start_register_button');
}
add_action('admin_init', 'custom_ol_start_add_editor_button');

function custom_ol_start_add_plugin($plugin_array) {
    $plugin_array['custom_ol_start'] = plugins_url('custom-ol-start.js', __FILE__);
    return $plugin_array;
}

function custom_ol_start_register_button($buttons) {
    array_push($buttons, 'custom_ol_start_button');
    return $buttons;
}
