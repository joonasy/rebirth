# Naming conventions

Naming conventions in CSS are hugely useful in making your code more strict, more transparent, and more informative.

A good naming convention will tell you and your team

* what type of thing a class does;
* where a class can be used;
* what (else) a class might be related to.

We rely on structured class names, BEM-like naming, and meaningful hyphens (i.e., not using hyphens merely to separate words) except for separating numbers. This helps to work around the current limits of applying CSS to the DOM (i.e., the lack of style encapsulation), and to better communicate the relationships between classes.

The primary architectural division is between helpers and components.


## Helpers

Low-level structural and positional traits. Helpers can be applied directly to any element within a component.


### helperName

Helpers must use a camelCase name. Helpers may also have variations and responsive variants like components do. What follows is an example of how various helpers can be used to create a simple structure within or without a component.

```html
<!--
  1. Sets up bigger margin top and cleafixes the component
  2. Aligns components item to left and adds default medium padding
  3. Centers image in large Media Query breakpoint
  4. Sets up large text in medium Media Query breakpoint
--> 
<div class="Component marginTop--m cf"> <!-- [1.] -->
  <div class="Component-item floatLeft padding--m"> <!-- [2.] -->
    <img src="…" alt="…" class="m-center--block"> <!-- [3.] -->
    <p class="m-text--l"> <!-- [4.] -->
      …
    </p>
  </div>  
</div>
```


## Components

The CSS responsible for component-specific styling.

Syntax: `[<prefix>-]<ComponentName>[--variationName|-chainable-modifierName|-descendantName]`

This has several benefits when reading and writing HTML and CSS:

* It helps to distinguish between the classes for the root of the component, descendant elements, and modifications.
* It keeps the specificity of selectors low.
* It helps to decouple presentation semantics from document semantics.


### ComponentName

The component's name must be written in [PascalCase](http://c2.com/cgi/wiki?PascalCase). Nothing else in the HTML/CSS uses PascalCase.

```css
.MyPants {}
```

```html
<section class="MyPants">
  …
</section>
```


### ComponentName--variationName

A component variation (or component modifier) is a class that modifies the presentation of the base component in some form (e.g., for a certain configuration of the component). Component variations also modify their descendants by nesting, however if descendants need altering variations then modify the [descendants](#ComponentName-descendantName) directly. Variation names must be written in camelCase and be separated from the component name by two hyphens. The class should be included in the HTML in addition to the base component class. 

```css
/* Core button component */
.Button {}

/* Primary button variation */
.Button--primary {}
```

```html
<button class="Button Button--primary" type="button"
  <span class="Button-item">…</span>
</button>
```


### ComponentName.-chainable-modifierName

Chainable modifiers are denoted by a leading hyphen `-`, a voluntary prefix and a descriptor for the modification. As the name would indicate, chainable modifiers provide us with the ability to configure a module in the HTML with a short, concise syntax. Chainable component modifiers can be added to component variations and collections and may also modify their descendants by nesting.   

The golden rule is that **chainable modifiers should never modify the same CSS property twice**. This is to ensure that styles don’t get clobbered and that the order in which they are applied is irrelevant. 

Prefixes are not required however consider adding them if the modifier does something complex. Some obvious modifiers do not use prefixes, these are listed in `Reserved namespaces`.

```css
/* Core button */
.Button {}

/* Chainable modifiers */
.Button.-size-l {}

.Button.-type-round {}
```

```html
<a href="#" class="Button Button--primary -size-l -type-round" type="button"
  <span class="Button-dropdown Dropdown">…</span>
</a>
```

Chainable modifiers also accept responsive variants.

```html
<a href="#" class="Button -size-s -m-size-l">
</a>
```

Chainable modifiers may also extend variations.

```css
.Button--primary {
  &.-type-round {
    …
  }
}
```

Chainable modifiers can also be added to component collections.

```css
.ButtonCollection {
  …

  &.-type-round {
    …

    > .Button {}
  }
}
```

## ComponentName.is-stateOfComponent

Use `is-stateName` to reflect changes to a component's state. The state name
must be camel case. **Never style these classes directly; they should always be
used as an adjoining class.**

This means that the same state names can be used in multiple contexts, but
every component must define its own styles for the state (as they are scoped to
the component).

```css
.Block {
  …

  &.is-open {
    @extend %is-open;
  }
}
```

```html
<article class="Block is-open">
  …
</article>
```


### ComponentName-descendantName

A component descendant is a class that is attached to a descendant node of a
component. It's responsible for applying presentation directly to the
descendant on behalf of a particular component. descendant names must be
written in camelCase. 

Parent [Component variations](#ComponentName--variationName) also modify their descendants by nesting, however in some cases (rarely) descendants may need direct variations (`1.`). Be careful in these situations not to override direct descendant variations with the parent variation (`2.`).

```css
/**
 * Core block
 */ 
.Block {}

  .Block-header {}

    .Block-image {}

  .Block-content {}

    .Block-text {}

      .Block-text--meta {} // [1.] Example of direct descendant variation

.Block-footer {}

/**
 * Primary block modifier
 */ 
.Block--primary {
  …

  .Block-header {}

    .Block-image {}

  .Block-text {}

    .Block-text--meta {} // [2.] Be careful not to override direct variation

  .Block-footer {}
}
```

```html
<article class="Block">
  <header class="Block-header">
    <img class="Block-image" src="" alt="">
  </header>
  <div class="Block-content">
    <div class="Block-text">
      …
    </div>
  </div>
  <div class="Block-footer">
    …
  </div>
</article>
```


### ComponentNameCollection

> Components are descendants of component collections.

Some components need parent components to work properly. Component collections override component specific settings. Component collections also use chainable modifiers.

```css
/**
 * Button collection for Buttons
 */ 
.ButtonCollection {
  …

  > .Button {}

  &.-type-horizontal {
    …

    > .Button {}
  } 
}
```

```html
<div class="ButtonCollection -type-horizontal">
  <button class="Button">
    …
  </button>
  <button class="Button">
    …
  </button>
</div>
```


## Reserved namespaces and other keywords

The following namespaces are reserved for specific use.

### Responsive variants

* `[x...]s-<name>`: Small viewports (e.g. Mobile phones)
* `m-<name>`: Medium viewport (e.g. Tablets)
* `[x...]l-<name>`: Large viewports (e.g. Desktop computers)

Responsive variants are activated in the given Media Query breakpoint (mobile first ideology). These prefixes are mainly used by helpers and components (e.g. _Width_ component) but can also be used by chainable component modifiers (rarely).

Example use of responsive _Width_ component which is activated both in medium and extra large breakpoint:

```css
@inlude breakpoint("mediumUp") {
  .m-Width--6-12 { width: 50%; }
}

@inlude breakpoint("xLargeUp") {
  .xl-Width--4-12 { width: 33.333%; }
}
```

```html
<div class="Grid">
  <div class="Grid-item m-Width--6-12 xl-Width--4-12">
    <div class="Component">
      …
    </div>
  </div>
  <div class="Grid-item m-Width--6-12 xl-Width--8-12">
    <div class="Component">
      …
    </div>
  </div>
</div>
```

Example use of _margin_ helper which is activated in large breakpoint:

```css
@inlude breakpoint("largeUp") {
  .l-marginTop--m { margin-top: rem($base-space * 2) !important; }
}
```

```html
<div class="l-marginTop--m">
  …
</div>
```

### Obvious chainable modifiers

These chainable modifiers do not use prefixes.

* Sizing:  `-s`, `-m`, `-l`, `-[x...]s`, `-[x...]l`, `-full`
* Aligning: `-horizontal`, `-vertical`, `-left`, `-right`, `-center`
* Shapes: `-round`, `-border`


### Variations

* Abstract variation definitions for components (e.g `.Button--primary`): `--primary`, `--secondary`, `--tertiary`, `--quaternary`, `--quinary`, `--senary`, `--septenary`, `--octonary`, `--nonary`, `--denary`
* Sizing variations: `--[x...]s`, `--m`, `--ml`, `--[x...]l`
    * Used by helpers (e.g `.marginTop--l`). **For component sizing use chainable modifiers.**


### Suffixes

* Sass sizing variables:  `-[x...]s`, `-m`, `-ml`, `-[x...]l`
