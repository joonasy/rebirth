<?php
/* ============================================
 * Shortcode - Name
 * ============================================ */

namespace App\Shortcode\Name;

use App\Utils;

function name($atts, $content = null) {
  extract(shortcode_atts(array(
    'something' => '',
    'somethingElse' => null
  ), $atts));

  $return = '<div>';
    $return .= Utils\unwpautop($content);
  $return .= '</div>';

  return $return;
}

add_shortcode('name',  __NAMESPACE__ . '\\name');
