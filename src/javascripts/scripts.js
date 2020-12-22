/* =======================================
 * Scripts
 * ======================================= */

 import { $$ } from './utility';

 /**
  * Make focus outline visible only for keyboard navigation (tab key)
  */
 (function() {
   let focusTab = document.getElementsByClassName('js-tabFocus');
   function detectClick() {
     if (focusTab.length > 0) {
       resetFocusTabs(false);
       window.addEventListener('keydown', detectTab);
     }
     window.removeEventListener('mousedown', detectClick);
   };

   function detectTab(event) {
     if (event.keyCode !== 9) return;
     resetFocusTabs(true);
     window.removeEventListener('keydown', detectTab);
     window.addEventListener('mousedown', detectClick);
   };

   function resetFocusTabs(bool) {
     let outlineStyle = bool ? '' : 'none';
     for (let i = 0; i < focusTab.length; i++) {
       focusTab[i].style.setProperty('outline', outlineStyle);
     }
   };

   window.addEventListener('mousedown', detectClick);
 }());
