


const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const success = (request, response, acceptType) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
    
  if(acceptType[0] === 'text/xml'){
      let xmlString = `<response><message>${responseJSON.message}`;
      xmlString = `${xmlString}</message>`;
      xmlString = `${xmlString}</response>`;
      
      return respondXML(request, response, 200, xmlString);
  }
    
  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, acceptType, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
    
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
    
  if(acceptType[0] === 'text/xml'){
      let xmlString = `<response><message>${responseJSON.message}`;
      xmlString = `${xmlString}</message>`;
      xmlString = `${xmlString}<id>badRequest</id>`;
      xmlString = `${xmlString}</response>`;
      
      return respondXML(request, response, 400, xmlString);
  }
    
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, acceptType, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
    
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing valid query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }
    
  if(acceptType[0] === 'text/xml'){
      let xmlString = `<response><message>${responseJSON.message}`;
      xmlString = `${xmlString}</message>`;
      xmlString = `${xmlString}<id>unauthorized</id>`;
      xmlString = `${xmlString}</response>`;
      
      return respondXML(request, response, 401, xmlString);
  }
    
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptType) => {
  const responseJSON = {
    message: 'Access to the page you are looking for is forbidden.',
    id: 'forbidden',
  };
    
  if(acceptType[0] === 'text/xml'){
      let xmlString = `<response><message>${responseJSON.message}`;
      xmlString = `${xmlString}</message>`;
      xmlString = `${xmlString}<id>${responseJSON.id}</id>`;
      xmlString = `${xmlString}</response>`;
      
      return respondXML(request, response, 403, xmlString);
  }
    
  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, acceptType) => {
  const responseJSON = {
    message: 'The page you are looking for is not available due to an internal error.',
    id: 'internal',
  };
    
  if(acceptType[0] === 'text/xml'){
      let xmlString = `<response><message>${responseJSON.message}`;
      xmlString = `${xmlString}</message>`;
      xmlString = `${xmlString}<id>${responseJSON.id}</id>`;
      xmlString = `${xmlString}</response>`;
      
      return respondXML(request, response, 500, xmlString);
  }
    
  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, acceptType) => {
  const responseJSON = {
    message: 'The page you are looking for is not yet implemented.',
    id: 'notImplemented',
  };
    
  if(acceptType[0] === 'text/xml'){
      let xmlString = `<response><message>${responseJSON.message}`;
      xmlString = `${xmlString}</message>`;
      xmlString = `${xmlString}<id>${responseJSON.id}</id>`;
      xmlString = `${xmlString}</response>`;
      
      return respondXML(request, response, 501, xmlString);
  }
    
  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response, acceptType) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
    
  if(acceptType[0] === 'text/xml'){
      let xmlString = `<response><message>${responseJSON.message}`;
      xmlString = `${xmlString}</message>`;
      xmlString = `${xmlString}<id>${responseJSON.id}</id>`;
      xmlString = `${xmlString}</response>`;
      
      return respondXML(request, response, 404, xmlString);
  }
    
  respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};