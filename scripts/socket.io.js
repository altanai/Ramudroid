if (function(e, t) {
        var n = e;
        n.version = "0.9.0", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function(e, o) {
            var i, r, s, a = n.util.parseUri(e);
            return t && t.location && (a.protocol = a.protocol || t.location.protocol.slice(0, -1), a.host = a.host || (t.document ? t.document.domain : t.location.hostname), a.port = a.port || t.location.port), i = n.util.uniqueUri(a), s = {
                host: a.host,
                secure: "https" == a.protocol,
                port: a.port || ("https" == a.protocol ? 443 : 80),
                query: a.query || ""
            }, n.util.merge(s, o), (s["force new connection"] || !n.sockets[i]) && (r = new n.Socket(s)), !s["force new connection"] && r && (n.sockets[i] = r), r = r || n.sockets[i], r.of(a.path.length > 1 ? a.path : "")
        }
    }("object" == typeof module ? module.exports : this.io = {}, this), function(e, t) {
        var n, o = e.util = {},
            i = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        o.parseUri = function(e) {
            for (var t = i.exec(e || ""), n = {}, o = 14; o--;) n[r[o]] = t[o] || "";
            return n
        }, o.uniqueUri = function(e) {
            var n = e.protocol,
                o = e.host,
                i = e.port;
            return "document" in t ? (o = o || document.domain, i = i || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (o = o || "localhost", i || "https" != n || (i = 443)), (n || "http") + "://" + o + ":" + (i || 80)
        }, o.query = function(e, t) {
            var n, i = o.chunkQuery(e || ""),
                r = [];
            o.merge(i, o.chunkQuery(t || ""));
            for (n in i) i.hasOwnProperty(n) && r.push(n + "=" + i[n]);
            return r.length ? "?" + r.join("&") : ""
        }, o.chunkQuery = function(e) {
            for (var t, n = {}, o = e.split("&"), i = 0, r = o.length; r > i; ++i) t = o[i].split("="), t[0] && (n[t[0]] = t[1]);
            return n
        }, n = !1, o.load = function(e) {
            return "document" in t && "complete" === document.readyState || n ? e() : void o.on(t, "load", e, !1)
        }, o.on = function(e, t, n, o) {
            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, o)
        }, o.request = function(e) {
            if (e && "undefined" != typeof XDomainRequest) return new XDomainRequest;
            if ("undefined" != typeof XMLHttpRequest && (!e || o.ua.hasCORS)) return new XMLHttpRequest;
            if (!e) try {
                return new ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
            return null
        }, "undefined" != typeof window && o.load(function() {
            n = !0
        }), o.defer = function(e) {
            return o.ua.webkit && "undefined" == typeof importScripts ? void o.load(function() {
                setTimeout(e, 100)
            }) : e()
        }, o.merge = function(e, t, n, i) {
            var r, s = i || [],
                a = "undefined" == typeof n ? 2 : n;
            for (r in t) t.hasOwnProperty(r) && o.indexOf(s, r) < 0 && ("object" == typeof e[r] && a ? o.merge(e[r], t[r], a - 1, s) : (e[r] = t[r], s.push(t[r])));
            return e
        }, o.mixin = function(e, t) {
            o.merge(e.prototype, t.prototype)
        }, o.inherit = function(e, t) {
            function n() {}
            n.prototype = t.prototype, e.prototype = new n
        }, o.isArray = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, o.intersect = function(e, t) {
            for (var n = [], i = e.length > t.length ? e : t, r = e.length > t.length ? t : e, s = 0, a = r.length; a > s; s++) ~o.indexOf(i, r[s]) && n.push(r[s]);
            return n
        }, o.indexOf = function(e, t, n) {
            for (var o = e.length, n = 0 > n ? 0 > n + o ? 0 : n + o : n || 0; o > n && e[n] !== t; n++);
            return n >= o ? -1 : n
        }, o.toArray = function(e) {
            for (var t = [], n = 0, o = e.length; o > n; n++) t.push(e[n]);
            return t
        }, o.ua = {}, o.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
            try {
                var e = new XMLHttpRequest
            } catch (t) {
                return !1
            }
            return void 0 != e.withCredentials
        }(), o.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent)
    }("undefined" != typeof io ? io : module.exports, this), function(e, t) {
        function n() {}
        e.EventEmitter = n, n.prototype.on = function(e, n) {
            return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n, this
        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function(e, t) {
            function n() {
                o.removeListener(e, n), t.apply(this, arguments)
            }
            var o = this;
            return n.listener = t, this.on(e, n), this
        }, n.prototype.removeListener = function(e, n) {
            var o, i, r, s;
            if (this.$events && this.$events[e])
                if (o = this.$events[e], t.util.isArray(o)) {
                    for (i = -1, r = 0, s = o.length; s > r; r++)
                        if (o[r] === n || o[r].listener && o[r].listener === n) {
                            i = r;
                            break
                        }
                    if (0 > i) return this;
                    o.splice(i, 1), o.length || delete this.$events[e]
                } else(o === n || o.listener && o.listener === n) && delete this.$events[e];
            return this
        }, n.prototype.removeAllListeners = function(e) {
            return this.$events && this.$events[e] && (this.$events[e] = null), this
        }, n.prototype.listeners = function(e) {
            return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e]
        }, n.prototype.emit = function(e) {
            var n, o, i, r, s;
            if (!this.$events) return !1;
            if (n = this.$events[e], !n) return !1;
            if (o = Array.prototype.slice.call(arguments, 1), "function" == typeof n) n.apply(this, o);
            else {
                if (!t.util.isArray(n)) return !1;
                for (i = n.slice(), r = 0, s = i.length; s > r; r++) i[r].apply(this, o)
            }
            return !0
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(n, t) {
        "use strict";

        function u(e) {
            return 10 > e ? "0" + e : e
        }

        function a(e) {
            return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + u(e.getUTCMonth() + 1) + "-" + u(e.getUTCDate()) + "T" + u(e.getUTCHours()) + ":" + u(e.getUTCMinutes()) + ":" + u(e.getUTCSeconds()) + "Z" : null
        }

        function s(e) {
            return h.lastIndex = 0, h.test(e) ? '"' + e.replace(h, function(e) {
                var t = l[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function e(t, n) {
            var o, c, p, u, l, h = i,
                d = n[t];
            switch (d instanceof Date && (d = a(t)), "function" == typeof r && (d = r.call(n, t, d)), typeof d) {
                case "string":
                    return s(d);
                case "number":
                    return isFinite(d) ? String(d) : "null";
                case "boolean":
                case "null":
                    return String(d);
                case "object":
                    if (!d) return "null";
                    if (i += f, l = [], "[object Array]" === Object.prototype.toString.apply(d)) {
                        for (u = d.length, o = 0; u > o; o += 1) l[o] = e(o, d) || "null";
                        return p = 0 === l.length ? "[]" : i ? "[\n" + i + l.join(",\n" + i) + "\n" + h + "]" : "[" + l.join(",") + "]", i = h, p
                    }
                    if (r && "object" == typeof r)
                        for (u = r.length, o = 0; u > o; o += 1) "string" == typeof r[o] && (c = r[o], p = e(c, d), p && l.push(s(c) + (i ? ": " : ":") + p));
                    else
                        for (c in d) Object.prototype.hasOwnProperty.call(d, c) && (p = e(c, d), p && l.push(s(c) + (i ? ": " : ":") + p));
                    return p = 0 === l.length ? "{}" : i ? "{\n" + i + l.join(",\n" + i) + "\n" + h + "}" : "{" + l.join(",") + "}", i = h, p
            }
        }
        var o;
        if (t && t.parse) return n.JSON = {
            parse: t.parse,
            stringify: t.stringify
        };
        o = n.JSON = {};
        var c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            h = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            i, f, l = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            r;
        o.stringify = function(t, n, o) {
            var s;
            if (i = "", f = "", "number" == typeof o)
                for (s = 0; o > s; s += 1) f += " ";
            else "string" == typeof o && (f = o);
            if (r = n, n && "function" != typeof n && ("object" != typeof n || "number" != typeof n.length)) throw new Error("JSON.stringify");
            return e("", {
                "": t
            })
        }, o.parse = function(n, t) {
            function r(e, n) {
                var o, i, s = e[n];
                if (s && "object" == typeof s)
                    for (o in s) Object.prototype.hasOwnProperty.call(s, o) && (i = r(s, o), void 0 !== i ? s[o] = i : delete s[o]);
                return t.call(e, n, s)
            }
            var i;
            if (n = String(n), c.lastIndex = 0, c.test(n) && (n = n.replace(c, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return i = eval("(" + n + ")"), "function" == typeof t ? r({
                "": i
            }, "") : i;
            throw new SyntaxError("JSON.parse")
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function(e, t) {
        var n, o = e.parser = {},
            i = o.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
            r = o.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
            s = o.advice = ["reconnect"],
            a = t.JSON,
            c = t.util.indexOf;
        o.encodePacket = function(e) {
            var t, n, o, p, u = c(i, e.type),
                l = e.id || "",
                h = e.endpoint || "",
                f = e.ack,
                d = null;
            switch (e.type) {
                case "error":
                    t = e.reason ? c(r, e.reason) : "", n = e.advice ? c(s, e.advice) : "", ("" !== t || "" !== n) && (d = t + ("" !== n ? "+" + n : ""));
                    break;
                case "message":
                    "" !== e.data && (d = e.data);
                    break;
                case "event":
                    o = {
                        name: e.name
                    }, e.args && e.args.length && (o.args = e.args), d = a.stringify(o);
                    break;
                case "json":
                    d = a.stringify(e.data);
                    break;
                case "connect":
                    e.qs && (d = e.qs);
                    break;
                case "ack":
                    d = e.ackId + (e.args && e.args.length ? "+" + a.stringify(e.args) : "")
            }
            return p = [u, l + ("data" == f ? "+" : ""), h], null !== d && void 0 !== d && p.push(d), p.join(":")
        }, o.encodePayload = function(e) {
            var t, n, o, i = "";
            if (1 == e.length) return e[0];
            for (t = 0, n = e.length; n > t; t++) o = e[t], i += "�" + o.length + "�" + e[t];
            return i
        }, n = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/, o.decodePacket = function(e) {
            var t, o = e.match(n);
            if (!o) return {};
            var c = o[2] || "",
                e = o[5] || "",
                p = {
                    type: i[o[1]],
                    endpoint: o[4] || ""
                };
            switch (c && (p.id = c, p.ack = o[3] ? "data" : !0), p.type) {
                case "error":
                    o = e.split("+"), p.reason = r[o[0]] || "", p.advice = s[o[1]] || "";
                    break;
                case "message":
                    p.data = e || "";
                    break;
                case "event":
                    try {
                        t = a.parse(e), p.name = t.name, p.args = t.args
                    } catch (u) {}
                    p.args = p.args || [];
                    break;
                case "json":
                    try {
                        p.data = a.parse(e)
                    } catch (u) {}
                    break;
                case "connect":
                    p.qs = e || "";
                    break;
                case "ack":
                    if (o = e.match(/^([0-9]+)(\+)?(.*)/), o && (p.ackId = o[1], p.args = [], o[3])) try {
                        p.args = o[3] ? a.parse(o[3]) : []
                    } catch (u) {}
            }
            return p
        }, o.decodePayload = function(e) {
            var t, n, i;
            if ("�" == e.charAt(0)) {
                for (t = [], n = 1, i = ""; n < e.length; n++) "�" == e.charAt(n) ? (t.push(o.decodePacket(e.substr(n + 1).substr(0, i))), n += Number(i) + 1, i = "") : i += e.charAt(n);
                return t
            }
            return [o.decodePacket(e)]
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t) {
        function n(e, t) {
            this.socket = e, this.sessid = t
        }
        e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.onData = function(e) {
            var n, o, i;
            if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e && (n = t.parser.decodePayload(e), n && n.length))
                for (o = 0, i = n.length; i > o; o++) this.onPacket(n[o]);
            return this
        }, n.prototype.onPacket = function(e) {
            return "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), this.socket.onPacket(e), this)
        }, n.prototype.setCloseTimeout = function() {
            if (!this.closeTimeout) {
                var e = this;
                this.closeTimeout = setTimeout(function() {
                    e.onDisconnect()
                }, this.socket.closeTimeout)
            }
        }, n.prototype.onDisconnect = function() {
            return this.close && this.open && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
        }, n.prototype.onConnect = function() {
            return this.socket.onConnect(), this
        }, n.prototype.clearCloseTimeout = function() {
            this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
        }, n.prototype.clearTimeouts = function() {
            this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
        }, n.prototype.packet = function(e) {
            this.send(t.parser.encodePacket(e))
        }, n.prototype.onHeartbeat = function() {
            this.packet({
                type: "heartbeat"
            })
        }, n.prototype.onOpen = function() {
            this.open = !0, this.clearCloseTimeout(), this.socket.onOpen()
        }, n.prototype.onClose = function() {
            this.open = !1, this.socket.onClose(), this.onDisconnect()
        }, n.prototype.prepareUrl = function() {
            var e = this.socket.options;
            return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid
        }, n.prototype.ready = function(e, t) {
            t.call(this)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
        function o(e) {
            if (this.options = {
                    port: 80,
                    secure: !1,
                    document: "document" in n ? document : !1,
                    resource: "socket.io",
                    transports: t.transports,
                    "connect timeout": 1e4,
                    "try multiple transports": !0,
                    reconnect: !0,
                    "reconnection delay": 500,
                    "reconnection limit": 1 / 0,
                    "reopen delay": 3e3,
                    "max reconnection attempts": 10,
                    "sync disconnect on unload": !0,
                    "auto connect": !0,
                    "flash policy port": 10843
                }, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                var o = this;
                t.util.on(n, "beforeunload", function() {
                    o.disconnectSync()
                }, !1)
            }
            this.options["auto connect"] && this.connect()
        }

        function i() {}
        e.Socket = o, t.util.mixin(o, t.EventEmitter), o.prototype.of = function(e) {
            return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({
                type: "connect"
            })), this.namespaces[e]
        }, o.prototype.publish = function() {
            var e, t;
            this.emit.apply(this, arguments);
            for (t in this.namespaces) this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments))
        }, o.prototype.handshake = function(e) {
            function n(t) {
                t instanceof Error ? a.onError(t.message) : e.apply(null, t.split(":"))
            }
            var o, r, s, a = this,
                c = this.options,
                p = ["http" + (c.secure ? "s" : "") + ":/", c.host + ":" + c.port, c.resource, t.protocol, t.util.query(this.options.query, "t=" + +new Date)].join("/");
            this.isXDomain() && !t.util.ua.hasCORS ? (o = document.getElementsByTagName("script")[0], r = document.createElement("script"), r.src = p + "&jsonp=" + t.j.length, o.parentNode.insertBefore(r, o), t.j.push(function(e) {
                n(e), r.parentNode.removeChild(r)
            })) : (s = t.util.request(), s.open("GET", p, !0), s.withCredentials = !0, s.onreadystatechange = function() {
                4 == s.readyState && (s.onreadystatechange = i, 200 == s.status ? n(s.responseText) : !a.reconnecting && a.onError(s.responseText))
            }, s.send(null))
        }, o.prototype.getTransport = function(e) {
            for (var n, o = e || this.transports, i = 0; n = o[i]; i++)
                if (t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() || t.Transport[n].xdomainCheck())) return new t.Transport[n](this, this.sessionid);
            return null
        }, o.prototype.connect = function(e) {
            if (this.connecting) return this;
            var n = this;
            return this.handshake(function(o, i, r, s) {
                function a(e) {
                    return n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e), n.transport ? void n.transport.ready(n, function() {
                        n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function() {
                            if (!n.connected && (n.connecting = !1, n.options["try multiple transports"])) {
                                n.remainingTransports || (n.remainingTransports = n.transports.slice(0));
                                for (var e = n.remainingTransports; e.length > 0 && e.splice(0, 1)[0] != n.transport.name;);
                                e.length ? a(e) : n.publish("connect_failed")
                            }
                        }, n.options["connect timeout"]))
                    }) : n.publish("connect_failed")
                }
                n.sessionid = o, n.closeTimeout = 1e3 * r, n.heartbeatTimeout = 1e3 * i, n.transports = t.util.intersect(s.split(","), n.options.transports), a(), n.once("connect", function() {
                    clearTimeout(n.connectTimeoutTimer), e && "function" == typeof e && e()
                })
            }), this
        }, o.prototype.packet = function(e) {
            return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this
        }, o.prototype.setBuffer = function(e) {
            this.doBuffer = e, !e && this.connected && this.buffer.length && (this.transport.payload(this.buffer), this.buffer = [])
        }, o.prototype.disconnect = function() {
            return this.connected && (this.open && this.of("").packet({
                type: "disconnect"
            }), this.onDisconnect("booted")), this
        }, o.prototype.disconnectSync = function() {
            var e = t.util.request(),
                n = this.resource + "/" + t.protocol + "/" + this.sessionid;
            e.open("GET", n, !0), this.onDisconnect("booted")
        }, o.prototype.isXDomain = function() {
            var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
            return this.options.host !== n.location.hostname || this.options.port != e
        }, o.prototype.onConnect = function() {
            this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
        }, o.prototype.onOpen = function() {
            this.open = !0
        }, o.prototype.onClose = function() {
            this.open = !1
        }, o.prototype.onPacket = function(e) {
            this.of(e.endpoint).onPacket(e)
        }, o.prototype.onError = function(e) {
            e && e.advice && this.options.reconnect && "reconnect" === e.advice && this.connected && (this.disconnect(), this.reconnect()), this.publish("error", e && e.reason ? e.reason : e)
        }, o.prototype.onDisconnect = function(e) {
            var t = this.connected;
            this.connected = !1, this.connecting = !1, this.open = !1, t && (this.transport.close(), this.transport.clearTimeouts(), this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect())
        }, o.prototype.reconnect = function() {
            function e() {
                if (n.connected) {
                    for (var e in n.namespaces) n.namespaces.hasOwnProperty(e) && "" !== e && n.namespaces[e].packet({
                        type: "connect"
                    });
                    n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                }
                clearTimeout(n.reconnectionTimer), n.removeListener("connect_failed", t), n.removeListener("connect", t), n.reconnecting = !1, delete n.reconnectionAttempts, delete n.reconnectionDelay, delete n.reconnectionTimer, delete n.redoTransports, n.options["try multiple transports"] = i
            }

            function t() {
                return n.reconnecting ? n.connected ? e() : n.connecting && n.reconnecting ? n.reconnectionTimer = setTimeout(t, 1e3) : void(n.reconnectionAttempts++ < o ? (n.reconnectionDelay < r && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(t, n.reconnectionDelay)) : n.redoTransports ? (n.publish("reconnect_failed"), e()) : (n.on("connect_failed", t), n.options["try multiple transports"] = !0, n.transport = n.getTransport(), n.redoTransports = !0, n.connect())) : void 0
            }
            this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
            var n = this,
                o = this.options["max reconnection attempts"],
                i = this.options["try multiple transports"],
                r = this.options["reconnection limit"];
            this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(t, this.reconnectionDelay), this.on("connect", t)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
        function n(e, t) {
            this.socket = e, this.name = t || "", this.flags = {}, this.json = new o(this, "json"), this.ackPackets = 0, this.acks = {}
        }

        function o(e, t) {
            this.namespace = e, this.name = t
        }
        e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function() {
            return this.socket.of.apply(this.socket, arguments)
        }, n.prototype.packet = function(e) {
            return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this
        }, n.prototype.send = function(e, t) {
            var n = {
                type: this.flags.json ? "json" : "message",
                data: e
            };
            return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n)
        }, n.prototype.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1),
                n = t[t.length - 1],
                o = {
                    type: "event",
                    name: e
                };
            return "function" == typeof n && (o.id = ++this.ackPackets, o.ack = "data", this.acks[o.id] = n, t = t.slice(0, t.length - 1)), o.args = t, this.packet(o)
        }, n.prototype.disconnect = function() {
            return "" === this.name ? this.socket.disconnect() : (this.packet({
                type: "disconnect"
            }), this.$emit("disconnect")), this
        }, n.prototype.onPacket = function(e) {
            function n() {
                i.packet({
                    type: "ack",
                    args: t.util.toArray(arguments),
                    ackId: e.id
                })
            }
            var o, i = this;
            switch (e.type) {
                case "connect":
                    this.$emit("connect");
                    break;
                case "disconnect":
                    "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
                    break;
                case "message":
                case "json":
                    o = ["message", e.data], "data" == e.ack ? o.push(n) : e.ack && this.packet({
                        type: "ack",
                        ackId: e.id
                    }), this.$emit.apply(this, o);
                    break;
                case "event":
                    o = [e.name].concat(e.args), "data" == e.ack && o.push(n), this.$emit.apply(this, o);
                    break;
                case "ack":
                    this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                    break;
                case "error":
                    e.advice ? this.socket.onError(e) : "unauthorized" == e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason)
            }
        }, o.prototype.send = function() {
            this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
        }, o.prototype.emit = function() {
            this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
        }
    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
        function o() {
            t.Transport.apply(this, arguments)
        }
        e.websocket = o, t.util.inherit(o, t.Transport), o.prototype.name = "websocket", o.prototype.open = function() {
            var e, o = t.util.query(this.socket.options.query),
                i = this;
            return e || (e = n.MozWebSocket || n.WebSocket), this.websocket = new e(this.prepareUrl() + o), this.websocket.onopen = function() {
                i.onOpen(), i.socket.setBuffer(!1)
            }, this.websocket.onmessage = function(e) {
                i.onData(e.data)
            }, this.websocket.onclose = function() {
                i.onClose(), i.socket.setBuffer(!0)
            }, this.websocket.onerror = function(e) {
                i.onError(e)
            }, this
        }, o.prototype.send = function(e) {
            return this.websocket.send(e), this
        }, o.prototype.payload = function(e) {
            for (var t = 0, n = e.length; n > t; t++) this.packet(e[t]);
            return this
        }, o.prototype.close = function() {
            return this.websocket.close(), this
        }, o.prototype.onError = function(e) {
            this.socket.onError(e)
        }, o.prototype.scheme = function() {
            return this.socket.options.secure ? "wss" : "ws"
        }, o.check = function() {
            return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
        }, o.xdomainCheck = function() {
            return !0
        }, t.transports.push("websocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
        function n() {
            t.Transport.websocket.apply(this, arguments)
        }
        e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function() {
            var e = this,
                n = arguments;
            return WebSocket.__addTask(function() {
                t.Transport.websocket.prototype.open.apply(e, n)
            }), this
        }, n.prototype.send = function() {
            var e = this,
                n = arguments;
            return WebSocket.__addTask(function() {
                t.Transport.websocket.prototype.send.apply(e, n)
            }), this
        }, n.prototype.close = function() {
            return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this
        }, n.prototype.ready = function(e, o) {
            function i() {
                var t = e.options,
                    i = t["flash policy port"],
                    s = ["http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf"];
                n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = s.join("/")), 843 !== i && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + i), WebSocket.__initialize(), n.loaded = !0), o.call(r)
            }
            var r = this;
            return document.body ? i() : void t.util.load(i)
        }, n.check = function() {
            return "undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
        }, n.xdomainCheck = function() {
            return !0
        }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window) var swfobject = function() {
    function e() {
        var e, t, n;
        if (!H) {
            try {
                e = B.getElementsByTagName("body")[0].appendChild(m("span")), e.parentNode.removeChild(e)
            } catch (o) {
                return
            }
            for (H = !0, t = R.length, n = 0; t > n; n++) R[n]()
        }
    }

    function t(e) {
        H ? e() : R[R.length] = e
    }

    function n(e) {
        if (typeof D.addEventListener != W) D.addEventListener("load", e, !1);
        else if (typeof B.addEventListener != W) B.addEventListener("load", e, !1);
        else if (typeof D.attachEvent != W) v(D, "onload", e);
        else if ("function" == typeof D.onload) {
            var t = D.onload;
            D.onload = function() {
                t(), e()
            }
        } else D.onload = e
    }

    function o() {
        P ? i() : r()
    }

    function i() {
        var e, t, n = B.getElementsByTagName("body")[0],
            o = m(O);
        o.setAttribute("type", N), e = n.appendChild(o), e ? (t = 0, function() {
            if (typeof e.GetVariable != W) {
                var i = e.GetVariable("$version");
                i && (i = i.split(" ")[1].split(","), G.pv = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)])
            } else if (10 > t) return t++, void setTimeout(arguments.callee, 10);
            n.removeChild(o), e = null, r()
        }()) : r()
    }

    function r() {
        var e, t, n, o, i, r = F.length;
        if (r > 0)
            for (e = 0; r > e; e++) {
                var u = F[e].id,
                    l = F[e].callbackFn,
                    h = {
                        success: !1,
                        id: u
                    };
                if (G.pv[0] > 0) {
                    if (t = y(u))
                        if (!g(F[e].swfVersion) || G.wk && G.wk < 312)
                            if (F[e].expressInstall && a()) {
                                n = {}, n.data = F[e].expressInstall, n.width = t.getAttribute("width") || "0", n.height = t.getAttribute("height") || "0", t.getAttribute("class") && (n.styleclass = t.getAttribute("class")), t.getAttribute("align") && (n.align = t.getAttribute("align"));
                                var f = {},
                                    d = t.getElementsByTagName("param"),
                                    m = d.length;
                                for (o = 0; m > o; o++) "movie" != d[o].getAttribute("name").toLowerCase() && (f[d[o].getAttribute("name")] = d[o].getAttribute("value"));
                                c(n, f, u, l)
                            } else p(t), l && l(h);
                    else b(u, !0), l && (h.success = !0, h.ref = s(u), l(h))
                } else b(u, !0), l && (i = s(u), i && typeof i.SetVariable != W && (h.success = !0, h.ref = i), l(h))
            }
    }

    function s(e) {
        var t, n = null,
            o = y(e);
        return o && "OBJECT" == o.nodeName && (typeof o.SetVariable != W ? n = o : (t = o.getElementsByTagName(O)[0], t && (n = t))), n
    }

    function a() {
        return !M && g("6.0.65") && (G.win || G.mac) && !(G.wk && G.wk < 312)
    }

    function c(e, t, n, o) {
        var i, r, s, a;
        M = !0, _ = o || null, E = {
            success: !1,
            id: n
        }, i = y(n), i && ("OBJECT" == i.nodeName ? (S = u(i), T = null) : (S = i, T = n), e.id = j, (typeof e.width == W || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) && (e.width = "310"), (typeof e.height == W || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) && (e.height = "137"), B.title = B.title.slice(0, 47) + " - Flash Player Installation", r = G.ie && G.win ? "ActiveX" : "PlugIn", s = "MMredirectURL=" + D.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + r + "&MMdoctitle=" + B.title, typeof t.flashvars != W ? t.flashvars += "&" + s : t.flashvars = s, G.ie && G.win && 4 != i.readyState && (a = m("div"), n += "SWFObjectNew", a.setAttribute("id", n), i.parentNode.insertBefore(a, i), i.style.display = "none", function() {
            4 == i.readyState ? i.parentNode.removeChild(i) : setTimeout(arguments.callee, 10)
        }()), l(e, t, n))
    }

    function p(e) {
        if (G.ie && G.win && 4 != e.readyState) {
            var t = m("div");
            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(u(e), t), e.style.display = "none",
                function() {
                    4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                }()
        } else e.parentNode.replaceChild(u(e), e)
    }

    function u(e) {
        var t, n, o, i, r = m("div");
        if (G.win && G.ie) r.innerHTML = e.innerHTML;
        else if (t = e.getElementsByTagName(O)[0], t && (n = t.childNodes))
            for (o = n.length, i = 0; o > i; i++) 1 == n[i].nodeType && "PARAM" == n[i].nodeName || 8 == n[i].nodeType || r.appendChild(n[i].cloneNode(!0));
        return r
    }

    function l(e, t, n) {
        var o, i, r, s, a, c, p, u, l = y(n);
        if (G.wk && G.wk < 312) return o;
        if (l)
            if (typeof e.id == W && (e.id = n), G.ie && G.win) {
                i = "";
                for (r in e) e[r] != Object.prototype[r] && ("data" == r.toLowerCase() ? t.movie = e[r] : "styleclass" == r.toLowerCase() ? i += ' class="' + e[r] + '"' : "classid" != r.toLowerCase() && (i += " " + r + '="' + e[r] + '"'));
                s = "";
                for (a in t) t[a] != Object.prototype[a] && (s += '<param name="' + a + '" value="' + t[a] + '" />');
                l.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + s + "</object>", q[q.length] = e.id, o = y(e.id)
            } else {
                c = m(O), c.setAttribute("type", N);
                for (p in e) e[p] != Object.prototype[p] && ("styleclass" == p.toLowerCase() ? c.setAttribute("class", e[p]) : "classid" != p.toLowerCase() && c.setAttribute(p, e[p]));
                for (u in t) t[u] != Object.prototype[u] && "movie" != u.toLowerCase() && h(c, u, t[u]);
                l.parentNode.replaceChild(c, l), o = c
            }
        return o
    }

    function h(e, t, n) {
        var o = m("param");
        o.setAttribute("name", t), o.setAttribute("value", n), e.appendChild(o)
    }

    function f(e) {
        var t = y(e);
        t && "OBJECT" == t.nodeName && (G.ie && G.win ? (t.style.display = "none", function() {
            4 == t.readyState ? d(e) : setTimeout(arguments.callee, 10)
        }()) : t.parentNode.removeChild(t))
    }

    function d(e) {
        var t, n = y(e);
        if (n) {
            for (t in n) "function" == typeof n[t] && (n[t] = null);
            n.parentNode.removeChild(n)
        }
    }

    function y(e) {
        var t = null;
        try {
            t = B.getElementById(e)
        } catch (n) {}
        return t
    }

    function m(e) {
        return B.createElement(e)
    }

    function v(e, t, n) {
        e.attachEvent(t, n), X[X.length] = [e, t, n]
    }

    function g(e) {
        var t = G.pv,
            n = e.split(".");
        return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1
    }

    function k(e, t, n, o) {
        var i, r, s;
        G.ie && G.mac || (i = B.getElementsByTagName("head")[0], i && (r = n && "string" == typeof n ? n : "screen", o && (C = null, x = null), C && x == r || (s = m("style"), s.setAttribute("type", "text/css"), s.setAttribute("media", r), C = i.appendChild(s), G.ie && G.win && typeof B.styleSheets != W && B.styleSheets.length > 0 && (C = B.styleSheets[B.styleSheets.length - 1]), x = r), G.ie && G.win ? C && typeof C.addRule == O && C.addRule(e, t) : C && typeof B.createTextNode != W && C.appendChild(B.createTextNode(e + " {" + t + "}"))))
    }

    function b(e, t) {
        if (U) {
            var n = t ? "visible" : "hidden";
            H && y(e) ? y(e).style.visibility = n : k("#" + e, "visibility:" + n)
        }
    }

    function w(e) {
        var t = /[\\\"<>\.;]/,
            n = null != t.exec(e);
        return n && typeof encodeURIComponent != W ? encodeURIComponent(e) : e
    } {
        var S, T, _, E, C, x, W = "undefined",
            O = "object",
            A = "Shockwave Flash",
            I = "ShockwaveFlash.ShockwaveFlash",
            N = "application/x-shockwave-flash",
            j = "SWFObjectExprInst",
            L = "onreadystatechange",
            D = window,
            B = document,
            $ = navigator,
            P = !1,
            R = [o],
            F = [],
            q = [],
            X = [],
            H = !1,
            M = !1,
            U = !0,
            G = function() {
                var e, t = typeof B.getElementById != W && typeof B.getElementsByTagName != W && typeof B.createElement != W,
                    n = $.userAgent.toLowerCase(),
                    o = $.platform.toLowerCase(),
                    i = /win/.test(o ? o : n),
                    r = /mac/.test(o ? o : n),
                    s = /webkit/.test(n) ? parseFloat(n.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                    a = !1,
                    c = [0, 0, 0],
                    p = null;
                if (typeof $.plugins != W && typeof $.plugins[A] == O) p = $.plugins[A].description, !p || typeof $.mimeTypes != W && $.mimeTypes[N] && !$.mimeTypes[N].enabledPlugin || (P = !0, a = !1, p = p.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), c[0] = parseInt(p.replace(/^(.*)\..*$/, "$1"), 10), c[1] = parseInt(p.replace(/^.*\.(.*)\s.*$/, "$1"), 10), c[2] = /[a-zA-Z]/.test(p) ? parseInt(p.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                else if (typeof D.ActiveXObject != W) try {
                    e = new ActiveXObject(I), e && (p = e.GetVariable("$version"), p && (a = !0, p = p.split(" ")[1].split(","), c = [parseInt(p[0], 10), parseInt(p[1], 10), parseInt(p[2], 10)]))
                } catch (u) {}
                return {
                    w3: t,
                    pv: c,
                    wk: s,
                    ie: a,
                    win: i,
                    mac: r
                }
            }();
        ! function() {
            G.w3 && ((typeof B.readyState != W && "complete" == B.readyState || typeof B.readyState == W && (B.getElementsByTagName("body")[0] || B.body)) && e(), H || (typeof B.addEventListener != W && B.addEventListener("DOMContentLoaded", e, !1), G.ie && G.win && (B.attachEvent(L, function() {
                "complete" == B.readyState && (B.detachEvent(L, arguments.callee), e())
            }), D == top && function() {
                if (!H) {
                    try {
                        B.documentElement.doScroll("left")
                    } catch (t) {
                        return void setTimeout(arguments.callee, 0)
                    }
                    e()
                }
            }()), G.wk && function() {
                return H ? void 0 : /loaded|complete/.test(B.readyState) ? void e() : void setTimeout(arguments.callee, 0)
            }(), n(e)))
        }(),
        function() {
            G.ie && G.win && window.attachEvent("onunload", function() {
                for (var e, t, n, o, i = X.length, r = 0; i > r; r++) X[r][0].detachEvent(X[r][1], X[r][2]);
                for (e = q.length, t = 0; e > t; t++) f(q[t]);
                for (n in G) G[n] = null;
                G = null;
                for (o in swfobject) swfobject[o] = null;
                swfobject = null
            })
        }()
    }
    return {
        registerObject: function(e, t, n, o) {
            if (G.w3 && e && t) {
                var i = {};
                i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = o, F[F.length] = i, b(e, !1)
            } else o && o({
                success: !1,
                id: e
            })
        },
        getObjectById: function(e) {
            return G.w3 ? s(e) : void 0
        },
        embedSWF: function(e, n, o, i, r, s, p, u, h, f) {
            var d = {
                success: !1,
                id: n
            };
            G.w3 && !(G.wk && G.wk < 312) && e && n && o && i && r ? (b(n, !1), t(function() {
                var t, y, m, v, k, w;
                if (o += "", i += "", t = {}, h && typeof h === O)
                    for (y in h) t[y] = h[y];
                if (t.data = e, t.width = o, t.height = i, m = {}, u && typeof u === O)
                    for (v in u) m[v] = u[v];
                if (p && typeof p === O)
                    for (k in p) typeof m.flashvars != W ? m.flashvars += "&" + k + "=" + p[k] : m.flashvars = k + "=" + p[k];
                if (g(r)) w = l(t, m, n), t.id == n && b(n, !0), d.success = !0, d.ref = w;
                else {
                    if (s && a()) return t.data = s, void c(t, m, n, f);
                    b(n, !0)
                }
                f && f(d)
            })) : f && f(d)
        },
        switchOffAutoHideShow: function() {
            U = !1
        },
        ua: G,
        getFlashPlayerVersion: function() {
            return {
                major: G.pv[0],
                minor: G.pv[1],
                release: G.pv[2]
            }
        },
        hasFlashPlayerVersion: g,
        createSWF: function(e, t, n) {
            return G.w3 ? l(e, t, n) : void 0
        },
        showExpressInstall: function(e, t, n, o) {
            G.w3 && a() && c(e, t, n, o)
        },
        removeSWF: function(e) {
            G.w3 && f(e)
        },
        createCSS: function(e, t, n, o) {
            G.w3 && k(e, t, n, o)
        },
        addDomLoadEvent: t,
        addLoadEvent: n,
        getQueryParamValue: function(e) {
            var t, n, o = B.location.search || B.location.hash;
            if (o) {
                if (/\?/.test(o) && (o = o.split("?")[1]), null == e) return w(o);
                for (t = o.split("&"), n = 0; n < t.length; n++)
                    if (t[n].substring(0, t[n].indexOf("=")) == e) return w(t[n].substring(t[n].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function() {
            if (M) {
                var e = y(j);
                e && S && (e.parentNode.replaceChild(S, e), T && (b(T, !0), G.ie && G.win && (S.style.display = "block")), _ && _(E)), M = !1
            }
        }
    }
}();
! function() {
    if ("undefined" != typeof window && !window.WebSocket) {
        var e = window.console;
        return e && e.log && e.error || (e = {
            log: function() {},
            error: function() {}
        }), swfobject.hasFlashPlayerVersion("10.0.0") ? ("file:" == location.protocol && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(e, t, n, o, i) {
            var r = this;
            r.__id = WebSocket.__nextId++, WebSocket.__instances[r.__id] = r, r.readyState = WebSocket.CONNECTING, r.bufferedAmount = 0, r.__events = {}, t ? "string" == typeof t && (t = [t]) : t = [], setTimeout(function() {
                WebSocket.__addTask(function() {
                    WebSocket.__flash.create(r.__id, e, t, n || null, o || 0, i || null)
                })
            }, 0)
        }, WebSocket.prototype.send = function(e) {
            if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
            var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));

            return 0 > t ? !0 : (this.bufferedAmount += t, !1)
        }, WebSocket.prototype.close = function() {
            this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
        }, WebSocket.prototype.addEventListener = function(e, t) {
            e in this.__events || (this.__events[e] = []), this.__events[e].push(t)
        }, WebSocket.prototype.removeEventListener = function(e, t) {
            var n, o;
            if (e in this.__events)
                for (n = this.__events[e], o = n.length - 1; o >= 0; --o)
                    if (n[o] === t) {
                        n.splice(o, 1);
                        break
                    }
        }, WebSocket.prototype.dispatchEvent = function(e) {
            for (var t, n = this.__events[e.type] || [], o = 0; o < n.length; ++o) n[o](e);
            t = this["on" + e.type], t && t(e)
        }, WebSocket.prototype.__handleEvent = function(e) {
            var t, n;
            if ("readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol), "open" == e.type || "error" == e.type) t = this.__createSimpleEvent(e.type);
            else if ("close" == e.type) t = this.__createSimpleEvent("close");
            else {
                if ("message" != e.type) throw "unknown event type: " + e.type;
                n = decodeURIComponent(e.message), t = this.__createMessageEvent("message", n)
            }
            this.dispatchEvent(t)
        }, WebSocket.prototype.__createSimpleEvent = function(e) {
            if (document.createEvent && window.Event) {
                var t = document.createEvent("Event");
                return t.initEvent(e, !1, !1), t
            }
            return {
                type: e,
                bubbles: !1,
                cancelable: !1
            }
        }, WebSocket.prototype.__createMessageEvent = function(e, t) {
            if (document.createEvent && window.MessageEvent && !window.opera) {
                var n = document.createEvent("MessageEvent");
                return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n
            }
            return {
                type: e,
                data: t,
                bubbles: !1,
                cancelable: !1
            }
        }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(e) {
            WebSocket.__addTask(function() {
                WebSocket.__flash.loadManualPolicyFile(e)
            })
        }, WebSocket.__initialize = function() {
            var t, n;
            if (!WebSocket.__flash) return WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), window.WEB_SOCKET_SWF_LOCATION ? (t = document.createElement("div"), t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px"), n = document.createElement("div"), n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                hasPriority: !0,
                swliveconnect: !0,
                allowScriptAccess: "always"
            }, null, function(t) {
                t.success || e.error("[WebSocket] swfobject.embedSWF failed")
            }), void 0) : void e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")
        }, WebSocket.__onFlashInitialized = function() {
            setTimeout(function() {
                WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
                WebSocket.__tasks = []
            }, 0)
        }, WebSocket.__onFlashEvent = function() {
            return setTimeout(function() {
                var t, n;
                try {
                    for (t = WebSocket.__flash.receiveEvents(), n = 0; n < t.length; ++n) WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])
                } catch (o) {
                    e.error(o)
                }
            }, 0), !0
        }, WebSocket.__log = function(t) {
            e.log(decodeURIComponent(t))
        }, WebSocket.__error = function(t) {
            e.error(decodeURIComponent(t))
        }, WebSocket.__addTask = function(e) {
            WebSocket.__flash ? e() : WebSocket.__tasks.push(e)
        }, WebSocket.__isFlashLite = function() {
            if (!window.navigator || !window.navigator.mimeTypes) return !1;
            var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
            return e && e.enabledPlugin && e.enabledPlugin.filename && e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
        }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
            WebSocket.__initialize()
        }, !1) : window.attachEvent("onload", function() {
            WebSocket.__initialize()
        })), void 0) : void e.error("Flash Player >= 10.0.0 is required.")
    }
}(),
function(e, t, n) {
    function o(e) {
        e && (t.Transport.apply(this, arguments), this.sendBuffer = [])
    }

    function i() {}
    e.XHR = o, t.util.inherit(o, t.Transport), o.prototype.open = function() {
        return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
    }, o.prototype.payload = function(e) {
        for (var n = [], o = 0, i = e.length; i > o; o++) n.push(t.parser.encodePacket(e[o]));
        this.send(t.parser.encodePayload(n))
    }, o.prototype.send = function(e) {
        return this.post(e), this
    }, o.prototype.post = function(e) {
        function t() {
            4 == this.readyState && (this.onreadystatechange = i, r.posting = !1, 200 == this.status ? r.socket.setBuffer(!1) : r.onClose())
        }

        function o() {
            this.onload = i, r.socket.setBuffer(!1)
        }
        var r = this;
        this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = o : this.sendXHR.onreadystatechange = t, this.sendXHR.send(e)
    }, o.prototype.close = function() {
        return this.onClose(), this
    }, o.prototype.request = function(e) {
        var n = t.util.request(this.socket.isXDomain()),
            o = t.util.query(this.socket.options.query, "t=" + +new Date);
        if (n.open(e || "GET", this.prepareUrl() + o, !0), "POST" == e) try {
            n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
        } catch (i) {}
        return n
    }, o.prototype.scheme = function() {
        return this.socket.options.secure ? "https" : "http"
    }, o.check = function(e, n) {
        try {
            if (t.util.request(n)) return !0
        } catch (o) {}
        return !1
    }, o.xdomainCheck = function() {
        return o.check(null, !0)
    }
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this),
function(e, t) {
    function n() {
        t.Transport.XHR.apply(this, arguments)
    }
    e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function() {
        var e, n, o;
        this.doc = new ActiveXObject("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this, e = this.doc.createElement("div"), e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe), n = this, o = t.util.query(this.socket.options.query, "t=" + +new Date), this.iframe.src = this.prepareUrl() + o, t.util.on(window, "unload", function() {
            n.destroy()
        })
    }, n.prototype._ = function(e, t) {
        this.onData(e);
        try {
            var n = t.getElementsByTagName("script")[0];
            n.parentNode.removeChild(n)
        } catch (o) {}
    }, n.prototype.destroy = function() {
        if (this.iframe) {
            try {
                this.iframe.src = "about:blank"
            } catch (e) {}
            this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
        }
    }, n.prototype.close = function() {
        return this.destroy(), t.Transport.XHR.prototype.close.call(this)
    }, n.check = function() {
        if ("undefined" != typeof window && "ActiveXObject" in window) try {
            var e = new ActiveXObject("htmlfile");
            return e && t.Transport.XHR.check()
        } catch (n) {}
        return !1
    }, n.xdomainCheck = function() {
        return !1
    }, t.transports.push("htmlfile")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports),
function(e, t, n) {
    function o() {
        t.Transport.XHR.apply(this, arguments)
    }

    function i() {}
    e["xhr-polling"] = o, t.util.inherit(o, t.Transport.XHR), t.util.merge(o, t.Transport.XHR), o.prototype.name = "xhr-polling", o.prototype.open = function() {
        var e = this;
        return t.Transport.XHR.prototype.open.call(e), !1
    }, o.prototype.get = function() {
        function e() {
            4 == this.readyState && (this.onreadystatechange = i, 200 == this.status ? (r.onData(this.responseText), r.get()) : r.onClose())
        }

        function t() {
            this.onload = i, this.onerror = i, r.onData(this.responseText), r.get()
        }

        function o() {
            r.onClose()
        }
        if (this.open) {
            var r = this;
            this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = t, this.xhr.onerror = o) : this.xhr.onreadystatechange = e, this.xhr.send(null)
        }
    }, o.prototype.onClose = function() {
        if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = i;
            try {
                this.xhr.abort()
            } catch (e) {}
            this.xhr = null
        }
    }, o.prototype.ready = function(e, n) {
        var o = this;
        t.util.defer(function() {
            n.call(o)
        })
    }, t.transports.push("xhr-polling")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this),
function(e, t, n) {
    function o() {
        t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
        var e = this;
        t.j.push(function(t) {
            e._(t)
        })
    }
    var i = n.document && "MozAppearance" in n.document.documentElement.style;
    e["jsonp-polling"] = o, t.util.inherit(o, t.Transport["xhr-polling"]), o.prototype.name = "jsonp-polling", o.prototype.post = function(e) {
        function n() {
            o(), i.socket.setBuffer(!1)
        }

        function o() {
            i.iframe && i.form.removeChild(i.iframe);
            try {
                s = document.createElement('<iframe name="' + i.iframeId + '">')
            } catch (e) {
                s = document.createElement("iframe"), s.name = i.iframeId
            }
            s.id = i.iframeId, i.form.appendChild(s), i.iframe = s
        }
        var i = this,
            r = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        if (!this.form) {
            var s, a = document.createElement("form"),
                c = document.createElement("textarea"),
                p = this.iframeId = "socketio_iframe_" + this.index;
            a.className = "socketio", a.style.position = "absolute", a.style.top = "-1000px", a.style.left = "-1000px", a.target = p, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), c.name = "d", a.appendChild(c), document.body.appendChild(a), this.form = a, this.area = c
        }
        this.form.action = this.prepareUrl() + r, o(), this.area.value = t.JSON.stringify(e);
        try {
            this.form.submit()
        } catch (u) {}
        this.iframe.attachEvent ? s.onreadystatechange = function() {
            "complete" == i.iframe.readyState && n()
        } : this.iframe.onload = n, this.socket.setBuffer(!0)
    }, o.prototype.get = function() {
        var e, n = this,
            o = document.createElement("script"),
            r = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), o.async = !0, o.src = this.prepareUrl() + r, o.onerror = function() {
            n.onClose()
        }, e = document.getElementsByTagName("script")[0], e.parentNode.insertBefore(o, e), this.script = o, i && setTimeout(function() {
            var e = document.createElement("iframe");
            document.body.appendChild(e), document.body.removeChild(e)
        }, 100)
    }, o.prototype._ = function(e) {
        return this.onData(e), this.open && this.get(), this
    }, o.prototype.ready = function(e, n) {
        var o = this;
        return i ? void t.util.load(function() {
            n.call(o)
        }) : n.call(this)
    }, o.check = function() {
        return "document" in n
    }, o.xdomainCheck = function() {
        return !0
    }, t.transports.push("jsonp-polling")
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);