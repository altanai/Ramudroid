# Python Flash Server 

Ramudroid Exposes webservices for outside world include web console 
Webservices are translated to 
- SPI commands to be shared with Arduino to manually control driving unit  or 
- GPIO pins to control cleaning unit 

## Setup
Install dependencies
```shell script
pip install -r requirnments.txt
```
or manually install required libs like for install python flash framework 
```shell script
sudo apt-get install python3-flask
```
or RPIO
```shell script
pip install RPi.GPIO
```

### Starting in stand alone mode ( during dev on laptop)

Start virtual env 

    python3 -m  venv virtual
    source virtual/bin/activate
    pip install -r requirnments.tx

Start the server 

     env FLASK_ENV=development FLASK_APP=main.py flask run -h 0.0.0.0

### Starting for the whole project 

Refer to robot_controller_rpi_setup folder and superscript. ( note starting uv4l using cmd is not necessary is already setup by raspicam file)

     sudo env FLASK_ENV=production FLASK_APP=/home/pi/Ramudroid/webservices_rpi_arduino_comm/main.py flask run -h 0.0.0.0 --cert=adhoc

### UART serial comm

UART is an asynchronous serial communication protocol ie it transmits the individual bits from byte in a sequential fashion , without the sender having to send a clock signal to the receiver. 

check for ports under /dev 
```shell script
> ls /dev
argon-h264mem  cpu_dma_latency  gpiomem       loop1             mmcblk0p1           ppp    ram2    serial0  tty11  tty21  tty31  tty41  tty51  tty61      urandom  vcs6   vcsm-cma     video0
argon-hevcmem  cuse             hidraw0       loop2             mmcblk0p2           ptmx   ram3    serial1  tty12  tty22  tty32  tty42  tty52  tty62      v4l      vcs7   vcsu         video10
argon-intcmem  disk             hidraw1       loop3             mmcblk0p5           pts    ram4    shm      tty13  tty23  tty33  tty43  tty53  tty63      vc-mem   vcsa   vcsu1        video11
argon-vp9mem   dri              hidraw2       loop4             mmcblk0p6           ram0   ram5    snd      tty14  tty24  tty34  tty44  tty54  tty7       vchiq    vcsa1  vcsu2        video12
autofs         fb0              hwrng         loop5             mmcblk0p7           ram1   ram6    stderr   tty15  tty25  tty35  tty45  tty55  tty8       vcio     vcsa2  vcsu3        watchdog
block          fd               initctl       loop6             mqueue              ram10  ram7    stdin    tty16  tty26  tty36  tty46  tty56  tty9       vcs      vcsa3  vcsu4        watchdog0
btrfs-control  full             input         loop7             net                 ram11  ram8    stdout   tty17  tty27  tty37  tty47  tty57  ttyAMA0    vcs1     vcsa4  vcsu5        zero
bus            fuse             kmsg          mapper            network_latency     ram12  ram9    tty      tty18  tty28  tty38  tty48  tty58  ttyS0      vcs2     vcsa5  vcsu6
cachefiles     gpiochip0        log           mem               network_throughput  ram13  random  tty0     tty19  tty29  tty39  tty49  tty59  ttyprintk  vcs3     vcsa6  vcsu7
char           gpiochip1        loop-control  memory_bandwidth  null                ram14  raw     tty1     tty2   tty3   tty4   tty5   tty6   uhid       vcs4     vcsa7  vga_arbiter
console        gpiochip2        loop0         mmcblk0           port                ram15  rfkill  tty10    tty20  tty30  tty40  tty50  tty60  uinput     vcs5     vcsm   vhci
```

Enable raspi-config - > Interfacing options -> p6 serial -> enable  
![alt Raspi config uart](https://github.com/altanai/Ramudroid/blob/master/webservices_rpi_arduino_comm/Screenshot%202019-10-12%20at%201.08.54%20PM.png?raw=true)

alternatively enable_uart should be 1 in /boot/config.txt
such as 
```shell script
# NOOBS Auto-generated Settings:^M
hdmi_force_hotplug=1^M
start_x=1
gpu_mem=128
enable_uart=1
```

## Run Flask Server for Rpi webservices 

These webservices will control RPi's input to arduino which a emote user can control iver REST interface.
The ways to start webservices server on Rpi is 

1. env from cmd line ( insure )
```shell script
$ env FLASK_ENV=development FLASK_APP=main.py flask run
 * Serving Flask app "move.py" (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 293-266-999
```

2. Set them separately and run such as below for test_mptors app 
```shell script
export FLASK_APP=test_motors.py
export FLASK_ENV=development
flask run -h 0.0.0.0
```

3. Run in https mode - to be used with webrtc streaming 
```shell script
sudo env FLASK_ENV=development FLASK_APP=main.py flask run -h 0.0.0.0 --cert=adhoc
```

## Debugging 

**Issue1** Incorrect access rights
```
git clone git@github.com:altanai/Ramudroid.git
Cloning into 'Ramudroid'...
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
Please make sure you have the correct access rights
```
and the repository exists.
\
**solution** Looks inside the .ssh folder do u see prov and pub key , if not then generate one
```
pi@raspberrypi:~ $ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/pi/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/pi/.ssh/id_rsa.
Your public key has been saved in /home/pi/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:AnVGnPAXJrh4k1XZyX9kVRJGKZ5p9j5rs8DbmwxU1HI pi@raspberrypi
The key's randomart image is:
+---[RSA 2048]----+
|      o==o++ o*+=|
|     ..++o..=oo.E|
|    .. +. .. =.= |
|    ..=  .  *.. .|
|     ...S  o.. . |
|       .   o  .  |
|            +.   |
|             *=. |
|            ..B* |
+----[SHA256]-----+
```
now the folder should have prov and pub keys like 
```
pi@raspberrypi:~ $ ls ~/.ssh
id_rsa  id_rsa.pub  known_hosts
```
Now add the key to github projects "deploy Keys" such as https://github.com/altanai/Ramudroid/settings/keys 
(only owner can this)

**Issue2** Could not open a connection to your authentication agent.
\
**solution** start the evl agent and add key 
```
pi@raspberrypi:~ $  eval "$(ssh-agent -s)"   
Agent pid 943
pi@raspberrypi:~ $ ssh-add ~/.ssh/id_rsa
Identity added: /home/pi/.ssh/id_rsa (pi@raspberrypi)
```

**Issue 3** Flash Env
```
 * Serving Flask app "move" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
```
\
**solution** Use export FLASK_ENV=development

**Issue 4** PIP Env 
```
pip3 install -r requirnments.txt
Looking in indexes: https://pypi.org/simple, https://www.piwheels.org/simple
Collecting alabaster==0.7.10 (from -r requirements.txt (line 1))
  Using cached https://files.pythonhosted.org/packages/2e/c3/9b7dcd8548cf2c00531763ba154e524af575e8f36701bacfe5bcadc67440/alabaster-0.7.10-py2.py3-none-any.whl
Collecting AntClient==0.4.0 (from -r requirements.txt (line 2))
Could not install packages due to an EnvironmentError: 404 Client Error: Not Found for url: https://pypi.org/simple/antclient/
```
\
**Solution**

**Issue 5**
```
serial.serialutil.SerialException
serial.serialutil.SerialException: [Errno 13] could not open port /dev/serial0: [Errno 13] Permission denied: '/dev/serial0'
``` 
\

**Issue 6** :  No module named 'flask_cors' 
```shell script
flask.cli.NoAppException: While importing "main", an ImportError was raised:

Traceback (most recent call last):
  File "/usr/lib/python3/dist-packages/flask/cli.py", line 235, in locate_app
    __import__(module_name)
  File "/home/pi/Ramudroid/webservices_rpi_arduino_comm/main.py", line 16, in <module>
    from flask_cors import CORS, cross_origin
ModuleNotFoundError: No module named 'flask_cors'
```
\
**solution**  Install Flask cors in virtual env