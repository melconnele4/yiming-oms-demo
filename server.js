const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname);
const mime = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json'};
http.createServer((req, res) => {
  let file = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(file);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, {'Content-Type': (mime[ext]||'text/plain')+'; charset=utf-8'});
    res.end(data);
  });
}).listen(8090, () => console.log('Server running at http://localhost:8090'));
