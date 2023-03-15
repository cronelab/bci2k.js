import y from "websocket";
const b = y.w3cwebsocket;
class V {
  constructor(i) {
    this.ondisconnect = () => {
    }, this.onStateChange = (s) => {
    }, this.websocket = null, this.state = "", this.address = i || void 0, this.latestIncomingData = "", this.msgID = 0, this.newData = () => {
    }, this.responseBuffer = [];
  }
  connect(i) {
    return new Promise((s, e) => {
      this.address === void 0 && (this.address = i || "ws://127.0.0.1:80"), this.websocket = new b(this.address), this.websocket.onerror = (a) => e(`Error connecting to BCI2000 at ${this.address}`), this.websocket.onclose = () => {
        console.log("Connection closed"), this.ondisconnect();
      }, this.websocket.onopen = () => s(), this.websocket.onmessage = (a) => {
        let { opcode: t, id: n, contents: r } = JSON.parse(a.data);
        switch (t) {
          case "O":
            this.responseBuffer.push({ id: n, response: r }), this.newData(r);
            break;
        }
      };
    });
  }
  disconnect() {
    this.websocket.close();
  }
  connected() {
    return this.websocket !== null && this.websocket.readyState === b.OPEN;
  }
  execute(i) {
    return this.connected() ? new Promise((s, e) => {
      this.msgID = this.msgID + 1, this.websocket.send(
        JSON.stringify({
          opcode: "E",
          id: this.msgID,
          contents: i
        })
      ), this.newData = (a) => s(a);
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
  async startExecutable(i) {
    await this.execute(`Start executable ${i}`);
  }
  async startDummyRun() {
    await this.startExecutable("SignalGenerator"), await this.startExecutable("DummySignalProcessing"), await this.startExecutable("DummyApplication");
  }
  async setWatch(i, s, e) {
    await this.execute("Add watch " + i + " at " + s + ":" + e);
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
      let i = await this.execute("GET SYSTEM STATE");
      i.trim() != this.state && this.onStateChange(i.trim());
    }, 1e3);
  }
  async getSubjectName() {
    return await this.execute("Get Parameter SubjectName");
  }
  async getTaskName() {
    return await this.execute("Get Parameter DataFile");
  }
  async setParameter(i) {
    await this.execute(`Set paramater ${i}`);
  }
  async setState(i) {
    await this.execute(`Set state ${i}`);
  }
  //See https://www.bci2000.org/mediawiki/index.php/Technical_Reference:Parameter_Definition
  async getParameters() {
    let s = (await this.execute("List Parameters")).split(`
`), e = {}, a;
    return s.forEach((t) => {
      let n = t.split("=")[0], r = n.split(" ")[1], l = n.split(" ")[2], o = n.split(" ")[0].split(":");
      o.forEach((d, h) => {
        switch (h) {
          case 0: {
            e[o[0]] == null && (e[o[0]] = {}), a = e[o[0]];
            break;
          }
          case 1: {
            e[o[0]][o[1]] == null && (e[o[0]][o[1]] = {}), a = e[o[0]][o[1]];
            break;
          }
          case 2: {
            e[o[0]][o[1]][o[2]] == null && (e[o[0]][o[1]][o[2]] = {}), a = e[o[0]][o[1]][o[2]];
            break;
          }
        }
      }), r != "matrix" ? t.split("=")[1].split("//")[0].trim().split(" ").length == 4 ? a[l] = {
        dataType: r,
        value: {
          value: t.split("=")[1].split("//")[0].trim().split(" ")[0],
          defaultValue: t.split("=")[1].split("//")[0].trim().split(" ")[1],
          low: t.split("=")[1].split("//")[0].trim().split(" ")[2],
          high: t.split("=")[1].split("//")[0].trim().split(" ")[3]
        },
        comment: t.split("=")[1].split("//")[1]
      } : a[l] = {
        dataType: r,
        value: t.split("=")[1].split("//")[0].trim(),
        comment: t.split("=")[1].split("//")[1]
      } : a[l] = {
        dataType: r,
        value: t.split("=")[1].split("//")[0].trim(),
        comment: t.split("=")[1].split("//")[1]
      };
    }), e;
  }
}
const S = y.w3cwebsocket;
class I {
  constructor(i) {
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
    }, this.address = i;
  }
  getNullTermString(i) {
    var s = "";
    let e = 0;
    for (; e < i.byteLength; ) {
      var a = i.getUint8(e);
      if (e++, a == 0)
        break;
      s += String.fromCharCode(a);
    }
    return s;
  }
  connect(i, s) {
    let e = this;
    return e.address === void 0 && (e.address = i), this.callingFrom = s, new Promise((a, t) => {
      e._socket = new S(e.address), e._socket.binaryType = "arraybuffer", e._socket.onerror = () => {
        t("Error connecting to data source at " + e.address);
      }, e._socket.onopen = () => {
        e.onconnect(), a();
      }, e._socket.onclose = () => {
        e.ondisconnect(), setTimeout(() => {
          console.log("Disconnected"), this.connect("");
        }, 1e3);
      }, e._socket.onmessage = (n) => {
        e._decodeMessage(n.data);
      };
    });
  }
  connected() {
    return this._socket != null && this._socket.readyState === S.OPEN;
  }
  _decodeMessage(i) {
    let s = new DataView(i, 0, 1).getUint8(0);
    switch (s) {
      case 3:
        let e = new DataView(i, 1, i.byteLength - 1);
        this._decodeStateFormat(e);
        break;
      case 4:
        let a = new DataView(i, 1, 2).getUint8(0);
        switch (a) {
          case 1:
            let n = new DataView(i, 2, i.byteLength - 2);
            this._decodeGenericSignal(n);
            break;
          case 3:
            let r = new DataView(i, 2, i.byteLength - 2);
            this._decodeSignalProperties(r);
            break;
          default:
            console.error("Unsupported Supplement: " + a.toString());
            break;
        }
        this.onReceiveBlock();
        break;
      case 5:
        let t = new DataView(i, 1, i.byteLength - 1);
        this._decodeStateVector(t);
        break;
      default:
        console.error("Unsupported Descriptor: " + s.toString());
        break;
    }
  }
  _decodePhysicalUnits(i) {
    let s;
    s = {};
    let e = i.split(" "), a = 0;
    return s.offset = Number(e[a++]), s.gain = Number(e[a++]), s.symbol = e[a++], s.vmin = Number(e[a++]), s.vmax = Number(e[a++]), s;
  }
  _decodeSignalProperties(i) {
    let s = this.getNullTermString(i);
    s = s.replace(/{/g, " { "), s = s.replace(/}/g, " } "), this.signalProperties = {};
    let e = s.split(" "), a = [];
    for (let n = 0; n < e.length; n++)
      e[n].trim() !== "" && a.push(e[n]);
    let t = 0;
    if (this.signalProperties.name = a[t++], this.signalProperties.channels = [], a[t] === "{") {
      for (; a[++t] !== "}"; )
        this.signalProperties.channels.push(a[t]);
      t++;
    } else {
      let n = parseInt(a[t++]);
      for (let r = 0; r < n; r++)
        this.signalProperties.channels.push((r + 1).toString());
    }
    if (this.signalProperties.elements = [], a[t] === "{") {
      for (; a[++t] !== "}"; )
        this.signalProperties.elements.push(a[t]);
      t++;
    } else {
      let n = parseInt(a[t++]);
      for (let r = 0; r < n; r++)
        this.signalProperties.elements.push((r + 1).toString());
    }
    this.signalProperties.numelements = this.signalProperties.elements.length, this.signalProperties.signaltype = a[t++], this.signalProperties.channelunit = this._decodePhysicalUnits(
      a.slice(t, t += 5).join(" ")
    ), this.signalProperties.elementunit = this._decodePhysicalUnits(
      a.slice(t, t += 5).join(" ")
    ), t++, this.signalProperties.valueunits = [];
    for (let n = 0; n < this.signalProperties.channels.length; n++)
      this.signalProperties.valueunits.push(
        this._decodePhysicalUnits(a.slice(t, t += 5).join(" "))
      );
    t++, this.onSignalProperties(this.signalProperties);
  }
  _decodeStateFormat(i) {
    this.stateFormat = {};
    let e = this.getNullTermString(i).split(`
`);
    for (let t = 0; t < e.length; t++) {
      if (e[t].trim().length === 0)
        continue;
      let n = e[t].split(" "), r = n[0];
      this.stateFormat[r] = {}, this.stateFormat[r].bitWidth = parseInt(n[1]), this.stateFormat[r].defaultValue = parseInt(n[2]), this.stateFormat[r].byteLocation = parseInt(n[3]), this.stateFormat[r].bitLocation = parseInt(n[4]);
    }
    let a = [];
    for (let t in this.stateFormat) {
      let n = this.stateFormat[t].byteLocation * 8;
      n += this.stateFormat[t].bitLocation, a.push([t, n]);
    }
    a.sort((t, n) => t[1] < n[1] ? -1 : t[1] > n[1] ? 1 : 0), this.stateVecOrder = [];
    for (let t = 0; t < a.length; t++) {
      let n = a[t][0];
      this.stateVecOrder.push([n, this.stateFormat[n].bitWidth]);
    }
    this.onStateFormat(this.stateFormat);
  }
  _decodeGenericSignal(i) {
    let s = 0, e = i.getUint8(s);
    s = s + 1;
    let a = i.getUint16(s, !0);
    s = s + 2;
    let t = i.getUint16(s, !0);
    s = s + 2, s = s + i.byteOffset;
    let n = new DataView(i.buffer, s), r = [];
    for (let l = 0; l < a; ++l) {
      r.push([]);
      for (let o = 0; o < t; ++o)
        switch (e) {
          case this.SignalType.INT16:
            r[l].push(
              n.getInt16((t * l + o) * 2, !0)
            );
            break;
          case this.SignalType.FLOAT32:
            r[l].push(
              n.getFloat32((t * l + o) * 4, !0)
            );
            break;
          case this.SignalType.INT32:
            r[l].push(
              n.getInt32((t * l + o) * 4, !0)
            );
            break;
          case this.SignalType.FLOAT24:
            r[l].push(0);
            break;
        }
    }
    this.signal = r, this.onGenericSignal(r);
  }
  _decodeStateVector(i) {
    if (this.stateVecOrder == null)
      return;
    let s = new Int8Array(i.buffer), e = s.indexOf(0), a = s.indexOf(0, e + 1), t = new TextDecoder(), n = parseInt(
      t.decode(s.slice(1, e))
    ), r = parseInt(
      t.decode(s.slice(e + 1, a))
    ), l = a + 1, o = new DataView(i.buffer, l), d = {};
    for (let h in this.stateFormat)
      d[h] = Array(r).fill(
        this.stateFormat[h].defaultValue
      );
    for (let h = 0; h < r; h++) {
      let p = new Uint8Array(
        o.buffer,
        o.byteOffset + h * n,
        n
      ), u = [];
      for (let c = 0; c < p.length; c++)
        u.push(p[c] & 1 ? 1 : 0), u.push(p[c] & 2 ? 1 : 0), u.push(p[c] & 4 ? 1 : 0), u.push(p[c] & 8 ? 1 : 0), u.push(p[c] & 16 ? 1 : 0), u.push(p[c] & 32 ? 1 : 0), u.push(p[c] & 64 ? 1 : 0), u.push(p[c] & 128 ? 1 : 0);
      for (let c = 0; c < this.stateVecOrder.length; c++) {
        let g = this.stateFormat[this.stateVecOrder[c][0]], x = g.byteLocation * 8 + g.bitLocation, m = 0, w = 1;
        for (let f = 0; f < g.bitWidth; f++)
          u[x + f] && (m = (m | w) >>> 0), w = w << 1 >>> 0;
        d[this.stateVecOrder[c][0]][h] = m;
      }
    }
    this.onStateVector(d), this.states = d;
  }
}
export {
  I as BCI2K_DataConnection,
  V as BCI2K_OperatorConnection
};
