(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("websocket"));
	else if(typeof define === 'function' && define.amd)
		define(["websocket"], factory);
	else if(typeof exports === 'object')
		exports["BCI2K"] = factory(require("websocket"));
	else
		root["BCI2K"] = factory(root["websocket"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_websocket__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/home/chris/development/bci2000/BCI2K/BCI2Kjs_ws/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bci2k.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bci2k.ts":
/*!******************!*\
  !*** ./bci2k.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// ======================================================================== //
//
// bci2k.js
// A javascript connector for BCI2000
//
// ======================================================================== //
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//To see how the BCI2000 messages are implemented in BCI2000 see here:
// https://www.bci2000.org/mediawiki/index.php/Technical_Reference:BCI2000_Messages
const websocket = __webpack_require__(/*! websocket */ "websocket").w3cwebsocket;
class BCI2K_OperatorConnection {
    constructor(address) {
        this.ondisconnect = () => { };
        this.onStateChange = (event) => { };
        // this.websocket = null;
        this._execid = 0;
        this._exec = {};
        this.state = '';
        this.address = address;
    }
    connect(address) {
        return new Promise((resolve, reject) => {
            if (this.address === undefined) {
                this.address = address || "ws://127.0.0.1:80" || `ws://{window.location.host}`;
            }
            ;
            this.websocket = new websocket(this.address);
            this.websocket.onerror = error => {
                // This will only execute if we err before connecting, since
                // Promises can only get triggered once
                reject("Error connecting to BCI2000 at " + this.address);
            };
            this.websocket.onopen = () => {
                resolve();
            };
            this.websocket.onclose = () => {
                this.ondisconnect();
            };
            this.websocket.onmessage = event => {
                let { opcode, id, contents } = JSON.parse(event.data);
                switch (opcode) {
                    case "O": // OUTPUT: Received output from command
                        this._exec[id](contents);
                        delete this._exec[id];
                        break;
                    default:
                        break;
                }
            };
        });
    }
    tap(location) {
        let connection = this;
        let locationParameter = "WS" + location + "Server";
        return this.execute("Get Parameter " + locationParameter).then((location) => {
            if (location.indexOf("does not exist") >= 0) {
                return Promise.reject("Location parameter does not exist");
            }
            if (location === "") {
                return Promise.reject("Location parameter not set");
            }
            let dataConnection = new BCI2K_DataConnection();
            // Use our address plus the port from the result
            return dataConnection
                .connect(connection.address + ":" + location.split(":")[1], '')
                .then(event => {
                // To keep with our old API, we actually want to wrap the
                // dataConnection, and not the connection event
                // TODO This means we can't get the connection event!
                return dataConnection;
            });
        });
    }
    connected() {
        return this.websocket !== null && this.websocket.readyState === websocket.OPEN;
    }
    execute(instruction) {
        let connection = this;
        if (this.connected()) {
            return new Promise((resolve, reject) => {
                let id = (++connection._execid).toString();
                // TODO Properly handle errors from BCI2000
                connection._exec[id] = exec => resolve(exec);
                connection.websocket.send(JSON.stringify({
                    opcode: "E",
                    id: id,
                    contents: instruction
                }));
            });
        }
        // Cannot execute if not connected
        return Promise.reject("Cannot execute instruction: not connected to BCI2000");
    }
    getVersion() {
        this.execute("Version").then((x) => console.log(x.split(" ")[1]));
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
    stateListen() {
        setInterval(() => {
            this.execute("GET SYSTEM STATE")
                .then((state) => {
                if (state.trim() != this.state) {
                    this.onStateChange(state.trim());
                    this.state = state.trim();
                }
            });
        }, 500);
    }
    getSubjectName() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execute('Get Parameter SubjectName');
        });
    }
    ;
    getTaskName() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execute('Get Parameter DataFile');
        });
    }
    ;
}
class BCI2K_DataConnection {
    constructor(address) {
        this._socket = null;
        this.onconnect = () => { };
        this.onGenericSignal = (data) => { };
        this.onStateVector = (data) => { };
        this.onSignalProperties = (data) => { };
        this.onStateFormat = (data) => { };
        this.ondisconnect = () => { };
        this.onReceiveBlock = () => { };
        this.callingFrom = '';
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
        this.address = address;
    }
    getNullTermString(dv) {
        var val = "";
        let count = 0;
        while (count < dv.byteLength) {
            var v = dv.getUint8(count);
            count++;
            if (v == 0)
                break;
            val += String.fromCharCode(v);
        }
        return val;
    }
    connect(address, callingFrom) {
        let connection = this;
        if (connection.address === undefined)
            connection.address = address;
        this.callingFrom = callingFrom;
        return new Promise((resolve, reject) => {
            connection._socket = new websocket(connection.address);
            connection._socket.binaryType = 'arraybuffer';
            connection._socket.onerror = () => {
                // This will only execute if we err before connecting, since
                // Promises can only get triggered once
                reject("Error connecting to data source at " + connection.address);
            };
            connection._socket.onopen = () => {
                connection.onconnect();
                resolve();
            };
            connection._socket.onclose = e => {
                connection.ondisconnect();
                setTimeout(() => {
                    console.log("Disconnected");
                    this.connect('');
                }, 1000);
            };
            connection._socket.onmessage = (event) => {
                connection._decodeMessage(event.data);
            };
        });
    }
    connected() {
        return this._socket != null && this._socket.readyState === websocket.OPEN;
    }
    _decodeMessage(data) {
        let descriptor = new DataView(data, 0, 1).getUint8(0);
        switch (descriptor) {
            case 3:
                let stateFormatView = new DataView(data, 1, data.byteLength - 1);
                this._decodeStateFormat(stateFormatView);
                break;
            case 4:
                let supplement = new DataView(data, 1, 2).getUint8(0);
                switch (supplement) {
                    case 1:
                        let genericSignalView = new DataView(data, 2, data.byteLength - 2);
                        this._decodeGenericSignal(genericSignalView);
                        break;
                    case 3:
                        let signalPropertyView = new DataView(data, 2, data.byteLength - 2);
                        this._decodeSignalProperties(signalPropertyView);
                        break;
                    default:
                        console.error("Unsupported Supplement: " + supplement.toString());
                        break;
                }
                this.onReceiveBlock();
                break;
            case 5:
                let stateVectorView = new DataView(data, 1, data.byteLength - 1);
                this._decodeStateVector(stateVectorView);
                break;
            default:
                console.error("Unsupported Descriptor: " + descriptor.toString());
                break;
        }
    }
    _decodePhysicalUnits(unitstr) {
        let units;
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
    _decodeSignalProperties(data) {
        let propstr = this.getNullTermString(data);
        // Bugfix: There seems to not always be spaces after '{' characters
        propstr = propstr.replace(/{/g, " { ");
        propstr = propstr.replace(/}/g, " } ");
        this.signalProperties = {};
        let prop_tokens = propstr.split(" ");
        let props = [];
        for (let i = 0; i < prop_tokens.length; i++) {
            if (prop_tokens[i].trim() === "")
                continue;
            props.push(prop_tokens[i]);
        }
        let pidx = 0;
        this.signalProperties.name = props[pidx++];
        this.signalProperties.channels = [];
        if (props[pidx] === "{") {
            while (props[++pidx] !== "}")
                this.signalProperties.channels.push(props[pidx]);
            pidx++; // }
        }
        else {
            let numChannels = parseInt(props[pidx++]);
            for (let i = 0; i < numChannels; i++)
                this.signalProperties.channels.push((i + 1).toString());
        }
        this.signalProperties.elements = [];
        if (props[pidx] === "{") {
            while (props[++pidx] !== "}")
                this.signalProperties.elements.push(props[pidx]);
            pidx++; // }
        }
        else {
            let numElements = parseInt(props[pidx++]);
            for (let i = 0; i < numElements; i++)
                this.signalProperties.elements.push((i + 1).toString());
        }
        // Backward Compatibility
        this.signalProperties.numelements = this.signalProperties.elements.length;
        this.signalProperties.signaltype = props[pidx++];
        this.signalProperties.channelunit = this._decodePhysicalUnits(props.slice(pidx, (pidx += 5)).join(" "));
        this.signalProperties.elementunit = this._decodePhysicalUnits(props.slice(pidx, (pidx += 5)).join(" "));
        pidx++; // '{'
        this.signalProperties.valueunits = [];
        for (let i = 0; i < this.signalProperties.channels.length; i++)
            this.signalProperties.valueunits.push(this._decodePhysicalUnits(props.slice(pidx, (pidx += 5)).join(" ")));
        pidx++; // '}'
        this.onSignalProperties(this.signalProperties);
    }
    _decodeStateFormat(data) {
        this.stateFormat = {};
        let formatStr = this.getNullTermString(data);
        let lines = formatStr.split("\n");
        for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
            if (lines[lineIdx].trim().length === 0)
                continue;
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
    _decodeGenericSignal(data) {
        let index = 0;
        let signalType = data.getUint8(index);
        index = index + 1;
        let nChannels = data.getUint16(index, true);
        index = index + 2;
        let nElements = data.getUint16(index, true);
        index = index + 2;
        index = index + data.byteOffset;
        let signalData = new DataView(data.buffer, index);
        let signal = [];
        for (let ch = 0; ch < nChannels; ++ch) {
            signal.push([]);
            for (let el = 0; el < nElements; ++el) {
                switch (signalType) {
                    case this.SignalType.INT16:
                        signal[ch].push(signalData.getInt16((nElements * ch + el) * 2, true));
                        break;
                    case this.SignalType.FLOAT32:
                        signal[ch].push(signalData.getFloat32((nElements * ch + el) * 4, true));
                        break;
                    case this.SignalType.INT32:
                        signal[ch].push(signalData.getInt32((nElements * ch + el) * 4, true));
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
        if (this.stateVecOrder == null)
            return;
        // Currently, states are maximum 32 bit unsigned integers
        // BitLocation 0 refers to the least significant bit of a byte in the packet
        // ByteLocation 0 refers to the first byte in the sequence.
        // Bits must be populated in increasing significance
        let index = 1;
        let _stateVectorLength = new DataView(dv.buffer, index, 2);
        index = index + 2;
        let stateVectorLength = parseInt(this.getNullTermString(_stateVectorLength));
        let _numVectors = new DataView(dv.buffer, index, 2);
        index = index + 3;
        let numVectors = parseInt(this.getNullTermString(_numVectors));
        let data = new DataView(dv.buffer, index);
        let states = {};
        for (let state in this.stateFormat)
            states[state] = Array(numVectors).fill(this.stateFormat[state].defaultValue);
        for (let vecIdx = 0; vecIdx < numVectors; vecIdx++) {
            let vec = new Uint8Array(data.buffer, data.byteOffset + (vecIdx * stateVectorLength), stateVectorLength);
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
                    if (bits[offset + bIdx])
                        val = (val | mask) >>> 0;
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


/***/ }),

/***/ "websocket":
/*!****************************!*\
  !*** external "websocket" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_websocket__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CQ0kySy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQkNJMksvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQkNJMksvLi9iY2kyay50cyIsIndlYnBhY2s6Ly9CQ0kySy9leHRlcm5hbCBcIndlYnNvY2tldFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsOEVBQThFO0FBQzlFLEVBQUU7QUFDRixXQUFXO0FBQ1gscUNBQXFDO0FBQ3JDLEVBQUU7QUFDRiw4RUFBOEU7Ozs7Ozs7Ozs7QUFFOUUsc0VBQXNFO0FBQ3RFLG1GQUFtRjtBQUduRixNQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFXLENB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QUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hEO1lBRUQsS0FBSyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztnQkFDcEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDaEIsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7b0JBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUI7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDdkQ7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLFdBQVcsRUFBRSx3QkFBd0I7SUFDckMsT0FBTyxFQUFFLG9CQUFvQjtDQUM5QixDQUFDOzs7Ozs7Ozs7Ozs7QUN4Z0JGLHVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwid2Vic29ja2V0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIndlYnNvY2tldFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCQ0kyS1wiXSA9IGZhY3RvcnkocmVxdWlyZShcIndlYnNvY2tldFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiQkNJMktcIl0gPSBmYWN0b3J5KHJvb3RbXCJ3ZWJzb2NrZXRcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV93ZWJzb2NrZXRfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2hvbWUvY2hyaXMvZGV2ZWxvcG1lbnQvYmNpMjAwMC9CQ0kySy9CQ0kyS2pzX3dzL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9iY2kyay50c1wiKTtcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuLy9cbi8vIGJjaTJrLmpzXG4vLyBBIGphdmFzY3JpcHQgY29ubmVjdG9yIGZvciBCQ0kyMDAwXG4vL1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5cbi8vVG8gc2VlIGhvdyB0aGUgQkNJMjAwMCBtZXNzYWdlcyBhcmUgaW1wbGVtZW50ZWQgaW4gQkNJMjAwMCBzZWUgaGVyZTpcbi8vIGh0dHBzOi8vd3d3LmJjaTIwMDAub3JnL21lZGlhd2lraS9pbmRleC5waHAvVGVjaG5pY2FsX1JlZmVyZW5jZTpCQ0kyMDAwX01lc3NhZ2VzXG5cblxuY29uc3Qgd2Vic29ja2V0ID0gcmVxdWlyZShcIndlYnNvY2tldFwiKS53M2N3ZWJzb2NrZXQ7XG5cbmNsYXNzIEJDSTJLX09wZXJhdG9yQ29ubmVjdGlvbiB7XG4gIHdlYnNvY2tldDogV2ViU29ja2V0O1xuICBfZXhlY2lkOiBhbnk7XG4gIF9leGVjOiBhbnk7XG4gIHN0YXRlOiBhbnk7XG4gIG9uZGlzY29ubmVjdDogYW55O1xuICBvblN0YXRlQ2hhbmdlOiBhbnk7XG4gIGFkZHJlc3M6IHN0cmluZztcblxuXG4gIGNvbnN0cnVjdG9yKGFkZHJlc3M/OiBzdHJpbmcpIHtcbiAgICB0aGlzLm9uZGlzY29ubmVjdCA9ICgpID0+IHsgfTtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSAoZXZlbnQ6IHN0cmluZykgPT4geyB9O1xuXG4gICAgLy8gdGhpcy53ZWJzb2NrZXQgPSBudWxsO1xuICAgIHRoaXMuX2V4ZWNpZCA9IDA7XG4gICAgdGhpcy5fZXhlYyA9IHt9O1xuICAgIHRoaXMuc3RhdGUgPSAnJztcbiAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICB9XG5cbiAgcHVibGljIGNvbm5lY3QoYWRkcmVzcz86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGRyZXNzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gYWRkcmVzcyB8fCBcIndzOi8vMTI3LjAuMC4xOjgwXCIgfHwgYHdzOi8ve3dpbmRvdy5sb2NhdGlvbi5ob3N0fWA7XG4gICAgICB9O1xuXG5cbiAgICAgIHRoaXMud2Vic29ja2V0ID0gbmV3IHdlYnNvY2tldCh0aGlzLmFkZHJlc3MpO1xuXG4gICAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gZXJyb3IgPT4ge1xuICAgICAgICAvLyBUaGlzIHdpbGwgb25seSBleGVjdXRlIGlmIHdlIGVyciBiZWZvcmUgY29ubmVjdGluZywgc2luY2VcbiAgICAgICAgLy8gUHJvbWlzZXMgY2FuIG9ubHkgZ2V0IHRyaWdnZXJlZCBvbmNlXG4gICAgICAgIHJlamVjdChcIkVycm9yIGNvbm5lY3RpbmcgdG8gQkNJMjAwMCBhdCBcIiArIHRoaXMuYWRkcmVzcyk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLndlYnNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMud2Vic29ja2V0Lm9uY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSBldmVudCA9PiB7XG4gICAgICAgIGxldCB7IG9wY29kZSwgaWQsIGNvbnRlbnRzIH0gPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpXG4gICAgICAgIHN3aXRjaCAob3Bjb2RlKSB7XG4gICAgICAgICAgY2FzZSBcIk9cIjogLy8gT1VUUFVUOiBSZWNlaXZlZCBvdXRwdXQgZnJvbSBjb21tYW5kXG4gICAgICAgICAgICB0aGlzLl9leGVjW2lkXShjb250ZW50cylcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9leGVjW2lkXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0YXAobG9jYXRpb246IHN0cmluZykge1xuICAgIGxldCBjb25uZWN0aW9uID0gdGhpcztcblxuICAgIGxldCBsb2NhdGlvblBhcmFtZXRlciA9IFwiV1NcIiArIGxvY2F0aW9uICsgXCJTZXJ2ZXJcIjtcblxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJHZXQgUGFyYW1ldGVyIFwiICsgbG9jYXRpb25QYXJhbWV0ZXIpLnRoZW4oKGxvY2F0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChsb2NhdGlvbi5pbmRleE9mKFwiZG9lcyBub3QgZXhpc3RcIikgPj0gMCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJMb2NhdGlvbiBwYXJhbWV0ZXIgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgICB9XG4gICAgICBpZiAobG9jYXRpb24gPT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiTG9jYXRpb24gcGFyYW1ldGVyIG5vdCBzZXRcIik7XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXRhQ29ubmVjdGlvbiA9IG5ldyBCQ0kyS19EYXRhQ29ubmVjdGlvbigpO1xuXG4gICAgICAvLyBVc2Ugb3VyIGFkZHJlc3MgcGx1cyB0aGUgcG9ydCBmcm9tIHRoZSByZXN1bHRcbiAgICAgIHJldHVybiBkYXRhQ29ubmVjdGlvblxuICAgICAgICAuY29ubmVjdChjb25uZWN0aW9uLmFkZHJlc3MgKyBcIjpcIiArIGxvY2F0aW9uLnNwbGl0KFwiOlwiKVsxXSwgJycpXG4gICAgICAgIC50aGVuKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBUbyBrZWVwIHdpdGggb3VyIG9sZCBBUEksIHdlIGFjdHVhbGx5IHdhbnQgdG8gd3JhcCB0aGVcbiAgICAgICAgICAvLyBkYXRhQ29ubmVjdGlvbiwgYW5kIG5vdCB0aGUgY29ubmVjdGlvbiBldmVudFxuICAgICAgICAgIC8vIFRPRE8gVGhpcyBtZWFucyB3ZSBjYW4ndCBnZXQgdGhlIGNvbm5lY3Rpb24gZXZlbnQhXG4gICAgICAgICAgcmV0dXJuIGRhdGFDb25uZWN0aW9uO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMud2Vic29ja2V0ICE9PSBudWxsICYmIHRoaXMud2Vic29ja2V0LnJlYWR5U3RhdGUgPT09IHdlYnNvY2tldC5PUEVOO1xuICB9XG5cbiAgcHVibGljIGV4ZWN1dGUoaW5zdHJ1Y3Rpb246IHN0cmluZykge1xuICAgIGxldCBjb25uZWN0aW9uID0gdGhpcztcbiAgICBpZiAodGhpcy5jb25uZWN0ZWQoKSkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IGlkID0gKCsrY29ubmVjdGlvbi5fZXhlY2lkKS50b1N0cmluZygpO1xuICAgICAgICAvLyBUT0RPIFByb3Blcmx5IGhhbmRsZSBlcnJvcnMgZnJvbSBCQ0kyMDAwXG4gICAgICAgIGNvbm5lY3Rpb24uX2V4ZWNbaWRdID0gZXhlYyA9PiByZXNvbHZlKGV4ZWMpO1xuICAgICAgICBjb25uZWN0aW9uLndlYnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBvcGNvZGU6IFwiRVwiLFxuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICBjb250ZW50czogaW5zdHJ1Y3Rpb25cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIENhbm5vdCBleGVjdXRlIGlmIG5vdCBjb25uZWN0ZWRcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICBcIkNhbm5vdCBleGVjdXRlIGluc3RydWN0aW9uOiBub3QgY29ubmVjdGVkIHRvIEJDSTIwMDBcIlxuICAgICk7XG4gIH1cblxuICBnZXRWZXJzaW9uKCkge1xuICAgIHRoaXMuZXhlY3V0ZShcIlZlcnNpb25cIikudGhlbigoeDogc3RyaW5nKSA9PiBjb25zb2xlLmxvZyh4LnNwbGl0KFwiIFwiKVsxXSkpO1xuICB9XG5cbiAgc2hvd1dpbmRvdygpIHtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlKFwiU2hvdyBXaW5kb3dcIik7XG4gIH1cblxuICBoaWRlV2luZG93KCkge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJIaWRlIFdpbmRvd1wiKTtcbiAgfVxuXG4gIHNldFdhdGNoKHN0YXRlOiBzdHJpbmcsIGlwOiBzdHJpbmcsIHBvcnQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJBZGQgd2F0Y2ggXCIgKyBzdGF0ZSArIFwiIGF0IFwiICsgaXAgKyBcIjpcIiArIHBvcnQpO1xuICB9XG5cbiAgcmVzZXRTeXN0ZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIlJlc2V0IFN5c3RlbVwiKTtcbiAgfVxuXG4gIHNldENvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlKFwiU2V0IENvbmZpZ1wiKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJTdGFydFwiKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIlN0b3BcIik7XG4gIH1cblxuICBraWxsKCkge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJFeGl0XCIpO1xuICB9XG5cbiAgc3RhdGVMaXN0ZW4oKSB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5leGVjdXRlKFwiR0VUIFNZU1RFTSBTVEFURVwiKVxuICAgICAgICAudGhlbigoc3RhdGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmIChzdGF0ZS50cmltKCkgIT0gdGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlKHN0YXRlLnRyaW0oKSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGUudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgNTAwKVxuICB9XG5cbiAgYXN5bmMgZ2V0U3ViamVjdE5hbWUoKSB7Ly9Qcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGUoJ0dldCBQYXJhbWV0ZXIgU3ViamVjdE5hbWUnKTtcbiAgfTtcblxuICBhc3luYyBnZXRUYXNrTmFtZSgpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5leGVjdXRlKCdHZXQgUGFyYW1ldGVyIERhdGFGaWxlJyk7XG4gIH07XG5cbn1cblxuY2xhc3MgQkNJMktfRGF0YUNvbm5lY3Rpb24ge1xuICBfc29ja2V0OiBXZWJTb2NrZXQ7XG4gIHN0YXRlczogYW55O1xuICBzaWduYWw6IGFueTtcbiAgc2lnbmFsUHJvcGVydGllczogYW55O1xuICBzdGF0ZUZvcm1hdDogYW55O1xuICBzdGF0ZVZlY09yZGVyOiBhbnk7XG4gIFNpZ25hbFR5cGU6IGFueTtcbiAgY2FsbGluZ0Zyb206IGFueTtcbiAgb25jb25uZWN0OiBhbnk7XG4gIG9uR2VuZXJpY1NpZ25hbDogYW55O1xuICBvblN0YXRlVmVjdG9yOiBhbnk7XG4gIG9uU2lnbmFsUHJvcGVydGllczogYW55O1xuICBvblN0YXRlRm9ybWF0OiBhbnk7XG4gIG9uZGlzY29ubmVjdDogYW55O1xuICBvblJlY2VpdmVCbG9jazogYW55O1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGFkZHJlc3M/OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zb2NrZXQgPSBudWxsO1xuXG4gICAgdGhpcy5vbmNvbm5lY3QgPSAoKSA9PiB7IH07XG4gICAgdGhpcy5vbkdlbmVyaWNTaWduYWwgPSAoZGF0YTogYW55KSA9PiB7IH07XG4gICAgdGhpcy5vblN0YXRlVmVjdG9yID0gKGRhdGE6IGFueSkgPT4geyB9O1xuICAgIHRoaXMub25TaWduYWxQcm9wZXJ0aWVzID0gKGRhdGE6IGFueSkgPT4geyB9O1xuICAgIHRoaXMub25TdGF0ZUZvcm1hdCA9IChkYXRhOiBhbnkpID0+IHsgfTtcbiAgICB0aGlzLm9uZGlzY29ubmVjdCA9ICgpID0+IHsgfTtcbiAgICB0aGlzLm9uUmVjZWl2ZUJsb2NrID0gKCkgPT4geyB9O1xuXG4gICAgdGhpcy5jYWxsaW5nRnJvbSA9ICcnXG5cbiAgICB0aGlzLnN0YXRlcyA9IHt9O1xuICAgIHRoaXMuc2lnbmFsID0gbnVsbDtcbiAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMgPSBudWxsO1xuICAgIHRoaXMuc3RhdGVGb3JtYXQgPSBudWxsO1xuICAgIHRoaXMuc3RhdGVWZWNPcmRlciA9IG51bGw7XG5cbiAgICB0aGlzLlNpZ25hbFR5cGUgPSB7XG4gICAgICBJTlQxNjogMCxcbiAgICAgIEZMT0FUMjQ6IDEsXG4gICAgICBGTE9BVDMyOiAyLFxuICAgICAgSU5UMzI6IDNcbiAgICB9O1xuICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gIH1cblxuICBwcml2YXRlIGdldE51bGxUZXJtU3RyaW5nKGR2OiBEYXRhVmlldykge1xuICAgIHZhciB2YWwgPSBcIlwiO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgd2hpbGUgKGNvdW50IDwgZHYuYnl0ZUxlbmd0aCkge1xuICAgICAgdmFyIHYgPSBkdi5nZXRVaW50OChjb3VudCk7XG4gICAgICBjb3VudCsrXG4gICAgICBpZiAodiA9PSAwKSBicmVhaztcbiAgICAgIHZhbCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHYpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgY29ubmVjdChhZGRyZXNzPzogc3RyaW5nLCBjYWxsaW5nRnJvbT86IHN0cmluZykge1xuICAgIGxldCBjb25uZWN0aW9uID0gdGhpcztcbiAgICBpZiAoY29ubmVjdGlvbi5hZGRyZXNzID09PSB1bmRlZmluZWQpIGNvbm5lY3Rpb24uYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgdGhpcy5jYWxsaW5nRnJvbSA9IGNhbGxpbmdGcm9tO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQgPSBuZXcgd2Vic29ja2V0KGNvbm5lY3Rpb24uYWRkcmVzcyk7XG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cbiAgICAgIGNvbm5lY3Rpb24uX3NvY2tldC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAvLyBUaGlzIHdpbGwgb25seSBleGVjdXRlIGlmIHdlIGVyciBiZWZvcmUgY29ubmVjdGluZywgc2luY2VcbiAgICAgICAgLy8gUHJvbWlzZXMgY2FuIG9ubHkgZ2V0IHRyaWdnZXJlZCBvbmNlXG4gICAgICAgIHJlamVjdChcIkVycm9yIGNvbm5lY3RpbmcgdG8gZGF0YSBzb3VyY2UgYXQgXCIgKyBjb25uZWN0aW9uLmFkZHJlc3MpO1xuICAgICAgfTtcblxuICAgICAgY29ubmVjdGlvbi5fc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5vbmNvbm5lY3QoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcblxuICAgICAgY29ubmVjdGlvbi5fc29ja2V0Lm9uY2xvc2UgPSBlID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEaXNjb25uZWN0ZWRcIilcbiAgICAgICAgICB0aGlzLmNvbm5lY3QoJycpO1xuXG4gICAgICAgIH0sIDEwMDApXG4gICAgICB9O1xuXG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uX2RlY29kZU1lc3NhZ2UoZXZlbnQuZGF0YSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cblxuICBjb25uZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NvY2tldCAhPSBudWxsICYmIHRoaXMuX3NvY2tldC5yZWFkeVN0YXRlID09PSB3ZWJzb2NrZXQuT1BFTjtcbiAgfVxuXG4gIHByaXZhdGUgX2RlY29kZU1lc3NhZ2UoZGF0YTogQXJyYXlCdWZmZXIpIHtcblx0bGV0IGRlc2NyaXB0b3IgPSBuZXcgRGF0YVZpZXcoZGF0YSwgMCwgMSkuZ2V0VWludDgoMCk7XG4gICAgc3dpdGNoIChkZXNjcmlwdG9yKSB7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGxldCBzdGF0ZUZvcm1hdFZpZXcgPSBuZXcgRGF0YVZpZXcoZGF0YSwgMSwgZGF0YS5ieXRlTGVuZ3RoIC0gMSk7XG4gICAgICAgIHRoaXMuX2RlY29kZVN0YXRlRm9ybWF0KHN0YXRlRm9ybWF0Vmlldyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQ6XG5cdFx0bGV0IHN1cHBsZW1lbnQgPSBuZXcgRGF0YVZpZXcoZGF0YSwgMSwgMikuZ2V0VWludDgoMCk7XG4gICAgICAgIHN3aXRjaCAoc3VwcGxlbWVudCkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGxldCBnZW5lcmljU2lnbmFsVmlldyA9IG5ldyBEYXRhVmlldyhkYXRhLCAyLCBkYXRhLmJ5dGVMZW5ndGggLSAyKTtcbiAgICAgICAgICAgIHRoaXMuX2RlY29kZUdlbmVyaWNTaWduYWwoZ2VuZXJpY1NpZ25hbFZpZXcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgbGV0IHNpZ25hbFByb3BlcnR5VmlldyA9IG5ldyBEYXRhVmlldyhkYXRhLCAyLCBkYXRhLmJ5dGVMZW5ndGggLSAyKTtcbiAgICAgICAgICAgIHRoaXMuX2RlY29kZVNpZ25hbFByb3BlcnRpZXMoc2lnbmFsUHJvcGVydHlWaWV3KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5zdXBwb3J0ZWQgU3VwcGxlbWVudDogXCIgKyBzdXBwbGVtZW50LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblJlY2VpdmVCbG9jaygpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDU6XG4gICAgICAgIGxldCBzdGF0ZVZlY3RvclZpZXcgPSBuZXcgRGF0YVZpZXcoZGF0YSwgMSwgZGF0YS5ieXRlTGVuZ3RoIC0gMSk7XG4gICAgICAgIHRoaXMuX2RlY29kZVN0YXRlVmVjdG9yKHN0YXRlVmVjdG9yVmlldyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5zdXBwb3J0ZWQgRGVzY3JpcHRvcjogXCIgKyBkZXNjcmlwdG9yLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZWNvZGVQaHlzaWNhbFVuaXRzKHVuaXRzdHI6IHN0cmluZykge1xuICAgIGxldCB1bml0czogYW55O1xuICAgIHVuaXRzID0ge307XG4gICAgbGV0IHVuaXQgPSB1bml0c3RyLnNwbGl0KFwiIFwiKTtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICB1bml0cy5vZmZzZXQgPSBOdW1iZXIodW5pdFtpZHgrK10pO1xuICAgIHVuaXRzLmdhaW4gPSBOdW1iZXIodW5pdFtpZHgrK10pO1xuICAgIHVuaXRzLnN5bWJvbCA9IHVuaXRbaWR4KytdO1xuICAgIHVuaXRzLnZtaW4gPSBOdW1iZXIodW5pdFtpZHgrK10pO1xuICAgIHVuaXRzLnZtYXggPSBOdW1iZXIodW5pdFtpZHgrK10pO1xuICAgIHJldHVybiB1bml0cztcbiAgfVxuXG4gIHByaXZhdGUgX2RlY29kZVNpZ25hbFByb3BlcnRpZXMoZGF0YTogRGF0YVZpZXcpIHtcbiAgICBsZXQgcHJvcHN0ciA9IHRoaXMuZ2V0TnVsbFRlcm1TdHJpbmcoZGF0YSk7XG4gICAgLy8gQnVnZml4OiBUaGVyZSBzZWVtcyB0byBub3QgYWx3YXlzIGJlIHNwYWNlcyBhZnRlciAneycgY2hhcmFjdGVyc1xuICAgIHByb3BzdHIgPSBwcm9wc3RyLnJlcGxhY2UoL3svZywgXCIgeyBcIik7XG4gICAgcHJvcHN0ciA9IHByb3BzdHIucmVwbGFjZSgvfS9nLCBcIiB9IFwiKTtcblxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcyA9IHt9O1xuICAgIGxldCBwcm9wX3Rva2VucyA9IHByb3BzdHIuc3BsaXQoXCIgXCIpO1xuICAgIGxldCBwcm9wcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcF90b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwcm9wX3Rva2Vuc1tpXS50cmltKCkgPT09IFwiXCIpIGNvbnRpbnVlO1xuICAgICAgcHJvcHMucHVzaChwcm9wX3Rva2Vuc1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IHBpZHggPSAwO1xuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5uYW1lID0gcHJvcHNbcGlkeCsrXTtcblxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5jaGFubmVscyA9IFtdO1xuICAgIGlmIChwcm9wc1twaWR4XSA9PT0gXCJ7XCIpIHtcbiAgICAgIHdoaWxlIChwcm9wc1srK3BpZHhdICE9PSBcIn1cIilcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmNoYW5uZWxzLnB1c2gocHJvcHNbcGlkeF0pO1xuICAgICAgcGlkeCsrOyAvLyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBudW1DaGFubmVscyA9IHBhcnNlSW50KHByb3BzW3BpZHgrK10pO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1DaGFubmVsczsgaSsrKVxuICAgICAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuY2hhbm5lbHMucHVzaCgoaSArIDEpLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5lbGVtZW50cyA9IFtdO1xuICAgIGlmIChwcm9wc1twaWR4XSA9PT0gXCJ7XCIpIHtcbiAgICAgIHdoaWxlIChwcm9wc1srK3BpZHhdICE9PSBcIn1cIilcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmVsZW1lbnRzLnB1c2gocHJvcHNbcGlkeF0pO1xuICAgICAgcGlkeCsrOyAvLyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBudW1FbGVtZW50cyA9IHBhcnNlSW50KHByb3BzW3BpZHgrK10pO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1FbGVtZW50czsgaSsrKVxuICAgICAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuZWxlbWVudHMucHVzaCgoaSArIDEpLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIC8vIEJhY2t3YXJkIENvbXBhdGliaWxpdHlcbiAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMubnVtZWxlbWVudHMgPSB0aGlzLnNpZ25hbFByb3BlcnRpZXMuZWxlbWVudHMubGVuZ3RoO1xuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5zaWduYWx0eXBlID0gcHJvcHNbcGlkeCsrXTtcbiAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuY2hhbm5lbHVuaXQgPSB0aGlzLl9kZWNvZGVQaHlzaWNhbFVuaXRzKFxuICAgICAgcHJvcHMuc2xpY2UocGlkeCwgKHBpZHggKz0gNSkpLmpvaW4oXCIgXCIpXG4gICAgKTtcblxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5lbGVtZW50dW5pdCA9IHRoaXMuX2RlY29kZVBoeXNpY2FsVW5pdHMoXG4gICAgICBwcm9wcy5zbGljZShwaWR4LCAocGlkeCArPSA1KSkuam9pbihcIiBcIilcbiAgICApO1xuXG4gICAgcGlkeCsrOyAvLyAneydcblxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy52YWx1ZXVuaXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpZ25hbFByb3BlcnRpZXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspXG4gICAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMudmFsdWV1bml0cy5wdXNoKFxuICAgICAgICB0aGlzLl9kZWNvZGVQaHlzaWNhbFVuaXRzKHByb3BzLnNsaWNlKHBpZHgsIChwaWR4ICs9IDUpKS5qb2luKFwiIFwiKSlcbiAgICAgICk7XG5cbiAgICBwaWR4Kys7IC8vICd9J1xuICAgIHRoaXMub25TaWduYWxQcm9wZXJ0aWVzKHRoaXMuc2lnbmFsUHJvcGVydGllcyk7XG4gIH1cblxuICBwcml2YXRlIF9kZWNvZGVTdGF0ZUZvcm1hdChkYXRhOiBEYXRhVmlldykge1xuICAgIHRoaXMuc3RhdGVGb3JtYXQgPSB7fTtcbiAgICBsZXQgZm9ybWF0U3RyID0gdGhpcy5nZXROdWxsVGVybVN0cmluZyhkYXRhKTtcblxuICAgIGxldCBsaW5lcyA9IGZvcm1hdFN0ci5zcGxpdChcIlxcblwiKTtcbiAgICBmb3IgKGxldCBsaW5lSWR4ID0gMDsgbGluZUlkeCA8IGxpbmVzLmxlbmd0aDsgbGluZUlkeCsrKSB7XG4gICAgICBpZiAobGluZXNbbGluZUlkeF0udHJpbSgpLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG4gICAgICBsZXQgc3RhdGVsaW5lID0gbGluZXNbbGluZUlkeF0uc3BsaXQoXCIgXCIpO1xuICAgICAgbGV0IG5hbWUgPSBzdGF0ZWxpbmVbMF07XG4gICAgICB0aGlzLnN0YXRlRm9ybWF0W25hbWVdID0ge307XG4gICAgICB0aGlzLnN0YXRlRm9ybWF0W25hbWVdLmJpdFdpZHRoID0gcGFyc2VJbnQoc3RhdGVsaW5lWzFdKTtcbiAgICAgIHRoaXMuc3RhdGVGb3JtYXRbbmFtZV0uZGVmYXVsdFZhbHVlID0gcGFyc2VJbnQoc3RhdGVsaW5lWzJdKTtcbiAgICAgIHRoaXMuc3RhdGVGb3JtYXRbbmFtZV0uYnl0ZUxvY2F0aW9uID0gcGFyc2VJbnQoc3RhdGVsaW5lWzNdKTtcbiAgICAgIHRoaXMuc3RhdGVGb3JtYXRbbmFtZV0uYml0TG9jYXRpb24gPSBwYXJzZUludChzdGF0ZWxpbmVbNF0pO1xuICAgIH1cblxuICAgIGxldCB2ZWNPcmRlciA9IFtdO1xuICAgIGZvciAobGV0IHN0YXRlIGluIHRoaXMuc3RhdGVGb3JtYXQpIHtcbiAgICAgIGxldCBsb2MgPSB0aGlzLnN0YXRlRm9ybWF0W3N0YXRlXS5ieXRlTG9jYXRpb24gKiA4O1xuICAgICAgbG9jICs9IHRoaXMuc3RhdGVGb3JtYXRbc3RhdGVdLmJpdExvY2F0aW9uO1xuICAgICAgdmVjT3JkZXIucHVzaChbc3RhdGUsIGxvY10pO1xuICAgIH1cblxuICAgIC8vIFNvcnQgYnkgYml0IGxvY2F0aW9uXG4gICAgdmVjT3JkZXIuc29ydCgoYSwgYikgPT4gKGFbMV0gPCBiWzFdID8gLTEgOiBhWzFdID4gYlsxXSA/IDEgOiAwKSk7XG5cbiAgICAvLyBDcmVhdGUgYSBsaXN0IG9mICggc3RhdGUsIGJpdHdpZHRoICkgZm9yIGRlY29kaW5nIHN0YXRlIHZlY3RvcnNcbiAgICB0aGlzLnN0YXRlVmVjT3JkZXIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlY09yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3RhdGUgPSB2ZWNPcmRlcltpXVswXTtcbiAgICAgIHRoaXMuc3RhdGVWZWNPcmRlci5wdXNoKFtzdGF0ZSwgdGhpcy5zdGF0ZUZvcm1hdFtzdGF0ZV0uYml0V2lkdGhdKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uU3RhdGVGb3JtYXQodGhpcy5zdGF0ZUZvcm1hdCk7XG4gIH1cblxuICBwcml2YXRlIF9kZWNvZGVHZW5lcmljU2lnbmFsKGRhdGE6IERhdGFWaWV3KSB7XG4gICAgbGV0IGluZGV4ID0gMDtcblx0bGV0IHNpZ25hbFR5cGUgPSBkYXRhLmdldFVpbnQ4KGluZGV4KTtcbiAgICBpbmRleCA9IGluZGV4ICsgMTtcblx0bGV0IG5DaGFubmVscyA9IGRhdGEuZ2V0VWludDE2KGluZGV4LCB0cnVlKVxuXHRpbmRleCA9IGluZGV4ICsgMlxuXHRsZXQgbkVsZW1lbnRzID0gZGF0YS5nZXRVaW50MTYoaW5kZXgsIHRydWUpXG5cdGluZGV4ID0gaW5kZXggKyAyXG5cdGluZGV4ID0gaW5kZXggKyBkYXRhLmJ5dGVPZmZzZXRcbiAgICBsZXQgc2lnbmFsRGF0YSA9IG5ldyBEYXRhVmlldyhkYXRhLmJ1ZmZlciwgaW5kZXgpXG4gICAgbGV0IHNpZ25hbCA9IFtdO1xuICAgIGZvciAobGV0IGNoID0gMDsgY2ggPCBuQ2hhbm5lbHM7ICsrY2gpIHtcbiAgICAgIHNpZ25hbC5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGVsID0gMDsgZWwgPCBuRWxlbWVudHM7ICsrZWwpIHtcbiAgICAgICAgc3dpdGNoIChzaWduYWxUeXBlKSB7XG4gICAgICAgICAgY2FzZSB0aGlzLlNpZ25hbFR5cGUuSU5UMTY6XG4gICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goc2lnbmFsRGF0YS5nZXRJbnQxNigobkVsZW1lbnRzICogY2ggKyBlbCkgKiAyLCB0cnVlKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgdGhpcy5TaWduYWxUeXBlLkZMT0FUMzI6XG4gICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goc2lnbmFsRGF0YS5nZXRGbG9hdDMyKChuRWxlbWVudHMgKiBjaCArIGVsKSAqIDQsIHRydWUpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSB0aGlzLlNpZ25hbFR5cGUuSU5UMzI6XG4gICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goc2lnbmFsRGF0YS5nZXRJbnQzMigobkVsZW1lbnRzICogY2ggKyBlbCkgKiA0LCB0cnVlKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgdGhpcy5TaWduYWxUeXBlLkZMT0FUMjQ6XG4gICAgICAgICAgICAvLyBUT0RPOiBDdXJyZW50bHkgVW5zdXBwb3J0ZWRcbiAgICAgICAgICAgIHNpZ25hbFtjaF0ucHVzaCgwLjApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2lnbmFsID0gc2lnbmFsO1xuICAgIHRoaXMub25HZW5lcmljU2lnbmFsKHNpZ25hbCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX2RlY29kZVN0YXRlVmVjdG9yKGR2OiBEYXRhVmlldykge1xuICAgIGlmICh0aGlzLnN0YXRlVmVjT3JkZXIgPT0gbnVsbCkgcmV0dXJuO1xuICAgIC8vIEN1cnJlbnRseSwgc3RhdGVzIGFyZSBtYXhpbXVtIDMyIGJpdCB1bnNpZ25lZCBpbnRlZ2Vyc1xuICAgIC8vIEJpdExvY2F0aW9uIDAgcmVmZXJzIHRvIHRoZSBsZWFzdCBzaWduaWZpY2FudCBiaXQgb2YgYSBieXRlIGluIHRoZSBwYWNrZXRcbiAgICAvLyBCeXRlTG9jYXRpb24gMCByZWZlcnMgdG8gdGhlIGZpcnN0IGJ5dGUgaW4gdGhlIHNlcXVlbmNlLlxuICAgIC8vIEJpdHMgbXVzdCBiZSBwb3B1bGF0ZWQgaW4gaW5jcmVhc2luZyBzaWduaWZpY2FuY2VcbiAgICBsZXQgaW5kZXggPSAxO1xuICAgIGxldCBfc3RhdGVWZWN0b3JMZW5ndGggPSBuZXcgRGF0YVZpZXcoZHYuYnVmZmVyLCBpbmRleCwgMilcbiAgICBpbmRleCA9IGluZGV4ICsgMjtcbiAgICBsZXQgc3RhdGVWZWN0b3JMZW5ndGggPSBwYXJzZUludCh0aGlzLmdldE51bGxUZXJtU3RyaW5nKF9zdGF0ZVZlY3Rvckxlbmd0aCkpO1xuICAgIGxldCBfbnVtVmVjdG9ycyA9IG5ldyBEYXRhVmlldyhkdi5idWZmZXIsIGluZGV4LCAyKVxuICAgIGluZGV4ID0gaW5kZXggKyAzO1xuICAgIGxldCBudW1WZWN0b3JzID0gcGFyc2VJbnQodGhpcy5nZXROdWxsVGVybVN0cmluZyhfbnVtVmVjdG9ycykpO1xuICAgIGxldCBkYXRhID0gbmV3IERhdGFWaWV3KGR2LmJ1ZmZlciwgaW5kZXgpO1xuICAgIGxldCBzdGF0ZXMgPSB7fTtcbiAgICBmb3IgKGxldCBzdGF0ZSBpbiB0aGlzLnN0YXRlRm9ybWF0KVxuICAgICAgc3RhdGVzW3N0YXRlXSA9IEFycmF5KG51bVZlY3RvcnMpLmZpbGwoXG4gICAgICAgIHRoaXMuc3RhdGVGb3JtYXRbc3RhdGVdLmRlZmF1bHRWYWx1ZVxuICAgICAgKTtcblxuICAgIGZvciAobGV0IHZlY0lkeCA9IDA7IHZlY0lkeCA8IG51bVZlY3RvcnM7IHZlY0lkeCsrKSB7XG4gICAgICBsZXQgdmVjID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCArICh2ZWNJZHggKiBzdGF0ZVZlY3Rvckxlbmd0aCksIHN0YXRlVmVjdG9yTGVuZ3RoKTtcbiAgICAgIGxldCBiaXRzID0gW107XG4gICAgICBmb3IgKGxldCBieXRlSWR4ID0gMDsgYnl0ZUlkeCA8IHZlYy5sZW5ndGg7IGJ5dGVJZHgrKykge1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MDEpICE9PSAwID8gMSA6IDApO1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MDIpICE9PSAwID8gMSA6IDApO1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MDQpICE9PSAwID8gMSA6IDApO1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MDgpICE9PSAwID8gMSA6IDApO1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MTApICE9PSAwID8gMSA6IDApO1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MjApICE9PSAwID8gMSA6IDApO1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4NDApICE9PSAwID8gMSA6IDApO1xuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4ODApICE9PSAwID8gMSA6IDApO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBzdGF0ZUlkeCA9IDA7IHN0YXRlSWR4IDwgdGhpcy5zdGF0ZVZlY09yZGVyLmxlbmd0aDsgc3RhdGVJZHgrKykge1xuICAgICAgICBsZXQgZm10ID0gdGhpcy5zdGF0ZUZvcm1hdFt0aGlzLnN0YXRlVmVjT3JkZXJbc3RhdGVJZHhdWzBdXTtcbiAgICAgICAgbGV0IG9mZnNldCA9IGZtdC5ieXRlTG9jYXRpb24gKiA4ICsgZm10LmJpdExvY2F0aW9uO1xuICAgICAgICBsZXQgdmFsID0gMDtcbiAgICAgICAgbGV0IG1hc2sgPSAweDAxO1xuICAgICAgICBmb3IgKGxldCBiSWR4ID0gMDsgYklkeCA8IGZtdC5iaXRXaWR0aDsgYklkeCsrKSB7XG4gICAgICAgICAgaWYgKGJpdHNbb2Zmc2V0ICsgYklkeF0pIHZhbCA9ICh2YWwgfCBtYXNrKSA+Pj4gMDtcbiAgICAgICAgICBtYXNrID0gKG1hc2sgPDwgMSkgPj4+IDA7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGVzW3RoaXMuc3RhdGVWZWNPcmRlcltzdGF0ZUlkeF1bMF1dW3ZlY0lkeF0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub25TdGF0ZVZlY3RvcihzdGF0ZXMpO1xuICAgIHRoaXMuc3RhdGVzID0gc3RhdGVzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBiY2lPcGVyYXRvcjogQkNJMktfT3BlcmF0b3JDb25uZWN0aW9uLFxuICBiY2lEYXRhOiBCQ0kyS19EYXRhQ29ubmVjdGlvblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfd2Vic29ja2V0X187Il0sInNvdXJjZVJvb3QiOiIifQ==