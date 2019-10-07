---
title: Components
description: Rebirth is designed for styling reusable, composable components (OOCSS).
layout: styleguide
---

## Components

Rebirth is designed for styling reusable, composable components (OOCSS). The benefits are most apparent in a system that considers components to be the buildingblocks of your application.

Think of components as custom elements that enclose specific semantics, styling, and behaviour. For example, this `Pant` component and configuration:

```html
<Pant src="pant.jpg" size="large" crop="circle">
  A photo of <a href="…">Mikko Alatalo</a>s pants.
</Pant>
```

could yield the following HTML:

```html
<figure class="Pant Pant--default -l -crop-circle">
  <span class="Pant-icon Icon -zoom"></span>
  <img class="Pant-img" src="pants.jpg" alt="…" />
  <figcaption class="Pant-caption">
    A photo of <a href="…">Mikko Alatalo</a>s pants.
  </figcaption>
</figure>
```

This helps to partially isolate the CSS used in the `Pants` component's implementation. In doing so, it makes styling simpler by reducing the amount of styling entanglement between components, and prevents styles from leaking outside the component.

### Component types

#### Default components

Components are page elements with a single function.

#### Groups

Component groups collect components as groups and modify their behavior.

#### Containers

Usually it's necessary to control other components in a specific way at some portions of the site. Container components are doing just that by controlling only specific sections our site like Header or the entire site for example as theme. Container components also control the layout of default components by using grids and widths, or wrapping content in various areas.

### Component scope

The component's core class name (e.g., `ComponentName`) reserves a namespace that can only be used by that component.

**All selectors in a component file must start with the component's namespace**. For example, a component called `MyPant` could have the following CSS, where every selector starts with the string `MyPant`.

```css
.MyPant {
}
.MyPant--primary {
}
.MyPant.-size-l {
}
.MyPant.is-open {
}
.MyPant-title {
}
.MyPant-image {
}
.MyPant-text {
}
.MyPant-time {
}
```

Each class provides a hook to style specific elements within the HTML definition.

```html
<div class="MyPant MyPant--primary cf -l">
  <h1 class="MyPant-title">…</h1>
  <img class="MyPant-image" src="…" alt="…" />
  <p class="MyPant-text">
    <span class="MyPant-date">…</span>
  </p>
</div>
```

Like classes, variables must also be scoped to their component by including the component name in the variable name:

```css
// components/MyPant/_MyPant.config.scss
$MyPant-borderWidth: 3px;

// components/MyPant/_MyPant.scss
.MyPant {
  border-width: $MyPant-borderWidth;
}
```

Avoid coupling or entangling components, even if that means the code is not as DRY as you think it should be. Isolation prevents avoidable complexity and is an important part of robust reuse.

### One pattern, one component

**Each component should implement a single part of the UI**. Don't try to do too much.

**Each component should have a dedicated CSS file**. Ideally your component's files are grouped together in a dedicated directory.

### Documenting implementation details

Components should document their implementation. The CSS comments for a component should seek to answer the following questions:

- What is the intended presentation?
- What are the modifiers and states?
- What are the reasons for specific, opaque property values.
- What are the known limitations?

### Adapting to ancestral context

**Most components should not set their own width, margin, and positioning.** By authoring a component to be full-width or inline, it can better adapt to the dimensions of an ancestral context (e.g. grid).

### Styling dependencies

**A component should not know about the implementation of its dependencies**. The appearance of dependencies must be configured using the interface they provide.

Controlling dimensions, margins, position, and inheritable styles of a component can be done _indirectly_. Add a class to its root element, or wrap it in another element.

```scss
.Excerpt {
}

/* Attaches to a nested component */
.Excerpt-button {
  display: inline-block;
  margin-bottom: $baseSpace;
}

/* Wraps a nested component */
.Excerpt-wrapButton {
  display: inline-block;
  margin-bottom: $baseSpace;
}
```

```html
<article class="Excerpt cf">
  <a class="Excerpt-button Button Button--default">Read more</a>
  <div class="Excerpt-wrapButton">
    <a class="Button Button--default">Read more</a>
  </div>
</article>
```
