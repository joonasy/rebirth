/* ========================================
 * Application head
 * ======================================== */

/**
 * Global custom build modernizr
 */
import '<% if (html) { %>../../../dist/assets<% } if (typo3) { %>../../Resources/Public/Assets<% } if (wp) { %>../../dist/assets<% } %>/javascripts/vendors/modernizr.js';

/**
 * Various browser related fixes
 */
import fixes from './lib/fixes';
