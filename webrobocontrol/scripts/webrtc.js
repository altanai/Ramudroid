function httpGetAsync(theUrl, callback) {
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    } catch (e) {
        console.error(e);
    }
}

function addGyronormScript() {
    var srcUrl = "https://rawgit.com/dorukeker/gyronorm.js/master/dist/gyronorm.complete.min.js"
    httpGetAsync(srcUrl, function (text) {
        var script = document.createElement("script");
        script.setAttribute("src", srcUrl);
        document.getElementsByTagName("head")[0].appendChild(script);
    });
}

var signalling_server_hostname = location.hostname || "192.168.15.193;
var signalling_server_address = signalling_server_hostname + ':' + (location.port || (location.protocol === 'https:' ? 443 : 80));
var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+

addEventListener("DOMContentLoaded", function () {
    document.getElementById('signalling_server').value = signalling_server_address;
    var cast_not_allowed = !('MediaSource' in window) || location.protocol !== "https:";
    if (cast_not_allowed || !isFirefox) {
        if (document.getElementById('cast_tab'))
            document.getElementById('cast_tab').disabled = true;
        if (cast_not_allowed) { // chrome supports if run with --enable-usermedia-screen-capturing
            document.getElementById('cast_screen').disabled = true;
        }
        document.getElementById('cast_window').disabled = true;
        document.getElementById('cast_application').disabled = true;
        document.getElementById('note2').style.display = "none";
        document.getElementById('note4').style.display = "none";
    } else {
        document.getElementById('note1').style.display = "none";
        document.getElementById('note3').style.display = "none";
    }
    addGyronormScript();
});

var ws = null;
var pc;
var gn;
var datachannel, localdatachannel;
var audio_video_stream;
var recorder = null;
var recordedBlobs;
var pcConfig = {"iceServers": [
        {"urls": ["stun:stun.l.google.com:19302", "stun:" + signalling_server_hostname + ":3478"]}
    ]};
var pcOptions = {
    optional: [
        // Deprecated:
        //{RtpDataChannels: false},
        //{DtlsSrtpKeyAgreement: true}
    ]
};
var mediaConstraints = {
    optional: [],
    mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    }
};
var keys = [];
var trickle_ice = true;
var remoteDesc = false;
var iceCandidates = [];

RTCPeerConnection = window.RTCPeerConnection || /*window.mozRTCPeerConnection ||*/ window.webkitRTCPeerConnection;
RTCSessionDescription = /*window.mozRTCSessionDescription ||*/ window.RTCSessionDescription;
RTCIceCandidate = /*window.mozRTCIceCandidate ||*/ window.RTCIceCandidate;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
var URL = window.URL || window.webkitURL;

function createPeerConnection() {
    try {
        var pcConfig_ = pcConfig;
        try {
            ice_servers = document.getElementById('ice_servers').value;
            if (ice_servers) {
                pcConfig_.iceServers = JSON.parse(ice_servers);
            }
        } catch (e) {
            alert(e + "\nExample: "
                    + '\n[ {"urls": "stun:stun1.example.net"}, {"urls": "turn:turn.example.org", "username": "user", "credential": "myPassword"} ]'
                    + "\nContinuing with built-in RTCIceServer array");
        }
        console.log(JSON.stringify(pcConfig_));
        pc = new RTCPeerConnection(pcConfig_, pcOptions);
        pc.onicecandidate = onIceCandidate;
        if ('ontrack' in pc) {
            pc.ontrack = onTrack;
        } else {
            pc.onaddstream = onRemoteStreamAdded; // deprecated
        }
        pc.onremovestream = onRemoteStreamRemoved;
        pc.ondatachannel = onDataChannel;
        console.log("peer connection successfully created!");
    } catch (e) {
        console.error("createPeerConnection() failed");
    }
}

function onDataChannel(event) {
    console.log("onDataChannel()");
    datachannel = event.channel;

    event.channel.onopen = function () {
        console.log("Data Channel is open!");
        document.getElementById('datachannels').disabled = false;
    };

    event.channel.onerror = function (error) {
        console.error("Data Channel Error:", error);
    };

    event.channel.onmessage = function (event) {
        console.log("Got Data Channel Message:", event.data);
        document.getElementById('datareceived').value = event.data;
    };

    event.channel.onclose = function () {
        datachannel = null;
        document.getElementById('datachannels').disabled = true;
        console.log("The Data Channel is Closed");
    };
}

function onIceCandidate(event) {
    if (event.candidate) {
        var candidate = {
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            sdpMid: event.candidate.sdpMid,
            candidate: event.candidate.candidate
        };
        var request = {
            what: "addIceCandidate",
            data: JSON.stringify(candidate)
        };
        ws.send(JSON.stringify(request));
    } else {
        console.log("End of candidates.");
    }
}

function addIceCandidates() {
    iceCandidates.forEach(function (candidate) {
        pc.addIceCandidate(candidate,
            function () {
                console.log("IceCandidate added: " + JSON.stringify(candidate));
            },
            function (error) {
                console.error("addIceCandidate error: " + error);
            }
        );
    });
    iceCandidates = [];
}

function onRemoteStreamAdded(event) {
    console.log("Remote stream added:", event.stream);
    var remoteVideoElement = document.getElementById('remote-video');
    remoteVideoElement.srcObect = event.stream;
    //remoteVideoElement.play();
}

function onTrack(event) {
    console.log("Remote track!");
    var remoteVideoElement = document.getElementById('remote-video');
    remoteVideoElement.srcObject = event.streams[0];
    //remoteVideoElement.play();
}

function onRemoteStreamRemoved(event) {
    var remoteVideoElement = document.getElementById('remote-video');
    remoteVideoElement.srcObject = null;
    remoteVideoElement.src = ''; // TODO: remove
}

function start() {
    if ("WebSocket" in window) {
        document.getElementById("stop").disabled = false;
        document.getElementById("start").disabled = true;
        document.documentElement.style.cursor = 'wait';
        var server = document.getElementById("signalling_server").value.toLowerCase();

        var protocol = location.protocol === "https:" ? "wss:" : "ws:";
        ws = new WebSocket(protocol + '//' + server + '/stream/webrtc');

        function call(stream) {
            iceCandidates = [];
            remoteDesc = false;
            createPeerConnection();
            if (stream) {
                pc.addStream(stream);
            }
            var request = {
                what: "call",
                options: {
                    force_hw_vcodec: document.getElementById("remote_hw_vcodec").checked,
                    vformat: document.getElementById("remote_vformat").value,
                    trickle_ice: trickleice_selection()
                }
            };
            ws.send(JSON.stringify(request));
            console.log("call(), request=" + JSON.stringify(request));
        }

        ws.onopen = function () {
            console.log("onopen()");

            audio_video_stream = null;
            var cast_mic = document.getElementById("cast_mic").checked;
            var cast_tab = document.getElementById("cast_tab") ? document.getElementById("cast_tab").checked : false;
            var cast_camera = document.getElementById("cast_camera").checked;
            var cast_screen = document.getElementById("cast_screen").checked;
            var cast_window = document.getElementById("cast_window").checked;
            var cast_application = document.getElementById("cast_application").checked;
            var echo_cancellation = document.getElementById("echo_cancellation").checked;
            var localConstraints = {};
            if (cast_mic) {
                if (echo_cancellation)
                    localConstraints['audio'] = isFirefox ? {echoCancellation: true} : {optional: [{echoCancellation: true}]};
                else
                    localConstraints['audio'] = isFirefox ? {echoCancellation: false} : {optional: [{echoCancellation: false}]};
            } else if (cast_tab) {
                localConstraints['audio'] = {mediaSource: "audioCapture"};
            } else {
                localConstraints['audio'] = false;
            }
            if (cast_camera) {
                localConstraints['video'] = true;
            } else if (cast_screen) {
                if (isFirefox) {
                    localConstraints['video'] = {frameRate: {ideal: 30, max: 30},
                        //width: {min: 640, max: 960},
                        //height: {min: 480, max: 720},
                        mozMediaSource: "screen",
                        mediaSource: "screen"};
                } else {
                    // chrome://flags#enable-usermedia-screen-capturing
                    document.getElementById("cast_mic").checked = false;
                    localConstraints['audio'] = false; // mandatory for chrome
                    localConstraints['video'] = {'mandatory': {'chromeMediaSource':'screen'}};
                }
            } else if (cast_window)
                localConstraints['video'] = {frameRate: {ideal: 30, max: 30},
                    //width: {min: 640, max: 960},
                    //height: {min: 480, max: 720},
                    mozMediaSource: "window",
                    mediaSource: "window"};
            else if (cast_application)
                localConstraints['video'] = {frameRate: {ideal: 30, max: 30},
                    //width: {min: 640, max: 960},
                    //height:  {min: 480, max: 720},
                    mozMediaSource: "application",
                    mediaSource: "application"};
            else
                localConstraints['video'] = false;

            var localVideoElement = document.getElementById('local-video');
            if (localConstraints.audio || localConstraints.video) {
                if (navigator.getUserMedia) {
                    navigator.getUserMedia(localConstraints, function (stream) {
                        audio_video_stream = stream;
                        call(stream);
                        localVideoElement.muted = true;
                        localVideoElement.srcObject = stream;
                        localVideoElement.play();
                    }, function (error) {
                        stop();
                        alert("An error has occurred. Check media device, permissions on media and origin.");
                        console.error(error);
                    });
                } else {
                    console.log("getUserMedia not supported");
                }
            } else {
                call();
            }
        };

        ws.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            if (msg.what !== 'undefined') {
                var what = msg.what;
                var data = msg.data;
            }
            //console.log("message=" + msg);
            console.log("message =" + what);

            switch (what) {
                case "offer":
                    pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(data)),
                            function onRemoteSdpSuccess() {
                                remoteDesc = true;
                                addIceCandidates();
                                console.log('onRemoteSdpSucces()');
                                pc.createAnswer(function (sessionDescription) {
                                    pc.setLocalDescription(sessionDescription);
                                    var request = {
                                        what: "answer",
                                        data: JSON.stringify(sessionDescription)
                                    };
                                    ws.send(JSON.stringify(request));
                                    console.log(request);

                                }, function (error) {
                                    alert("Failed to createAnswer: " + error);

                                }, mediaConstraints);
                            },
                            function onRemoteSdpError(event) {
                                alert('Failed to set remote description (unsupported codec on this browser?): ' + event);
                                stop();
                            }
                    );

                    /*
                     * No longer needed, it's implicit in "call"
                    var request = {
                        what: "generateIceCandidates"
                    };
                    console.log(request);
                    ws.send(JSON.stringify(request));
                    */
                    break;

                case "answer":
                    break;

                case "message":
                    alert(msg.data);
                    break;

                case "iceCandidate": // when trickle is enabled
                    if (!msg.data) {
                        console.log("Ice Gathering Complete");
                        break;
                    }
                    var elt = JSON.parse(msg.data);
                    let candidate = new RTCIceCandidate({sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate});
                    iceCandidates.push(candidate);
                    if (remoteDesc)
                        addIceCandidates();
                    document.documentElement.style.cursor = 'default';
                    break;

                case "iceCandidates": // when trickle ice is not enabled
                    var candidates = JSON.parse(msg.data);
                    for (var i = 0; candidates && i < candidates.length; i++) {
                        var elt = candidates[i];
                        let candidate = new RTCIceCandidate({sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate});
                        iceCandidates.push(candidate);
                    }
                    if (remoteDesc)
                        addIceCandidates();
                    document.documentElement.style.cursor = 'default';
                    break;
            }
        };

        ws.onclose = function (evt) {
            if (pc) {
                pc.close();
                pc = null;
            }
            document.getElementById("stop").disabled = true;
            document.getElementById("start").disabled = false;
            document.documentElement.style.cursor = 'default';
        };

        ws.onerror = function (evt) {
            alert("An error has occurred!");
            ws.close();
        };

    } else {
        alert("Sorry, this browser does not support WebSockets.");
    }
}

function stop() {
    if (datachannel) {
        console.log("closing data channels");
        datachannel.close();
        datachannel = null;
        document.getElementById('datachannels').disabled = true;
    }
    if (localdatachannel) {
        console.log("closing local data channels");
        localdatachannel.close();
        localdatachannel = null;
    }
    if (audio_video_stream) {
        try {
            if (audio_video_stream.getVideoTracks().length)
                audio_video_stream.getVideoTracks()[0].stop();
            if (audio_video_stream.getAudioTracks().length)
                audio_video_stream.getAudioTracks()[0].stop();
            audio_video_stream.stop(); // deprecated
        } catch (e) {
            for (var i = 0; i < audio_video_stream.getTracks().length; i++)
                audio_video_stream.getTracks()[i].stop();
        }
        audio_video_stream = null;
    }
    stop_record();
    document.getElementById('remote-video').srcObject = null;
    document.getElementById('local-video').srcObject = null;
    document.getElementById('remote-video').src = ''; // TODO; remove
    document.getElementById('local-video').src = ''; // TODO: remove
    if (pc) {
        pc.close();
        pc = null;
    }
    if (ws) {
        ws.close();
        ws = null;
    }
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    document.documentElement.style.cursor = 'default';
}

function mute() {
    var remoteVideo = document.getElementById("remote-video");
    remoteVideo.muted = !remoteVideo.muted;
}

function pause() {
    var remoteVideo = document.getElementById("remote-video");
    if (remoteVideo.paused)
        remoteVideo.play();
    else
        remoteVideo.pause();
}

function fullscreen() {
    var remoteVideo = document.getElementById("remote-video");
    if (remoteVideo.requestFullScreen) {
        remoteVideo.requestFullScreen();
    } else if (remoteVideo.webkitRequestFullScreen) {
        remoteVideo.webkitRequestFullScreen();
    } else if (remoteVideo.mozRequestFullScreen) {
        remoteVideo.mozRequestFullScreen();
    }
}

function handleDataAvailable(event) {
    //console.log(event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function handleStop(event) {
    console.log('Recorder stopped: ', event);
    document.getElementById('record').innerHTML = 'Start Recording';
    recorder = null;
    var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    var recordedVideoElement = document.getElementById('recorded-video');
    recordedVideoElement.src = URL.createObjectURL(superBuffer);
}

function discard_recording() {
    var recordedVideoElement = document.getElementById('recorded-video');
    recordedVideoElement.srcObject = null;
    recordedVideoElement.src = '';
}

function stop_record() {
    if (recorder) {
        recorder.stop();
        console.log("recording stopped");
        document.getElementById('record-detail').open = true;
    }
}

function startRecording(stream) {
    recordedBlobs = [];
    var options = {mimeType: 'video/webm;codecs=vp9'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: 'video/webm;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
            options = {mimeType: 'video/webm;codecs=h264'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(options.mimeType + ' is not Supported');
                options = {mimeType: 'video/webm'};
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    console.log(options.mimeType + ' is not Supported');
                    options = {mimeType: ''};
                }
            }
        }
    }
    try {
        recorder = new MediaRecorder(stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e);
        alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType);
        return;
    }
    console.log('Created MediaRecorder', recorder, 'with options', options);
    //recorder.ignoreMutedMedia = true;
    recorder.onstop = handleStop;
    recorder.ondataavailable = handleDataAvailable;
    recorder.onwarning = function (e) {
        console.log('Warning: ' + e);
    };
    recorder.start();
    console.log('MediaRecorder started', recorder);
}

function start_stop_record() {
    if (pc && !recorder) {
        var streams = pc.getRemoteStreams();
        if (streams.length) {
            console.log("starting recording");
            startRecording(streams[0]);
            document.getElementById('record').innerHTML = 'Stop Recording';
        }
    } else {
        stop_record();
    }
}

function download() {
    if (recordedBlobs !== undefined) {
        var blob = new Blob(recordedBlobs, {type: 'video/webm'});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'video.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
}

function remote_hw_vcodec_selection() {
    if (!document.getElementById('remote_hw_vcodec').checked)
        unselect_remote_hw_vcodec();
    else
        select_remote_hw_vcodec();
}

function remote_hw_vcodec_format_selection() {
    if (document.getElementById('remote_hw_vcodec').checked)
        remote_hw_vcodec_selection();
}

function select_remote_hw_vcodec() {
    document.getElementById('remote_hw_vcodec').checked = true;
    var vformat = document.getElementById('remote_vformat').value;
    switch (vformat) {
        case '5':
            document.getElementById('remote-video').style.width = "320px";
            document.getElementById('remote-video').style.height = "240px";
            break;
        case '10':
            document.getElementById('remote-video').style.width = "320px";
            document.getElementById('remote-video').style.height = "240px";
            break;
        case '20':
            document.getElementById('remote-video').style.width = "352px";
            document.getElementById('remote-video').style.height = "288px";
            break;
        case '25':
            document.getElementById('remote-video').style.width = "640px";
            document.getElementById('remote-video').style.height = "480px";
            break;
        case '30':
            document.getElementById('remote-video').style.width = "640px";
            document.getElementById('remote-video').style.height = "480px";
            break;
        case '35':
            document.getElementById('remote-video').style.width = "800px";
            document.getElementById('remote-video').style.height = "480px";
            break;
        case '40':
            document.getElementById('remote-video').style.width = "960px";
            document.getElementById('remote-video').style.height = "720px";
            break;
        case '50':
            document.getElementById('remote-video').style.width = "1024px";
            document.getElementById('remote-video').style.height = "768px";
            break;
        case '55':
            document.getElementById('remote-video').style.width = "1280px";
            document.getElementById('remote-video').style.height = "720px";
            break;
        case '60':
            document.getElementById('remote-video').style.width = "1280px";
            document.getElementById('remote-video').style.height = "720px";
            break;
        case '63':
            document.getElementById('remote-video').style.width = "1280px";
            document.getElementById('remote-video').style.height = "720px";
            break;
        case '65':
            document.getElementById('remote-video').style.width = "1280px";
            document.getElementById('remote-video').style.height = "768px";
            break;
        case '70':
            document.getElementById('remote-video').style.width = "1280px";
            document.getElementById('remote-video').style.height = "768px";
            break;
        case '75':
            document.getElementById('remote-video').style.width = "1536px";
            document.getElementById('remote-video').style.height = "768px";
            break;
        case '80':
            document.getElementById('remote-video').style.width = "1280px";
            document.getElementById('remote-video').style.height = "960px";
            break;
        case '90':
            document.getElementById('remote-video').style.width = "1600px";
            document.getElementById('remote-video').style.height = "768px";
            break;
        case '95':
            document.getElementById('remote-video').style.width = "1640px";
            document.getElementById('remote-video').style.height = "1232px";
            break;
        case '97':
            document.getElementById('remote-video').style.width = "1640px";
            document.getElementById('remote-video').style.height = "1232px";
            break;
        case '98':
            document.getElementById('remote-video').style.width = "1792px";
            document.getElementById('remote-video').style.height = "896px";
            break;
        case '99':
            document.getElementById('remote-video').style.width = "1792px";
            document.getElementById('remote-video').style.height = "896px";
            break;
        case '100':
            document.getElementById('remote-video').style.width = "1920px";
            document.getElementById('remote-video').style.height = "1080px";
            break;
        case '105':
            document.getElementById('remote-video').style.width = "1920px";
            document.getElementById('remote-video').style.height = "1080px";
            break;
        default:
            document.getElementById('remote-video').style.width = "1280px";
            document.getElementById('remote-video').style.height = "720px";
    }
    /*
     // Disable video casting. Not supported at the moment with hw codecs.
     var elements = document.getElementsByName('video_cast');
     for(var i = 0; i < elements.length; i++) {
     elements[i].checked = false;
     }
     */
}

function unselect_remote_hw_vcodec() {
    document.getElementById('remote_hw_vcodec').checked = false;
    document.getElementById('remote-video').style.width = "640px";
    document.getElementById('remote-video').style.height = "480px";
}

function singleselection(name, id) {
    var old = document.getElementById(id).checked;
    var elements = document.getElementsByName(name);
    for (var i = 0; i < elements.length; i++) {
        elements[i].checked = false;
    }
    document.getElementById(id).checked = old ? true : false;
    /*
     // Disable video hw codec. Not supported at the moment when casting.
     if (name === 'video_cast') {
     unselect_remote_hw_vcodec();
     }
     */
}

function send_message() {
    var msg = document.getElementById('datamessage').value;
    datachannel.send(msg);
    console.log("message sent: ", msg);
}

function create_localdatachannel() {
    if (pc && localdatachannel)
        return;
    localdatachannel = pc.createDataChannel('datachannel');
    localdatachannel.onopen = function(event) {
        if (localdatachannel.readyState === "open") {
            localdatachannel.send("datachannel created!");
        }
    };
    console.log("data channel created");
}

function close_localdatachannel() {
    if (localdatachannel) {
        localdatachannel.close();
        localdatachannel = null;
    }
    console.log("local data channel closed");
}

function handleOrientation(event) {
    var data = {
        "do": {
            "alpha": event.alpha.toFixed(1), // In degree in the range [0,360]
            "beta": event.beta.toFixed(1), // In degree in the range [-180,180]
            "gamma": event.gamma.toFixed(1), // In degree in the range [-90,90]
            "absolute": event.absolute
        }
    };
    if (datachannel)
        datachannel.send(JSON.stringify(data));
}

function isGyronormPresent() {
    var url = "gyronorm.complete.min.js";
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length; i--; ) {
        if (scripts[i].src.indexOf(url) > -1)
            return true;
    }
    return false;
}

function handleGyronorm(data) {
    // Process:
    // data.do.alpha    ( deviceorientation event alpha value )
    // data.do.beta     ( deviceorientation event beta value )
    // data.do.gamma    ( deviceorientation event gamma value )
    // data.do.absolute ( deviceorientation event absolute value )

    // data.dm.x        ( devicemotion event acceleration x value )
    // data.dm.y        ( devicemotion event acceleration y value )
    // data.dm.z        ( devicemotion event acceleration z value )

    // data.dm.gx       ( devicemotion event accelerationIncludingGravity x value )
    // data.dm.gy       ( devicemotion event accelerationIncludingGravity y value )
    // data.dm.gz       ( devicemotion event accelerationIncludingGravity z value )

    // data.dm.alpha    ( devicemotion event rotationRate alpha value )
    // data.dm.beta     ( devicemotion event rotationRate beta value )
    // data.dm.gamma    ( devicemotion event rotationRate gamma value )
    if (datachannel && document.getElementById('orientationsend').checked)
        datachannel.send(JSON.stringify(data));
}

function orientationsend_selection() {
    if (document.getElementById('orientationsend').checked) {
        if (isGyronormPresent()) {
            console.log("gyronorm.js library found!");
            if (gn) {
                gn.setHeadDirection();
                return;
            }
            try {
                gn = new GyroNorm();
            } catch (e) {
                console.log(e);
                document.getElementById('orientationsend').checked = false;
                return;
            }
            var args = {
                frequency: 60, // ( How often the object sends the values - milliseconds )
                gravityNormalized: true, // ( If the gravity related values to be normalized )
                orientationBase: GyroNorm.GAME, // ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
                decimalCount: 1, // ( How many digits after the decimal point will there be in the return values )
                logger: null, // ( Function to be called to log messages from gyronorm.js )
                screenAdjusted: false            // ( If set to true it will return screen adjusted values. )
            };
            gn.init(args).then(function () {
                gn.start(handleGyronorm);
                gn.setHeadDirection(); // only with gn.GAME
            }).catch(function (e) {
                console.log("DeviceOrientation or DeviceMotion might not be supported by this browser or device");
            });
        }
        if (!gn) {
            window.addEventListener('deviceorientation', handleOrientation, true);
            console.log("gyronorm.js library not found, using defaults");
        }
    } else {
        if (!gn) {
            window.removeEventListener('deviceorientation', handleOrientation, true);
        }
    }
}

function getKeycodesArray(arr) {
    var newArr = new Array();
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "number") {
            newArr[newArr.length] = arr[i];
        }
    }
    return newArr;
}

function convertKeycodes(arr) {
    var map = {
        /*Space*/ 32: 57,
        /*Enter*/13: 28,
        /*Tab*/ 9: 15,
        /*Esc*/27: 1,
        /*Backspace*/8: 14,
        /*Shift*/16: 42,
        /*Control*/ 17: 29,
        /*Alt Left*/ 18: 56,
        /*Alt Right*/ 225: 100,
        /*Caps Lock*/ 20: 58,
        /*Num Lock*/ 144: 69,
        /*a*/ 65: 30,
        /*b*/ 66: 48,
        /*c*/ 67: 46,
        /*d*/ 68: 32,
        /*e*/ 69: 18,
        /*f*/ 70: 33,
        /*g*/ 71: 34,
        /*h*/ 72: 35,
        /*i*/ 73: 23,
        /*j*/ 74: 36,
        /*k*/ 75: 37,
        /*l*/ 76: 38,
        /*m*/ 77: 50,
        /*n*/ 78: 49,
        /*o*/ 79: 24,
        /*p*/ 80: 25,
        /*q*/ 81: 16,
        /*r*/ 82: 19,
        /*s*/ 83: 31,
        /*t*/ 84: 20,
        /*u*/ 85: 22,
        /*v*/ 86: 47,
        /*w*/ 87: 17,
        /*x*/ 88: 45,
        /*y*/ 89: 21,
        /*z*/ 90: 44,
        /*1*/ 49: 2,
        /*2*/ 50: 3,
        /*3*/ 51: 4,
        /*4*/ 52: 5,
        /*5*/ 53: 6,
        /*6*/ 54: 7,
        /*7*/ 55: 8,
        /*8*/ 56: 9,
        /*9*/ 57: 10,
        /*0*/ 48: 11,
        /*; (firefox)*/ 59: 39,
        /*; (chrome)*/ 186: 39,
        /*=(firefox)*/ 61: 13,
        /*=(chrome)*/ 187: 13,
        /*,*/ 188: 51,
        /*-(minus in firefox)*/ 173: 12,
        /*-(dash in chrome)*/ 189: 12,
        /*.*/ 190: 52,
        /*/*/ 191: 53,
        /*`*/ 192: 41,
        /*{*/ 219: 26,
        /*\*/ 220: 43,
        /*}*/ 221: 27,
        /*'*/ 222: 40,
        /*left-arrow*/ 37: 105,
        /*up-arrow*/ 38: 103,
        /*right-arrow*/ 39: 106,
        /*down-arrow*/ 40: 108,
        /*Insert*/ 45: 110,
        /*Delete*/ 46: 111,
        /*Home*/ 36: 102,
        /*End*/ 35: 107,
        /*Page Up*/ 33: 104,
        /*Page Down*/ 34: 109,
        /*F1 */ 112: 59,
        /*F2 */ 113: 60,
        /*F3 */ 114: 61,
        /*F4 */ 115: 62,
        /*F5 */ 116: 63,
        /*F6 */ 117: 64,
        /*F7 */ 118: 65,
        /*F8 */ 119: 66,
        /*F9 */ 120: 67,
        /*F10 */ 121: 68,
        /*F11 */ 122: 87,
        /*F12 */ 123: 88,
        /*. Del*/ 110: 83,
        /*0 Ins*/ 96: 82,
        /*1 End*/ 97: 79,
        /*2 down-arrow*/ 98: 80,
        /*3 Pg Dn*/ 99: 81,
        /*4 left-arrow*/ 100: 75,
        /*5*/ 101: 76,
        /*6 right-arrow*/ 102: 77,
        /*7 Home*/ 	103: 71,
        /*8 up-arrow*/ 104: 72,
        /*9 Pg Up*/ 105: 73,
        /*+*/ 107: 78,
        /*-*/ 109: 74,
        /***/ 106: 55,
        /*/*/ 111: 98,
        /*Keypad Enter*/ 13: 28
    };
    var convertedKeys = [];
    arr.forEach(function (a) {
        if (map[a] !== undefined)
            convertedKeys.push(map[a]);
        //else
        //    convertedKeys.push(a);
    });
    return convertedKeys;
}

function convertCharCode(ch) {
    var arr = [];
    if (ch >= 48 && ch <= 57) { /* 0..9 */
        arr[0] = ch;
        arr = convertKeycodes(arr);
    } else if (ch >= 97 && ch <= 122) { /* a..z */
        arr[0] = ch - 32;
        arr = convertKeycodes(arr);
    } else if (ch >= 65 && ch <= 90) { /* A..Z */
        arr[0] = 16;
        arr[1] = ch;
        arr = convertKeycodes(arr);
    } else if (ch == 46) { // .
        arr[0] = 52;
    } else if (ch == 33) { // !
        arr[0] = 42;
        arr[1] = 2;
    } else if (ch == 63) { // ?
        arr[0] = 42;
        arr[1] = 53;
    } else if (ch == 44) { // ,
        arr[0] = 51;
    } else if (ch == 34) { // "
        arr[0] = 42;
        arr[1] = 40;
    } else if (ch == 39) { // '
        arr[0] = 40;
    } else if (ch == 58) { // :
        arr[0] = 42;
        arr[1] = 39;
    } else if (ch == 40) { // (
        arr[0] = 42;
        arr[1] = 10;
    } else if (ch == 41) { // )
        arr[0] = 42;
        arr[1] = 11;
    } else if (ch == 126) { // ~
        arr[0] = 42;
        arr[1] = 41;
    } else if (ch == 42) { // *
        arr[0] = 42;
        arr[1] = 9;
    } else if (ch == 45) { // -
        arr[0] = 12;
    } else if (ch == 47) { // /
        arr[0] = 53;
    } else if (ch == 64) { // @
        arr[0] = 42;
        arr[1] = 3;
    } else if (ch == 95) { // _
        arr[0] = 42;
        arr[1] = 12;
    }
    return arr;
}

function toKeyCode() {
    var getCharCode = function (str) {
        return str.charCodeAt(str.length - 1);
    };
    var cc = getCharCode(this.value);
    document.getElementById("datamessage").removeEventListener("keyup", toKeyCode);
    this.value = "";
    var keysArray = convertCharCode(cc);
    if (datachannel && document.getElementById('keypresssend').checked && keysArray.length) {
        var keycodes = {
            keycodes: keysArray
        };
        datachannel.send(JSON.stringify(keycodes));
    }
}
;

function keydown(e) {
    if (e.keyCode == 0 || e.keyCode == 229) { // on mobile
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    keys[e.keyCode] = e.keyCode;
    for (var i = keys.length; i >= 0; i--) {
        if (keys[i] !== 16 && keys[i] !== 17 && keys[i] !== 18 && keys[i] !== 225 && keys[i] !== e.keyCode)
            keys[i] = false;
    }
    var keysArray = convertKeycodes(getKeycodesArray(keys));
    if (datachannel && document.getElementById('keypresssend').checked && keysArray.length) {
        var keycodes = {
            keycodes: keysArray
        };
        datachannel.send(JSON.stringify(keycodes));
    }
}
;

function keyup(e) {
    if (e.keyCode == 0 || e.keyCode == 229) { // on mobile
        document.getElementById("datamessage").addEventListener("keyup", toKeyCode);
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    keys[e.keyCode] = false;
}
;

function keypresssend_selection() {
    if (document.getElementById('keypresssend').checked) {
        window.addEventListener('keydown', keydown, true);
        window.addEventListener('keyup', keyup, true);
    } else {
        keys = [];
        window.removeEventListener('keydown', keydown, true);
        window.removeEventListener('keyup', keyup, true);
    }
}

function trickleice_selection() {
    if (document.getElementById('trickleice').value === "false") {
        trickle_ice = false;
    } else if (document.getElementById('trickleice').value === "true") {
        trickle_ice = true;
    } else {
        trickle_ice = null;
    }
    return trickle_ice;
}

window.onload = function () {
    if (window.MediaRecorder === undefined) {
        document.getElementById('record').disabled = true;
    }
    if (false) {
        start();
    }
};

window.onbeforeunload = function () {
    if (ws) {
        ws.onclose = function () {}; // disable onclose handler first
        stop();
    }
};