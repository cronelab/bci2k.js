import y from "websocket";
const b = y.w3cwebsocket;
class V {
  constructor(a) {
    this.ondisconnect = () => {
    }, this.onStateChange = (s) => {
    }, this.websocket = null, this.state = "", this.address = a || void 0, this.latestIncomingData = "", this.msgID = 0, this.newData = () => {
    };
  }
  connect(a) {
    return new Promise((s, e) => {
      this.address === void 0 && (this.address = a || "ws://127.0.0.1:80"), this.websocket = new b(this.address), this.websocket.onerror = (i) => e(`Error connecting to BCI2000 at ${this.address}`), this.websocket.onclose = () => {
        this.ondisconnect();
      }, this.websocket.onopen = () => s(), this.websocket.onmessage = ({ data: i }) => {
        this.newData(i);
      };
    });
  }
  disconnect() {
    this.websocket.close();
  }
  connected() {
    return this.websocket !== null && this.websocket.readyState === b.OPEN;
  }
  execute(a) {
    return this.connected() ? new Promise((s, e) => {
      this.websocket.send(a), this.newData = (i) => {
        console.log(i.includes("Error: ")), i.includes("Error: ") ? e(i) : s(i);
      };
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
  async startExecutable(a) {
    await this.execute(`Start executable ${a}`);
  }
  async startDummyRun() {
    await this.startExecutable("SignalGenerator"), await this.startExecutable("DummySignalProcessing"), await this.startExecutable("DummyApplication");
  }
  async setWatch(a, s, e) {
    await this.execute("Add watch " + a + " at " + s + ":" + e);
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
      let a = await this.execute("GET SYSTEM STATE");
      a.trim() != this.state && this.onStateChange(a.trim());
    }, 1e3);
  }
  async getSubjectName() {
    return await this.execute("Get Parameter SubjectName");
  }
  async getTaskName() {
    return await this.execute("Get Parameter DataFile");
  }
  async setParameter(a) {
    await this.execute(`Set paramater ${a}`);
  }
  async setState(a) {
    await this.execute(`Set state ${a}`);
  }
  //See https://www.bci2000.org/mediawiki/index.php/Technical_Reference:Parameter_Definition
  async getParameters() {
    let s = (await this.execute("List Parameters")).split(`
`), e = {}, i;
    return s.forEach((t) => {
      let r = t.split("=")[0], n = r.split(" ")[1], l = r.split(" ")[2], o = r.split(" ")[0].split(":");
      o.forEach((d, h) => {
        switch (h) {
          case 0: {
            e[o[0]] == null && (e[o[0]] = {}), i = e[o[0]];
            break;
          }
          case 1: {
            e[o[0]][o[1]] == null && (e[o[0]][o[1]] = {}), i = e[o[0]][o[1]];
            break;
          }
          case 2: {
            e[o[0]][o[1]][o[2]] == null && (e[o[0]][o[1]][o[2]] = {}), i = e[o[0]][o[1]][o[2]];
            break;
          }
        }
      }), n != "matrix" ? t.split("=")[1].split("//")[0].trim().split(" ").length == 4 ? i[l] = {
        dataType: n,
        value: {
          value: t.split("=")[1].split("//")[0].trim().split(" ")[0],
          defaultValue: t.split("=")[1].split("//")[0].trim().split(" ")[1],
          low: t.split("=")[1].split("//")[0].trim().split(" ")[2],
          high: t.split("=")[1].split("//")[0].trim().split(" ")[3]
        },
        comment: t.split("=")[1].split("//")[1]
      } : i[l] = {
        dataType: n,
        value: t.split("=")[1].split("//")[0].trim(),
        comment: t.split("=")[1].split("//")[1]
      } : i[l] = {
        dataType: n,
        value: t.split("=")[1].split("//")[0].trim(),
        comment: t.split("=")[1].split("//")[1]
      };
    }), e;
  }
}
const S = y.w3cwebsocket;
class F {
  constructor(a) {
    this._socket = null, this.onconnect = () => {
    }, this.onGenericSignal = (s) => {
    }, this.onStateVector = (s) => {
    }, this.onSignalProperties = (s) => {
    }, this.onStateFormat = (s) => {
    }, this.ondisconnect = () => {
    }, this.onReceiveBlock = () => {
    }, this.callingFrom = "", this.states = {}, this.signal = null, this.signalProperties = null, this.stateFormat = null, this.stateVecOrder = null, this.SignalType = {
      INT16: 0,
      FLOAT24: 1,
      FLOAT32: 2,
      INT32: 3
    }, this.address = a;
  }
  getNullTermString(a) {
    var s = "";
    let e = 0;
    for (; e < a.byteLength; ) {
      var i = a.getUint8(e);
      if (e++, i == 0)
        break;
      s += String.fromCharCode(i);
    }
    return s;
  }
  connect(a, s) {
    let e = this;
    return e.address === void 0 && (e.address = a), this.callingFrom = s, new Promise((i, t) => {
      e._socket = new S(e.address), e._socket.binaryType = "arraybuffer", e._socket.onerror = () => {
        t("Error connecting to data source at " + e.address);
      }, e._socket.onopen = () => {
        e.onconnect(), i();
      }, e._socket.onclose = () => {
        e.ondisconnect(), setTimeout(() => {
          console.log("Disconnected"), this.connect("");
        }, 1e3);
      }, e._socket.onmessage = (r) => {
        e._decodeMessage(r.data);
      };
    });
  }
  connected() {
    return this._socket != null && this._socket.readyState === S.OPEN;
  }
  _decodeMessage(a) {
    let s = new DataView(a, 0, 1).getUint8(0);
    switch (s) {
      case 3:
        let e = new DataView(a, 1, a.byteLength - 1);
        this._decodeStateFormat(e);
        break;
      case 4:
        let i = new DataView(a, 1, 2).getUint8(0);
        switch (i) {
          case 1:
            let r = new DataView(a, 2, a.byteLength - 2);
            this._decodeGenericSignal(r);
            break;
          case 3:
            let n = new DataView(a, 2, a.byteLength - 2);
            this._decodeSignalProperties(n);
            break;
          default:
            console.error("Unsupported Supplement: " + i.toString());
            break;
        }
        this.onReceiveBlock();
        break;
      case 5:
        let t = new DataView(a, 1, a.byteLength - 1);
        this._decodeStateVector(t);
        break;
      default:
        console.error("Unsupported Descriptor: " + s.toString());
        break;
    }
  }
  _decodePhysicalUnits(a) {
    let s;
    s = {};
    let e = a.split(" "), i = 0;
    return s.offset = Number(e[i++]), s.gain = Number(e[i++]), s.symbol = e[i++], s.vmin = Number(e[i++]), s.vmax = Number(e[i++]), s;
  }
  _decodeSignalProperties(a) {
    let s = this.getNullTermString(a);
    s = s.replace(/{/g, " { "), s = s.replace(/}/g, " } "), this.signalProperties = {};
    let e = s.split(" "), i = [];
    for (let r = 0; r < e.length; r++)
      e[r].trim() !== "" && i.push(e[r]);
    let t = 0;
    if (this.signalProperties.name = i[t++], this.signalProperties.channels = [], i[t] === "{") {
      for (; i[++t] !== "}"; )
        this.signalProperties.channels.push(i[t]);
      t++;
    } else {
      let r = parseInt(i[t++]);
      for (let n = 0; n < r; n++)
        this.signalProperties.channels.push((n + 1).toString());
    }
    if (this.signalProperties.elements = [], i[t] === "{") {
      for (; i[++t] !== "}"; )
        this.signalProperties.elements.push(i[t]);
      t++;
    } else {
      let r = parseInt(i[t++]);
      for (let n = 0; n < r; n++)
        this.signalProperties.elements.push((n + 1).toString());
    }
    this.signalProperties.numelements = this.signalProperties.elements.length, this.signalProperties.signaltype = i[t++], this.signalProperties.channelunit = this._decodePhysicalUnits(
      i.slice(t, t += 5).join(" ")
    ), this.signalProperties.elementunit = this._decodePhysicalUnits(
      i.slice(t, t += 5).join(" ")
    ), t++, this.signalProperties.valueunits = [];
    for (let r = 0; r < this.signalProperties.channels.length; r++)
      this.signalProperties.valueunits.push(
        this._decodePhysicalUnits(i.slice(t, t += 5).join(" "))
      );
    t++, this.onSignalProperties(this.signalProperties);
  }
  _decodeStateFormat(a) {
    this.stateFormat = {};
    let e = this.getNullTermString(a).split(`
`);
    for (let t = 0; t < e.length; t++) {
      if (e[t].trim().length === 0)
        continue;
      let r = e[t].split(" "), n = r[0];
      this.stateFormat[n] = {}, this.stateFormat[n].bitWidth = parseInt(r[1]), this.stateFormat[n].defaultValue = parseInt(r[2]), this.stateFormat[n].byteLocation = parseInt(r[3]), this.stateFormat[n].bitLocation = parseInt(r[4]);
    }
    let i = [];
    for (let t in this.stateFormat) {
      let r = this.stateFormat[t].byteLocation * 8;
      r += this.stateFormat[t].bitLocation, i.push([t, r]);
    }
    i.sort((t, r) => t[1] < r[1] ? -1 : t[1] > r[1] ? 1 : 0), this.stateVecOrder = [];
    for (let t = 0; t < i.length; t++) {
      let r = i[t][0];
      this.stateVecOrder.push([r, this.stateFormat[r].bitWidth]);
    }
    this.onStateFormat(this.stateFormat);
  }
  _decodeGenericSignal(a) {
    let s = 0, e = a.getUint8(s);
    s = s + 1;
    let i = a.getUint16(s, !0);
    s = s + 2;
    let t = a.getUint16(s, !0);
    s = s + 2, s = s + a.byteOffset;
    let r = new DataView(a.buffer, s), n = [];
    for (let l = 0; l < i; ++l) {
      n.push([]);
      for (let o = 0; o < t; ++o)
        switch (e) {
          case this.SignalType.INT16:
            n[l].push(
              r.getInt16((t * l + o) * 2, !0)
            );
            break;
          case this.SignalType.FLOAT32:
            n[l].push(
              r.getFloat32((t * l + o) * 4, !0)
            );
            break;
          case this.SignalType.INT32:
            n[l].push(
              r.getInt32((t * l + o) * 4, !0)
            );
            break;
          case this.SignalType.FLOAT24:
            n[l].push(0);
            break;
        }
    }
    this.signal = n, this.onGenericSignal(n);
  }
  _decodeStateVector(a) {
    if (this.stateVecOrder == null)
      return;
    let s = new Int8Array(a.buffer), e = s.indexOf(0), i = s.indexOf(0, e + 1), t = new TextDecoder(), r = parseInt(
      t.decode(s.slice(1, e))
    ), n = parseInt(
      t.decode(s.slice(e + 1, i))
    ), l = i + 1, o = new DataView(a.buffer, l), d = {};
    for (let h in this.stateFormat)
      d[h] = Array(n).fill(
        this.stateFormat[h].defaultValue
      );
    for (let h = 0; h < n; h++) {
      let p = new Uint8Array(
        o.buffer,
        o.byteOffset + h * r,
        r
      ), u = [];
      for (let c = 0; c < p.length; c++)
        u.push(p[c] & 1 ? 1 : 0), u.push(p[c] & 2 ? 1 : 0), u.push(p[c] & 4 ? 1 : 0), u.push(p[c] & 8 ? 1 : 0), u.push(p[c] & 16 ? 1 : 0), u.push(p[c] & 32 ? 1 : 0), u.push(p[c] & 64 ? 1 : 0), u.push(p[c] & 128 ? 1 : 0);
      for (let c = 0; c < this.stateVecOrder.length; c++) {
        let m = this.stateFormat[this.stateVecOrder[c][0]], x = m.byteLocation * 8 + m.bitLocation, g = 0, w = 1;
        for (let f = 0; f < m.bitWidth; f++)
          u[x + f] && (g = (g | w) >>> 0), w = w << 1 >>> 0;
        d[this.stateVecOrder[c][0]][h] = g;
      }
    }
    this.onStateVector(d), this.states = d;
  }
}
export {
  F as BCI2K_DataConnection,
  V as BCI2K_OperatorConnection
};
