# WebRTC stream from Rapsberry Pi B+

## Requirnments 

Uv4l and extra 
for installaing uv4l refer to dir rpi_setup 

## Run
Run a http server 
```
http-server -a localhost -p 8001 -c-1
```

## Debug 

### Issue 1 : raspistill -o test.jpg
mmal: Cannot read camera info, keeping the defaults for OV5647
mmal: mmal_vc_component_create: failed to create component 'vc.ril.camera' (1:ENOMEM)
mmal: mmal_component_create_core: could not create component 'vc.ril.camera' (1)
mmal: Failed to create camera component
mmal: main: Failed to create camera component
mmal: Camera is not detected. Please check carefully the camera module is installed correctly
**Solution** check with vcgencmd 
```
vcgencmd get_camera
supported=1 detected=0
```

### Issue 2 : finindg the IP address of rpi connered on local wifi network 
**Solution**
>arp -a
? (192.168.0.1) at 1c:5f:2b:53:6e:b on en0 ifscope [ethernet]
? (192.168.0.7) at (incomplete) on en0 ifscope [ethernet]
? (224.0.0.251) at 1:0:5e:0:0:fb on en0 ifscope permanent [ethernet]
? (239.255.255.250) at 1:0:5e:7f:ff:fa on en0 ifscope permanent [ethernet]

or check active client in router webpage 
http://192.168.0.1/index.htm

### Issue 3 : raspistill -o test.jpg
mmal: Cannot read camera info, keeping the defaults for OV5647
mmal: mmal_vc_component_create: failed to create component 'vc.ril.camera' (1:ENOMEM)
mmal: mmal_component_create_core: could not create component 'vc.ril.camera' (1)
mmal: Failed to create camera component
mmal: main: Failed to create camera component
mmal: Camera is not detected. Please check carefully the camera module is installed correctly
**solution**  don’t have the camera interface enabled or camera is not connected correctly to the Raspberry Pi:

### Issue 4 : W: GPG error: http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 978FA72DF442B950
E: The repository 'http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch InRelease' is not signed.
or 
E: The repository 'http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch InRelease' is not signed.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
N: See apt-secure(8) manpage for repository creation and user configuration details.
**Solution** check version 
```
root@raspberrypi:/home/pi# cat /etc/os-release
PRETTY_NAME="Raspbian GNU/Linux 10 (buster)"
NAME="Raspbian GNU/Linux"
VERSION_ID="10"
VERSION="10 (buster)"
VERSION_CODENAME=buster
ID=raspbian
ID_LIKE=debian
HOME_URL="http://www.raspbian.org/"
SUPPORT_URL="http://www.raspbian.org/RaspbianForums"
BUG_REPORT_URL="http://www.raspbian.org/RaspbianBugs"
```
Since i am using raspberry pi 4 , my version is "buster", add key
```
curl http://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | sudo apt-key add -
```
