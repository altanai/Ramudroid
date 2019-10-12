# Rpi Setup for Ramudroid


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



**Ref**
Raspbian : https://www.raspberrypi.org/downloads/raspbian/
