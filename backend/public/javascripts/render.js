$(function() {
function objLoadFunc() {
       var doc = document.getElementById('mySVG').contentDocument;                
                    
       // use some JavaScript to animate the rectangles over and over
       window._counter = 1;
     
     }

     function loadFunc() {
       var obj = document.createElement('object', true);
       obj.id = 'mySVG';
       obj.setAttribute('type', 'image/svg+xml');
       obj.setAttribute('data', '/images/svg/everything.svg');
       obj.setAttribute('width', '250');
       obj.setAttribute('height', '150');

       obj.addEventListener(window.svgweb ? 'SVGLoad' : 'load', objLoadFunc, false);

       var container = document.getElementById('svgDiv');
       if (window.svgweb) {
         svgweb.appendChild(obj, container);
       } else {
         container.appendChild(obj);
       }

     }

     if (window.svgweb) {
        svgweb.addOnLoad(loadFunc);
     }
     else {
        window.addEventListener('load', loadFunc, false);
     }

     function getPixel(imageData, x, y) {
         var r, g, b, a, offset = x * 4 + y * 4 * imageData.width;
         r = imageData.data[offset];
         g = imageData.data[offset + 1];
         b = imageData.data[offset + 2];
         a = imageData.data[offset + 3];
         return "rgba(" + r + "," + g + "," + b + "," + a + ")";
     }
     var image = new Image();
     image.onload = function() {
         var canvas = document.createElement('canvas');
         canvas.width = image.width;
         canvas.height = image.height;
         console.log(image.width, image.height);
         var context = canvas.getContext('2d');
         context.drawImage(image, 0, 0);
         var x = (63.44 / 100) * image.width, y = (32.08 / 100) * image.height;
         var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
         console.log(imageData);
         // Now you can access pixel data from imageData.data.
         // It's a one-dimensional array of RGBA values.
         // Here's an example of how to get a pixel's color at (x,y)
         var index = var index = (y*imageData.width + x) * 4;
         var red = imageData.data[index];
         var green = imageData.data[index + 1];
         var blue = imageData.data[index + 2];
         var alpha = imageData.data[index + 3];
         console.log("data", red, green, blue, alpha);
     };
     image.src = document.getElementById('photo_hidden').src;
});