sudo apt-get update && sudo apt-get upgrade

sudo apt-get install build-essential cmake pkg-config

sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev

sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libxvidcore-dev libx264-dev

sudo apt-get install libgtk2.0-dev libgtk-3-dev

sudo apt-get install libatlas-base-dev gfortran

sudo apt-get install python3-dev
sudo apt-get -y install python3-dev python3-pip
sudo -H pip3 install -U pip numpy
sudo apt-get -y install python3-testresources


git clone https://github.com/opencv/opencv.git && cd opencv && git checkout 3.0.0

git clone https://github.com/opencv/opencv_contrib.git && cd opencv_contrib &&git checkout 3.0.0


cd ~/opencv && mkdir build && cd build

cmake -D CMAKE_BUILD_TYPE=RELEASE 
 -D CMAKE_INSTALL_PREFIX=/usr/local 
 -D INSTALL_PYTHON_EXAMPLES=ON 
 -D INSTALL_C_EXAMPLES=ON 
 -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib/modules 
 -D BUILD_EXAMPLES=ON ..


 sudo make install && sudo ldconfig