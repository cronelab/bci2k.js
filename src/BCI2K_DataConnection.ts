import W3CWebSocket from "websocket";
const WebSocket = W3CWebSocket.w3cwebsocket;

type Units = {
  offset: number;
  gain: number;
  symbol: string;
  vmin: number;
  vmax: number;
};

type SignalProperties = {
  name: string;
  channels: string[];
  elements: string[];
  numelements: number;
  signaltype: string;
  channelunit: Units;
  elementunit: Units;
  valueunits: Units[];
};
type StateFormat = {
  [key: string]: {
    bitWidth: number;
    defaultValue: number;
    byteLocation: number;
    bitLocation: number;
  };
};
type StateVector = {
  [key: string]: number[];
};

type SignalTypes = {
  INT16: number;
  FLOAT24: number;
  FLOAT32: number;
  INT32: number;
};
export class BCI2K_DataConnection {
  websocket: WebSocket;
  states: StateVector;
  signal: unknown;
  signalProperties: SignalProperties;
  stateFormat: StateFormat;
  stateVecOrder: unknown[];
  SignalType: SignalTypes;
  callingFrom: unknown;
  onconnect: () => void;
  ondisconnect: () => void;
  onGenericSignal: (x: number[][]) => void;
  onStateVector: (x: unknown) => void;
  onSignalProperties: (x: unknown) => void;
  onStateFormat: (x: unknown) => void;
  onReceiveBlock: () => void;
  address: string;
  constructor(address?: string) {
    this.websocket = null;
    this.onconnect = () => {};
    this.onGenericSignal = () => {};
    this.onStateVector = () => {};
    this.onSignalProperties = () => {};
    this.onStateFormat = () => {};
    this.ondisconnect = () => {};
    this.onReceiveBlock = () => {};
    this.callingFrom = "";
    this.states = {};
    this.signal = null;
    this.signalProperties = null;
    this.stateFormat = null;
    this.stateVecOrder = null;
    this.SignalType = {
      INT16: 0,
      FLOAT24: 1,
      FLOAT32: 2,
      INT32: 3,
    };
    this.address = address!;
  }
  private getNullTermString(dv: DataView) {
    let val = "";
    let count = 0;
    while (count < dv.byteLength) {
      const v = dv.getUint8(count);
      count++;
      if (v == 0) break;
      val += String.fromCharCode(v);
    }
    return val;
  }
  connect(address?: string, callingFrom?: string) {
    if (this.address === undefined) this.address = address!;
    this.callingFrom = callingFrom;
    return new Promise<void>((resolve, reject) => {
      this.websocket = new WebSocket(this.address);
      this.websocket.binaryType = "arraybuffer";
      this.websocket.onerror = () => {
        // This will only execute if we err before connecting, since
        // Promises can only get triggered once
        reject("Error connecting to data source at " + this.address);
      };
      this.websocket.onopen = () => {
        resolve();
      };
      this.websocket.onclose = () => {
        this.ondisconnect();
      };
      this.websocket.onmessage = (event: { data: ArrayBuffer }) => {
        this._decodeMessage(event.data);
      };
    });
  }

  public disconnect(): void {
    this.websocket.close();
  }
  public connected(): boolean {
    return (
      this.websocket !== null && this.websocket.readyState === WebSocket.OPEN
    );
  }
  private _decodeMessage(data: ArrayBuffer) {
    const descriptor = new DataView(data, 0, 1).getUint8(0);
    switch (descriptor) {
      case 3: {
        const stateFormatView = new DataView(data, 1, data.byteLength - 1);
        this._decodeStateFormat(stateFormatView);
        break;
      }
      case 4: {
        const supplement = new DataView(data, 1, 2).getUint8(0);
        switch (supplement) {
          case 1: {
            const genericSignalView = new DataView(
              data,
              2,
              data.byteLength - 2
            );
            this._decodeGenericSignal(genericSignalView);
            break;
          }
          case 3: {
            const signalPropertyView = new DataView(
              data,
              2,
              data.byteLength - 2
            );
            this._decodeSignalProperties(signalPropertyView);
            break;
          }
          default:
            console.error("Unsupported Supplement: " + supplement.toString());
            break;
        }
        this.onReceiveBlock();
        break;
      }
      case 5: {
        const stateVectorView = new DataView(data, 1, data.byteLength - 1);
        this._decodeStateVector(stateVectorView);
        break;
      }
      default:
        console.error("Unsupported Descriptor: " + descriptor.toString());
        break;
    }
  }
  private _decodePhysicalUnits(unitstr: string) {
    const units = {} as Units;
    const unit = unitstr.split(" ");
    let idx = 0;
    units.offset = Number(unit[idx++]);
    units.gain = Number(unit[idx++]);
    units.symbol = unit[idx++];
    units.vmin = Number(unit[idx++]);
    units.vmax = Number(unit[idx++]);
    return units;
  }

  private _decodeSignalProperties(data: DataView) {
    let propstr = this.getNullTermString(data);
    // Bugfix: There seems to not always be spaces after '{' characters
    propstr = propstr.replace(/{/g, " { ");
    propstr = propstr.replace(/}/g, " } ");
    this.signalProperties = {
      name: "",
      channels: [],
      elements: [],
      numelements: 0,
      signaltype: "",
      channelunit: null,
      elementunit: null,
      valueunits: [],
    };
    const prop_tokens = propstr.split(" ");
    const props = [];
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
      const numChannels = parseInt(props[pidx++]);
      for (let i = 0; i < numChannels; i++)
        this.signalProperties.channels.push((i + 1).toString());
    }
    this.signalProperties.elements = [];
    if (props[pidx] === "{") {
      while (props[++pidx] !== "}")
        this.signalProperties.elements.push(props[pidx]);
      pidx++; // }
    } else {
      const numElements = parseInt(props[pidx++]);
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
  private _decodeStateFormat(data: DataView) {
    this.stateFormat = {};
    const formatStr = this.getNullTermString(data);
    const lines = formatStr.split("\n");
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      if (lines[lineIdx].trim().length === 0) continue;
      const stateline = lines[lineIdx].split(" ");
      const name = stateline[0];
      this.stateFormat[name] = {
        bitWidth: 0,
        defaultValue: 0,
        byteLocation: 0,
        bitLocation: 0,
      };
      this.stateFormat[name].bitWidth = parseInt(stateline[1]);
      this.stateFormat[name].defaultValue = parseInt(stateline[2]);
      this.stateFormat[name].byteLocation = parseInt(stateline[3]);
      this.stateFormat[name].bitLocation = parseInt(stateline[4]);
    }
    const vecOrder = [];
    for (const state in this.stateFormat) {
      let loc = this.stateFormat[state].byteLocation * 8;
      loc += this.stateFormat[state].bitLocation;
      vecOrder.push([state, loc]);
    }
    // Sort by bit location
    vecOrder.sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));
    // Create a list of ( state, bitwidth ) for decoding state vectors
    this.stateVecOrder = [];
    for (let i = 0; i < vecOrder.length; i++) {
      const state = vecOrder[i][0];
      this.stateVecOrder.push([state, this.stateFormat[state].bitWidth]);
    }
    this.onStateFormat(this.stateFormat);
  }
  private _decodeGenericSignal(data: DataView) {
    let index = 0;
    const signalType = data.getUint8(index);
    index = index + 1;
    const nChannels = data.getUint16(index, true);
    index = index + 2;
    const nElements = data.getUint16(index, true);
    index = index + 2;
    index = index + data.byteOffset;
    const signalData = new DataView(data.buffer, index);
    const signal = [];
    for (let ch = 0; ch < nChannels; ++ch) {
      signal.push([]);
      for (let el = 0; el < nElements; ++el) {
        switch (signalType) {
          case this.SignalType.INT16:
            signal[ch].push(
              signalData.getInt16((nElements * ch + el) * 2, true)
            );
            break;
          case this.SignalType.FLOAT32:
            signal[ch].push(
              signalData.getFloat32((nElements * ch + el) * 4, true)
            );
            break;
          case this.SignalType.INT32:
            signal[ch].push(
              signalData.getInt32((nElements * ch + el) * 4, true)
            );
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
  private _decodeStateVector(dv: DataView) {
    if (this.stateVecOrder == null) return;
    // Currently, states are maximum 32 bit unsigned integers
    // BitLocation 0 refers to the least significant bit of a byte in the packet
    // ByteLocation 0 refers to the first byte in the sequence.
    // Bits must be populated in increasing significance
    const i8Array = new Int8Array(dv.buffer);
    const firstZero = i8Array.indexOf(0);
    const secondZero = i8Array.indexOf(0, firstZero + 1);
    const decoder = new TextDecoder();
    const stateVectorLength = parseInt(
      decoder.decode(i8Array.slice(1, firstZero))
    );
    const numVectors = parseInt(
      decoder.decode(i8Array.slice(firstZero + 1, secondZero))
    );
    const index = secondZero + 1;
    const data = new DataView(dv.buffer, index);
    const states = {};
    for (const state in this.stateFormat) {
      states[state] = Array(numVectors).fill(
        this.stateFormat[state].defaultValue
      );
    }
    for (let vecIdx = 0; vecIdx < numVectors; vecIdx++) {
      const vec = new Uint8Array(
        data.buffer,
        data.byteOffset + vecIdx * stateVectorLength,
        stateVectorLength
      );
      const bits = [];
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
        const fmt = this.stateFormat[this.stateVecOrder[stateIdx][0]];
        const offset = fmt.byteLocation * 8 + fmt.bitLocation;
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
export default BCI2K_DataConnection;
