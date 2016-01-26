<?php
/* ========================================
 * Utilities for advanced custom fields
 * ======================================== */

namespace App\Utils\Acf;

/**
 * Get image url from an img array and fallback to some other thumnail image
 *
 * @param {Integer} $id ID of the post
 * @param {Array} $field Custom field name
 * @param {String} $fallback Fallback custom field name
 * @param {String} $thumbnail Fallback thumbnail size name
 * @return {String} Image URL
 */
function get_field_image_url($id, $field, $fallback, $thumbnail) {
  return get_field($field) ? get_field($field)['url'] : wp_get_attachment_image_src(get_post_meta($id, $fallback, 1), $thumbnail)[0];
}

/**
 * Get sub field image url from an img array and fallback to some other thumnail image
 *
 * @param {String} $field Custom field name
 * @param {String} $fallback Fallback custom field name
 * @param {String} $fallback Fallback thumbnail size name
 * @return {String} Image URL
 */
function get_sub_field_image_url($field, $fallback, $thumbnail) {
  return get_sub_field($field) ? get_sub_field($field)['url'] : get_sub_field($fallback)['sizes'][$thumbnail];
}
