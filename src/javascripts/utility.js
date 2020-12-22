/* =======================================
 * Utility
 * ======================================= */

/**
 * Select the first match only, context is optional
 */
export const $ = (selector, context) =>
  (context || document).querySelector(selector);

/**
 * Select a list of matching elements, context is optional
 */
export const $$ = (selector, context) =>
  (context || document).querySelectorAll(selector);

/**
 * Select matching id
 */
export const $id = (id) => document.getElementById(id);

/**
 * Select matching tags
 */
export const $tag = (tag) => document.getElementsByTagName(tag);

/**
 * Class utilities
 */
 const hasClass = (el, className) => {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

const addClass = (el, className) => {
	let classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
};

const removeClass = (el, className) => {
	let classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);
	else if (hasClass(el, classList[0])) {
		let reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
};

const toggleClass = (el, className, bool) => {
	if (bool) addClass(el, className);
	else removeClass(el, className);
};

export {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
};
