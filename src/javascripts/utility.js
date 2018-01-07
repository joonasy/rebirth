/* ========================================
 * Utility
 * ======================================== */

/**
 * Select the first match only, context is optional
 */
export const $ = (selector, context) => (context || document).querySelector(selector)

/**
 * Select a list of matching elements, context is optional
 */
export const $$ = (selector, context) => (context || document).querySelectorAll(selector)

/**
 * Select matching id
 */
export const $id = id => document.getElementById(id)

/**
 * Select matching tags
 */
export const $tag = tag => document.getElementsByTagName(tag)
