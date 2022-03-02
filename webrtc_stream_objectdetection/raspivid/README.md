# Raspivid
RTSP stream from the Raspberry PI camera that is accessible from the local network.


    raspivid -o – -t 0 -n | cvlc -vvv stream:///dev/stdin –sout ‘#rtp{sdp=rtsp://:8554/}’ :demux=h264
