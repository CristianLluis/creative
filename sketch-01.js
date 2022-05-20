const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const CSS_COLOR_NAMES = [
  "AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen",
]


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);


    getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy =  height * 0.17;
  
    drawCanvas = () => {
        for (let i = 0; i < 5; i++)  {
            for (let j = 0; j < 5; j++) {
                const x = ix + (w + gap) * i;
                const y = iy + (w + gap) * j;
                const rdn = getRandomInt(1, 35)
                const outerColor = getRandomInt(0, CSS_COLOR_NAMES.length-1);
                const innerColor = getRandomInt(0, CSS_COLOR_NAMES.length-1);
                
                context.lineWidth = getRandomInt(1 ,10);
                context.beginPath();
                context.rect(x, y, w, h);
                context.strokeStyle = CSS_COLOR_NAMES[outerColor];
                context.stroke();

                if ( Math.random() > 0.5 ) {
                    context.lineWidth = getRandomInt(1 ,10);
                    context.beginPath();
                    context.rect(x + rdn, y + rdn, w - rdn*2, h - rdn*2)
                    context.strokeStyle = CSS_COLOR_NAMES[innerColor];
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
