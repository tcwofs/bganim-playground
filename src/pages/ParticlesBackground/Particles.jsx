import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Canvas from 'react-responsive-canvas';

const Particles = () => {
  const [canref, setCanref] = useState(null);
  let ref = useRef(null);

  let stars = []; // Array that contains the stars
  let FPS = 60; // Frames per second

  useEffect(() => {
    ref.current = canref;
    let canvas = ref.current;
    if (!canvas) {
      return;
    }
    let context = canvas.getContext('2d');
    let numberOfStars = isMobile ? 60 : 100; // Number of stars
    let requestID;

    const render = () => {
      draw(context, canvas);
      update(canvas.width, canvas.height);

      requestID = requestAnimationFrame(render);
    };

    pushStars(canvas.width, canvas.height, numberOfStars);
    render();

    return () => {
      cancelAnimationFrame(requestID);
    };
  });

  const pushStars = (width, height, x) => {
    for (let i = 0; i < x; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isMobile ? 5 : 2,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
      });
    }
  };

  const draw = (context, canvas) => {
    if (!canvas) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.globalCompositeOperation = 'lighter';

    for (let i = 0, x = stars.length; i < x; i++) {
      let s = stars[i];

      context.fillStyle = '#efefef';
      context.beginPath();
      context.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      context.fill();
      context.fillStyle = 'black';
      context.stroke();
    }

    context.beginPath();
    for (let i = 0, x = stars.length; i < x; i++) {
      let starI = stars[i];
      context.moveTo(starI.x, starI.y);
      for (let j = 0, x = stars.length; j < x; j++) {
        let starII = stars[j];
        if (distance(starI, starII) < 150) {
          context.lineTo(starII.x, starII.y);
        }
      }
    }
    context.lineWidth = isMobile ? 0.5 : 0.1;
    context.strokeStyle = 'white';
    context.stroke();
  };

  const distance = (point1, point2) => {
    let xs = 0;
    let ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  };

  // Update star locations

  const update = (width, height) => {
    for (let i = 0, x = stars.length; i < x; i++) {
      let s = stars[i];

      s.x += s.vx / FPS;
      s.y += s.vy / FPS;

      if (s.x < 0 || s.x > width) s.vx = -s.vx;
      if (s.y < 0 || s.y > height) s.vy = -s.vy;
    }
  };

  return <Canvas canvasRef={(el) => setCanref(el)} onResize={draw} />;
};

export default Particles;
