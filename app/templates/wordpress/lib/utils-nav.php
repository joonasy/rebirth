<?php
/* ========================================
 * Navigation utils
 * ======================================== */

namespace App\Utils\Nav;

/**
 * Show only sub menu
 * filter_hook function to react on sub_menu flag
 */
function show_submenu_only($sorted_menu_items, $args) {
  if (isset($args->sub_menu)) {
    $root_id = 0;

    /**
     * Find the current menu item
     */
    foreach ($sorted_menu_items as $menu_item) {
      if ($menu_item->current) {

        /**
         * Set the root id based on whether the current menu item has a parent or not
         */
        $root_id = ($menu_item->menu_item_parent) ? $menu_item->menu_item_parent : $menu_item->ID;
        break;
      }
    }

    /**
     * Find the top level parent
     */
    if (!isset($args->direct_parent)) {
      $prev_root_id = $root_id;

      while ($prev_root_id != 0) {
        foreach ($sorted_menu_items as $menu_item) {
          if ($menu_item->ID == $prev_root_id) {
            $prev_root_id = $menu_item->menu_item_parent;

            /**
             * Don't set the root_id to 0 if we've reached the top of the menu
             */
            if ($prev_root_id != 0) $root_id = $menu_item->menu_item_parent;
            break;
          }
        }
      }
    }

    $menu_item_parents = array();
    foreach ($sorted_menu_items as $key => $item) {

      /**
       * Init menu_item_parents
       */
      if ($item->ID == $root_id) $menu_item_parents[] = $item->ID;

      if (in_array($item->menu_item_parent, $menu_item_parents)) {

        /**
         * Part of sub-tree: keep!
         */
        $menu_item_parents[] = $item->ID;
      } else if (!(isset($args->sub_menu_show_parent) && in_array($item->ID, $menu_item_parents))) {

        /**
         * Not part of sub-tree: away with it!
         */
        unset($sorted_menu_items[$key]);
      }
    }

    return $sorted_menu_items;
  } else {
    return $sorted_menu_items;
  }
}

add_filter('wp_nav_menu_objects', __NAMESPACE__ . '\\show_submenu_only', 10, 2);
