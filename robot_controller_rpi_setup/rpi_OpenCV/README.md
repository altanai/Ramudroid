## opencv (Open Source Computer Vision Library) 

Has bindings for C++, Python, and Java. 
Used for a very wide range of applications including image analysis, stitching street view images, surveillance, detecting and recognizing faces, tracking moving objects, extracting 3D models and much more.

OpenCV can take advantage of multi-core processing and features GPU acceleration for real-time operation.

### Installting OpenCV 

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
$ sudo apt-get purge wolfram-engine
$ sudo apt-get purge libreoffice*
$ sudo apt-get clean
$ sudo apt-get autoremove
```

Then update or upgrade existing packages for sanity


        sudo apt-get update && sudo apt-get upgrade

install developer tools 
```
sudo apt-get install build-essential cmake pkg-config
```
install image I/O packages to understand image file formats like jpeg , png ,tiff etc 
```
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
```
Simmillarly install video I/O packages to work with video stream 
```
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libxvidcore-dev libx264-dev
```
To compile the highgui module, install the GTK development library:
highgui is opencv submodule, used to display images to screen and build basic GUIs. 
```
sudo apt-get install libgtk2.0-dev libgtk-3-dev
```
For opencv matrix operation, install 
```shell script
sudo apt-get install libatlas-base-dev gfortran
```
python headers file, else opencv compilation may complain about missing Python.h file
```shell script
sudo apt-get install python3-dev
sudo apt-get -y install python3-dev python3-pip
sudo -H pip3 install -U pip numpy
sudo apt-get -y install python3-testresources
```

Get source code of opencv and opencv_contrib ( ensure same version for both )
```shell script
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
```shell script
cd ~/opencv && mkdir build && cd build

cmake -D CMAKE_BUILD_TYPE=RELEASE 
 -D CMAKE_INSTALL_PREFIX=/usr/local 
 -D INSTALL_PYTHON_EXAMPLES=ON 
 -D INSTALL_C_EXAMPLES=ON 
 -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib/modules 
 -D BUILD_EXAMPLES=ON ..
```
compile OpenCV ( takes hours )
```shell script
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

First create a superscript will all commands and copy to /etc/init.d
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
