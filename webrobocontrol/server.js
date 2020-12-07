var fs = require('fs');
var _static = require('node-static');
var https = require('https');

var file = new _static.Server('./', {
    cache: 3600,
    gzip: true,
    indexFile: "index.html"
});

var options = {
  key: fs.readFileSync('sslcert/server.key'),
  cert: fs.readFileSync('sslcert/server.crt'),
  ca: fs.readFileSync('sslcert/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};

var app = https.createServer(options, function(request, response){
        request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});

var io = require('socket.io').listen(app, {
    log: false,
    origins: '*:*'
});

io.set('transports', [
    'websocket'
]);

var channels = {};

io.sockets.on('connection', function (socket) {

    var initiatorChannel = '';

    if (!io.isConnected) {
        io.isConnected = true;
    }

    socket.on('new-channel', function (data) {  
        if (!channels[data.channel]) {
            initiatorChannel = data.channel;
        }

        channels[data.channel] = data.channel;     
        onNewNamespace(data.channel, data.sender);
    });


    socket.on('presence', function (channel) {
        var isChannelPresent = !! channels[channel.channel];
        socket.emit('presence', isChannelPresent);

    });

    socket.on('disconnect', function (channel) {
    });

});

function onNewNamespace(channel, sender) {
   
    io.of('/' + channel).on('connection', function (socket) {
        
        var username;
        
        if (io.isConnected) {
            io.isConnected = false;
            socket.emit('connect', true);
        }

        socket.on('message', function (data) {
            if (data.sender == sender) {
                if(!username) username = data.data.sender;                
                socket.broadcast.emit('message', data.data);
            }
        });
        
        socket.on('disconnect', function() {
            if(username) {
                socket.broadcast.emit('user-left', username);
                username = null;
            }
        });
    });
}

app.listen(8084);
console.log(" webserver and socket.io server listsing on 8084");


//----------------------------- REST Server 
var api = require('./api/restserver.js');


// --------------------------------Secure Websocket Server
/*WebSocketServer = require('ws');

var wss = new WebSocketServer({
    server: app
  });

wss.on('connection', function connection(ws) {
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

wss.on("close", function (code, reason) {
    console.log("Connection closed")
});*/