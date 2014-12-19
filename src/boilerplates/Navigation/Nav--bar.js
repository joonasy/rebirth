/**
 * Init navbar
 */
var $navPrimary = $('#js-Nav--bar'),
    $navPrimaryTrigger = $('#js-Nav-trigger', $navPrimary),
    $navItem = $('.Nav-item', $navPrimary),
    $navLink = $('.Nav-link', $navPrimary),
    $navSubTrigger = $('.Nav-subTrigger', $navPrimary);

App.Toggle({
  trigger: $navPrimaryTrigger,
  element: $navPrimary
});

App.Toggle({
  trigger: $navSubTrigger,
  element: $navItem,
  toggleParent: true,
  unToggleParentSiblings: true,
  unToggleOtherToggles: false
});

App.Toggle({
  trigger: $navLink,
  element: $navItem,
  toggleParent: true,
  unToggleParentSiblings: true,
  disableFirstClickOnTouch: $navSubTrigger
});