/* eslint-disable max-len */
function getHexRGBColor(color) {
  let res = color.replace(/\s/g, '');
  const aRGB = res.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
  if (aRGB) {
    res = '';
    for (let i = 1; i <= 3; i += 1) {
      // eslint-disable-next-line radix
      res += Math.round((aRGB[i][aRGB[i].length - 1] === '%' ? 2.55 : 1) * Number.parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
    }
  } else res = res.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
  return res;
}
function getImageFromCanvas(event) {
  if (event.keyCode === 13) {
    const tmp = document.querySelector('.c-1');
    const img = document.getElementById('img');
    const ref = document.getElementById('save-img');
    img.src = tmp.toDataURL();
    const slide = document.querySelectorAll('.slide');
    const imgSlide = document.createElement('img');
    const way = tmp.toDataURL();
    imgSlide.src = way;
    ref.href = way;
    imgSlide.style.display = 'inline';
    imgSlide.style.width = '100px';
    imgSlide.style.height = '100px';
    slide[slide.length - 1].appendChild(imgSlide);
    img.style.display = 'none';
  }
}
const paint = {
  setColor: function chooseC() {
    document.querySelector('#choose').onclick = () => {
      document.onclick = (ev) => {
        if (ev.target !== document.querySelector('#choose img')) {
          const color = window.getComputedStyle(ev.target).backgroundColor;
          const colorHex = getHexRGBColor(color);
          if (color === 'rgba(0, 0, 0, 0)') {
            document.querySelector('.color').value = '#ffffff';
          } else {
            document.querySelector('.color').value = `#${colorHex}`;
          }
        }
      };
    };
  },
  draw: function drPixel(ctx, size = 15) {
    document.querySelector('#paint').addEventListener('click', () => {
      document.onclick = null;
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousemove = function click() {
        document.querySelector('.canvas').onmousedown = function mouseClick(ev) {
          const coords = {
            x: 0,
            y: 0,
          };
          if (ev.offsetX > size) {
            const x2 = ev.offsetX - (ev.offsetX % size);
            coords.x = x2;
          }
          if (ev.offsetY > size) {
            const y2 = ev.offsetY - (ev.offsetY % size);
            coords.y = y2;
          }
          ctx.beginPath();
          ctx.rect(coords.x, coords.y, size, size);
          ctx.strokeStyle = '#49423d';
          ctx.lineWidth = '1';
          ctx.fillStyle = document.querySelector('.color').value;
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        };
      };
      document.removeEventListener('keypress', getImageFromCanvas);
      document.addEventListener('keypress', getImageFromCanvas);
    });
  },
  erase: function erasePx(ctx, size = 15) {
    function erasePixel() {
      document.querySelector('.canvas').onclick = null;
      document.querySelector('.canvas').onmousemove = function click() {
        document.querySelector('.canvas').onmousedown = function mouseClick(ev) {
          const coords = {
            x: 0,
            y: 0,
          };
          if (ev.offsetX > size) {
            const x2 = ev.offsetX - (ev.offsetX % size);
            coords.x = x2;
          }
          if (ev.offsetY > size) {
            const y2 = ev.offsetY - (ev.offsetY % size);
            coords.y = y2;
          }
          ctx.beginPath();
          ctx.rect(coords.x, coords.y, size, size);
          ctx.strokeStyle = '#49423d';
          ctx.lineWidth = '1';
          ctx.fillStyle = '#bbbbbb';
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        };
      };
    }
    document.querySelector('#erase').addEventListener('click', erasePixel);
    document.querySelector('#erase-all').onclick = () => {
      const canvas = document.querySelector('.c-1');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < canvas.height; i += size) {
        for (let j = 0; j < canvas.width; j += size) {
          ctx.beginPath();
          ctx.rect(j, i, size, size);
          ctx.strokeStyle = '#49423d';
          ctx.fillStyle = '#bbbbbb';
          ctx.lineWidth = '1';
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }
      }
    };
  },
};
export default paint;
