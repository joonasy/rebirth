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

/**
 * Get the closest matching element up the DOM tree.
 *
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
export const closest = (el, selector) => {
  for (; el && el !== document; el = el.parentNode) { // eslint-disable-line
    if (el.matches(selector)) return el
  }

  return null
}
