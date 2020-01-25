# Rpi Setup for Ramudroid

**start in test mode**
```bash
env=test bash robot_controller_rpi_setup/superscript.sh
```
**start in prod mode**
```bash
env=prod bash robot_controller_rpi_setup/superscript.sh
```

## Installing Raspbian OS

Raspbian is a popular Rpi OS which is sa spin off of the Linux distribution Debian

## Rpi specs 

Linux 
```
> uname -a
Linux raspberrypi 4.14.71-v7+ #1145 SMP Fri Sep 21 15:38:35 BST 2018 armv7l GNU/Linux
```

Operating system

for rpi 3 B+
```
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Raspbian
Description:	Raspbian GNU/Linux 9.4 (stretch)
Release:	9.4
Codename:	stretch
```
Rpi 4 
```
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Raspbian
Description:	Raspbian GNU/Linux 10 (buster)
Release:	10
Codename:	buster
```

Linux kernal version 
```
> uname -r
4.14.71-v7+
```

## Minicom 

communicate with embedded target devices,

sudo apt-get install minicom

## Universal asynchronous receiver/transmitter (UART) 

utilize the board’s UART feature in order to connect to a PC or to other microcontrollers and peripherals.
Raspberry Pi UART transmit (TXD) and receive (RXD) pins are assigned to GPIO14 and GPIO15 respectively:
```
| 8  | 0 | IN   | TxD     | 15  | 14  |
| 10 | 1 | IN   | RxD     | 16  | 15  |
```
these pins use 3.3V logic levels so you can’t connect them directly to devices that uses 5V like an Arduino UNO or a PC.

## SPI 

SPI (Serial Peripheral Interface) 

## I2C

I2C (Inter Integrated Circuit) is a synchronous serial and hardware protocol that communicates data between two devices.
master-slave protocol 
used for communication over short distance.
I2C device has 7-bit or 10-bit unique address
applications like reading RTC (Real time clock), accessing external EEPROM memory. It is also used in sensor modules like gyro, magnetometer etc.
also called as Two Wire Interface (TWI) protocol.
uses two bidirectional open-drain lines, Serial Data Line (SDA) and Serial Clock Line (SCL), and resistors

## GPIO 

A general-purpose input/output (GPIO) is an uncommitted digital signal pin on an integrated circuit or electronic circuit board whose behavior—including whether it acts as input or output—is controllable by the user at run time. GPIOs have no predefined purpose and are unused by default.

Install gpio
```
sudo apt-get install raspi-gpio
```
get list of all gpio pins
```
sudo raspi-gpio get
BANK0 (GPIO 0 to 27):
GPIO 0: level=1 fsel=0 func=INPUT
GPIO 1: level=1 fsel=0 func=INPUT
GPIO 2: level=1 fsel=0 func=INPUT
GPIO 3: level=1 fsel=0 func=INPUT
GPIO 4: level=1 fsel=0 func=INPUT
GPIO 5: level=1 fsel=0 func=INPUT
GPIO 6: level=1 fsel=0 func=INPUT
GPIO 7: level=1 fsel=0 func=INPUT
GPIO 8: level=1 fsel=0 func=INPUT
GPIO 9: level=0 fsel=0 func=INPUT
GPIO 10: level=0 fsel=0 func=INPUT
GPIO 11: level=0 fsel=0 func=INPUT
GPIO 12: level=0 fsel=0 func=INPUT
GPIO 13: level=0 fsel=0 func=INPUT
GPIO 14: level=0 fsel=0 func=INPUT
GPIO 15: level=1 fsel=0 func=INPUT
GPIO 16: level=0 fsel=0 func=INPUT
GPIO 17: level=0 fsel=0 func=INPUT
GPIO 18: level=0 fsel=0 func=INPUT
GPIO 19: level=0 fsel=0 func=INPUT
GPIO 20: level=0 fsel=0 func=INPUT
GPIO 21: level=0 fsel=0 func=INPUT
GPIO 22: level=0 fsel=0 func=INPUT
GPIO 23: level=0 fsel=0 func=INPUT
GPIO 24: level=0 fsel=0 func=INPUT
GPIO 25: level=0 fsel=0 func=INPUT
GPIO 26: level=0 fsel=0 func=INPUT
GPIO 27: level=0 fsel=0 func=INPUT
BANK1 (GPIO 28 to 45):
GPIO 28: level=1 fsel=0 func=INPUT
GPIO 29: level=0 fsel=1 func=OUTPUT
GPIO 30: level=0 fsel=7 alt=3 func=CTS0
GPIO 31: level=0 fsel=7 alt=3 func=RTS0
GPIO 32: level=1 fsel=7 alt=3 func=TXD0
GPIO 33: level=1 fsel=7 alt=3 func=RXD0
GPIO 34: level=1 fsel=7 alt=3 func=SD1_CLK
GPIO 35: level=1 fsel=7 alt=3 func=SD1_CMD
GPIO 36: level=1 fsel=7 alt=3 func=SD1_DAT0
GPIO 37: level=1 fsel=7 alt=3 func=SD1_DAT1
GPIO 38: level=1 fsel=7 alt=3 func=SD1_DAT2
GPIO 39: level=1 fsel=7 alt=3 func=SD1_DAT3
GPIO 40: level=0 fsel=4 alt=0 func=PWM0
GPIO 41: level=0 fsel=4 alt=0 func=PWM1
GPIO 42: level=0 fsel=4 alt=0 func=GPCLK1
GPIO 43: level=0 fsel=4 alt=0 func=GPCLK2
GPIO 44: level=1 fsel=5 alt=1 func=SDA0
GPIO 45: level=1 fsel=5 alt=1 func=SCL0
BANK2 (GPIO 46 to 53):
GPIO 46: level=1 fsel=0 func=INPUT
GPIO 47: level=1 fsel=1 func=OUTPUT
GPIO 48: level=0 fsel=4 alt=0 func=SD0_CLK
GPIO 49: level=1 fsel=4 alt=0 func=SD0_CMD
GPIO 50: level=1 fsel=4 alt=0 func=SD0_DAT0
GPIO 51: level=1 fsel=4 alt=0 func=SD0_DAT1
GPIO 52: level=1 fsel=4 alt=0 func=SD0_DAT2
GPIO 53: level=1 fsel=4 alt=0 func=SD0_DAT3
```
readall
```
 gpio readall
 +-----+-----+---------+------+---+---Pi 3+--+---+------+---------+-----+-----+
 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
 +-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
 |     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
 |   2 |   8 |   SDA.1 | ALT0 | 1 |  3 || 4  |   |      | 5v      |     |     |
 |   3 |   9 |   SCL.1 | ALT0 | 1 |  5 || 6  |   |      | 0v      |     |     |
 |   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
 |     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |
 |  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
 |  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
 |  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
 |     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
 |  10 |  12 |    MOSI | ALT0 | 0 | 19 || 20 |   |      | 0v      |     |     |
 |   9 |  13 |    MISO | ALT0 | 0 | 21 || 22 | 0 | IN   | GPIO. 6 | 6   | 25  |
 |  11 |  14 |    SCLK | ALT0 | 0 | 23 || 24 | 1 | OUT  | CE0     | 10  | 8   |
 |     |     |      0v |      |   | 25 || 26 | 1 | OUT  | CE1     | 11  | 7   |
 |   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
 |   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
 |   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
 |  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
 |  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
 |  26 |  25 | GPIO.25 |   IN | 0 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
 |     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
 +-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
 +-----+-----+---------+------+---+---Pi 3+--+---+------+---------+-----+-----+
```


## Enabling ssh access
```
sudo systemctl enable
ssh sudo systemctl start ssh
```

## Raspistill

Used to test if camera module is enabled and working
```
raspistill -o img.jpg
```

## Raspivid
```
raspivid -o video.h264 -t 1000
```

Note : rapivid  outputs in h364 format .
To convert that inot mp4 container , install MP4box
```
sudo apt-get install -y gpac
```
Capture 30 seconds of raw video at 640x480 and 150kB/s bit rate into a pivideo.h264 file
```
raspivid -t 30000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o pivideo.h264 
```
Wrap the raw video with an MP4 container: 
```
MP4Box -add pivideo.h264 pivideo.mp4
```

## Motion



## Uv4l 

Installation 

Find your Raspbian Linux distribution (e.g. Wheezy, Jessie, Stretch etc)

For Jessie 
curl http://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -

Open the /etc/apt/sources.list and add 
deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main


Update and Install 
```
sudo apt-get update
sudo apt-get install uv4l uv4l-raspicam
```
Get extras 
```
sudo apt-get install uv4l-raspicam-extras
```

To edit Raspicam conf 
```
vi /etc/uv4l/uv4l-raspicam.conf 
```

Install other  webrtc lib for uv4l
```
sudo apt install uv4l-webrtc
```

Install Demos
```
sudo apt-get install uv4l-demos
```

Format
uv4l [ uv4l-options ] –driver raspicam [ raspicam-options ]

Start server
```
service uv4l_raspicam start 
```
Check for status
```
root@raspberrypi:/home/pi# service uv4l_raspicam status
```

stop uv4l 
```
pkill uv4l
service uv4l_raspicam stop
```

### start https , ssl based streaming 

create self signed cerst 
```
openssl genrsa -out selfsign.key 2048 && openssl req -new -x509 -key selfsign.key -out selfsign.crt -sha256
```
give them in server options 
```
pi@raspberrypi:~ $ export OPENSSL_CONF=/etc/ssl/
pi@raspberrypi:~ $ uv4l --external-driver --device-name=video0 --server-option '--use-ssl=yes' --server-option '--ssl-private-key-file=/home/pi/selfsign.key' --server-option '--ssl-certificate-file=/home/pi/selfsign.crt' --verbosity=7 --server-option '--enable-webrtc-video=yes' --server-option '--enable-webrtc-audio=no' --server-option '--webrtc-receive-video=yes' --server-option '--webrtc-renderer-fullscreen=yes' --server-option '--webrtc-receive-datachannels=yes' --server-option '--webrtc-receive-audio=yes' --auto-video_nr --server-option '--enable-control-panel' --server-option '--enable-builtin-ui'
```

## opencv (Open Source Computer Vision Library) 

Has bindings for C++, Python, and Java. 
Used for a very wide range of applications including image analysis, stitching street view images, surveillance, detecting and recognizing faces, tracking moving objects, extracting 3D models and much more.

OpenCV can take advantage of multi-core processing and features GPU acceleration for real-time operation.

Installting OpenCV 

Expand filesystem
include all available space on your micro-SD card:
sudo raspi-config -> Advanced option -> expand file system
then reboot machine

check storage using df
```
df -h
```
Alternatively free up extra space being used by wolfram-alpha or libreoffice 
```
sudo apt-get purge wolfram-engine
$ sudo apt-get purge libreoffice*
$ sudo apt-get clean
$ sudo apt-get autoremove
```

Then update or upgrade existing packages for sanity
```
sudo apt-get update && sudo apt-get upgrade
```
install developer tools 
```
sudo apt-get install build-essential cmake pkg-config
```
install image I/O packages to understand image file formats like jpeg , png ,tiff etc 
```
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
```
simillarly install video I/O packages to work with video stream 
```
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libxvidcore-dev libx264-dev
```
To compile the highgui module, install the GTK development library:
highgui is opencv submodule, used to display images to screen and build basic GUIs. 
```
sudo apt-get install libgtk2.0-dev libgtk-3-dev
```
For opencv matrix operation, install 
```
sudo apt-get install libatlas-base-dev gfortran
```
python headers file , else opencv compiltaion may complain about missing Python.h file
```
sudo apt-get install python3-dev
sudo apt-get -y install python3-dev python3-pip
sudo -H pip3 install -U pip numpy
sudo apt-get -y install python3-testresources
```

Get source code of opencv and opencv_contrib ( ensure same version for both )
```
git clone https://github.com/opencv/opencv.git && cd opencv && git checkout 3.0.0
cd ..
git clone https://github.com/opencv/opencv_contrib.git && cd opencv_contrib &&git checkout 3.0.0
cd ..
```

install virtualenv and virtualenvwrapper modules to create Python virtual environments
virtual env keep the dependencies for diff projects isolated in independent Python environments hence non interference and recommended 
```

```

create build folder 
```
cd ~/opencv && mkdir build && cd build

cmake -D CMAKE_BUILD_TYPE=RELEASE 
 -D CMAKE_INSTALL_PREFIX=/usr/local 
 -D INSTALL_PYTHON_EXAMPLES=ON 
 -D INSTALL_C_EXAMPLES=ON 
 -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib/modules 
 -D BUILD_EXAMPLES=ON ..
```
compile OpenCV ( takes hours )
```
sudo make install && sudo ldconfig
```

optional to reduce compile time
one can use the FASTER variable. This functionality leverages multi-core machines by compiling all modules in parallel, using make -jNR_OF_CORES. Note that this method might use a large amount of resources and the number of processes used should be equal or less than the number of cores. Also, this variable suppresses most of the compile output.
4 core machine, go to the sources root folder and run
```
FASTER=1 make -j4 
```

to validate, open python console and try to import the lib 
```
import cv2
cv2.__version__
```

## superscript to run at start up 

Debian and Ubuntu use the service command to control services and update-rc.d for adding and removing services from start up. 

update-rc.d  updates  the  System V style init script links /etc/rcrunlevel.d/NNname whose target is the script /etc/init.d/name.  These links  are  run  by  init  when  it  changes runlevels;  they  are  generally  used  to start and stop system services such as daemons.

First createa superscript will all commands and copy to /etc/init.d
```
/etc/init.d/superscript
```
Make the script executable:
```
sudo chmod 755 /etc/init.d/superscript
```
Register script to be run at startup:
```
sudo update-rc.d superscript defaults
```
to remove 
```
sudo update-rc.d -f superscript remove
```
manual 
```
man update-rc.d
```
also check updating rc.local text file , to run script at startup

checking status of service 
```
systemctl status superscript.service
```

## VNC 

graphical desktop sharing system that allows you to remotely control the desktop interface of one computer (running VNC Server) from another device running VNC viewer

```
sudo apt-get update
sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer
```

enabling from cmd line 
sudo raspi-config - > interfaing options ->



**Ref**
Raspbian : https://www.raspberrypi.org/downloads/raspbian/
