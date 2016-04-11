## Components

My Web Starter kit is designed for styling reusable, composable components (OOCSS). The benefits are most apparent in a system that considers components to be the buildingblocks of your application.

Think of components as custom elements that enclose specific semantics,
styling, and behaviour. For example, this `Pants` component and configuration:

```html
<Pants src="pants.jpg" size="large" crop="circle">
  A photo of <a href="…">Mikko Alatalo</a>s pants.
</Pants>
```

could yield the following HTML:

```html
<article class="Pants Pants--primary --l">
  <a class="Pants-crop --cropCircle" href="pants.jpg">
    <span class="Pants-icon">
      <span class="Icon --typeZoom"></span>
    </span>
    <img class="Pants-img block" src="pants.jpg" alt="…">
  </a>
  <div class="Pants-caption text--l">
    A photo of <a href="…">Mikko Alatalo</a>s pants.
  </div>
</article>
```

Web Starter kit helps to partially isolate the CSS used in the `Pants` component's implementation. In doing so, it makes styling simpler by reducing the amount of styling entanglement between components, and prevents styles from leaking outside the component.

(Read about [Naming conventions](#naming-conventions))

### Component scope

The component's core class name (e.g., `ComponentName`) reserves a namespace
that can only be used by that component.

**All selectors in a component file must start with the component's
namespace**. For example, a component called `MyPants` could have the
following CSS, where every selector starts with the string `MyPants`.

```css
.MyPants {}
.MyPants--primary {}
.MyPants.--jeans {}
.MyPants.is-open {}
.MyPants-title {}
.MyPants-image {}
.MyPants-text {}
.MyPants-time {}
```

Each class provides a hook to style specific elements within the HTML definition.

```html
<article class="MyPants MyPants--primary cf --l">
  <h1 class="MyPants-title">…</h1>
  <img class="MyPants-image" src="…" alt="…">
  <p class="MyPants-text">
    <span class="MyPants-time">…</span>
    …
  </p>
</div>
```

Like classes, variables must also be scoped to their component by including the
component name in the variable name:

```css
// _config.scss
$MyPants-borderWidth: 5px;

// components/_MyPants.scss
.MyPants {
  border-width: $MyPants-borderWidth;
  property: value;
}
```

This allows a theme to override the defaults if desired.

Avoid coupling or entangling components, even if that means the code is not as
DRY as you think it should be. Isolation prevents avoidable complexity and is
an important part of robust reuse.

### One pattern, one component

**Each component should implement a single part of the UI**. Don't try to do
too much.

**Each component should have a dedicated CSS file**. Ideally your component's
files are grouped together in a dedicated directory.

(Read about [Sass structure](#sass-structure).)

### Documenting implementation details

Components should document their implementation. The CSS comments for a component should seek to answer the following questions:

* What is the intended presentation?
* What are the modifiers and states?
* What are the reasons for specific, opaque property values.
* What are the known limitations?

### Adapting to ancestral context

**Most components should not set their own width, margin, and positioning.** By
authoring a component to be full-width or inline, it can better adapt to the
dimensions of an ancestral context (e.g. grid).

### Styling dependencies

**A component should not know about the implementation of its dependencies**.
The appearance of dependencies must be configured using the interface they provide.

Controlling dimensions, margins, position, and inheritable styles of a
component can be done _indirectly_. Add a class to its root element, or wrap
it in another element.

```css
.Excerpt {}

/* Attaches to a nested component */
.Excerpt-button {
  display: inline-block;
  margin-bottom: $base-space;
}

/* Wraps a nested component */
.Excerpt-wrapButton {
  display: inline-block;
  margin-bottom: $base-space;
}
```

```html
<article class="Excerpt">
  …

  <a class="Excerpt-button Button">Read more</a>

  <div class="Excerpt-wrapButton">
    <a class="Button">Read more</a>
  </div>
</article>
```
