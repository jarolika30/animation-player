export default function drawImg(img, ctx, ctxWidth, ctxHeight) {
  ctx.clearRect(0, 0, ctxWidth, ctxHeight);
  ctx.drawImage(img, 0, 0, 300, 150);
}
