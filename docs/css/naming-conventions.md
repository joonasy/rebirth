# Naming conventions

Naming conventions in CSS are hugely useful in making your code more strict, more transparent, and more informative.

A good naming convention will tell you and your team

* what type of thing a class does;
* where a class can be used;
* what (else) a class might be related to.

We rely on structured class names, partly BEM-like naming, and meaningful hyphens (i.e., not using hyphens merely to separate words) except for separating numbers. This helps to work around the current limits of applying CSS to the DOM (i.e., the lack of style encapsulation), and to better communicate the relationships between classes.

The primary architectural division is between helpers and components.

## Helpers

Low-level structural and positional traits. Helpers can be applied directly to any element within a component.

### helperName

Helpers must use a camelCase name. Helpers may also have modifiers and responsive variants like components do. What follows is an example of how various helpers can be used to create a simple structure within or without a component.

```html
<div class="Component marginTop--m clearfix">        # [1]
  <div class="Component-item floatLeft padding--m">  # [2]
    <img src="…" alt="…" class="m-center--block">    # [3]
    <p class="m-text--l">                            # [4]
      …
    </p>
  </div>  
</div>
```

* **1.** Sets up bigger margin top and cleafixes the component
* **2.** Aligns components item to left and adds default medium padding
* **3.** Centers image in large Media Query breakpoint
* **4.** Sets up large text in medium Media Query breakpoint

## Components

The CSS responsible for component-specific styling.

Syntax: `[<prefix>-]<ComponentName>[--modifierName|-chainable-modifierName|-descendantName]`

This has several benefits when reading and writing HTML and CSS:

* It helps to distinguish between the classes for the root of the component, descendant elements, and modifications.
* It keeps the specificity of selectors low.
* It helps to decouple presentation semantics from document semantics.

## Naming components and modifiers

Name things in CSS is to pick a name that is sensible, but somewhat ambiguous: aim for high reusability. For example, instead of a class like `.Nav--site`, choose something like `.Nav--primary`; rather than `.Footer-list`, favour a component with a modifier like `.List--link`.

The differences in these names is that the first of each two examples is tied to a very specific use case: they can only be used as the site’s navigation or the footer’s links respectively. By using slightly more ambiguous names, we can increase our ability to reuse these components in different circumstances.

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

### ComponentName--modifierName

**Use only single modifier per component and extend it with chainable modifiers**

A component modifier is a class that modifies the presentation of the base component in some form (e.g., for a certain configuration of the component). Component modifiers also modify their descendants by nesting, however if descendants need altering modifiers then modify the descendants directly. modifier names must be written in camelCase and be separated from the component name by two hyphens. The class should be included in the HTML in addition to the base component class. 

```css
/* Core button component */
.Button {}

/* Primary button modifier */
.Button--primary {}
```

```html
<button class="Button Button--primary" type="button">
  <span class="Button-item">…</span>
</button>
```

### ComponentName.-chainable-modifierName

Chainable modifiers are denoted by a leading hyphen `-`, a voluntary prefix and a descriptor for the modification. As the name would indicate, chainable modifiers provide us with the ability to configure a module in the HTML with a short, concise syntax. Chainable component modifiers can be added to component modifiers and collections may also modify their descendants by nesting.   

The golden rule is that **chainable modifiers should never modify the same CSS property twice**. This is to ensure that styles don’t get clobbered and that the order in which they are applied is irrelevant. 

Prefixes are not required however consider adding them if the modifier modifies some specific value such as `color` or `alignment`. 

```css
/* Core button */
.Button {}

/* Chainable modifiers */
.Button.-l {}

.Button.-round {}

.Button.-color-darkOnLight {}

.Button.-color-lightOnDark {}
```

```html
<a href="#" class="Button Button--primary -l -round" type="button">
  <span class="Button-dropdown Dropdown">…</span>
</a>
```

Chainable modifiers also accept responsive variants.

```html
<a href="#" class="Button -s -m-l">
</a>
```

Chainable modifiers extend main modifiers.

```css
.Button--primary {
  
  &.-justify {
    …
  }
}
```

Chainable modifiers can also be added to component collections.

```css
.ButtonCollection {
  …

  &.-justify {
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

Parent component modifiers also modify their descendants by nesting, however in some cases (rarely) descendants may need direct modifiers (`1`). Be careful in these situations not to override direct descendant modifiers with the parent modifier (`2`).

```css
/**
 * Core block
 */ 
.Block {}

  .Block-header {}

    .Block-image {}

  .Block-content {}

    .Block-text {}

      .Block-text--meta {} // [1] Example of direct descendant modifier

.Block-footer {}

/**
 * Primary block modifier
 */ 
.Block--primary {
  …

  .Block-header {}

    .Block-image {}

  .Block-text {}

    .Block-text--meta {} // [2] Be careful not to override direct modifier

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

  &.-horizontal {
    …

    > .Button {}
  } 
}
```

```html
<div class="ButtonCollection -horizontal">
  <button class="Button">
    …
  </button>
  <button class="Button">
    …
  </button>
</div>
```

## JavaScript hooks

As a rule, it is unwise to bind your CSS and your JS onto the same class in your HTML. This is because doing so means you can’t have (or remove) one without (removing) the other. It is much cleaner, much more transparent, and much more maintainable to bind your JS onto specific classes.

Typically, these are classes that are prepended with `js-`, for example:

```html
<input type="submit" class="Button js-Button" value="Follow" />
```

This means that we can have an element elsewhere which can carry with style of `.Button {}`, but without the behaviour of `.js-Button`.

When setting JavaScript to components which affect only the component directly it is preferable to use the same naming convention in the hook (PascalCase e.g. `js-Component`). Otherwise use camelCase e.g. `js-myTrigger`.

### data-* attributes

A common practice is to use `data-*` attributes as JS hooks, but this is incorrect. `data-*` attributes, as per the spec, are used _to store custom data private to the page or application_. `data-*` attributes are designed to store data, not be bound to.

## Reserved namespaces and other keywords

The following namespaces are reserved for specific use.

### Responsive variants

* `[x...]s-<name>`: Small viewports (e.g. Mobile phones)
* `m-<name>`: Medium viewport (e.g. Tablets)
* `[x...]l-<name>`: Large viewports (e.g. Desktop computers)

Responsive variants are activated in the given Media Query breakpoint (mobile first ideology). These prefixes are mainly used by helpers and components (e.g. `Width` component) but can also be used by chainable component modifiers (rarely).

Example use of responsive `Width` component which is activated both in medium and extra large breakpoint:

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
  <div class="Grid-item m-Width--6of12 xl-Width--4of12">
    <div class="Component">
      …
    </div>
  </div>
  <div class="Grid-item m-Width--6of12 xl-Width--8of12">
    <div class="Component">
      …
    </div>
  </div>
</div>
```

Example use of _margin_ helper which is activated in large breakpoint:

```css
@inlude breakpoint("largeUp") {
  .l-marginTop--m { margin-top: rem($baseSpace * 2) !important; }
}
```

```html
<div class="l-marginTop--m">
  …
</div>
```

### Modifiers

* Abstract modifier definitions for components (e.g `.Button--primary`): `--primary`, `--secondary`, `--tertiary`, `--quaternary`, `--quinary`, `--senary`, `--septenary`, `--octonary`, `--nonary`, `--denary`
* Sizing modifiers: `--[x...]s`, `--m`, `--ml`, `--[x...]l`
    * Used by helpers (e.g `.marginTop--l`). **For component sizing use chainable modifiers.**

### Prefixes and suffixes in Sass variables

Default sass variables do not need hyphens, use camelCase instead. e.g. `$baseFontSize` not `$base-fontSize`. 

Component sass variables however _do_ need hyphens e.g. `$MyComponent-heading` not `$MyComponentHeading`.

* Sizing suffixes used in Sass variables:  `-[x...]s`, `-m`, `-ml`, `-[x...]l`
