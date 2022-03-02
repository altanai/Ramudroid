# OpenCv python usuage for self driving robot

Although opencv is written in C++, we are using python lib bundle and program to have it compatible with other parts of 
robot's functioning such as communication with serail comm /dev/ttyAMA0 , which sends motor control commands to Arduino.

## Installation

Remove unnecessary components like wolfram-engine or libreoffice
```
apt-get purge wolfram-engine libreoffice*
apt-get clean
apt-get autoremove
```

### Upgrade and install dependencies 
```
apt-get update && sudo apt-get upgrade
apt-get install build-essential cmake pkg-config
apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libxvidcore-dev libx264-dev libgtk2.0-dev libgtk-3-dev libcanberra-gtk* libatlas-base-dev gfortran
apt-get install python2.7-dev python3-dev
```

### Install opencv and opencv-contrib

you can either clone the opencv branch with a stable version such as 3.4
```
git clone https://github.com/opencv/opencv.git
```
and contrib which is the repo for OpenCV's extra modules
```
git clone https://github.com/opencv/opencv_contrib.git
```

or download a zippped folder and unzip to get sourcecode
```
wget -O opencv3.4.zip https://github.com/opencv/opencv/archive/3.4.zip
wget -O opencv-contrib3.4.zip https://github.com/opencv/opencv_contrib/archive/3.4.zip
unzip opencv3.4.zip
unzip opencv-contrib3.4.zip
```
### Virtual env

Install dependencies for Python virtual environment
```
wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py
python3 get-pip.py
pip install virtualenv virtualenvwrapper
rm -rf ~/.cache/pip
```

Adding virtualenv and virtualenvwrapper to ~/.bashrc
```
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
source /usr/local/bin/virtualenvwrapper.sh
```

reload bashrc to apply changes 
```
source ~/.bashrc
```

Make virtual env and use 
```
mkvirtualenv cv -p python3
workon cv
```

Inside the virtual env install NumPy
```
pip install numpy
```

### build  opencv
```
cd ~/opencv-3.4.7/
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D OPENCV_EXTRA_MODULES_PATH=/home/pi/opencv_contrib-3.4/modules \
    -D ENABLE_NEON=ON \
    -D ENABLE_VFPV3=ON \
    -D BUILD_TESTS=OFF \
    -D INSTALL_PYTHON_EXAMPLES=OFF \
    -D OPENCV_ENABLE_NONFREE=ON \
    -D BUILD_opencv_python3=TRUE \
    -D CMAKE_SHARED_LINKER_FLAGS='-latomic' \
    -D BUILD_EXAMPLES=OFF ..
```
output on rpi 4 
```
--   OpenCV modules:
--     To be built:                 aruco bgsegm bioinspired calib3d ccalib core datasets dnn dnn_objdetect dpm face features2d flann freetype fuzzy hdf hfs highgui img_hash imgcodecs imgproc line_descriptor ml objdetect optflow phase_unwrapping photo plot python2 python3 reg rgbd saliency shape stereo stitching structured_light superres surface_matching text tracking ts video videoio videostab xfeatures2d ximgproc xobjdetect xphoto
--     Disabled:                    world
--     Disabled by dependency:      -
--     Unavailable:                 cnn_3dobj cudaarithm cudabgsegm cudacodec cudafeatures2d cudafilters cudaimgproc cudalegacy cudaobjdetect cudaoptflow cudastereo cudawarping cudev cvv java js matlab ovis sfm viz
--     Applications:                perf_tests apps
--     Documentation:               NO
--     Non-free algorithms:         YES
-- 
--   GUI: 
--     GTK+:                        YES (ver 3.24.5)
--       GThread :                  YES (ver 2.58.3)
--       GtkGlExt:                  NO
--     VTK support:                 NO
-- 
--   Media I/O: 
--     ZLib:                        /usr/lib/arm-linux-gnueabihf/libz.so (ver 1.2.11)
--     JPEG:                        /usr/lib/arm-linux-gnueabihf/libjpeg.so (ver 62)
--     WEBP:                        build (ver encoder: 0x020e)
--     PNG:                         /usr/lib/arm-linux-gnueabihf/libpng.so (ver 1.6.36)
--     TIFF:                        build (ver 42 - 4.0.10)
--     JPEG 2000:                   /usr/lib/arm-linux-gnueabihf/libjasper.so (ver 1.900.1)
--     OpenEXR:                     build (ver 2.3.0)
--     HDR:                         YES
--     SUNRASTER:                   YES
--     PXM:                         YES
-- 
--   Video I/O:
--     DC1394:                      NO
--     FFMPEG:                      YES
--       avcodec:                   YES (ver 58.35.100)
--       avformat:                  YES (ver 58.20.100)
--       avutil:                    YES (ver 56.22.100)
--       swscale:                   YES (ver 5.3.100)
--       avresample:                NO
--     GStreamer:                   YES
--       base:                      YES (ver 1.14.4)
--       video:                     YES (ver 1.14.4)
--       app:                       YES (ver 1.14.4)
--       riff:                      YES (ver 1.14.4)
--       pbutils:                   YES (ver 1.14.4)
--     libv4l/libv4l2:              NO
--     v4l/v4l2:                    linux/videodev2.h
-- 
--   Parallel framework:            pthreads
-- 
--   Trace:                         YES (with Intel ITT)
-- 
--   Other third-party libraries:
--     Lapack:                      NO
--     Eigen:                       NO
--     Custom HAL:                  YES (carotene (ver 0.0.1))
--     Protobuf:                    build (3.5.1)
-- 
--   OpenCL:                        YES (no extra features)
--     Include path:                /home/pi/opencv-3.4/3rdparty/include/opencl/1.2
--     Link libraries:              Dynamic load
-- 
--   Python 2:
--     Interpreter:                 /usr/bin/python2.7 (ver 2.7.16)
--     Libraries:                   /usr/lib/arm-linux-gnueabihf/libpython2.7.so (ver 2.7.16)
--     numpy:                       /usr/lib/python2.7/dist-packages/numpy/core/include (ver 1.16.2)
--     install path:                lib/python2.7/dist-packages/cv2/python-2.7
-- 
--   Python 3:
--     Interpreter:                 /root/.virtualenvs/cv/bin/python3 (ver 3.7.3)
--     Libraries:                   /usr/lib/arm-linux-gnueabihf/libpython3.7m.so (ver 3.7.3)
--     numpy:                       /root/.virtualenvs/cv/lib/python3.7/site-packages/numpy/core/include (ver 1.18.1)
--     install path:                lib/python3.7/site-packages/cv2/python-3.7
-- 
--   Python (for build):            /usr/bin/python2.7
-- 
--   Java:                          
--     ant:                         NO
--     JNI:                         NO
--     Java wrappers:               NO
--     Java tests:                  NO
-- 
--   Install to:                    /usr/local
-- -----------------------------------------------------------------
-- 
-- Configuring done
-- Generating done
-- Build files have been written to: /home/pi/opencv-3.4/build
```


### increase your swap space.

Enabled to use all 4 cores of rpi
open /etc/dphys-swapfile
```
CONF_SWAPSIZE=1024
```

then restart the swap service
```
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start
```

Now compile using all four cores:
```
make -j$(nproc)
```
and install
```
sudo make install
$ sudo ldconfig
```
Reset swap size back to 100


## check opencv installaion 

```python
>>> import cv2
>>> print(cv2.__version__)
3.4.6
```

## Debugging help 

**issue 1** 
```
build/CMakeFiles/CMakeTmp/CheckIncludeFile.c:1:10: fatal error: sys/videoio.h: No such file or directory
 #include <sys/videoio.h>
          ^~~~~~~~~~~~~~~
compilation terminated. 
```
**Solution** add the correct module path 
```bash
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D OPENCV_EXTRA_MODULES_PATH=/home/pi/opencv_contrib-3.4/modules \
    -D ENABLE_NEON=ON \
    -D ENABLE_VFPV3=ON \
    -D BUILD_TESTS=OFF \
    -D INSTALL_C_EXAMPLES=OFF \
    -D INSTALL_PYTHON_EXAMPLES=OFF \
    -D WITH_QT=OFF \
    -D WITH_OPENGL=OFF \
    -D OPENCV_ENABLE_NONFREE=ON \
    -D CMAKE_SHARED_LINKER_FLAGS='-latomic' \
    -D BUILD_EXAMPLES=OFF ..
```

**Issue 2** cv module error after build
```bash
ModuleNotFoundError: No module named 'cv2'
```
or
```bash
 File "<stdin>", line 1, in <module>
  File "/root/.virtualenvs/cv/lib/python3.7/site-packages/cv2/__init__.py", line 3, in <module>
    from .cv2 import *
ImportError: /root/.virtualenvs/cv/lib/python3.7/site-packages/cv2/cv2.cpython-37m-arm-linux-gnueabihf.so: undefined symbol: __atomic_fetch_add_8
```
**solution** 
```bash
pip3 install opencv-python==3.4.6.27
```
Do not use  pip install opencv_contrib_python as doesnt work with rpi 