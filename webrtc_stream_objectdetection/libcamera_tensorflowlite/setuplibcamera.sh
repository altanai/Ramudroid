!/bin/bash
sudo apt install -y python3-pip git
sudo pip3 install jinja2

sudo apt install -y libboost-dev
sudo apt install -y libgnutls28-dev openssl libtiff5-dev
sudo apt install -y qtbase5-dev libqt5core5a libqt5gui5 libqt5widgets5
sudo apt install -y meson
sudo pip3 install pyyaml ply
sudo pip3 install --upgrade meson
sudo apt install -y libglib2.0-dev libgstreamer-plugins-base1.0-dev
cd
git clone git://linuxtv.org/libcamera.git
cd libcamera
meson build --buildtype=release -Dpipelines=raspberrypi -Dipas=raspberrypi -Dv4l2=true -Dgstreamer=enabled -Dtest=false -Dlc-compliance=disabled -Dcam=disabled -Dqcam=enabled -Ddocumentation=disabled
ninja -C build   # use -j 2 on Pi 3 or earlier devices
sudo ninja -C build install
