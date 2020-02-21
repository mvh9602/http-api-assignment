const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const getFile = (request, response, type, file) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(file);
  response.end();
};

const getIndex = (request, response) => {
  getFile(request, response, 'text/html', index);
};

const getCss = (request, response) => {
  getFile(request, response, 'text/css', style);
};

module.exports = {
  getIndex,
  getCss,
};
