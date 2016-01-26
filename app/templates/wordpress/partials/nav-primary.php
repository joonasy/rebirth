<?php
/* ========================================
 * Primary navigation
 * ======================================== */

wp_nav_menu(array(
  'theme_location'  => 'nav-primary',
  'container'       => 'nav',
  'container_class' => 'Navbar Navbar--default -l-horizontal -keepTitle js-Navbar',
  'echo'            => true,
  'fallback_cb'     => 'wp_page_menu',
  'depth'           => 3,
  'items_wrap' => '
    <ul>
      %3$s
    </ul>
  '
));
