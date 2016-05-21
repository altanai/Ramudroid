! function() {
    function e(e, t) {
        if (e || (e = {}), !t) return e;
        for (var o in t) e[o] = t[o];
        return e
    }
    RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection, window.getConnectionStats = RTCPeerConnection.prototype.getConnectionStats = function(t, o) {
        function i() {
            n(function(n) {
                for (var g = {
                        audio: {},
                        video: {},
                        results: n,
                        nomore: function() {
                            r = !0
                        }
                    }, d = 0; d < n.length; ++d) {
                    var s = n[d];
                    if ("opus" == s.googCodecName) {
                        a.audio.prevBytesSent || (a.audio.prevBytesSent = s.bytesSent);
                        var c = s.bytesSent - a.audio.prevBytesSent;
                        a.audio.prevBytesSent = s.bytesSent;
                        var u = c / 1024;
                        g.audio = e(g.audio, {
                            availableBandwidth: u.toFixed(1),
                            inputLevel: s.audioInputLevel,
                            packetsLost: s.packetsLost,
                            rtt: s.googRtt,
                            packetsSent: s.packetsSent,
                            bytesSent: s.bytesSent
                        })
                    }
                    if ("VP8" == s.googCodecName) {
                        a.video.prevBytesSent || (a.video.prevBytesSent = s.bytesSent);
                        var c = s.bytesSent - a.video.prevBytesSent;
                        a.video.prevBytesSent = s.bytesSent;
                        var u = c / 1024;
                        g.video = e(g.video, {
                            availableBandwidth: u.toFixed(1),
                            googFrameHeightInput: s.googFrameHeightInput,
                            googFrameWidthInput: s.googFrameWidthInput,
                            googCaptureQueueDelayMsPerS: s.googCaptureQueueDelayMsPerS,
                            rtt: s.googRtt,
                            packetsLost: s.packetsLost,
                            packetsSent: s.packetsSent,
                            googEncodeUsagePercent: s.googEncodeUsagePercent,
                            googCpuLimitedResolution: s.googCpuLimitedResolution,
                            googNacksReceived: s.googNacksReceived,
                            googFrameRateInput: s.googFrameRateInput,
                            googPlisReceived: s.googPlisReceived,
                            googViewLimitedResolution: s.googViewLimitedResolution,
                            googCaptureJitterMs: s.googCaptureJitterMs,
                            googAvgEncodeMs: s.googAvgEncodeMs,
                            googFrameHeightSent: s.googFrameHeightSent,
                            googFrameRateSent: s.googFrameRateSent,
                            googBandwidthLimitedResolution: s.googBandwidthLimitedResolution,
                            googFrameWidthSent: s.googFrameWidthSent,
                            googFirsReceived: s.googFirsReceived,
                            bytesSent: s.bytesSent
                        })
                    }
                    "VideoBwe" == s.type && (g.video.bandwidth = {
                        googActualEncBitrate: s.googActualEncBitrate,
                        googAvailableSendBandwidth: s.googAvailableSendBandwidth,
                        googAvailableReceiveBandwidth: s.googAvailableReceiveBandwidth,
                        googRetransmitBitrate: s.googRetransmitBitrate,
                        googTargetEncBitrate: s.googTargetEncBitrate,
                        googBucketDelay: s.googBucketDelay,
                        googTransmitBitrate: s.googTransmitBitrate
                    }), "googCandidatePair" == s.type && "true" == s.googActiveConnection && (g.connectionType = {
                        local: {
                            candidateType: s.googLocalCandidateType,
                            ipAddress: s.googLocalAddress
                        },
                        remote: {
                            candidateType: s.googRemoteCandidateType,
                            ipAddress: s.googRemoteAddress
                        },
                        transport: s.googTransportType
                    })
                }
                t(g), r || void 0 != typeof o && o && setTimeout(i, o || 1e3)
            })
        }

        function n(e) {
            navigator.mozGetUserMedia ? g.getStats(function(t) {
                var o = [];
                t.forEach(function(e) {
                    o.push(e)
                }), e(o)
            }, e) : g.getStats(function(t) {
                var o = [];
                t.result().forEach(function(e) {
                    var t = {};
                    e.names().forEach(function(o) {
                        t[o] = e.stat(o)
                    }), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, o.push(t)
                }), e(o)
            })
        }
        var g = this,
            a = {
                audio: {},
                video: {}
            },
            r = !1;
        i()
    }
}();