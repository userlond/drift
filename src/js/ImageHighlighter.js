module.exports = class ImageHighlighter {
  constructor(imageElement, highlightColor) {
    this.imageElement = imageElement;
    this.highlightColor = highlightColor;
  }

  _buildCanvas() {
    const imageBB = this.imageElement.getBoundingClientRect();
    const bodyBB = document.body.getBoundingClientRect();

    // Draw a canvas
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
      this.canvas.classList.add('drift-image-highlighter');
    }

    this.canvas.width = imageBB.width;
    this.canvas.height = imageBB.height;

    this.canvas.style.setProperty('position', 'absolute');
    this.canvas.style.setProperty('left', imageBB.left + 'px');
    this.canvas.style.setProperty('top', imageBB.top + 'px');

    this.canvas.style.setProperty('pointer-events', 'none');

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = this.highlightColor;
  }

  setPosition(percentageOffsetX, percentageOffsetY) {
    if (this.highlightSize) {
      let top = (percentageOffsetY * this.imageElement.clientHeight
        - this.highlightSize.height / 2);
      let left = (percentageOffsetX * this.imageElement.clientWidth
        - this.highlightSize.width / 2);

      if (top < 0) {
        top = 0;
      } else if (top + this.highlightSize.height > this.canvas.height) {
        top = this.canvas.height - this.highlightSize.height;
      }

      if (left < 0) {
        left = 0;
      } else if (left + this.highlightSize.width > this.canvas.width) {
        left = this.canvas.width - this.highlightSize.width;
      }

      // TODO: Try to match the border radius of the zoom element

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillRect(left, top, this.highlightSize.width,
        this.highlightSize.height);
    }
  }

  show(zoomPane) {
    this._buildCanvas();

    const zoomPaneSize = zoomPane.getSize();
    this.zoomPaneAR = zoomPaneSize.width / zoomPaneSize.height;
    this.zoomFactor = zoomPane.settings.zoomFactor;
    this.highlightSize = {
      width: zoomPaneSize.width / this.zoomFactor,
      height: zoomPaneSize.height / this.zoomFactor
    };

    this.canvas.style.setProperty('display', 'block');
  }

  hide() {
    this.canvas.style.setProperty('display', 'none');
  }
}
