const http = require('http');
const url = require('url'); 
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': dataHandler.success,
  '/badRequest': dataHandler.badRequest,
    '/unauthorized': dataHandler.unauthorized,
    '/forbidden': dataHandler.forbidden,
    '/internal': dataHandler.internal,
    '/notImplemented': dataHandler.notImplemented,
  notFound: dataHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);
    
  const type = request.headers.accept.split(",");

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, type, params);
  } else {
    urlStruct.notFound(request, response, type, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
