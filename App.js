var http = require('http');
var fs = require('fs');
var url = require('url');
var events = require('events');
var formidable = require('formidable');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = './uploads/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err; 
          console.log("File Uploaded "+files.filetoupload.name);
          fs.readFile('index.html',function(err,data){

            res.writeHead(200, {'Content-Type': 'text/html'});

            res.write("Message: File Upload Successfully!");

            res.write(data);

            return res.end();
      
            });
          
        });
        let date = new Date();
        let log = "File Name: "+files.filetoupload.name+", Date: "+date+"\n";
        fs.appendFile('log.txt',log,function(err){

            if(err) throw err;

            console.log(files.filetoupload.name+" updated In history!");

        });

   });
    } else {

      fs.readFile('index.html',function(err,data){

      res.writeHead(200, {'Content-Type': 'text/html'});

      res.write("<h1>Welcome</h1>");

      res.write("Upload Your File");

      res.write(data);  

      return res.end();

      });
    }
  }).listen(3000);
  