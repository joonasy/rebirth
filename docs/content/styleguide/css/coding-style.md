---
title: Coding style
description: We use a methodology focused on improving the CSS authoring experience for component-based development.
layout: styleguide
---

## Syntax and formatting

One of the simplest forms of a styleguide is a set of rules regarding syntax and formatting. Having a standard way of writing CSS means that code will always look and feel familiar to all members of the team.

At a very high-level, we want

- two (2) space indents, no tabs;
- 80 character wide columns;
- multi-line CSS;
- meaningful use of whitespace.

But, as with anything, the specifics are somewhat irrelevant—consistency is key.

### Stylesheet formatting

- Try to alphabetize properties
- Extends (`@extend`) and mixins (`@include`) should be placed before standard properties
- Add a semi-colon (`;`) after each declaration (e.g. `color: red;`)
- Add a space after `// comments`
- Add a space after commas in values (e.g. `rgba(#000000, 0.5)`)
- Write numbers at the end of mathematic operations (e.g. `$base-space * 0.5`)
- Always stick with classes instead of IDs for styling
- related selectors on the same line; unrelated selectors on new lines
- a space before our opening brace (`{`)
- properties and values on the same line
- a space after our property–value delimiting colon (`:`)
- each declaration on its own new line
- the opening brace (`{`) on the same line as our last selector
- our first declaration on a new line after our opening brace (`{`)
- our closing brace (`}`) on its own new line
- each declaration indented by two (2) spaces

```css
/**
 * Example
 */
.Component,
.someSelector {
  @extend %clearfix;
  @include dropdown();
  background-color: $colorPrimary;
  box-shadow: 0 1px 2px rgba(#000000, 0.2);
  color: $colorText;
  font-size: $baseFontSize-s;
  line-height: $baseLineHeight-s;
  margin-bottom: $baseSpace;

  &:before,
  &:after {
    content: '';
  }
}
```

## Multi-line CSS

CSS should be written across multiple lines, except in very specific circumstances. There are a number of benefits to this:

- A reduced chance of merge conflicts, because each piece of functionality exists on its own line.
- More ‘truthful’ and reliable diffs, because one line only ever carries one change.

Exceptions to this rule should be fairly apparent, such as similar rulesets that only carry one declaration each, for example:

```css
.margin {
  margin: rem($baseSpace) !important;
}
.margin--xs {
  margin: rem($baseSpace / 4) !important;
}
.margin--s {
  margin: rem($baseSpace / 2) !important;
}
```

## Comments and titling

Remembering your own classes, rules, objects, and helpers is manageable to an extent, but anyone inheriting CSS barely stands a chance.

When to use commenting

- whether some CSS relies on other code elsewhere
- what effect changing some code will have elsewhere
- where else some CSS might be used
- what styles something might inherit (intentionally or otherwise)
- what styles something might pass on (intentionally or otherwise)
- where the author intended a piece of CSS to be used

As a rule, you should comment anything that isn’t immediately obvious from the code alone. That is to say, there is no need to tell someone that `color: red;`will make something red, but if you’re using `overflow: hidden;` to clear floats—as opposed to clipping an element’s overflow—this is probably something worth documenting.

Titling, however, should be used always.

### First-level titles and comments

Begin every new major section of a CSS file with a title comment:

```css
/* =======================================
 * My title
 * ======================================= 
 * 
 * Some useful comment. This is comment isn't always necessary. Lorem ipsum
 * sit amet, consectetur adipiscing elit. Istam voluptatem perpetuam quis.
 */

.selector {
}
```

Leave a carriage return between this title and the next line of code (be that a comment, SCSS, or some CSS).

This title should appear at the top of each file (.scss, .css). If you are working on a file with multiple sections, each title should be preceded by four (2) carriage returns. This extra whitespace coupled with a title makes new sections much easier to spot when scrolling through large files:

```css
/* =======================================
 * My title
 * ======================================= */

.selector {
}

/* =======================================
 * My second title
 * ======================================= */

.another-selector {
}
```

### Second-level titles and comments

Use second-level titling for example if defining modifiers for a component. Leave a carriage return between this title and the next line of code. Each second-level title should be preceded by two (2) carriage returns.

```css
/* ======
 * Component modifier
 * ====== */

.Component--modifier {
}

/* ======
 * Another Component modifier
 * ====== 
 * 
 * Some useful comment. Lorem ipsum sit amet, consectetur adipiscing elit. 
 * Istam voluptatem perpetuam quis.
 */

.Component--secondaryModifier {
}
```

### Third-level titles, multiline and singleline comments

For large comments that document entire sections or components, we use a DocBlock-esque multi-line comment which adheres to our 80 column width. Leave a carriage return between this title/comment and the next line of code.

```css
/**
 * This is my third-level title / comment
 */

.selector {
}

/**
 * This is my multiline comment
 *
 * 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 *    Te enim iudicem aequum puto, modo quae dicat ille bene noris. 
 * 2. Bonum incolumis acies: misera caecitas. Consequens enim est et 
 *    post oritur, ut dixi. Duo Reges: constructio interrete. 
 *
 * Eadem nunc mea adversum te oratio est. Hosne igitur laudas et hanc 
 * eorum, inquam, sententiam sequi nos censes oportere? Dicet pro me ipsa 
 * virtus nec dubitabit isti vestro beato.
 */

.selector {
  property: value; /* [1] */
  another-property: another-value; /* [2] */
}
```

These types of multiline + singleline comments allow us to keep all of our documentation in one place whilst referring to the parts of the ruleset to which they belong.

### Preprocessor comments

As a rule, use these comments to document code that would not get written out to that CSS file either. If you are documenting code which will get compiled, use comments that will compile also. For example, this is correct:

```css
// =======================================
// Button
// =======================================

$Button-fontSize: $baseFontSize;
$Button-lineHeight: $baseLineHeightPx * 1.5;

// Dimensions of the @2x image sprite:
$sprite-width: 920px;
$sprite-height: 212px;
```
