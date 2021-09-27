// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(function log(req, res, next) {
  console.log(req.method+" "+req.path+" - "+req.ip );
  next();
})

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  console.log(req.params.date);
  var timestamp = req.params.date;
  try{
	if(/^\d+$/.test(timestamp)){
	  var date = new Date(parseInt(timestamp));
	}else if(/\s+/.test(timestamp)){
	  var d = new Date(timestamp);
	  var utcDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds())
	  var date = new Date(utcDate);
	}else{
	  var date = new Date(timestamp);
	}
	if(date=='Invalid Date'){
	  res.json({ error : "Invalid Date" });
	}else{
	  console.log(date.toUTCString());
	  console.log(date.toString());
	  res.json({unix: date.getTime(), utc: date.toUTCString()});
	}
  }catch(err){
	console.log(err);
  }
});

app.get("/api", function (req, res) {
  var d = new Date();
  var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()+30);
  console.log(date);
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
