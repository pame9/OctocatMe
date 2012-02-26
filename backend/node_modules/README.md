# node-o3-canvas

This is a HTML5 spec Canvas component for NodeJS based on LibAGG and Freetype.
It is implemented using the Ajax.org O3 component system, and should be easy to extend and fix. 

[Check blogpost and video here](http://ajaxorg.posterous.com/canvas-api-for-nodejs)

At Ajax.org we have been using this component as a way to render Canvas charts server-side to allow emailing or save-as-picture.

#Usage

git clone http://github.com/ajaxorg/node-o3-canvas.git

cd node-o3-canvas/example

node nodeanim.js

open your browser on 127.0.0.1:4000 to see.

To use this library add the node-o3-canvas/lib directory to your require path, and use the following line:

    var canvasFactory = require('o3-canvas');

Or alternatively: 

    var canvasFactory = require('/full/path/node-o3-canvas/lib/o3-canvas'); 

How to use:
	
	var ctx = canvasFactory(300,300, "argb");
	ctx.clearRect(0,0,300,300);
	ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (10, 10, 55, 50);
	
	var buf = ctx.pngBuffer();
	console.log(buf.toBase64());

Important! The Buffer in the example is NOT a nodeJS buffer object, but an O3 buffer.
Right now you will need to convert the O3 buffer to NodeJS like so:
		buf = new Buffer(ctx.pngBuffer().toBase64(),'base64');

#Status
	
This release of canvas is currently limited to the vector shape rendering with fill and stroke.
As you can see  in the source, we are adding the full spec of text-rendering right now based on freetype. Gradient fills and image fills/blits are up next. Clipping functionality is already in there but currently disabled pending some fixes. 

#Platforms

Binaries supported for Node 0.2.4 stable:

 * win32 (through cygwin)
 * osx64
 * lin32
 * lin64

Other platforms and bit-ness (32/64) will be added to the automated build VM incrementally.

If you need to build this node-o3-canvas module yourself or want to contribute to the source, please look at the main [ajaxorg/o3](http://github.com/ajaxorg/o3) repository.

The build structure of this component is rather unique compared to most libraries you will be accustomed to. Pretty much all dependencies are built using a single 'header' include. This means we have turned all external libs like freetype and libpng into a include called lib_freetype.h and lib_png.h This makes dealing with external libs and linking a non issue, but it will take approximately 18 seconds on a modern CPU (Core2 2.6ghz) to compile the module. This is actually really fast as its burning through approximately 5 megabytes of source.
If you want to use this lib on a non-PC platform (like ARM) it will take you some time to get all the flags right for it to build. Please stay in contact with us if you are trying to accomplish this as we have not compiled this module outside of the usual Win/Lin/OSX platforms. For continued development we will probably split up the module into 2 cpp files, one for all the static libs and one for your code. This way the single-header optimization is maintained whilst also allowing a recompile to only take a few seconds.

The O3 component definition is not dependent on any particular dynamic language engine (like V8) and so this module can easily run as a browser plugin in IE or if people are interested, auto-glue can be written for Ruby or Python to run all O3 components there too. Feel free to help us with this if you want this.

If you are looking for the accompanying binary builds of NodeJS check out the 
[ajaxorg/node-builds](http://github.com/ajaxorg/node-builds) repository