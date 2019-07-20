const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);


//create server
const server = http.createServer((req, res) => {

  const urlObj = url.parse(req.url, true); // get the url as an object
  const pathName = urlObj.pathname;
  const query = urlObj.query;

  //read the html template and replace it with the actual data
  if(pathName === '/product' ||  pathName === '/') {
    res.writeHead(200, {'contentType' : 'text/html' });
    fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
      let overviewOutput = data;
      fs.readFile(`${__dirname}/templates/template-overview-card.html`, 'utf-8', (err, data) => {
        const cards = laptopData.map(el => replaceTemplate(data, el));
        overviewOutput = overviewOutput.replace('{%CARD%}', cards.join(''));

        res.end(overviewOutput);
      })
    })
  } else if (pathName === '/laptop' && query.id < 5) {
    res.writeHead(200, {'contentType' : 'text/html' });
    const laptop = laptopData[query.id];
    fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
      res.end(replaceTemplate(data, laptop));
    })
  } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
    //when the other request is sent, the requests for images are also sent.
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
      res.writeHead(200, {'contentType' : 'image/jpg' });
      res.end(data);
    })
  }
  else {
    res.writeHead(404, {'contentType' : 'text/html'});
    res.end('Page not found');
  }
});


//listen to the specific ip and port
server.listen(1337, '127.0.0.1', () => {
  console.log('waiting for the remote access');
})

function replaceTemplate(originalHtml, laptop) {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  output = output.replace(/{%id%}/g, laptop.id);
  return output;
}
