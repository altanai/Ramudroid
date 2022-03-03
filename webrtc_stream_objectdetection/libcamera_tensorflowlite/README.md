# libcamera

libcamera library and its c++ apis enables accessing camera opoerations right from Linux OS running on processor ( ARM)
- getting image frames 
- pass image buffers to encoders( image - JPEG , video h264)

Inlcuded with libcamera 
- ISP (Image Signal Processor)
- IPAs (Image Processing Algorithms)
- AEC/AGC (Auto Exposure/Gain Control)
- AWB (Auto White Balance)
- ALSC (Auto Lens Shading Correction)


sudo raspi-config ->  Advanced Options -> Glamor -> Yes


        git clone https://git.libcamera.org/libcamera/libcamera.git
        cd libcamera
        meson build
        ninja -C build install

## Installation of libcamera 

        git config --global http.sslverify false
        

        meson.build:3:0: ERROR:  Meson version is 0.49.2 but project requires >= 0.53.
        git clone https://github.com/mesonbuild/meson.git
        cd meson
        cp meson.py meson

## Options 

        --brightness
        Adjust the brightness of the output images, in the range -1.0 to 1.0
        
        --contrast
        Adjust the contrast of the output image, where 1.0 = normal contrast.
        
        --saturation
        Adjust the colour saturation of the output, where 1.0 = normal and 0.0 = greyscale.
        
        --sharpness
        Adjust the sharpness of the output image, where 1.0 = normal sharpening.
        
        --framerate
        Set the fixed framerate for preview and video modes.
        
        --denoise
        Sets the Denoise operating mode: auto, off, cdn_off, cdn_fast, cdn_hq
        
        --viewfinder-width
        Width of viewfinder frames from the camera (distinct from the preview window size.
        
        --viewfinder-height
        Height of viewfinder frames from the camera (distinct from the preview window size).
        
        --tuning-file
        Name of camera tuning file to use, omit this option for libcamera default behaviour.
        
        --lores-width
        Width of low resolution frames (use 0 to omit low resolution stream.
        
        --lores-height
        Height of low resolution frames (use 0 to omit low resolution stream.
        
        --autofocus
        Flush output data as soon as possible.
        
        -k [ --keypress ]
        Perform capture when ENTER pressed.
        
        Pause or resume video recording when ENTER pressed.
        
        -s [ --signal ]


## Gstreamer



## Tensorflow lite

TensorFlow Lite inferencing does real-time object detection and labelling in a QT preview window using the MobileNet V2 network trained on the COCO dataset.


        sudo apt install build-essential
        sudo apt install git libatlas-base-dev python3-pip
        pip3 install tflite-runtime
        pip3 install pillow numpy


TensorFlow Lite has signature to call the model to run an inference. For a model to be trained and used on a device, you must be able to perform several separate operations, including train, infer, save, and restore functions for the model. You can enable this functionality by first extending your TensorFlow model to have multiple functions, and then exposing those functions as signatures when you convert your model to the TensorFlow Lite model format.

The code example below shows you how to add the following functions to a TensorFlow model:

*   `train` function trains the model with training data.
*   `infer` function invokes the inference.
*   `save` function saves the trainable weights into the file system.
*   `restore` function loads the trainable weights from the file system


The `train` function in the code above uses the [GradientTape](https://www.tensorflow.org/api_docs/python/tf/GradientTape) class to record operations for automatic differentiation.


## Refernces 

- Libcamera installation : https://libcamera.org/getting-started.html
