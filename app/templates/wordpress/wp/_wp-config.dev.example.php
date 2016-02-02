<?php
/* ========================================
 * Development config for WordPress
 * ========================================
 *
 * Include the four main database defines. You may include other settings here
 * that you only want enabled on your local development checkouts
 *
 * 1. Set this to 'mysql' if using Docker
 */

define('DB_NAME', '<%= dbName %>');
define('DB_USER', '<%= dbUser %>');
define('DB_PASSWORD', '<%= dbPassword %>');
define('DB_HOST', '<%= dbHost %>'); /* [1] */
define('SAVEQUERIES', true);
define('WP_DEBUG', true);
define('FS_METHOD', 'direct');
define('WP_DEV', true);
