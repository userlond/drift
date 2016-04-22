import ZoomPane from '../src/js/ZoomPane';

export let mockEvent = {
  preventDefault: function() {}
};

export function defaultDriftConfig() {
  return {
    namespace: null,
    showWhitespaceAtEdges: false,
    containInline: false,
    inlineOffsetX: 0,
    inlineOffsetY: 0,
    sourceAttribute: 'data-zoom',
    zoomFactor: 3,
    paneContainer: document.body,
    inlinePane: 375,
    handleTouch: true,
    onShow: null,
    onHide: null,
    injectBaseStyles: true,
    highlightImage: false,
    highlightColor: 'rgba(0, 0, 0, 0.5)',
  };
}

export function zoomPaneOptions() {
  return {
    container: document.body,
    zoomFactor: 3,
    inline: 375,
    namespace: null,
    showWhitespaceAtEdges: false,
    containInline: false,
    inlineOffsetX: 0,
    inlineOffsetY: 0,
  };
}

export function triggerOptions() {
  return {
    el: document.querySelector('.test-anchor'),
    zoomPane: new ZoomPane(zoomPaneOptions()),
    imageHighlighter: null,
    sourceAttribute: 'data-zoom',
    handleTouch: true,
    onShow: null,
    onHide: null,
  };
}
