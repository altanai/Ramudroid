# Web dashboard 

- Communicated to Ramudroid over REST apis and MQTT
- Live streams ramudroid's camera intake and adds Augmented reality
- Overlays GPS location on GIS system like google maps 
- Displays real time statistics and anlytics 
- compatible with chromium and mozilla browsers
- device agnostic design using bootstrap templates 


![alt Ramudroid webconsole 168](https://altanaitelecom.files.wordpress.com/2016/03/screenshot-from-2016-03-19-04-28-53.png?w=728)

## Installation and Dependencies for the web console

It can be run from an independant web server in cloud. 
Node can be downloaded from https://nodejs.org/en/download/

download node modules 
```shell script
npm install
```

### Run server.js
```shell script
$ node server.js 
webserver and socket.io server listsing on   8084
restify listening at http://[::]:8066
```
open https://127.0.0.1:8084/
Since we are using self signed certificate , it may ask to accept advanced security permission , accept and proceed

## Debugging 

**Issue 1**: EventEmitter.prototype; ^ TypeError: Cannot read property 'prototype' of undefined
\
**solution** Update socketio via npm update

**Issue 2** : Access to fetch at 'https://192.168.0.5:5000/move/back' from origin 'https://127.0.0.1:8084' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
\
**Solution** add ors origin headers to fetch api 
```shell script
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8084');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    const response = await fetch('https://'+rpiip+"/move/"+move_var,{
      mode: 'no-cors',
      method: 'GET',
      headers: headers
    });
```

