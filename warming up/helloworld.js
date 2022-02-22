var http = require('http')
var fs = require('fs')
function serveStaticFiles(res,path,contentType,statusCode){
    if(!statusCode) statusCode = 200;
    fs.readFile(__dirname + path,function(err,data){
        if(err){
            res.writeHead(500,{contentType:'text/plain'})
            res.end('Internal Error')
        }
        else {
           res.writeHead(statusCode,{'Content-Type':contentType}) 
           res.end(data)
        }
    })

}
http.createServer((req,res)=>{
    // res.writeHead(200,{'Content-Type':'text/plain'})
    // res.end('Hello World')
var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
switch(path){
    case '':
    serveStaticFiles(res,'/public/home.html','text/html')
    break;
    case "/about":
        serveStaticFiles(res,'/public/about.html','text/html')
        
        break;
    case '/img/logo192.png':
        serveStaticFiles(res,'/public/img/logo192.png')
        break;
    default:
        serveStaticFiles(res,'/public/notfound.html','text/html',404)
        break;
}
}).listen(3000)
console.log('Server is running on port 3000')