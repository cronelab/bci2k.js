var k, v;
function F() {
  if (v)
    return k;
  v = 1;
  var h = function() {
    if (typeof self == "object" && self)
      return self;
    if (typeof window == "object" && window)
      return window;
    throw new Error("Unable to resolve global `this`");
  };
  return k = function() {
    if (this)
      return this;
    if (typeof globalThis == "object" && globalThis)
      return globalThis;
    try {
      Object.defineProperty(Object.prototype, "__global__", {
        get: function() {
          return this;
        },
        configurable: !0
      });
    } catch {
      return h();
    }
    try {
      return __global__ || h();
    } finally {
      delete Object.prototype.__global__;
    }
  }(), k;
}
const V = "websocket", O = "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.", D = [
  "websocket",
  "websockets",
  "socket",
  "networking",
  "comet",
  "push",
  "RFC-6455",
  "realtime",
  "server",
  "client"
], C = "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)", N = [
  "Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
], E = "1.0.34", L = {
  type: "git",
  url: "https://github.com/theturtle32/WebSocket-Node.git"
}, j = "https://github.com/theturtle32/WebSocket-Node", W = {
  node: ">=4.0.0"
}, U = {
  bufferutil: "^4.0.1",
  debug: "^2.2.0",
  "es5-ext": "^0.10.50",
  "typedarray-to-buffer": "^3.1.5",
  "utf-8-validate": "^5.0.2",
  yaeti: "^0.0.6"
}, A = {
  "buffer-equal": "^1.0.0",
  gulp: "^4.0.2",
  "gulp-jshint": "^2.0.4",
  "jshint-stylish": "^2.2.1",
  jshint: "^2.0.0",
  tape: "^4.9.1"
}, G = {
  verbose: !1
}, B = {
  test: "tape test/unit/*.js",
  gulp: "gulp"
}, $ = "index", R = {
  lib: "./lib"
}, M = "lib/browser.js", q = "Apache-2.0", K = {
  name: V,
  description: O,
  keywords: D,
  author: C,
  contributors: N,
  version: E,
  repository: L,
  homepage: j,
  engines: W,
  dependencies: U,
  devDependencies: A,
  config: G,
  scripts: B,
  main: $,
  directories: R,
  browser: M,
  license: q
};
var z = K.version, g;
if (typeof globalThis == "object")
  g = globalThis;
else
  try {
    g = F();
  } catch {
  } finally {
    if (!g && typeof window < "u" && (g = window), !g)
      throw new Error("Could not determine global this");
  }
var m = g.WebSocket || g.MozWebSocket, J = z;
function P(h, s) {
  var t;
  return s ? t = new m(h, s) : t = new m(h), t;
}
m && ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(h) {
  Object.defineProperty(P, h, {
    get: function() {
      return m[h];
    }
  });
});
var I = {
  w3cwebsocket: m ? P : null,
  version: J
};
const _ = I.w3cwebsocket;
class Z {
  constructor(s) {
    this.ondisconnect = () => {
    }, this.onStateChange = (t) => {
    }, this.websocket = null, this.state = "", this.address = s || void 0, this.latestIncomingData = "", this.msgID = 0, this.newData = () => {
    }, this.responseBuffer = [];
  }
  connect(s) {
    return new Promise((t, i) => {
      this.address === void 0 && (this.address = s || "ws://127.0.0.1:80"), this.websocket = new _(this.address), this.websocket.onerror = (n) => i(`Error connecting to BCI2000 at ${this.address}`), this.websocket.onclose = () => {
        console.log("Connection closed"), this.ondisconnect();
      }, this.websocket.onopen = () => t(), this.websocket.onmessage = (n) => {
        let { opcode: e, id: r, contents: a } = JSON.parse(n.data);
        switch (e) {
          case "O":
            this.responseBuffer.push({ id: r, response: a }), this.newData(a);
            break;
        }
      };
    });
  }
  disconnect() {
    this.websocket.close();
  }
  connected() {
    return this.websocket !== null && this.websocket.readyState === _.OPEN;
  }
  execute(s) {
    return this.connected() ? new Promise((t, i) => {
      this.msgID = this.msgID + 1, this.websocket.send(
        JSON.stringify({
          opcode: "E",
          id: this.msgID,
          contents: s
        })
      ), this.newData = (n) => t(n);
    }) : Promise.reject(
      "Cannot execute instruction: not connected to BCI2000"
    );
  }
  async getVersion() {
    return (await this.execute("Version")).split("\r")[0];
  }
  async showWindow() {
    await this.execute("Show Window");
  }
  async hideWindow() {
    await this.execute("Hide Window");
  }
  async startExecutable(s) {
    await this.execute(`Start executable ${s}`);
  }
  async startDummyRun() {
    await this.startExecutable("SignalGenerator"), await this.startExecutable("DummySignalProcessing"), await this.startExecutable("DummyApplication");
  }
  async setWatch(s, t, i) {
    await this.execute("Add watch " + s + " at " + t + ":" + i);
  }
  async resetSystem() {
    await this.execute("Reset System");
  }
  async setConfig() {
    await this.execute("Set Config");
  }
  async start() {
    await this.execute("Start");
  }
  async stop() {
    await this.execute("Stop");
  }
  async kill() {
    await this.execute("Exit");
  }
  stateListen() {
    setInterval(async () => {
      let s = await this.execute("GET SYSTEM STATE");
      s.trim() != this.state && this.onStateChange(s.trim());
    }, 1e3);
  }
  async getSubjectName() {
    return await this.execute("Get Parameter SubjectName");
  }
  async getTaskName() {
    return await this.execute("Get Parameter DataFile");
  }
  async setParameter(s) {
    await this.execute(`Set paramater ${s}`);
  }
  async setState(s) {
    await this.execute(`Set state ${s}`);
  }
  //See https://www.bci2000.org/mediawiki/index.php/Technical_Reference:Parameter_Definition
  async getParameters() {
    let t = (await this.execute("List Parameters")).split(`
`), i = {}, n;
    return t.forEach((e) => {
      let r = e.split("=")[0], a = r.split(" ")[1], l = r.split(" ")[2], o = r.split(" ")[0].split(":");
      o.forEach((b, u) => {
        switch (u) {
          case 0: {
            i[o[0]] == null && (i[o[0]] = {}), n = i[o[0]];
            break;
          }
          case 1: {
            i[o[0]][o[1]] == null && (i[o[0]][o[1]] = {}), n = i[o[0]][o[1]];
            break;
          }
          case 2: {
            i[o[0]][o[1]][o[2]] == null && (i[o[0]][o[1]][o[2]] = {}), n = i[o[0]][o[1]][o[2]];
            break;
          }
        }
      }), a != "matrix" ? e.split("=")[1].split("//")[0].trim().split(" ").length == 4 ? n[l] = {
        dataType: a,
        value: {
          value: e.split("=")[1].split("//")[0].trim().split(" ")[0],
          defaultValue: e.split("=")[1].split("//")[0].trim().split(" ")[1],
          low: e.split("=")[1].split("//")[0].trim().split(" ")[2],
          high: e.split("=")[1].split("//")[0].trim().split(" ")[3]
        },
        comment: e.split("=")[1].split("//")[1]
      } : n[l] = {
        dataType: a,
        value: e.split("=")[1].split("//")[0].trim(),
        comment: e.split("=")[1].split("//")[1]
      } : n[l] = {
        dataType: a,
        value: e.split("=")[1].split("//")[0].trim(),
        comment: e.split("=")[1].split("//")[1]
      };
    }), i;
  }
}
const x = I.w3cwebsocket;
class H {
  constructor(s) {
    this._socket = null, this.onconnect = () => {
    }, this.onGenericSignal = (t) => {
    }, this.onStateVector = (t) => {
    }, this.onSignalProperties = (t) => {
    }, this.onStateFormat = (t) => {
    }, this.ondisconnect = () => {
    }, this.onReceiveBlock = () => {
    }, this.callingFrom = "", this.states = {}, this.signal = null, this.signalProperties = null, this.stateFormat = null, this.stateVecOrder = null, this.SignalType = {
      INT16: 0,
      FLOAT24: 1,
      FLOAT32: 2,
      INT32: 3
    }, this.address = s;
  }
  getNullTermString(s) {
    var t = "";
    let i = 0;
    for (; i < s.byteLength; ) {
      var n = s.getUint8(i);
      if (i++, n == 0)
        break;
      t += String.fromCharCode(n);
    }
    return t;
  }
  connect(s, t) {
    let i = this;
    return i.address === void 0 && (i.address = s), this.callingFrom = t, new Promise((n, e) => {
      i._socket = new x(i.address), i._socket.binaryType = "arraybuffer", i._socket.onerror = () => {
        e("Error connecting to data source at " + i.address);
      }, i._socket.onopen = () => {
        i.onconnect(), n();
      }, i._socket.onclose = () => {
        i.ondisconnect(), setTimeout(() => {
          console.log("Disconnected"), this.connect("");
        }, 1e3);
      }, i._socket.onmessage = (r) => {
        i._decodeMessage(r.data);
      };
    });
  }
  connected() {
    return this._socket != null && this._socket.readyState === x.OPEN;
  }
  _decodeMessage(s) {
    let t = new DataView(s, 0, 1).getUint8(0);
    switch (t) {
      case 3:
        let i = new DataView(s, 1, s.byteLength - 1);
        this._decodeStateFormat(i);
        break;
      case 4:
        let n = new DataView(s, 1, 2).getUint8(0);
        switch (n) {
          case 1:
            let r = new DataView(s, 2, s.byteLength - 2);
            this._decodeGenericSignal(r);
            break;
          case 3:
            let a = new DataView(s, 2, s.byteLength - 2);
            this._decodeSignalProperties(a);
            break;
          default:
            console.error("Unsupported Supplement: " + n.toString());
            break;
        }
        this.onReceiveBlock();
        break;
      case 5:
        let e = new DataView(s, 1, s.byteLength - 1);
        this._decodeStateVector(e);
        break;
      default:
        console.error("Unsupported Descriptor: " + t.toString());
        break;
    }
  }
  _decodePhysicalUnits(s) {
    let t;
    t = {};
    let i = s.split(" "), n = 0;
    return t.offset = Number(i[n++]), t.gain = Number(i[n++]), t.symbol = i[n++], t.vmin = Number(i[n++]), t.vmax = Number(i[n++]), t;
  }
  _decodeSignalProperties(s) {
    let t = this.getNullTermString(s);
    t = t.replace(/{/g, " { "), t = t.replace(/}/g, " } "), this.signalProperties = {};
    let i = t.split(" "), n = [];
    for (let r = 0; r < i.length; r++)
      i[r].trim() !== "" && n.push(i[r]);
    let e = 0;
    if (this.signalProperties.name = n[e++], this.signalProperties.channels = [], n[e] === "{") {
      for (; n[++e] !== "}"; )
        this.signalProperties.channels.push(n[e]);
      e++;
    } else {
      let r = parseInt(n[e++]);
      for (let a = 0; a < r; a++)
        this.signalProperties.channels.push((a + 1).toString());
    }
    if (this.signalProperties.elements = [], n[e] === "{") {
      for (; n[++e] !== "}"; )
        this.signalProperties.elements.push(n[e]);
      e++;
    } else {
      let r = parseInt(n[e++]);
      for (let a = 0; a < r; a++)
        this.signalProperties.elements.push((a + 1).toString());
    }
    this.signalProperties.numelements = this.signalProperties.elements.length, this.signalProperties.signaltype = n[e++], this.signalProperties.channelunit = this._decodePhysicalUnits(
      n.slice(e, e += 5).join(" ")
    ), this.signalProperties.elementunit = this._decodePhysicalUnits(
      n.slice(e, e += 5).join(" ")
    ), e++, this.signalProperties.valueunits = [];
    for (let r = 0; r < this.signalProperties.channels.length; r++)
      this.signalProperties.valueunits.push(
        this._decodePhysicalUnits(n.slice(e, e += 5).join(" "))
      );
    e++, this.onSignalProperties(this.signalProperties);
  }
  _decodeStateFormat(s) {
    this.stateFormat = {};
    let i = this.getNullTermString(s).split(`
`);
    for (let e = 0; e < i.length; e++) {
      if (i[e].trim().length === 0)
        continue;
      let r = i[e].split(" "), a = r[0];
      this.stateFormat[a] = {}, this.stateFormat[a].bitWidth = parseInt(r[1]), this.stateFormat[a].defaultValue = parseInt(r[2]), this.stateFormat[a].byteLocation = parseInt(r[3]), this.stateFormat[a].bitLocation = parseInt(r[4]);
    }
    let n = [];
    for (let e in this.stateFormat) {
      let r = this.stateFormat[e].byteLocation * 8;
      r += this.stateFormat[e].bitLocation, n.push([e, r]);
    }
    n.sort((e, r) => e[1] < r[1] ? -1 : e[1] > r[1] ? 1 : 0), this.stateVecOrder = [];
    for (let e = 0; e < n.length; e++) {
      let r = n[e][0];
      this.stateVecOrder.push([r, this.stateFormat[r].bitWidth]);
    }
    this.onStateFormat(this.stateFormat);
  }
  _decodeGenericSignal(s) {
    let t = 0, i = s.getUint8(t);
    t = t + 1;
    let n = s.getUint16(t, !0);
    t = t + 2;
    let e = s.getUint16(t, !0);
    t = t + 2, t = t + s.byteOffset;
    let r = new DataView(s.buffer, t), a = [];
    for (let l = 0; l < n; ++l) {
      a.push([]);
      for (let o = 0; o < e; ++o)
        switch (i) {
          case this.SignalType.INT16:
            a[l].push(
              r.getInt16((e * l + o) * 2, !0)
            );
            break;
          case this.SignalType.FLOAT32:
            a[l].push(
              r.getFloat32((e * l + o) * 4, !0)
            );
            break;
          case this.SignalType.INT32:
            a[l].push(
              r.getInt32((e * l + o) * 4, !0)
            );
            break;
          case this.SignalType.FLOAT24:
            a[l].push(0);
            break;
        }
    }
    this.signal = a, this.onGenericSignal(a);
  }
  _decodeStateVector(s) {
    if (this.stateVecOrder == null)
      return;
    let t = new Int8Array(s.buffer), i = t.indexOf(0), n = t.indexOf(0, i + 1), e = new TextDecoder(), r = parseInt(
      e.decode(t.slice(1, i))
    ), a = parseInt(
      e.decode(t.slice(i + 1, n))
    ), l = n + 1, o = new DataView(s.buffer, l), b = {};
    for (let u in this.stateFormat)
      b[u] = Array(a).fill(
        this.stateFormat[u].defaultValue
      );
    for (let u = 0; u < a; u++) {
      let p = new Uint8Array(
        o.buffer,
        o.byteOffset + u * r,
        r
      ), d = [];
      for (let c = 0; c < p.length; c++)
        d.push(p[c] & 1 ? 1 : 0), d.push(p[c] & 2 ? 1 : 0), d.push(p[c] & 4 ? 1 : 0), d.push(p[c] & 8 ? 1 : 0), d.push(p[c] & 16 ? 1 : 0), d.push(p[c] & 32 ? 1 : 0), d.push(p[c] & 64 ? 1 : 0), d.push(p[c] & 128 ? 1 : 0);
      for (let c = 0; c < this.stateVecOrder.length; c++) {
        let f = this.stateFormat[this.stateVecOrder[c][0]], T = f.byteLocation * 8 + f.bitLocation, w = 0, y = 1;
        for (let S = 0; S < f.bitWidth; S++)
          d[T + S] && (w = (w | y) >>> 0), y = y << 1 >>> 0;
        b[this.stateVecOrder[c][0]][u] = w;
      }
    }
    this.onStateVector(b), this.states = b;
  }
}
export {
  H as BCI2K_DataConnection,
  Z as BCI2K_OperatorConnection
};
