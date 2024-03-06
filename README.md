# Helix Docs

## Quick Start

Pre-requisites: [Hugo](https://gohugo.io/installation/), [Go](https://golang.org/doc/install) and [Git](https://git-scm.com)

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

## Deployment

### GitHub Pages

A GitHub Actions workflow is provided in [`.github/workflows/pages.yaml`](./.github/workflows/pages.yaml) to [publish to GitHub Pages](https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/) for free. 

## Other Notes

### Base Template

This website is based upon [Hextra](https://github.com/imfing/hextra).
