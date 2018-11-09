---
title: Helpers
description: Helper classes map to fixed, low-level, structural and positional traits.
layout: styleguide
---

# Helpers

Helper classes map to fixed, low-level, structural and positional traits. These classes can be used in a component's HTML. Because helpers are so focused, they will generally use `!important` to ensure their styles are always applied.

## Why to use helpers

Certain CSS properties and patterns are used frequently. For example: floats, containing floats, vertical alignment, text truncation. Relying on helpers can help to reduce repetition and provide consistent implementations.

```html
<div class="cf m-visible">
  <p class="textTruncate">…</p>
  <img class="floatLeft" src="…" alt="" />
  <img class="floatLeft" src="…" alt="" />
  <img class="floatLeft" src="…" alt="" />
</div>
```

Some helpers apply only a single declaration, so why not use inline styles? Even here, small helpers are preferred because their values can be preprocessed (e.g., generating RTL style sheets) or adjusted to viewport dimensions. The scope of styles not contained in components can be tightly defined, and code is a little easier to read.

## How to use helpers

Helpers can be added to any element; multiple helpers can be used together;
and helpers can be used alongside component classes.

```html
<div class="Pants cf">
  <a class="colorPrimary" href="…"> <img class="block" src="…" alt="" /> </a>
  <p class="Pants-content textBreak">…</p>
</div>
```

Helpers are grouped by type. The names of helpers with similar concerns usually start with a common string, e.g., `textCenter`, `textTruncate`, `linkClean`, `linkBlock`.

Any classes with terse names, e.g., `cf` and `nbfc`, are either particularly abstract or very commonly used helpers with otherwise excessively long names. For example, the `cf` helper is used to "clearfix" without clipping any overflow; the `nbfc` helper is used to create a "new block formatting context". However I try to avoid these kind of shortcuts as they are pretty hard to understand at first sight.

## Modifiying helpers

Helpers should not be edited while in use, unless it is to fix a bug. Modifications to helpers cascade throughout the application and should be made with extreme care.
