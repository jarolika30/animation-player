import drawImg from './animation';

export default function buttonInit() {
  const timer = { id: 0 };
  let count = 1;
  document.querySelector('.add').addEventListener('click', () => {
    const slide = document.querySelector('.container');
    const child = document.createElement('div');
    count += 1;
    child.classList.add('slide');
    child.setAttribute('id', `slide-${count}`);
    slide.appendChild(child);
  });
  document.querySelector('.delete').addEventListener('click', () => {
    const slide = document.querySelector('.container');
    const children = document.querySelectorAll('.slide');
    slide.removeChild(children[children.length - 1]);
    count -= 1;
  });
  document.querySelector('.copy').addEventListener('click', () => {
    const img = document.querySelector('#img');
    const slides = document.querySelectorAll('.slide');
    const imgCopy = document.querySelector(`#${slides[slides.length - 1].id} img`);
    if (imgCopy) {
      const slide = document.querySelector('.container');
      const child = document.createElement('div');
      const imgDiv = document.createElement('img');
      imgDiv.setAttribute('src', `${imgCopy.src}`);
      imgDiv.style.width = '100px';
      imgDiv.style.height = '100px';
      count += 1;
      child.classList.add('slide');
      child.setAttribute('id', `slide-${count}`);
      child.appendChild(imgDiv);
      slide.appendChild(child);
    } else {
      const div = document.querySelector(`#${slides[slides.length - 1].id}`);
      const imgDiv = document.createElement('img');
      imgDiv.setAttribute('src', `${img.src}`);
      imgDiv.style.width = '100px';
      imgDiv.style.height = '100px';
      div.appendChild(imgDiv);
    }
  });
  document.querySelector('#fps2').addEventListener('click', () => {
    if (timer.id !== 0) {
      clearInterval(timer.id);
    }
    const canvas = document.querySelector('.c-2');
    canvas.style.width = '240px';
    canvas.style.height = '200px';
    const ctx = canvas.getContext('2d');
    const images = document.querySelectorAll('.container img');
    let i = 0;
    timer.id = setInterval(() => {
      drawImg(images[i], ctx, 300, 200);
      i += 1;
      if (i >= images.length) {
        i = 0;
      }
    }, 500);
  });
  document.querySelector('#fps4').addEventListener('click', () => {
    if (timer.id !== 0) {
      clearInterval(timer.id);
    }
    const canvas = document.querySelector('.c-2');
    canvas.style.width = '240px';
    canvas.style.height = '200px';
    const ctx = canvas.getContext('2d');
    const images = document.querySelectorAll('.container img');
    let i = 0;
    timer.id = setInterval(() => {
      drawImg(images[i], ctx, 300, 200);
      i += 1;
      if (i >= images.length) {
        i = 0;
      }
    }, 250);
  });
  document.querySelector('#fps8').addEventListener('click', () => {
    if (timer.id !== 0) {
      clearInterval(timer.id);
    }
    const canvas = document.querySelector('.c-2');
    canvas.style.width = '240px';
    canvas.style.height = '200px';
    const ctx = canvas.getContext('2d');
    const images = document.querySelectorAll('.container img');
    let i = 0;
    timer.id = setInterval(() => {
      drawImg(images[i], ctx, 300, 200);
      i += 1;
      if (i >= images.length) {
        i = 0;
      }
    }, 125);
  });
  document.querySelector('#full').addEventListener('click', () => {
    if (timer.id !== 0) {
      clearInterval(timer.id);
    }
    const canvas = document.querySelector('.c-2');
    canvas.style.width = '240px';
    canvas.style.height = '200px';
    const ctx = canvas.getContext('2d');
    const images = document.querySelectorAll('.container img');
    let i = 0;
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    }
    timer.id = setInterval(() => {
      drawImg(images[i], ctx, 300, 200);
      i += 1;
      if (i >= images.length) {
        i = 0;
      }
    }, 800);
  });
}
