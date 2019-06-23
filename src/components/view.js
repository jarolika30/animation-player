import Canvas from './canvas';
import paint from './paint';

export default function initCanvas(size) {
  const canvasElem = new Canvas(480, 480, size);
  const canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'c-1');
  canvas.setAttribute('width', `${canvasElem.width}`);
  canvas.setAttribute('height', `${canvasElem.height}`);
  document.querySelector('.canvas').appendChild(canvas);
  const canvasHtml = document.querySelector('.c-1');
  const ctx = canvasHtml.getContext('2d');
  const color = [];
  const pixel = canvasElem.itemSize;
  const columns = Math.floor(canvasElem.width / pixel);
  const rows = Math.floor(canvasElem.height / pixel);

  for (let i = 0; i < rows; i += 1) {
    color[i] = [];
    for (let j = 0; j < columns; j += 1) {
      color[i][j] = '#bbbbbb';
    }
  }
  canvasElem.colors = color;
  for (let i = 0; i < canvasElem.height; i += pixel) {
    for (let j = 0; j < canvasElem.width; j += pixel) {
      ctx.beginPath();
      ctx.rect(j, i, pixel, pixel);
      ctx.strokeStyle = '#49423d';
      ctx.lineWidth = '1';
      [[ctx.fillStyle]] = canvasElem.colors;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
  paint.draw(ctx, size, canvasElem.colors);
  paint.erase(ctx, size, canvasElem.colors);
  return canvasElem.colors;
}
