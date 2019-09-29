// ======================================================================== //
//
// bci2k.js
// A javascript connector for BCI2000
//
// ======================================================================== //

//To see how the BCI2000 messages are implemented in BCI2000 see here:
// https://www.bci2000.org/mediawiki/index.php/Technical_Reference:BCI2000_Messages


const websocket = require("websocket").w3cwebsocket;
// import * as _websocket from "websocket";
// let websocket = _websocket.w3cwebsocket

class BCI2K_OperatorConnection {
  _socket: WebSocket;
  _execid: any;
  _exec: any;
  state: any;
  onconnect: any;
  ondisconnect: any;
  onStateChange: any;
  address: string;
  constructor() {
    this.onconnect = () => {};
    this.ondisconnect = () => {};
    this.onStateChange = (event: string) => {};

    this._socket = null;
    this._execid = 0;
    this._exec = {};
    this.state = '';
  }

  connect(address: string) {
    let connection = this;

    return new Promise((resolve, reject) => {
      if (address === undefined)
        // TODO Browser-dependent
        address = window.location.host;

      connection.address = address;

      connection._socket = new websocket(connection.address);

      connection._socket.onerror = error => {
        // This will only execute if we err before connecting, since
        // Promises can only get triggered once
        reject("Error connecting to BCI2000 at " + connection.address);
      };

      connection._socket.onopen = () => {
        connection.onconnect();

        resolve();
      };

      connection._socket.onclose = () => {
        connection.ondisconnect();
      };

      connection._socket.onmessage = event => {
        connection._handleMessageEvent(event.data);
      };
    });
  }

  _handleMessageEvent(event:string) {
    let arr = event.split(" ");

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
      case "X":
        this.onStateChange(msg);
        break;
      default:
        break;
    }
  }

  tap(location: string){//}, onSuccess, onFailure) {
    let connection = this;

    let locationParameter = "WS" + location + "Server";

    return this.execute("Get Parameter " + locationParameter).then((location: string) => {
      if (location.indexOf("does not exist") >= 0) {
        return Promise.reject("Location parameter does not exist");
      }
      if (location === "") {
        return Promise.reject("Location parameter not set");
      }

      let dataConnection = new BCI2K_DataConnection();

      // Use our address plus the port from the result
      return dataConnection
        .connect(connection.address + ":" + location.split(":")[1],'')
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

  execute(instruction: string){//}, ondone, onstart, onoutput) {
    let connection = this;

    if (this.connected()) {
      return new Promise((resolve, reject) => {
        let id = (++connection._execid).toString();

        // TODO Properly handle errors from BCI2000
        connection._exec[id] = {
          // onstart: onstart,
          // onoutput: onoutput,
          ondone: (exec) => {
            // if (ondone) {
              // ondone(exec);
            // }
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
    return Promise.reject(
      "Cannot execute instruction: not connected to BCI2000"
    );
  }

  getVersion() {
    this.execute("Version").then((x: string) => console.log(x.split(" ")[1]));
  }

  showWindow() {
    return this.execute("Show Window");
  }

  hideWindow() {
    return this.execute("Hide Window");
  }

  setWatch(state: string, ip: string, port: string) {
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

  stateListen() {
    setInterval(() => {
      this.execute("GET SYSTEM STATE")
        .then((state: string) => {
          if (state.trim() != this.state) {
            this.onStateChange(state.trim());
            this.state = state.trim();
          }
        });
    }, 500)

  }


  async getSubjectName() {
    return await this.execute('Get Parameter SubjectName');
  };

  async getTaskName() {
    return await this.execute('Get Parameter DataFile');
  };

}

class BCI2K_DataConnection {
  _socket: any;
  states: any;
  signal: any;
  signalProperties: any;
  stateFormat: any;
  stateVecOrder: any;
  SignalType: any;
  callingFrom: any;
  onconnect: any;
  onGenericSignal: any;
  onStateVector: any;
  onSignalProperties: any;
  onStateFormat: any;
  ondisconnect: any;
  onReceiveBlock: any;
  address: any;
  constructor() {
    this._socket = null;

    this.onconnect = event => {};
    this.onGenericSignal = data => {};
    this.onStateVector = data => {};
    this.onSignalProperties = data => {};
    this.onStateFormat = data => {};
    this.ondisconnect = event => {};
    this.onReceiveBlock = () => {};

    this.callingFrom = ''

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
    let count=0;
    while (count < dv.byteLength) {
      var v = dv.getUint8(count);
      count++
      if (v == 0) break;
      val += String.fromCharCode(v);
    }
    return val;
  }

  connect(address: string, callingFrom: string) {
    let connection = this;
    this.callingFrom = callingFrom;
    return new Promise((resolve, reject) => {
      connection._socket = new websocket(address);
      connection._socket.binaryType = 'arraybuffer';

      connection._socket.onerror = () =>  {
        // This will only execute if we err before connecting, since
        // Promises can only get triggered once
        reject("Error connecting to data source at " + connection.address);
      };

      connection._socket.onopen = () => {
        connection.onconnect();
        resolve();
      };

      connection._socket.onclose = () => {
        // setTimeout(() => {
        //   this.connect(connection._socket.url.split('//')[1])
        // }, 1000);
        connection.ondisconnect();
      };

      connection._socket.onmessage = (event) => {
        connection._decodeMessage(event.data);
      };
    });
  }


  connected() {
    return this._socket != null && this._socket.readyState === websocket.OPEN;
  }

  _decodeMessage(data: ArrayBuffer) {
    switch (descriptor) {
      case 3:
      let stateFormatView = new DataView(data,1,data.byteLength-1);
      this._decodeStateFormat(stateFormatView);
        break;

      case 4:
        let supplement = new DataView(data,1,2).getUint8(0);
        switch (supplement) {
          case 1:
            let genericSignalView = new DataView(data,2,data.byteLength-2);
            this._decodeGenericSignal(genericSignalView);
            break;
          case 3:
            let signalPropertyView = new DataView(data,2,data.byteLength-2);
            this._decodeSignalProperties(signalPropertyView);
            break;
          default:
            console.error("Unsupported Supplement: " + supplement.toString());
            break;
        }
        this.onReceiveBlock();

        break;

      case 5:
        let stateVectorView = new DataView(data,1,data.byteLength-1);
        this._decodeStateVector(stateVectorView);
        break;

      default:
        console.error("Unsupported Descriptor: " + descriptor.toString());
        break;
    }
  }

  _decodePhysicalUnits(unitstr: string) {
let units: any;
units = {};
    let unit = unitstr.split(" ");
    let idx = 0;
    units.offset = Number(unit[idx++]);
    units.gain = Number(unit[idx++]);
    units.symbol = unit[idx++];
    units.vmin = Number(unit[idx++]);
    units.vmax = Number(unit[idx++]);
    return units;
  }

  _decodeSignalProperties(data: DataView) {
    let propstr = this.getNullTermString(data);
    // Bugfix: There seems to not always be spaces after '{' characters
    propstr = propstr.replace(/{/g, " { ");
    propstr = propstr.replace(/}/g, " } ");

    this.signalProperties = {};
    let prop_tokens = propstr.split(" ");
    let props = [];
    for (let i = 0; i < prop_tokens.length; i++) {
      if (prop_tokens[i].trim() === "") continue;
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

  _decodeStateFormat(data: DataView) {
    this.stateFormat = {};
    let formatStr = this.getNullTermString(data);

    let lines = formatStr.split("\n");
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      if (lines[lineIdx].trim().length === 0) continue;
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
    vecOrder.sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));

    // Create a list of ( state, bitwidth ) for decoding state vectors
    this.stateVecOrder = [];
    for (let i = 0; i < vecOrder.length; i++) {
      let state = vecOrder[i][0];
      this.stateVecOrder.push([state, this.stateFormat[state].bitWidth]);
    }

    this.onStateFormat(this.stateFormat);
  }

  _decodeGenericSignal(data: DataView) {
    let index = 0;
    let signalType = data.getUint8(index);
    index = index+1;
    let nChannels = data.getUint16(index,true)
    index = index+signalType
    let nElements = data.getUint16(index,true)
    index = data.byteOffset+index+signalType;
    let signalData = new DataView(data.buffer,index)
    let signal = [];
    for (let ch = 0; ch < nChannels; ++ch) {
      signal.push([]);
      for (let el = 0; el < nElements; ++el) {
        switch (signalType) {
          case this.SignalType.INT16:
        signal[ch].push(signalData.getInt16((nElements*ch+el)*2,true));
            break;

          case this.SignalType.FLOAT32:
              signal[ch].push(signalData.getFloat32((nElements*ch+el)*4,true));
            break;

          case this.SignalType.INT32:
              signal[ch].push(signalData.getInt32((nElements*ch+el)*4,true));
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
  

  _decodeStateVector(dv: DataView) {
    if (this.stateVecOrder == null) return;

    // Currently, states are maximum 32 bit unsigned integers
    // BitLocation 0 refers to the least significant bit of a byte in the packet
    // ByteLocation 0 refers to the first byte in the sequence.
    // Bits must be populated in increasing significance
    let index = 1;
    let _stateVectorLength = new DataView(dv.buffer,index,2)
    index = index+3;
    let stateVectorLength = parseInt(this.getNullTermString(_stateVectorLength));
    let _numVectors = new DataView(dv.buffer,index,2)
    index = index+3;
    let numVectors = parseInt(this.getNullTermString(_numVectors));
    let data = new DataView(dv.buffer,index);
    let states = {};
    for (let state in this.stateFormat)
      states[state] = Array(numVectors).fill(
        this.stateFormat[state].defaultValue
      );

    for (let vecIdx = 0; vecIdx < numVectors; vecIdx++) {
      let vec = new Uint8Array(data.buffer,data.byteOffset + (vecIdx*stateVectorLength), stateVectorLength);
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