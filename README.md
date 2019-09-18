
![alt Ramudroid ](https://altanaitelecom.files.wordpress.com/2016/03/ramudroid-image.png?w=500)

Ramudroid is a bot to clean roads and outdoor environments. It is battery-powered. For brains, there's a Raspberry Pi on board. It's got wireless connectivity. There's a camera for real-time image sensing of the environment

[![Join the chat at https://gitter.im/altanai/m2mcommunication](https://badges.gitter.im/altanai/m2mcommunication.svg)](https://gitter.im/altanai/m2mcommunication?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Following are the modular compoenets of the project :

### 1. m2mcommunication communication 

Communication between the web client , mobile client , cloud server and robot's  core unit is primarily on REST API's.
Communication techniques used in the project are as follows 

For external world 
- Wifi
- BLE

For intercomponents 
- GPIO
- UART 
- I2C

### 2. Computer Vision, object traking, realtime video analysis

To effectively limit the usuage of power on frontal clenaing brushes , it is cucial to target garbage/litter and active the motors only when suited target is found. 
Implemnting edge image analysis based on opencv filters and classifiers to detect garbage

Ref : https://github.com/altanai/computervision
https://github.com/altanai/opencv_extra


### 3. Live streaming and augmented reality

![alt Ramudroid v6.5](http://s20.postimg.org/cf0t9nnkt/live_Streaming_1.png)

### 4. Robot's core control unit

![alt Ramudroid v6.5](http://s32.postimg.org/tkx97ih9x/Ramudroid_blacknwhite.jpg)

Connecting Motors, drivers , sensors , batteries etc and controlling operation 

GPIO access library written in C for the BCM2835 used in the Raspberry Pi
```
git clone git://git.drogon.net/wiringPi
cd wiringPi
git pull origin
cd wiringPi
./build
gpio -v
gpio readall
```

### 5. Web Console for Ramudroid

![alt Ramudroid webconsole ](https://altanaitelecom.files.wordpress.com/2016/03/screenshot-from-2016-03-19-04-28-53.png?w=728)

## Author 
Altanai https://www.linkedin.com/in/altanai

**Contributing guidelines**
https://github.com/altanai/Ramudroid/wiki/Contributing-Guidelines

**References**
Hackaday : https://hackaday.io/project/11201-ramudroid
JigsawAcdemy : https://youtu.be/49dtFYhxmjc

**Version5**
Ramudroid v5 https://altanaitelecom.wordpress.com/?s=Bot+to+clean+roads+and+outdoors
Ramudorid v7 Surajdroid ( Ramudroid v7 Solar Powered ) - https://telecom.altanai.com/2018/12/09/surajdroid-ramudroid-v7-solar-powered/

**License**
GPL