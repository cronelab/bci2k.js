// ======================================================================== //
//
// bci2k.js
// A javascript connector for BCI2000
//
// ======================================================================== //

// REQUIRES
var jDataView = require("jdataview");

//Node vs Browser environments
let websocket = null;
if (typeof window === "undefined") {
  websocket = require("websocket").w3cwebsocket;

} else {
  websocket = WebSocket;
}

class BCI2K_OperatorConnection {
  constructor() {
    this.onconnect = event => {};
    this.ondisconnect = event => {};

    this._socket = null;
    this._execid = 0;
    this._exec = {};
  }

  connect(address) {
    let connection = this;

    return new Promise((resolve, reject) => {
      if (address === undefined)
        // TODO Browser-dependent
        address = window.location.host;

      connection.address = address;

      connection._socket = new websocket("ws://" + connection.address);

      connection._socket.onerror = error => {
        // This will only execute if we err before connecting, since
        // Promises can only get triggered once
        reject("Error connecting to BCI2000 at " + connection.address);
      };

      connection._socket.onopen = event => {
        connection.onconnect(event);
        resolve(event);
      };

      connection._socket.onclose = event => {
        // console.log("TEST")
        connection.ondisconnect(event);
      };

      connection._socket.onmessage = event => {
        connection._handleMessageEvent(event);
      };
    });
  }

  _handleMessageEvent(event) {
    let arr = event.data.split(" ");

    let opcode = arr[0];
    let id = arr[1];
    let msg = arr.slice(2).join(" ");

    switch (opcode) {
      case "S": // START: Starting to execute command
        if (this._exec[id].onstart) this._exec[id].onstart(this._exec[id]);
        break;
      case "O": // OUTPUT: Received output from command
        this._exec[id].output += msg + " \n";
        if (this._exec[id].onoutput) this._exec[id].onoutput(this._exec[id]);
        break;
      case "D": // DONE: Done executing command
        this._exec[id].exitcode = parseInt(msg);
        if (this._exec[id].ondone) this._exec[id].ondone(this._exec[id]);
        delete this._exec[id];
        break;
      default:
        break;
    }
  }

  tap(location, onSuccess, onFailure) {
    let connection = this;

    let locationParameter = "WS" + location + "Server";

    return this.execute("Get Parameter " + locationParameter).then(location => {
      if (location.indexOf("does not exist") >= 0) {
        return Promise.reject("Location parameter does not exist");
      }
      if (location === "") {
        return Promise.reject("Location parameter not set");
      }

      let dataConnection = new BCI2K_DataConnection();

      // Use our address plus the port from the result
      return dataConnection
        .connect(connection.address + ":" + location.split(":")[1])
        .then(event => {
          // To keep with our old API, we actually want to wrap the
          // dataConnection, and not the connection event
          // TODO This means we can't get the connection event!
          return dataConnection;
        });
    });
  }

  connected() {
    return this._socket !== null && this._socket.readyState === websocket.OPEN;
  }

  execute(instruction, ondone, onstart, onoutput) {
    let connection = this;

    if (this.connected()) {
      return new Promise((resolve, reject) => {
        let id = (++connection._execid).toString();

        // TODO Properly handle errors from BCI2000
        connection._exec[id] = {
          onstart: onstart,
          onoutput: onoutput,
          ondone: exec => {
            if (ondone) {
              ondone(exec);
            }
            resolve(exec.output); // TODO Should pass whole thing?
          },
          output: "",
          exitcode: null
        };
        let msg = "E " + id + " " + instruction;
        connection._socket.send(msg);
      });
    }

    // Cannot execute if not connected
    return Promise.reject("Cannot execute instruction: not connected to BCI2000");
  }

  getVersion() {
    this.execute("Version").then(x => console.log(x.split(" ")[1]));
  }

  showWindow() {
    return this.execute("Show Window");
  }

  hideWindow() {
    return this.execute("Hide Window");
  }

  setWatch(state, ip, port) {
    return this.execute("Add watch " + state + " at " + ip + ":" + port);
  }

  resetSystem() {
    return this.execute("Reset System");
  }

  setConfig() {
    return this.execute("Set Config");
  }

  start() {
    return this.execute("Start");
  }

  stop() {
    return this.execute("Stop");
  }

  kill() {
    return this.execute("Exit");
  }
}

class BCI2K_DataConnection {
  constructor() {
    this._socket = null;

    this.onconnect = event => {};
    this.onGenericSignal = data => {};
    this.onStateVector = data => {};
    this.onSignalProperties = data => {};
    this.onStateFormat = data => {};
    this.ondisconnect = event => {};
    this.onReceiveBlock = () => {};

    this.states = {};
    this.signal = null;
    this.signalProperties = null;
    this.stateFormat = null;
    this.stateVecOrder = null;

    this.SignalType = {
      INT16: 0,
      FLOAT24: 1,
      FLOAT32: 2,
      INT32: 3
    };
  }

  getNullTermString(dv) {
    var val = "";
    while (dv._offset < dv.byteLength) {
      var v = dv.getUint8();
      if (v == 0) break;
      val += String.fromCharCode(v);
    }
    return val;
  }
  getLengthField(dv, n) {
    var len = 0;
    var extended = false;
    switch (n) {
      case 1:
        len = dv.getUint8();
        extended = len == 0xff;
        break;
      case 2:
        len = dv.getUint16();
        extended = len == 0xffff;
        break;
      case 4:
        len = dv.getUint32();
        extended = len == 0xffffffff;
        break;
      default:
        console.error("unsupported");
        break;
    }
    return extended ? parseInt(this.getNullTermString(dv)) : len;
  }

  connect(address) {
    let connection = this;

    return new Promise((resolve, reject) => {
      connection._socket = new websocket("ws://" + address);

      connection._socket.onerror = function (event) {
        // This will only execute if we err before connecting, since
        // Promises can only get triggered once
        reject("Error connecting to data source at " + connection.address);
      };

      connection._socket.onopen = event => {
        connection.onconnect(event);
        resolve(event);
      };

      connection._socket.onclose = event => {
        // setTimeout(() => {
        //   this.connect(connection._socket.url.split('//')[1])
        // }, 1000);
        connection.ondisconnect(event);
      };

      connection._socket.onmessage = event => {
        connection._handleMessageEvent(event);
      };
    });
  }

  _handleMessageEvent(event) {
    let connection = this;

    //This is stupid. Node uses buffers and browsers use blobs.
    if (typeof window === "undefined") {
      connection._decodeMessage(event.data);
    } else {
      let messageInterpreter = new FileReader()
      messageInterpreter.onload = e => {
        connection._decodeMessage(e.target.result);
      };
      messageInterpreter.readAsArrayBuffer(event.data);
    }
  }

  connected() {
    return this._socket != null && this._socket.readyState === websocket.OPEN;
  }

  _decodeMessage(data) {
    let dv = jDataView(data, 0, data.byteLength, true);
    // var dv = new DataView(data, 0, data.byteLength, true);

    let descriptor = dv.getUint8();

    switch (descriptor) {
      case 3:
        this._decodeStateFormat(dv);
        break;

      case 4:
        var supplement = dv.getUint8();

        switch (supplement) {
          case 1:
            this._decodeGenericSignal(dv);
            break;
          case 3:
            this._decodeSignalProperties(dv);
            break;
          default:
            console.error("Unsupported Supplement: " + supplement.toString());
            break;
        }
        this.onReceiveBlock();
        break;

      case 5:
        this._decodeStateVector(dv);
        break;

      default:
        console.error("Unsupported Descriptor: " + descriptor.toString());
        break;
    }
  }

  _decodePhysicalUnits(unitstr) {
    let units = {};
    let unit = unitstr.split(" ");
    let idx = 0;
    units.offset = Number(unit[idx++]);
    units.gain = Number(unit[idx++]);
    units.symbol = unit[idx++];
    units.vmin = Number(unit[idx++]);
    units.vmax = Number(unit[idx++]);
    return units;
  }

  _decodeSignalProperties(dv) {
    let propstr = this.getNullTermString(dv);

    // Bugfix: There seems to not always be spaces after '{' characters
    propstr = propstr.replace(/{/g, " { ");
    propstr = propstr.replace(/}/g, " } ");

    this.signalProperties = {};
    let prop_tokens = propstr.split(" ");
    let props = [];
    for (let i = 0; i < prop_tokens.length; i++) {
      if ((prop_tokens[i].trim()) === "") continue;
      props.push(prop_tokens[i]);
    }

    let pidx = 0;
    this.signalProperties.name = props[pidx++];

    this.signalProperties.channels = [];
    if (props[pidx] === "{") {
      while (props[++pidx] !== "}")
        this.signalProperties.channels.push(props[pidx]);
      pidx++; // }
    } else {
      let numChannels = parseInt(props[pidx++]);
      for (let i = 0; i < numChannels; i++)
        this.signalProperties.channels.push((i + 1).toString());
    }

    this.signalProperties.elements = [];
    if (props[pidx] === "{") {
      while (props[++pidx] !== "}")
        this.signalProperties.elements.push(props[pidx]);
      pidx++; // }
    } else {
      let numElements = parseInt(props[pidx++]);
      for (let i = 0; i < numElements; i++)
        this.signalProperties.elements.push((i + 1).toString());
    }

    // Backward Compatibility
    this.signalProperties.numelements = this.signalProperties.elements.length;
    this.signalProperties.signaltype = props[pidx++];
    this.signalProperties.channelunit = this._decodePhysicalUnits(
      props.slice(pidx, (pidx += 5)).join(" ")
    );

    this.signalProperties.elementunit = this._decodePhysicalUnits(
      props.slice(pidx, (pidx += 5)).join(" ")
    );

    pidx++; // '{'

    this.signalProperties.valueunits = [];
    for (let i = 0; i < this.signalProperties.channels.length; i++)
      this.signalProperties.valueunits.push(
        this._decodePhysicalUnits(props.slice(pidx, (pidx += 5)).join(" "))
      );

    pidx++; // '}'

    this.onSignalProperties(this.signalProperties);
  }

  _decodeStateFormat(dv) {
    this.stateFormat = {};
    let formatStr = this.getNullTermString(dv);

    let lines = formatStr.split("\n");
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      if ((lines[lineIdx].trim()).length === 0) continue;
      let stateline = lines[lineIdx].split(" ");
      let name = stateline[0];
      this.stateFormat[name] = {};
      this.stateFormat[name].bitWidth = parseInt(stateline[1]);
      this.stateFormat[name].defaultValue = parseInt(stateline[2]);
      this.stateFormat[name].byteLocation = parseInt(stateline[3]);
      this.stateFormat[name].bitLocation = parseInt(stateline[4]);
    }

    let vecOrder = [];
    for (let state in this.stateFormat) {
      let loc = this.stateFormat[state].byteLocation * 8;
      loc += this.stateFormat[state].bitLocation;
      vecOrder.push([state, loc]);
    }

    // Sort by bit location
    vecOrder.sort((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0);

    // Create a list of ( state, bitwidth ) for decoding state vectors
    this.stateVecOrder = [];
    for (let i = 0; i < vecOrder.length; i++) {
      let state = vecOrder[i][0];
      this.stateVecOrder.push([state, this.stateFormat[state].bitWidth]);
    }

    this.onStateFormat(this.stateFormat);
  }

  _decodeGenericSignal(dv) {
    let signalType = dv.getUint8();
    let nChannels = this.getLengthField(dv, 2);
    let nElements = this.getLengthField(dv, 2);

    let signal = [];
    for (let ch = 0; ch < nChannels; ++ch) {
      signal.push([]);
      for (let el = 0; el < nElements; ++el) {
        switch (signalType) {
          case this.SignalType.INT16:
            signal[ch].push(dv.getInt16());
            break;

          case this.SignalType.FLOAT32:
            signal[ch].push(dv.getFloat32());
            break;

          case this.SignalType.INT32:
            signal[ch].push(dv.getInt32());
            break;

          case this.SignalType.FLOAT24:
            // TODO: Currently Unsupported
            signal[ch].push(0.0);
            break;
          default:
            break;
        }
      }
    }
    this.signal = signal;
    this.onGenericSignal(signal);
  }

  _decodeStateVector(dv) {
    if (this.stateVecOrder == null) return;

    // Currently, states are maximum 32 bit unsigned integers
    // BitLocation 0 refers to the least significant bit of a byte in the packet
    // ByteLocation 0 refers to the first byte in the sequence.
    // Bits must be populated in increasing significance

    let stateVectorLength = parseInt(this.getNullTermString(dv));
    let numVectors = parseInt(this.getNullTermString(dv));

    let states = {};
    for (let state in this.stateFormat)
      states[state] = Array(numVectors).fill(
        this.stateFormat[state].defaultValue
      );

    for (let vecIdx = 0; vecIdx < numVectors; vecIdx++) {
      let vec = dv.getBytes(stateVectorLength, dv.tell(), true, false);
      let bits = [];
      for (let byteIdx = 0; byteIdx < vec.length; byteIdx++) {
        bits.push((vec[byteIdx] & 0x01) !== 0 ? 1 : 0);
        bits.push((vec[byteIdx] & 0x02) !== 0 ? 1 : 0);
        bits.push((vec[byteIdx] & 0x04) !== 0 ? 1 : 0);
        bits.push((vec[byteIdx] & 0x08) !== 0 ? 1 : 0);
        bits.push((vec[byteIdx] & 0x10) !== 0 ? 1 : 0);
        bits.push((vec[byteIdx] & 0x20) !== 0 ? 1 : 0);
        bits.push((vec[byteIdx] & 0x40) !== 0 ? 1 : 0);
        bits.push((vec[byteIdx] & 0x80) !== 0 ? 1 : 0);
      }

      for (let stateIdx = 0; stateIdx < this.stateVecOrder.length; stateIdx++) {
        let fmt = this.stateFormat[this.stateVecOrder[stateIdx][0]];
        let offset = fmt.byteLocation * 8 + fmt.bitLocation;
        let val = 0;
        let mask = 0x01;
        for (let bIdx = 0; bIdx < fmt.bitWidth; bIdx++) {
          if (bits[offset + bIdx]) val = (val | mask) >>> 0;
          mask = (mask << 1) >>> 0;
        }
        states[this.stateVecOrder[stateIdx][0]][vecIdx] = val;
      }
    }
    this.onStateVector(states);
    this.states = states;
  }
}

module.exports = {
  bciOperator: BCI2K_OperatorConnection, 
  bciData: BCI2K_DataConnection
};