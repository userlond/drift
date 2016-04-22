![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)

# Drift [![Build Status](https://travis-ci.org/imgix/drift.svg?branch=master)](https://travis-ci.org/imgix/drift) [![Slack Status](http://slack.imgix.com/badge.svg)](http://slack.imgix.com)

Easily add "zoom on hover" functionality to your site's images. Lightweight, no-dependency JavaScript.

* [Installation](#installation)
* [Usage](#usage)
* [Options / Defaults](#options-defaults)
* [Browser Support](#browser-support)
* [Theming](#theming)
* [Meta](#meta)


<a name="installation"></a>
## Installation

* **NPM**: `npm install drift-zoom`
* **Bower**: `bower install drift`
* **Manual**: [Download](https://github.com/imgix/drift/archive/master.zip) and use `dist/Drift.min.js` or `dist/Drift.js`

If your build process will re-run `dist/Drift.js` or `dist/Drift.min.js` through Browserify, you'll need to add `noParse: ['drift-zoom']` to your Browserify config. If you skip this, Browserify will attempt to re-require Drift's dependencies which have already been inlined.


<a name="usage"></a>
## Usage

Once you've installed Drift via one of the above methods, you're ready to get started. There are no dependencies, so you can just start making cool stuff. Check out the [announcement blog post](http://blog.imgix.com/2016/01/06/better-lightbox-zoom-viewer-with-imgix.html) for a demo, or take a peek here: https://imgix.github.io/drift. Here's an example of the most basic possible implementation:

``` html
<img src="http://assets.imgix.net/dog.png?w=400" data-zoom="http://assets.imgix.net/dog.png?w=1200">

<p>This is a simple description of the dog picture.</p>
```

``` javascript
new Drift(document.querySelector('img'), {
  paneContainer: document.querySelector('p')
});
```


<a name="options-defaults"></a>
## Options / Defaults

Here's an example of using Drift with a custom configuration. All of the listed options are displayed with their default value.

``` javascript
var options = {
	// Prefix for generated element class names (e.g. `my-ns` will
	// result in classes such as `my-ns-pane`. Default `drift-`
	// prefixed classes will always be added as well.
	namespace: null,
	// Whether the ZoomPane should show whitespace when near the edges.
	showWhitespaceAtEdges: false,
	// Whether the inline ZoomPane should stay inside
	// the bounds of its image.
	containInline: false,
	// How much to offset the ZoomPane from the
	// interaction point when inline.
	inlineOffsetX: 0,
	inlineOffsetY: 0,
	// Which trigger attribute to pull the ZoomPane image source from.
	sourceAttribute: 'data-zoom',
	// How much to magnify the trigger by in the ZoomPane.
	// (e.g., `zoomFactor: 3` will result in a 900 px wide ZoomPane image
	// if the trigger is displayed at 300 px wide)
	zoomFactor: 3,
	// A DOM element to append the non-inline ZoomPane to.
	// Required if `inlinePane !== true`.
	paneContainer: document.body,
	// When to switch to an inline ZoomPane. This can be a boolean or
	// an integer. If `true`, the ZoomPane will always be inline,
	// if `false`, it will switch to inline when `windowWidth <= inlinePane`
	inlinePane: 375,
	// If `true`, touch events will trigger the zoom, like mouse events.
	handleTouch: true,
	// If present (and a function), this will be called
	// whenever the ZoomPane is shown.
	onShow: null,
	// If present (and a function), this will be called
	// whenever the ZoomPane is hidden.
	onHide: null,
	// Add base styles to the page. See the "Theming"
	// section of README.md for more information.
	injectBaseStyles: true,
  // Highlight the region of the image that is being zoomed.
  highlightImage: false,
  // The color of the highlight. Only matters if `highlightImage` =
  // true.
  highlightColor: 'rgba(0, 0, 0, 0.5)'
};

new Drift(document.querySelector('img'), options);
```


<a name="theming"></a>
## Theming

By default, Drift injects an extremely basic set of styles into the page. You will almost certainly want to extend these basic styles for a prettier, more usable experience that matches your site. There is an included basic theme that may meet your needs, or at least give a good example of how to build out your own custom styles. The `namespace` option can be used as a way to easily apply different themes to specific instances of Drift.

If you need to do something very out of the ordinary, or just prefer to include the default styles in CSS yourself, you can pass `injectBaseStyles: false` when instantiating a new instance of Drift. Please note that if you disable the included base styles, you will still need to provide an animation for `.drift-window.drift-opening` and `.drift-window.drift-closing` (this can be a "noop" style animation, as seen in the base styles source).


<a name="browser-support"></a>
## Browser Support

We support the latest version of Google Chrome (which [automatically updates](https://support.google.com/chrome/answer/95414) whenever it detects that a new version of the browser is available). We also support the current and previous major releases of desktop Firefox, Internet Explorer, and Safari on a rolling basis. Mobile support is tested on the most recent minor version of the current and previous major release for the default browser on iOS and Android (e.g., iOS 9.2 and 8.4). Each time a new version is released, we begin supporting that version and stop supporting the third most recent version.


<a name="meta"></a>
## Meta

Drift was made by [imgix](http://imgix.com). It's licensed under the BSD 2-Clause license (see the [license file](https://github.com/imgix/drift/blob/master/LICENSE.md) for more info). Any contribution is absolutely welcome, but please review the [contribution guidelines](https://github.com/imgix/drift/blob/master/CONTRIBUTING.md) before getting started.
