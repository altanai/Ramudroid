
![alt Ramudroid ](http://s32.postimg.org/ew6oy64fp/Copy_of_Ramudroid_Logo_White_1.jpg)

Ramudroid is a bot to clean roads and outdoor environments. It is battery-powered. For brains, there's a Raspberry Pi on board. It's got wireless connectivity. There's a camera for real-time image sensing of the environment

Following are the resuable compoenets of this project :

# m2mcommunication
Communication between the web client , mobile client , cloud server , robots and other control points is primarily on REST over Internet or Wifi. For the mobile clients in vicinity if the robot they may even connevt via BLE ( blue tooth low enery ).


## Live streaming and image analysis

##Rpi core control unit
![alt Ramudroid v6.5] (http://s32.postimg.org/tkx97ih9x/Ramudroid_blacknwhite.jpg)

##Web Console for Ramu Droid
![alt web console ] (http://s32.postimg.org/xroj6320l/Ramudroidwebconsole.jpg)

##Wiring Pi
GPIO access library written in C for the BCM2835 used in the Raspberry Pi

> git clone git://git.drogon.net/wiringPi
> cd wiringPi
> git pull origin
> cd wiringPi
> ./build
> gpio -v
> gpio readall
