"use strict";
var webpage = require('webpage'),
    server = require('webserver').create(),
    system = require('system'),
    data = 'universe=expanding&answer=42';

if (system.args.length !== 2) {
    console.log('Usage: postserver.js <portnumber>');
    phantom.exit(1);
}

var port = system.args[1];

var service = server.listen(port, {
	'keepAlive': false
}, function (request, response) {
	console.log('[' + new Date() + '] ' + request.method + ' ' + request.url + "");

	response.headers = {
        'Cache': 'no-cache'
    };
	
	if (request.url == '/') {
		var help = 'http://blog.csdn.net/lanmo555/article/details/52527973';
		response.statusCode = 302;
		response.setHeader('Location', help);
		response.write("Redirect to Usage Page.");
		response.close();
		return ;
	}
	
	if (request.url != '/html2Image') {
		response.statusCode = 404;
		response.write('Not Found ' + request.url);
		response.close();
		return ;
	} 
    
    response.statusCode = 200;
    
	var url = request.post.url;
	var quality = (typeof(request.post.quality) != 'undefined')? request.post.quality : -1;
	var type = (typeof(request.post.type) != 'undefined')? 		request.post.type : 'html';// html base64
	var format = (typeof(request.post.format) != 'undefined')? 	request.post.format : 'PNG';//PNG GIF JPEG
	var _width = (typeof(request.post.width) != 'undefined')? 	request.post.width : 1024, 
	    _height = (typeof(request.post.height) != 'undefined')? request.post.height : 768;
	
	var page = webpage.create();
	
	page.viewportSize = { width: _width, height: _height };
	console.log(page.viewportSize.width)
	console.log(page.viewportSize.height)
	
	page.settings = {
	  javascriptEnabled: true,
	  loadImages: true,
	  userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'
	};
	
	page.open(url, function start(status) {
		setTimeout(function() {
			if (type && "base64" == type) {
				response.setHeader('Content-Type', 'text/plain')
				response.write(page.renderBase64(format));	
			} else if (type && "html" == type) {
				response.setHeader('Content-Type', 'text/html')
				response.write('<img src="data:image/' + format + ';base64,' + page.renderBase64(format) + '" />');	
			} else {
				// Buffer is an Uint8ClampedArray
				//response.setHeader('Content-Type', 'image/' + format);
				//var buffer = page.renderBuffer(format);
				//response.write(buffer);
				response.write("not support type:" + type + ' format:' + format);
			}
			page.close();
			response.close();
		}, 1000);
	});
  
});

console.log('started at ' + port);
