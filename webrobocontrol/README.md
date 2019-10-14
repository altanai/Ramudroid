# Web dashboard 

- Communicated to Ramudroid over REST apis and MQTT
- Live streams ramudroid's camera intake and adds Augmented reality
- Overlays GPS location on GIS system like google maps 
- Displays real time statistics and anlytics 
- compatible with chromium and mozilla browsers
- device agnostic design using bootstrap templates 


![alt Ramudroid webconsole ](https://altanaitelecom.files.wordpress.com/2016/03/screenshot-from-2016-03-19-04-28-53.png?w=728)


## Installation and Dependencies 

It can be run from an independant web server in cloud. 
Node can be downloaded from https://nodejs.org/en/download/

download node modules 
```
npm install
```

## Run uv4l_raspicam service for webrtc stream

```
service uv4l_raspicam  restart --use-ssl
```
note : use ssl ode since our other serices are on https

```
### HTTPS options:
server-option = --use-ssl=yes
server-option = --ssl-private-key-file=/home/pi/Ramudroid/webrobocontrol/sslcert/server.key
server-option = --ssl-certificate-file=/home/pi/Ramudroid/webrobocontrol/sslcert/server.crt
```

or
```
sudo uv4l --external-driver --device-name=video0 --server-option '--use-ssl=yes' --server-option '--ssl-private-key-file=/home/pi/selfsign.key' --server-option '--ssl-certificate-file=/home/pi/selfsign.crt' --verbosity=7 --server-option '--enable-webrtc-video=yes' --server-option '--enable-webrtc-audio=no' --server-option '--webrtc-receive-video=yes' --server-option '--webrtc-renderer-fullscreen=yes' --server-option '--webrtc-receive-datachannels=yes' --server-option '--webrtc-receive-audio=yes' --auto-video_nr --server-option '--enable-control-panel' --server-option '--enable-builtin-ui'
```
output traces 
```
<notice> [core] Trying to load the the Streaming Server plug-in...
<notice> [server] HTTP/HTTPS Streaming & WebRTC Signalling Server v1.1.125 built on Sep  5 2019
<notice> [server] SSL is enabled for the Streaming Server. Using secure HTTPS.
<notice> [core] Streaming Server loaded!
<notice> [server] Web Streaming Server listening on port 8080
<notice> [driver] Using video device /dev/video0
<notice> [webrtc] WebRTC Renderer extension successfully loaded
<notice> [server] WebRTC, Signalling Server and STUN Server extensions successfully loaded
<info> [server] Trickle ICE enabled
<info> [webrtc] Data Channel created with label: uv4l
<info> [webrtc] Using the old SCTP syntax description: true
<info> [webrtc] ICE gathering complete!
<info> [server] Trickle ICE enabled
<info> [webrtc] Data Channel created with label: uv4l
<info> [webrtc] Using the old SCTP syntax description: true
<info> [webrtc] ICE gathering complete!
```

### Run server.js
```
$ node server.js 
webserver and socket.io server listsing on   8084
restify listening at http://[::]:8066
```
open https://127.0.0.1:8084/
Since we are using self signed certificate , it may ask to accept advanced security permission , accept and proceed

## Debugging 

### Issue 1: 
EventEmitter.prototype; ^ TypeError: Cannot read property 'prototype' of undefined
**solution** Update socketio via npm update


### Issue 2 :
Access to fetch at 'https://192.168.0.5:5000/move/back' from origin 'https://127.0.0.1:8084' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
**Solution** add ors origin headers to fetch api 
``` 
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

### Issue 3 : 
service uv4l_raspicam status , ssl enabling error
```
 raspberrypi uv4l[1290]: 3069326164:error:25066067:DSO support routines:DLFCN_LOAD:could not load the shared library:dso_dlfcn.c:185:filename(libssl_conf.so): libssl_conf.so: cannot open sh
Oct 12 19:22:29 raspberrypi uv4l[1290]: 3069326164:error:25070067:DSO support routines:DSO_load:could not load the shared library:dso_lib.c:244:
Oct 12 19:22:29 raspberrypi uv4l[1290]: 3069326164:error:0E07506E:configuration file routines:MODULE_LOAD_DSO:error loading dso:conf_mod.c:285:module=ssl_conf, path=ssl_conf
Oct 12 19:22:29 raspberrypi uv4l[1290]: 3069326164:error:0E076071:configuration file routines:MODULE_RUN:unknown module name:conf_mod.c:222:module=ssl_conf
```
or 
DLFCN_LOAD:could not load the shared library:dso_dlfcn.c:185:filename(libssl_conf.so): libssl_conf.so: cannot open shared object file: No such file or directory

**solution**
step 1 : vim /etc/uv4l/uv4l-raspidisp.conf
and enable ssl

Step 2 : see if openssl is installed 
```
which openssl
/usr/bin/openssl
```

else install it 
```
apt-get install openssl libssl-dev
```

### Issue 4 :
<warning> [server] Sorry, the device is either busy streaming to another peer or previous shutdown has not been completed yet
**Solution** pkill uv4l
or ctrl + c to stop the foreground process

##Issue 5: 
removing overlay on video from linux4you
**Solution** Instead of using uv4l's raspicam driver to driver the raspberry pi camera, use the kernel-based bcm2835-v4l2 driver. 
modprobe it and enable it using raspi-config, to have a /dev/video0 file.
After the device file appears, you can start uv4l with these options:
```
uv4l --external-driver --device-name=video0
```