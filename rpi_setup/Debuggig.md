# Debugging Common Rpi Issue 

### Issue 1 : finindg the IP address of rpi connered on local wifi network 
**Solution**
>arp -a
? (192.168.0.1) at 1c:5f:2b:53:6e:b on en0 ifscope [ethernet]
? (192.168.0.7) at (incomplete) on en0 ifscope [ethernet]
? (224.0.0.251) at 1:0:5e:0:0:fb on en0 ifscope permanent [ethernet]
? (239.255.255.250) at 1:0:5e:7f:ff:fa on en0 ifscope permanent [ethernet]

or check active client in router webpage 
http://192.168.0.1/index.htm

### Issue 2 :
raspistill -o test.jpg
mmal: Cannot read camera info, keeping the defaults for OV5647
mmal: mmal_vc_component_create: failed to create component 'vc.ril.camera' (1:ENOMEM)
mmal: mmal_component_create_core: could not create component 'vc.ril.camera' (1)
mmal: Failed to create camera component
mmal: main: Failed to create camera component
mmal: Camera is not detected. Please check carefully the camera module is installed correctly
**solution**  don’t have the camera interface enabled or camera is not connected correctly to the Raspberry Pi:

