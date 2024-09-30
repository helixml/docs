# Helix Docs!

## Quick Start

Pre-requisites: [Hugo](https://gohugo.io/installation/), [Go](https://golang.org/doc/install), [Git](https://git-scm.com) and [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Launch the live server:

```shell
hugo serve
```

### Update theme

```shell
hugo mod get -u
hugo mod tidy
```

See [Update modules](https://gohugo.io/hugo-modules/use-modules/#update-modules) for more details.

### CSS Notes

**TL;DR; prefix all your colour-related tailwind classes with `hx-`.**

The theme has a light-dark toggle, which is some custom javascript to tell all the theme's colour classes to switch to the dark.

Because I've also added raw tailwind to do custom tailwind stuff, it means that these classes don't get updated.

The net result is if you have a system preference of "dark", then set the manual toggle to "light", then the normal tailwind colours will be inverted.

The simplest workaround for now is to just prefix all tailwind colour classes with `hx-` which will then use the themes classes (which do work).

If you're wanting to use colours that don't exist in the theme, then you might have to add some javascript.

## Deployment

The website is hosted by [Netlify](https://app.netlify.com/sites/helixml-docs/deploys).

## Other Notes

### Base Template

This website is based upon [Hextra](https://github.com/imfing/hextra).
