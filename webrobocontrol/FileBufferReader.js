! function() {
    function e(e, n) {
        if (e || (e = {}), !n) return e;
        for (var t in n) e[t] = n[t];
        return e
    }
    window.FileBufferReader = function() {
        var e = this;
        e.chunks = {}, e.readAsArrayBuffer = function(t, r, a) {
            a = a || {}, a.chunkSize = a.chunkSize || 12e3, n.Read(t, function(n) {
                t.extra = a || {}, t.url = URL.createObjectURL(t), n.file = t, e.chunks[n.uuid] = n, r(n.uuid)
            }, a)
        }, e.getNextChunk = function(n, r) {
            var a = e.chunks[n];
            if (a) {
                var o = a.listOfChunks[a.currentPosition],
                    i = o && o.end;
                t.ConvertToArrayBuffer(o, function(t) {
                    0 == a.currentPosition && e.onBegin(a.file), i && e.onEnd(a.file), r(t, i, o.extra), e.onProgress({
                        currentPosition: a.currentPosition,
                        maxChunks: a.maxChunks,
                        uuid: a.uuid,
                        extra: o.extra
                    }), e.chunks[n].currentPosition++
                })
            }
        }, e.onBegin = e.onProgress = e.onEnd = function() {};
        var r = new n.Receiver(e);
        e.addChunk = function(e, n) {
            r.receive(e, function(e) {
                t.ConvertToArrayBuffer({
                    readyForNextChunk: !0,
                    uuid: e
                }, n)
            })
        }, e.convertToObject = t.ConvertToObject
    }, window.FileSelector = function() {
        function e(e, t) {
            var r = document.createElement("input");
            r.type = "file", t && (r.multiple = !0), r.onchange = function() {
                e(t ? r.files : r.files[0])
            }, n(r)
        }

        function n(e) {
            var n = new window.MouseEvent("click", {
                view: window,
                bubbles: !0,
                cancelable: !0
            });
            e.dispatchEvent(n)
        }
        var t = this;
        t.selectSingleFile = e, t.selectMultipleFiles = function(n) {
            e(n, !0)
        }
    };
    var n = {
            Read: function(e, n, t) {
                function r(e, n, r) {
                    a = Math.ceil(n.byteLength / s);
                    for (var u = 0; a > u; u++) {
                        var A = u * s;
                        c[i] = {
                            uuid: d,
                            value: n.slice(A, Math.min(A + s, n.byteLength)),
                            currentPosition: i,
                            maxChunks: f,
                            extra: t
                        }, i++
                    }
                    i == f && (o = !0), r()
                }
                var a, o, i = 1,
                    c = {},
                    s = t.chunkSize || 6e4,
                    u = 0,
                    A = s,
                    l = Math.floor(Math.min(1e8, A) / s),
                    R = l * s,
                    f = Math.ceil(e.size / s),
                    d = e.uuid || (Math.random() * (new Date).getTime()).toString(36).replace(/\./g, "-");
                c[0] = {
                    uuid: d,
                    maxChunks: f,
                    size: e.size,
                    name: e.name,
                    lastModifiedDate: e.lastModifiedDate + "",
                    type: e.type,
                    start: !0,
                    extra: t
                }, e.maxChunks = f, e.uuid = d;
                var h, E = new FileReader;
                E.onloadend = function(a) {
                    a.target.readyState == FileReader.DONE && r(e.name, a.target.result, function() {
                        u++, (u + 1) * R < e.size ? (h = e.slice(u * R, (u + 1) * R), E.readAsArrayBuffer(h)) : u * R < e.size ? (h = e.slice(u * R, e.size), E.readAsArrayBuffer(h)) : (c[i] = {
                            uuid: d,
                            maxChunks: f,
                            size: e.size,
                            name: e.name,
                            lastModifiedDate: e.lastModifiedDate + "",
                            type: e.type,
                            end: !0,
                            extra: t
                        }, n({
                            currentPosition: 0,
                            listOfChunks: c,
                            maxChunks: f + 1,
                            uuid: d,
                            extra: t
                        }))
                    })
                }, h = e.slice(u * R, (u + 1) * R), E.readAsArrayBuffer(h)
            },
            Receiver: function(n) {
                function r(o, i) {
                    if (!o.uuid) return void t.ConvertToObject(o, function(e) {
                        r(e)
                    });
                    if (o.start && !a[o.uuid] && (a[o.uuid] = [], n.onBegin && n.onBegin(o)), !o.end && o.value && a[o.uuid].push(o.value), o.end) {
                        for (var c = a[o.uuid], s = [], u = c.length, A = 0; u > A; A++) c[A] && s.push(c[A]);
                        var l = new Blob(s, {
                            type: o.type
                        });
                        l = e(l, o), l.url = URL.createObjectURL(l), l.uuid = o.uuid, l.size || console.error("Something went wrong. Blob Size is 0."), n.onEnd && n.onEnd(l)
                    }
                    o.value && n.onProgress && n.onProgress(o), o.end || i(o.uuid)
                }
                var a = {};
                return {
                    receive: r
                }
            },
            SaveToDisk: function(e, n) {
                var t = document.createElement("a");
                t.href = e, t.target = "_blank", t.download = n || e;
                var r = new MouseEvent("click", {
                    view: window,
                    bubbles: !0,
                    cancelable: !0
                });
                t.dispatchEvent(r), (window.URL || window.webkitURL).revokeObjectURL(t.href)
            }
        },
        t = {
            ConvertToArrayBuffer: function(e, n) {
                binarize.pack(e, n)
            },
            ConvertToObject: function(e, n) {
                binarize.unpack(e, n)
            }
        };
    ! function(e) {
        var n = !1,
            t = !1,
            r = !0,
            a = Uint8Array.BYTES_PER_ELEMENT,
            o = Uint16Array.BYTES_PER_ELEMENT,
            i = Uint32Array.BYTES_PER_ELEMENT,
            c = {
                NULL: 0,
                UNDEFINED: 1,
                STRING: 2,
                NUMBER: 3,
                BOOLEAN: 4,
                ARRAY: 5,
                OBJECT: 6,
                INT8ARRAY: 7,
                INT16ARRAY: 8,
                INT32ARRAY: 9,
                UINT8ARRAY: 10,
                UINT16ARRAY: 11,
                UINT32ARRAY: 12,
                FLOAT32ARRAY: 13,
                FLOAT64ARRAY: 14,
                ARRAYBUFFER: 15,
                BLOB: 16,
                FILE: 16,
                BUFFER: 17
            };
        if (n) var s = ["NULL", "UNDEFINED", "STRING", "NUMBER", "BOOLEAN", "ARRAY", "OBJECT", "INT8ARRAY", "INT16ARRAY", "INT32ARRAY", "UINT8ARRAY", "UINT16ARRAY", "UINT32ARRAY", "FLOAT32ARRAY", "FLOAT64ARRAY", "ARRAYBUFFER", "BLOB", "BUFFER"];
        var u = [null, null, "Uint16", "Float64", "Uint8", null, null, "Int8", "Int16", "Int32", "Uint8", "Uint16", "Uint32", "Float32", "Float64", "Uint8", "Uint8", "Uint8"],
            A = function(e, n, r) {
                var a = [],
                    o = t,
                    i = 40;
                a[0] = [];
                for (var c = 0; i > c; c++) a[0][c] = 10 > c ? "0" + c.toString(10) : c.toString(10);
                for (c = 0; r > c; c++) {
                    var s = e.getUint8(n + c, o),
                        u = ~~(c / i) + 1;
                    "undefined" == typeof a[u] && (a[u] = []), a[u][c % i] = 16 > s ? "0" + s.toString(16) : s.toString(16)
                }
                for (console.log("%c" + a[0].join(" "), "font-weight: bold;"), c = 1; c < a.length; c++) console.log(a[c].join(" "))
            },
            l = function(e) {
                var n = void 0;
                if (void 0 === e) n = c.UNDEFINED;
                else if (null === e) n = c.NULL;
                else {
                    var t = e.constructor.name;
                    if (void 0 !== t) n = c[t.toUpperCase()];
                    else switch (typeof e) {
                        case "string":
                            n = c.STRING;
                            break;
                        case "number":
                            n = c.NUMBER;
                            break;
                        case "boolean":
                            n = c.BOOLEAN;
                            break;
                        case "object":
                            e instanceof Array ? n = c.ARRAY : e instanceof Int8Array ? n = c.INT8ARRAY : e instanceof Int16Array ? n = c.INT16ARRAY : e instanceof Int32Array ? n = c.INT32ARRAY : e instanceof Uint8Array ? n = c.UINT8ARRAY : e instanceof Uint16Array ? n = c.UINT16ARRAY : e instanceof Uint32Array ? n = c.UINT32ARRAY : e instanceof Float32Array ? n = c.FLOAT32ARRAY : e instanceof Float64Array ? n = c.FLOAT64ARRAY : e instanceof ArrayBuffer ? n = c.ARRAYBUFFER : e instanceof Blob ? n = c.BLOB : e instanceof Buffer ? n = c.BUFFER : e instanceof Object && (n = c.OBJECT)
                    }
                }
                return n
            },
            R = function(r) {
                var l = 0,
                    R = 0,
                    f = 0,
                    d = t,
                    h = new ArrayBuffer(r[0].byte_length + r[0].header_size),
                    E = new DataView(h);
                for (R = 0; R < r.length; R++) {
                    var T = l,
                        U = r[R].header_size,
                        v = r[R].type,
                        N = r[R].length,
                        b = r[R].value,
                        g = r[R].byte_length,
                        B = u[v],
                        y = null === B ? 0 : e[B + "Array"].BYTES_PER_ELEMENT;
                    switch (v === c.BUFFER ? E.setUint8(l, c.BLOB, d) : E.setUint8(l, v, d), l += a, n && console.info("Packing", v, s[v]), (v === c.ARRAY || v === c.OBJECT) && (E.setUint16(l, N, d), l += o, n && console.info("Content Length", N)), E.setUint32(l, g, d), l += i, n && (console.info("Header Size", U, "bytes"), console.info("Byte Length", g, "bytes")), v) {
                        case c.NULL:
                        case c.UNDEFINED:
                            break;
                        case c.STRING:
                            for (n && console.info('Actual Content %c"' + b + '"', "font-weight:bold;"), f = 0; N > f; f++, l += y) E.setUint16(l, b.charCodeAt(f), d);
                            break;
                        case c.NUMBER:
                        case c.BOOLEAN:
                            n && console.info("%c" + b.toString(), "font-weight:bold;"), E["set" + B](l, b, d), l += y;
                            break;
                        case c.INT8ARRAY:
                        case c.INT16ARRAY:
                        case c.INT32ARRAY:
                        case c.UINT8ARRAY:
                        case c.UINT16ARRAY:
                        case c.UINT32ARRAY:
                        case c.FLOAT32ARRAY:
                        case c.FLOAT64ARRAY:
                            var Y = new Uint8Array(E.buffer, l, g);
                            Y.set(new Uint8Array(b.buffer)), l += g;
                            break;
                        case c.ARRAYBUFFER:
                        case c.BUFFER:
                            var Y = new Uint8Array(E.buffer, l, g);
                            Y.set(new Uint8Array(b)), l += g;
                            break;
                        case c.BLOB:
                        case c.ARRAY:
                        case c.OBJECT:
                            break;
                        default:
                            throw "TypeError: Unexpected type found."
                    }
                    n && A(E, T, l - T)
                }
                return E
            },
            f = function(r, l) {
                var R, d, h, E, T, U = 0,
                    v = t,
                    N = l;
                R = r.getUint8(l, v), l += a, n && console.info("Unpacking", R, s[R]), (R === c.ARRAY || R === c.OBJECT) && (d = r.getUint16(l, v), l += o, n && console.info("Content Length", d)), h = r.getUint32(l, v), l += i, n && console.info("Byte Length", h, "bytes");
                var b = u[R],
                    g = null === b ? 0 : e[b + "Array"].BYTES_PER_ELEMENT;
                switch (R) {
                    case c.NULL:
                    case c.UNDEFINED:
                        n && A(r, N, l - N), E = null;
                        break;
                    case c.STRING:
                        d = h / g;
                        var B = [];
                        for (U = 0; d > U; U++) {
                            var y = r.getUint16(l, v);
                            l += g, B.push(String.fromCharCode(y))
                        }
                        E = B.join(""), n && (console.info('Actual Content %c"' + E + '"', "font-weight:bold;"), A(r, N, l - N));
                        break;
                    case c.NUMBER:
                        E = r.getFloat64(l, v), l += g, n && (console.info('Actual Content %c"' + E.toString() + '"', "font-weight:bold;"), A(r, N, l - N));
                        break;
                    case c.BOOLEAN:
                        E = 1 === r.getUint8(l, v) ? !0 : !1, l += g, n && (console.info('Actual Content %c"' + E.toString() + '"', "font-weight:bold;"), A(r, N, l - N));
                        break;
                    case c.INT8ARRAY:
                    case c.INT16ARRAY:
                    case c.INT32ARRAY:
                    case c.UINT8ARRAY:
                    case c.UINT16ARRAY:
                    case c.UINT32ARRAY:
                    case c.FLOAT32ARRAY:
                    case c.FLOAT64ARRAY:
                    case c.ARRAYBUFFER:
                        T = r.buffer.slice(l, l + h), l += h, E = R === c.ARRAYBUFFER ? T : new e[b + "Array"](T), n && A(r, N, l - N);
                        break;
                    case c.BLOB:
                        if (n && A(r, N, l - N), e.Blob) {
                            var Y = f(r, l),
                                F = f(r, Y.cursor);
                            l = F.cursor, E = new Blob([F.value], {
                                type: Y.value
                            })
                        } else T = r.buffer.slice(l, l + h), l += h, E = new Buffer(T);
                        break;
                    case c.ARRAY:
                        for (n && A(r, N, l - N), E = [], U = 0; d > U; U++) T = f(r, l), l = T.cursor, E.push(T.value);
                        break;
                    case c.OBJECT:
                        for (n && A(r, N, l - N), E = {}, U = 0; d > U; U++) {
                            var L = f(r, l),
                                w = f(r, L.cursor);
                            l = w.cursor, E[L.value] = w.value
                        }
                        break;
                    default:
                        throw "TypeError: Type not supported."
                }
                return {
                    value: E,
                    cursor: l
                }
            },
            d = function(e, n) {
                for (var t = e.length, r = [], a = 0, o = 0, i = 0; i < e.length; i++) ! function(i) {
                    h(e[i], function(e) {
                        if (r[i] = e, o += e[0].header_size + e[0].byte_length, ++a === t) {
                            for (var c = [], s = 0; s < r.length; s++) c = c.concat(r[s]);
                            n(c, o)
                        }
                    })
                }(i)
            },
            h = function(n, t) {
                var r, s = [],
                    A = 1,
                    R = a + i,
                    f = 0,
                    h = 0,
                    E = n;
                switch (r = l(n), A = void 0 === u[r] || null === u[r] ? 0 : e[u[r] + "Array"].BYTES_PER_ELEMENT, r) {
                    case c.UNDEFINED:
                    case c.NULL:
                        break;
                    case c.NUMBER:
                    case c.BOOLEAN:
                        f = A;
                        break;
                    case c.STRING:
                        h = n.length, f += h * A;
                        break;
                    case c.INT8ARRAY:
                    case c.INT16ARRAY:
                    case c.INT32ARRAY:
                    case c.UINT8ARRAY:
                    case c.UINT16ARRAY:
                    case c.UINT32ARRAY:
                    case c.FLOAT32ARRAY:
                    case c.FLOAT64ARRAY:
                        h = n.length, f += h * A;
                        break;
                    case c.ARRAY:
                        return void d(n, function(e, a) {
                            t([{
                                type: r,
                                length: n.length,
                                header_size: R + o,
                                byte_length: a,
                                value: null
                            }].concat(e))
                        });
                    case c.OBJECT:
                        var T = [];
                        for (var U in n) n.hasOwnProperty(U) && (T.push(U), T.push(n[U]), h++);
                        return void d(T, function(e, n) {
                            t([{
                                type: r,
                                length: h,
                                header_size: R + o,
                                byte_length: n,
                                value: null
                            }].concat(e))
                        });
                    case c.ARRAYBUFFER:
                        f += n.byteLength;
                        break;
                    case c.BLOB:
                        var v = n.type,
                            N = new FileReader;
                        return N.onload = function(e) {
                            d([v, e.target.result], function(e, n) {
                                t([{
                                    type: r,
                                    length: h,
                                    header_size: R,
                                    byte_length: n,
                                    value: null
                                }].concat(e))
                            })
                        }, N.onerror = function(e) {
                            throw "FileReader Error: " + e
                        }, void N.readAsArrayBuffer(n);
                    case c.BUFFER:
                        f += n.length;
                        break;
                    default:
                        throw 'TypeError: Type "' + n.constructor.name + '" not supported.'
                }
                t([{
                    type: r,
                    length: h,
                    header_size: R,
                    byte_length: f,
                    value: E
                }].concat(s))
            },
            E = function(e, n) {
                var t = e instanceof DataView ? e : new DataView(e),
                    r = f(t, 0);
                return r.value
            };
        n && (e.Test = {
            BIG_ENDIAN: t,
            LITTLE_ENDIAN: r,
            Types: c,
            pack: R,
            unpack: f,
            serialize: h,
            deserialize: E
        });
        var T = {
            pack: function(e, t) {
                try {
                    n && console.info("%cPacking Start", "font-weight: bold; color: red;", e), h(e, function(e) {
                        n && console.info("Serialized Object", e), t(R(e))
                    })
                } catch (r) {
                    throw r
                }
            },
            unpack: function(e, t) {
                try {
                    n && console.info("%cUnpacking Start", "font-weight: bold; color: red;", e);
                    var r = E(e);
                    n && console.info("Deserialized Object", r), t(r)
                } catch (a) {
                    throw a
                }
            }
        };
        "undefined" != typeof module && module.exports ? module.exports = T : e.binarize = T
    }("undefined" != typeof global ? global : this)
}();