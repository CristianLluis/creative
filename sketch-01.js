const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

import { getRandomColor } from './colors.js'


const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy =  height * 0.17;
  
    const drawCanvas = () => {
        for (let i = 0; i < 5; i++)  {
            for (let j = 0; j < 5; j++) {
                const x = ix + (w + gap) * i;
                const y = iy + (w + gap) * j;
                const rdn = random.range(1, 35)
                
                context.lineWidth = random.range(1 ,10);
                context.beginPath();
                context.rect(x, y, w, h);
                context.strokeStyle = getRandomColor()
                context.stroke();

                if ( Math.random() > 0.5 ) {
                    context.lineWidth = random.range(1 ,10);
                    context.beginPath();
                    context.rect(x + rdn, y + rdn, w - rdn*2, h - rdn*2)
                    context.strokeStyle = getRandomColor()
                    context.stroke();
                }
            }
        }
    }

    drawCanvas();

    // clearCanvas = () => {
    //     context.clearRect(0, 0, width, height)
    // }

    // const interval = setInterval( () => {
    //     drawCanvas();
    // }, 100);

    // const interval2 = setInterval( () => {
    //     clearCanvas();
    //     drawCanvas();
    // }, 5000);

  };
};

canvasSketch(sketch, settings);
