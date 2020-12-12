# Webrtc stream and Object detection 

Uses haarcascade filters on opencv to detect based on predefined xml models 

## Requirnments
Uv4l and extra -  for installing uv4l refer to dir rpi_setup 
[uv4l](../robot_controller_rpi_setup/README.md)

## Run the web server for Webrtc stream

start the web console , using http-server on nodev12.4.0
```shell script
> http-server -a localhost -p 8001 -c-1
Starting up http-server, serving ./
Available on:
  http://localhost:8001
Hit CTRL-C to stop the server
```

Open Web console
![rpi object deection](screenshot/Screenshot%202019-09-14%20at%2011.07.45%20AM.png)


