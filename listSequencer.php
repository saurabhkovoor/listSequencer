<?php
/*
Plugin Name: List Sequencer
Description: Adds a button to the classic editor toolbar for setting the start attribute values to the lists in selection, hence treating the selected lists as one sequence.  (Hierarchical ordered lists are currently not supported)
Version: 1.0
Author: <a href="https://saurabhkovoor.com">Saurabh Kovoor</a>
*/

function listSequencer_enqueue_scripts()
{
    if (is_admin()) {
        add_action('after_wp_tiny_mce', function () {
            wp_enqueue_script('custom-ol-start-script', plugins_url('custom-ol-start.js', __FILE__), array('jquery'), '1.0', true);
        });
    }
}
add_action('admin_enqueue_scripts', 'listSequencer_enqueue_scripts');

function listSequencer_add_editor_button()
{
    add_filter('mce_external_plugins', 'listSequencer_add_plugin');
    add_filter('mce_buttons', 'listSequencer_register_button');
}
add_action('admin_init', 'listSequencer_add_editor_button');

function listSequencer_add_plugin($plugin_array)
{
    $plugin_array['listSequencer'] = plugins_url('listSequencer.js', __FILE__);
    return $plugin_array;
}

function listSequencer_register_button($buttons)
{
    array_push($buttons, 'listSequencer_button');
    return $buttons;
}