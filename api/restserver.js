var assert  = require('assert');
var restify = require('restify');
var http    = require("http");
var fs = require('fs');


var pin1 = "0";
var pin2 = "0";
var pin3 = "0";
var pin4 = "0";
var pin5 = "0";
var pin6 = "0";
var pin7 = "0";
var pin8 = "0";
                

/**
  * @api {get} /move/left getMoveLeft
  * @apiName MoveLeft
  * @apiGroup move
  * @apiDescription 
  * move left
  *
  * @apiSampleRequest http://127.0.0.1:8066/move/left
  *
 */
function getMoveLeft(req, res, next) { 
  //res.redirect('https://www.foo.com/1', next);

    pin1="0";
    pin2="0";
    pin3="1";
    pin4="0";
    pin5="0";
    pin6="0";
    pin7="0";
    pin8="0";
    res.redirect("http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8, callback);

    res.send({
      msg: "moved left ",
      sendCoammnd :"http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8});
    return;
}


/**
  * @api {get} /move/right getMoveRight
  * @apiName MoveRight
  * @apiGroup move
  * @apiDescription 
  * move right
  *
  * @apiSampleRequest http://127.0.0.1:8066/move/right
  *
 */
function getMoveRight(req, res, callback) { 
      pin1="1";
      pin2="0";
      pin3="0";
      pin4="0";
      pin5="0";
      pin6="0";
      pin7="0";
      pin8="0";
//   res.send(send(pin1,pin2,pin3,pin4,pin4,pin5,pin6,pin7,pin8));
      res.redirect("http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8, callback);

    return;
}

/**
  * @api {get} /move/front getMoveFront
  * @apiName getMoveFront
  * @apiGroup move
  * @apiDescription 
  * move front
  *
  * @apiSampleRequest http://127.0.0.1:8066/move/front
  *
 */
function getMoveFront(req, res, callback) { 
  //res.redirect('https://www.foo.com/1', next);
    pin1="1";
    pin2="0";
    pin3="1";
    pin4="0";
    pin5="0";
    pin6="0";
    pin7="0";
    pin8="0";
    res.redirect("http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8, callback);
    return;
}

/**
  * @api {get} /move/back getMoveBack
  * @apiName MoveBack
  * @apiGroup move
  * @apiDescription 
  * move back
  *
  * @apiSampleRequest http://127.0.0.1:8066/move/back
  *
 */
function getMoveBack(req, res, callback) { 
  //res.redirect('https://www.foo.com/1', next);

    pin1="0";
    pin2="1";
    pin3="0";
    pin4="1";
    pin5="0";
    pin6="0";
    pin7="0";
    pin8="0";
    res.redirect("http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8, callback);
    /*  
    res.json({ 
        type: true, 
        data: send(pin1,pin2,pin3,pin4,pin4,pin5,pin6,pin7,pin8) 
    });
    */
    return;
} 

/**
  * @api {get} /move/stop getMoveStop
  * @apiName MoveStop
  * @apiGroup move
  * @apiDescription 
  * Stop
  *
  * @apiSampleRequest http://127.0.0.1:8066/move/stop
  *
 */
function getMoveStop(req, res, callback) { 

    pin1="0";
    pin2="0";
    pin3="0";
    pin4="0";
    pin5="0";
    pin6="0";
    pin7="0";
    pin8="0";

    res.redirect("http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8, callback);

    return;
} 


/**
  * @api {get} /clean/brushes getCleanBrushes
  * @apiName CleanBrushes
  * @apiGroup clean
  * @apiDescription 
  * Brushes
  *
  * @apiSampleRequest http://127.0.0.1:8066/clean/brushes
  *
 */
function getCleanBrushes(req, res, callback) { 
    pin5="1";
    res.redirect("http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8, callback);
    return;
} 

/**
  * @api {get} /clean/tray getCleanTray
  * @apiName CleanTray
  * @apiGroup clean
  * @apiDescription 
  * Tray
  *
  * @apiSampleRequest http://127.0.0.1:8066/clean/tray
  *
 */
function getCleanTray(req, res, callback) { 
    
    pin6="1";
    pin7="0";

    res.redirect("http://192.168.0.168/m2m/rpiramudroid/testgpio.php?p0="+pin1+"&p1=" + pin2 + "&p2=" + pin3 + "&p3=" + pin4+ "&p4=" + pin5+ "&p5=" + pin6+ "&p6=" + pin7+ "&p7=" + pin8, callback);

    return;
} 







/**
  * @api {get} /data/ultrasonic getDataUltrasonic
  * @apiName DataUltrasonic
  * @apiGroup data
  * @apiDescription 
  * ultrasonic
  *
  * @apiSampleRequest http://127.0.0.1:8066/data/ultrasonic
  *
 */
function getDataUltrasonic(req, res, callback) { 
    res.send("ultrasonic");
    return;
} 




/**
  * @api {get} /data/gps getDataGPS
  * @apiName DataGPS
  * @apiGroup data
  * @apiDescription 
  * gps
  *
  * @apiSampleRequest http://127.0.0.1:8066/data/gps
  *
 */
function getDataGPS(req, res, callback) { 
    res.send("gps");
    return;
} 



//-----------------------------------REST server --------------------------------

/*var options = {
  key: fs.readFileSync('sslcert/server.key'),
  cert: fs.readFileSync('sslcert/server.crt'),
  ca: fs.readFileSync('sslcert/ca.crt'),
};
var server = restify.createServer(options);*/

var server = restify.createServer();

server.pre(restify.pre.sanitizePath());

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

/*server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.CORS());
//server.use(restify.bodyParser({ mapParams: true }));*/

server.get('/author', function (req, res, next) {
  console.log(req.query());
  res.send("altanai");
});


server.get('/move/left',getMoveLeft);
server.get('/move/right',getMoveRight);
server.get('/move/front',getMoveFront);
server.get('/move/back',getMoveBack);
server.get('/move/stop',getMoveStop);

server.get('/clean/brushes',getCleanBrushes);
server.get('/clean/tray',getCleanTray);

server.get('/data/ultrasonic',getDataUltrasonic);
server.get('/data/gps',getDataGPS);


function unknownMethodHandler(req, res) {
  if (req.method.toLowerCase() === 'options') {
    var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With
    if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    return res.send(204);
  }
  else
    return res.send(new restify.MethodNotAllowedError());
}

server.on('MethodNotAllowed', unknownMethodHandler);

server.listen(8066, function() {
  console.log('%s listening at %s', server.name, server.url);
});