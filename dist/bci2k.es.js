import k from "websocket";
const S = k.w3cwebsocket;
class V {
  // udpSocket: any;
  // onSystemStateChange: (x: string) => string;
  constructor(e) {
    this.ondisconnect = () => {
    }, this.onStateChange = () => {
    }, this.websocket = null, this.state = "", this.address = e || void 0, this.latestIncomingData = "", this.msgID = 0, this.newData = () => {
    };
  }
  connect(e) {
    return new Promise((n, s) => {
      this.address === void 0 && (this.address = e || "ws://127.0.0.1:80"), this.websocket = new S(this.address), this.websocket.onerror = () => {
        s(`Error connecting to BCI2000 at ${this.address}`);
      }, this.websocket.onclose = () => {
        this.ondisconnect();
      }, this.websocket.onopen = () => {
        n();
      }, this.websocket.onmessage = ({ data: t }) => {
        t.includes("BCI2000 Version") || this.newData(t);
      };
    });
  }
  // public async connectUDP(port?: number) {
  //   return new Promise<string>(async (resolve, reject) => {
  //     const udpServer = dgram.createSocket("udp4");
  //     udpServer.bind(port, () => resolve("UDP server running"));
  //     udpServer.on("message", (x) => {
  //       const systemState = `${x}`.split("\r")[0].split("\t")[1];
  //       this.onSystemStateChange(systemState);
  //     });
  //     udpServer.on("error", (err) => {
  //       reject(err);
  //     });
  //   });
  // }
  disconnect() {
    this.websocket.close();
  }
  connected() {
    return this.websocket !== null && this.websocket.readyState === S.OPEN;
  }
  execute(e) {
    return this.connected() ? new Promise((n, s) => {
      this.websocket.send(e), this.newData = (t) => {
        t.includes("Error: ") ? s(t) : n(t);
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
  async startExecutable(e) {
    await this.execute(`Start executable ${e}`);
  }
  async startDummyRun() {
    await this.execute("Startup system"), await this.startExecutable("SignalGenerator"), await this.startExecutable("DummySignalProcessing"), await this.startExecutable("DummyApplication"), await this.execute("Set Config"), await this.execute("Start");
  }
  async setWatch(e, n, s) {
    await this.execute("Add watch " + e + " at " + n + ":" + s);
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
      const e = await this.execute("GET SYSTEM STATE");
      e.trim() != this.state && this.onStateChange(e.trim());
    }, 1e3);
  }
  async getSubjectName() {
    return await this.execute("Get Parameter SubjectName");
  }
  async getTaskName() {
    return await this.execute("Get Parameter DataFile");
  }
  async setParameter(e) {
    await this.execute(`Set paramater ${e}`);
  }
  async setState(e) {
    await this.execute(`Set state ${e}`);
  }
  //See https://www.bci2000.org/mediawiki/index.php/Technical_Reference:Parameter_Definition
  async getParameters() {
    const n = (await this.execute("List Parameters")).split(`
`), s = {};
    let t;
    return n.forEach((i) => {
      var p, c;
      const a = i.split("=")[0], o = a.split(" ")[1], l = a.split(" ")[2], r = a.split(" ")[0].split(":");
      r.forEach((g, m) => {
        switch (m) {
          case 0: {
            s[r[0]] == null && (s[r[0]] = {}), t = s[r[0]];
            break;
          }
          case 1: {
            s[r[0]][r[1]] == null && (s[r[0]][r[1]] = {}), t = s[r[0]][r[1]];
            break;
          }
          case 2: {
            s[r[0]][r[1]][r[2]] == null && (s[r[0]][r[1]][r[2]] = {}), t = s[r[0]][r[1]][r[2]];
            break;
          }
        }
      });
      const d = ((p = i.split("=")[1]) == null ? void 0 : p.split("//")) ?? [""], h = (c = d[0]) == null ? void 0 : c.trim(), u = h.split(" ");
      o != "matrix" ? (h == null ? void 0 : h.split(" ").length) == 4 ? t[l] = {
        dataType: o,
        value: {
          value: u[0],
          defaultValue: u[1],
          low: u[2],
          high: u[3]
        },
        comment: d[1]
      } : t[l] = {
        dataType: o,
        value: h,
        comment: d[1]
      } : t[l] = {
        dataType: o,
        value: h,
        comment: d[1]
      };
    }), s;
  }
}
const y = k.w3cwebsocket;
class F {
  constructor(e) {
    this.websocket = null, this.onconnect = () => {
    }, this.onGenericSignal = () => {
    }, this.onStateVector = () => {
    }, this.onSignalProperties = () => {
    }, this.onStateFormat = () => {
    }, this.ondisconnect = () => {
    }, this.onReceiveBlock = () => {
    }, this.callingFrom = "", this.states = {}, this.signal = null, this.signalProperties = null, this.stateFormat = null, this.stateVecOrder = null, this.SignalType = {
      INT16: 0,
      FLOAT24: 1,
      FLOAT32: 2,
      INT32: 3
    }, this.address = e;
  }
  getNullTermString(e) {
    let n = "", s = 0;
    for (; s < e.byteLength; ) {
      const t = e.getUint8(s);
      if (s++, t == 0)
        break;
      n += String.fromCharCode(t);
    }
    return n;
  }
  connect(e, n) {
    return this.address === void 0 && (this.address = e), this.callingFrom = n, new Promise((s, t) => {
      this.websocket = new y(this.address), this.websocket.binaryType = "arraybuffer", this.websocket.onerror = () => {
        t("Error connecting to data source at " + this.address);
      }, this.websocket.onopen = () => {
        s();
      }, this.websocket.onclose = () => {
        this.ondisconnect();
      }, this.websocket.onmessage = (i) => {
        this._decodeMessage(i.data);
      };
    });
  }
  disconnect() {
    this.websocket.close();
  }
  connected() {
    return this.websocket !== null && this.websocket.readyState === y.OPEN;
  }
  _decodeMessage(e) {
    const n = new DataView(e, 0, 1).getUint8(0);
    switch (n) {
      case 3: {
        const s = new DataView(e, 1, e.byteLength - 1);
        this._decodeStateFormat(s);
        break;
      }
      case 4: {
        const s = new DataView(e, 1, 2).getUint8(0);
        switch (s) {
          case 1: {
            const t = new DataView(
              e,
              2,
              e.byteLength - 2
            );
            this._decodeGenericSignal(t);
            break;
          }
          case 3: {
            const t = new DataView(
              e,
              2,
              e.byteLength - 2
            );
            this._decodeSignalProperties(t);
            break;
          }
          default:
            console.error("Unsupported Supplement: " + s.toString());
            break;
        }
        this.onReceiveBlock();
        break;
      }
      case 5: {
        const s = new DataView(e, 1, e.byteLength - 1);
        this._decodeStateVector(s);
        break;
      }
      default:
        console.error("Unsupported Descriptor: " + n.toString());
        break;
    }
  }
  _decodePhysicalUnits(e) {
    const n = {}, s = e.split(" ");
    let t = 0;
    return n.offset = Number(s[t++]), n.gain = Number(s[t++]), n.symbol = s[t++], n.vmin = Number(s[t++]), n.vmax = Number(s[t++]), n;
  }
  _decodeSignalProperties(e) {
    let n = this.getNullTermString(e);
    n = n.replace(/{/g, " { "), n = n.replace(/}/g, " } "), this.signalProperties = {
      name: "",
      channels: [],
      elements: [],
      numelements: 0,
      signaltype: "",
      channelunit: null,
      elementunit: null,
      valueunits: []
    };
    const s = n.split(" "), t = [];
    for (let a = 0; a < s.length; a++)
      s[a].trim() !== "" && t.push(s[a]);
    let i = 0;
    if (this.signalProperties.name = t[i++], this.signalProperties.channels = [], t[i] === "{") {
      for (; t[++i] !== "}"; )
        this.signalProperties.channels.push(t[i]);
      i++;
    } else {
      const a = parseInt(t[i++]);
      for (let o = 0; o < a; o++)
        this.signalProperties.channels.push((o + 1).toString());
    }
    if (this.signalProperties.elements = [], t[i] === "{") {
      for (; t[++i] !== "}"; )
        this.signalProperties.elements.push(t[i]);
      i++;
    } else {
      const a = parseInt(t[i++]);
      for (let o = 0; o < a; o++)
        this.signalProperties.elements.push((o + 1).toString());
    }
    this.signalProperties.numelements = this.signalProperties.elements.length, this.signalProperties.signaltype = t[i++], this.signalProperties.channelunit = this._decodePhysicalUnits(
      t.slice(i, i += 5).join(" ")
    ), this.signalProperties.elementunit = this._decodePhysicalUnits(
      t.slice(i, i += 5).join(" ")
    ), i++, this.signalProperties.valueunits = [];
    for (let a = 0; a < this.signalProperties.channels.length; a++)
      this.signalProperties.valueunits.push(
        this._decodePhysicalUnits(t.slice(i, i += 5).join(" "))
      );
    i++, this.onSignalProperties(this.signalProperties);
  }
  _decodeStateFormat(e) {
    this.stateFormat = {};
    const s = this.getNullTermString(e).split(`
`);
    for (let i = 0; i < s.length; i++) {
      if (s[i].trim().length === 0)
        continue;
      const a = s[i].split(" "), o = a[0];
      this.stateFormat[o] = {
        bitWidth: 0,
        defaultValue: 0,
        byteLocation: 0,
        bitLocation: 0
      }, this.stateFormat[o].bitWidth = parseInt(a[1]), this.stateFormat[o].defaultValue = parseInt(a[2]), this.stateFormat[o].byteLocation = parseInt(a[3]), this.stateFormat[o].bitLocation = parseInt(a[4]);
    }
    const t = [];
    for (const i in this.stateFormat) {
      let a = this.stateFormat[i].byteLocation * 8;
      a += this.stateFormat[i].bitLocation, t.push([i, a]);
    }
    t.sort((i, a) => i[1] < a[1] ? -1 : i[1] > a[1] ? 1 : 0), this.stateVecOrder = [];
    for (let i = 0; i < t.length; i++) {
      const a = t[i][0];
      this.stateVecOrder.push([a, this.stateFormat[a].bitWidth]);
    }
    this.onStateFormat(this.stateFormat);
  }
  _decodeGenericSignal(e) {
    let n = 0;
    const s = e.getUint8(n);
    n = n + 1;
    const t = e.getUint16(n, !0);
    n = n + 2;
    const i = e.getUint16(n, !0);
    n = n + 2, n = n + e.byteOffset;
    const a = new DataView(e.buffer, n), o = [];
    for (let l = 0; l < t; ++l) {
      o.push([]);
      for (let r = 0; r < i; ++r)
        switch (s) {
          case this.SignalType.INT16:
            o[l].push(
              a.getInt16((i * l + r) * 2, !0)
            );
            break;
          case this.SignalType.FLOAT32:
            o[l].push(
              a.getFloat32((i * l + r) * 4, !0)
            );
            break;
          case this.SignalType.INT32:
            o[l].push(
              a.getInt32((i * l + r) * 4, !0)
            );
            break;
          case this.SignalType.FLOAT24:
            o[l].push(0);
            break;
        }
    }
    this.signal = o, this.onGenericSignal(o);
  }
  _decodeStateVector(e) {
    if (this.stateVecOrder == null)
      return;
    const n = new Int8Array(e.buffer), s = n.indexOf(0), t = n.indexOf(0, s + 1), i = new TextDecoder(), a = parseInt(
      i.decode(n.slice(1, s))
    ), o = parseInt(
      i.decode(n.slice(s + 1, t))
    ), l = t + 1, r = new DataView(e.buffer, l), d = {};
    for (const h in this.stateFormat)
      d[h] = Array(o).fill(
        this.stateFormat[h].defaultValue
      );
    for (let h = 0; h < o; h++) {
      const u = new Uint8Array(
        r.buffer,
        r.byteOffset + h * a,
        a
      ), p = [];
      for (let c = 0; c < u.length; c++)
        p.push(u[c] & 1 ? 1 : 0), p.push(u[c] & 2 ? 1 : 0), p.push(u[c] & 4 ? 1 : 0), p.push(u[c] & 8 ? 1 : 0), p.push(u[c] & 16 ? 1 : 0), p.push(u[c] & 32 ? 1 : 0), p.push(u[c] & 64 ? 1 : 0), p.push(u[c] & 128 ? 1 : 0);
      for (let c = 0; c < this.stateVecOrder.length; c++) {
        const g = this.stateFormat[this.stateVecOrder[c][0]], m = g.byteLocation * 8 + g.bitLocation;
        let w = 0, b = 1;
        for (let f = 0; f < g.bitWidth; f++)
          p[m + f] && (w = (w | b) >>> 0), b = b << 1 >>> 0;
        d[this.stateVecOrder[c][0]][h] = w;
      }
    }
    this.onStateVector(d), this.states = d;
  }
}
export {
  F as BCI2K_DataConnection,
  V as BCI2K_OperatorConnection
};
