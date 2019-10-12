# Web dashboard 

- Communicated to Ramudroid over REST apis and MQTT
- Live streams ramudroid's camera intake and adds Augmented reality
- Overlays GPS location on GIS system like google maps 
- Displays real time statistics and anlytics 
- compatible with chromium and mozilla browsers
- device agnostic design using bootstrap templates 


![alt Ramudroid webconsole ](https://altanaitelecom.files.wordpress.com/2016/03/screenshot-from-2016-03-19-04-28-53.png?w=728)


## Installation

It can be run from an independant web server in cloud. 
Node can be downloaded from https://nodejs.org/en/download/

download node modules 
```
npm install
```
run server.js
```
node server.js 
webserver and socket.io server listsing on   8084
restify listening at http://[::]:8066
```
open https://127.0.0.1:8084/
Since we are using self signed certificate , it may ask to accept advanced security permission , accept and proceed

## Debugging 

**Issue1** : EventEmitter.prototype; ^ TypeError: Cannot read property 'prototype' of undefined
**solution** Update socketio via npm update