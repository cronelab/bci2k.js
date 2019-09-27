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
/******/ 	__webpack_require__.p = "C:\\Users\\fortu\\Projects\\Hopkins\\BCI2000\\BCI2K\\BCI2K.js\\dist";
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//To see how the BCI2000 messages are implemented in BCI2000 see here:
// https://www.bci2000.org/mediawiki/index.php/Technical_Reference:BCI2000_Messages
var websocket = __webpack_require__(/*! websocket */ "websocket").w3cwebsocket;
// import * as _websocket from "websocket";
// let websocket = _websocket.w3cwebsocket
var BCI2K_OperatorConnection = /** @class */ (function () {
    function BCI2K_OperatorConnection() {
        this.onconnect = function () { };
        this.ondisconnect = function () { };
        this.onStateChange = function (event) { };
        this._socket = null;
        this._execid = 0;
        this._exec = {};
        this.state = '';
    }
    BCI2K_OperatorConnection.prototype.connect = function (address) {
        var connection = this;
        return new Promise(function (resolve, reject) {
            if (address === undefined)
                // TODO Browser-dependent
                address = window.location.host;
            connection.address = address;
            connection._socket = new websocket(connection.address);
            connection._socket.onerror = function (error) {
                // This will only execute if we err before connecting, since
                // Promises can only get triggered once
                reject("Error connecting to BCI2000 at " + connection.address);
            };
            connection._socket.onopen = function () {
                connection.onconnect();
                resolve();
            };
            connection._socket.onclose = function () {
                connection.ondisconnect();
            };
            connection._socket.onmessage = function (event) {
                connection._handleMessageEvent(event.data);
            };
        });
    };
    BCI2K_OperatorConnection.prototype._handleMessageEvent = function (event) {
        var arr = event.split(" ");
        var opcode = arr[0];
        var id = arr[1];
        var msg = arr.slice(2).join(" ");
        switch (opcode) {
            case "S": // START: Starting to execute command
                if (this._exec[id].onstart)
                    this._exec[id].onstart(this._exec[id]);
                break;
            case "O": // OUTPUT: Received output from command
                this._exec[id].output += msg + " \n";
                if (this._exec[id].onoutput)
                    this._exec[id].onoutput(this._exec[id]);
                break;
            case "D": // DONE: Done executing command
                this._exec[id].exitcode = parseInt(msg);
                if (this._exec[id].ondone)
                    this._exec[id].ondone(this._exec[id]);
                delete this._exec[id];
                break;
            case "X":
                this.onStateChange(msg);
                break;
            default:
                break;
        }
    };
    BCI2K_OperatorConnection.prototype.tap = function (location) {
        var connection = this;
        var locationParameter = "WS" + location + "Server";
        return this.execute("Get Parameter " + locationParameter).then(function (location) {
            if (location.indexOf("does not exist") >= 0) {
                return Promise.reject("Location parameter does not exist");
            }
            if (location === "") {
                return Promise.reject("Location parameter not set");
            }
            var dataConnection = new BCI2K_DataConnection();
            // Use our address plus the port from the result
            return dataConnection
                .connect(connection.address + ":" + location.split(":")[1], '')
                .then(function (event) {
                // To keep with our old API, we actually want to wrap the
                // dataConnection, and not the connection event
                // TODO This means we can't get the connection event!
                return dataConnection;
            });
        });
    };
    BCI2K_OperatorConnection.prototype.connected = function () {
        return this._socket !== null && this._socket.readyState === websocket.OPEN;
    };
    BCI2K_OperatorConnection.prototype.execute = function (instruction) {
        var connection = this;
        if (this.connected()) {
            return new Promise(function (resolve, reject) {
                var id = (++connection._execid).toString();
                // TODO Properly handle errors from BCI2000
                connection._exec[id] = {
                    // onstart: onstart,
                    // onoutput: onoutput,
                    ondone: function (exec) {
                        // if (ondone) {
                        // ondone(exec);
                        // }
                        resolve(exec.output); // TODO Should pass whole thing?
                    },
                    output: "",
                    exitcode: null
                };
                var msg = "E " + id + " " + instruction;
                connection._socket.send(msg);
            });
        }
        // Cannot execute if not connected
        return Promise.reject("Cannot execute instruction: not connected to BCI2000");
    };
    BCI2K_OperatorConnection.prototype.getVersion = function () {
        this.execute("Version").then(function (x) { return console.log(x.split(" ")[1]); });
    };
    BCI2K_OperatorConnection.prototype.showWindow = function () {
        return this.execute("Show Window");
    };
    BCI2K_OperatorConnection.prototype.hideWindow = function () {
        return this.execute("Hide Window");
    };
    BCI2K_OperatorConnection.prototype.setWatch = function (state, ip, port) {
        return this.execute("Add watch " + state + " at " + ip + ":" + port);
    };
    BCI2K_OperatorConnection.prototype.resetSystem = function () {
        return this.execute("Reset System");
    };
    BCI2K_OperatorConnection.prototype.setConfig = function () {
        return this.execute("Set Config");
    };
    BCI2K_OperatorConnection.prototype.start = function () {
        return this.execute("Start");
    };
    BCI2K_OperatorConnection.prototype.stop = function () {
        return this.execute("Stop");
    };
    BCI2K_OperatorConnection.prototype.kill = function () {
        return this.execute("Exit");
    };
    BCI2K_OperatorConnection.prototype.stateListen = function () {
        var _this = this;
        setInterval(function () {
            _this.execute("GET SYSTEM STATE")
                .then(function (state) {
                if (state.trim() != _this.state) {
                    _this.onStateChange(state.trim());
                    _this.state = state.trim();
                }
            });
        }, 500);
    };
    BCI2K_OperatorConnection.prototype.getSubjectName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute('Get Parameter SubjectName')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    BCI2K_OperatorConnection.prototype.getTaskName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute('Get Parameter DataFile')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    return BCI2K_OperatorConnection;
}());
var BCI2K_DataConnection = /** @class */ (function () {
    function BCI2K_DataConnection() {
        this._socket = null;
        this.onconnect = function (event) { };
        this.onGenericSignal = function (data) { };
        this.onStateVector = function (data) { };
        this.onSignalProperties = function (data) { };
        this.onStateFormat = function (data) { };
        this.ondisconnect = function (event) { };
        this.onReceiveBlock = function () { };
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
    }
    BCI2K_DataConnection.prototype.getNullTermString = function (dv) {
        var val = "";
        var count = 0;
        while (count < dv.byteLength) {
            var v = dv.getUint8(count);
            count++;
            if (v == 0)
                break;
            val += String.fromCharCode(v);
        }
        return val;
    };
    BCI2K_DataConnection.prototype.connect = function (address, callingFrom) {
        var connection = this;
        this.callingFrom = callingFrom;
        return new Promise(function (resolve, reject) {
            connection._socket = new websocket(address);
            connection._socket.onerror = function () {
                // This will only execute if we err before connecting, since
                // Promises can only get triggered once
                reject("Error connecting to data source at " + connection.address);
            };
            connection._socket.onopen = function () {
                connection.onconnect();
                resolve();
            };
            connection._socket.onclose = function () {
                // setTimeout(() => {
                //   this.connect(connection._socket.url.split('//')[1])
                // }, 1000);
                connection.ondisconnect();
            };
            connection._socket.onmessage = function (event) {
                connection._handleMessageEvent(event);
            };
        });
    };
    BCI2K_DataConnection.prototype._handleMessageEvent = function (event) {
        console.log(event);
        var connection = this;
        if (typeof window !== 'undefined' || this.callingFrom == 'worker') {
            var messageInterpreter = new FileReader();
            messageInterpreter.onload = function (e) {
                connection._decodeMessage(e.target.result);
            };
            messageInterpreter.readAsArrayBuffer(event.data);
        }
        else {
            connection._decodeMessage(event.data);
        }
    };
    BCI2K_DataConnection.prototype.connected = function () {
        return this._socket != null && this._socket.readyState === websocket.OPEN;
    };
    BCI2K_DataConnection.prototype._decodeMessage = function (data) {
        var descriptor = new DataView(data, 0, 1).getUint8(0);
        switch (descriptor) {
            case 3:
                var stateFormatView = new DataView(data, 1, data.byteLength - 1);
                this._decodeStateFormat(stateFormatView);
                break;
            case 4:
                var supplement = new DataView(data, 1, 2).getUint8(0);
                switch (supplement) {
                    case 1:
                        var genericSignalView = new DataView(data, 2, data.byteLength - 2);
                        this._decodeGenericSignal(genericSignalView);
                        break;
                    case 3:
                        var signalPropertyView = new DataView(data, 2, data.byteLength - 2);
                        this._decodeSignalProperties(signalPropertyView);
                        break;
                    default:
                        console.error("Unsupported Supplement: " + supplement.toString());
                        break;
                }
                this.onReceiveBlock();
                break;
            case 5:
                var stateVectorView = new DataView(data, 1, data.byteLength - 1);
                this._decodeStateVector(stateVectorView);
                break;
            default:
                console.error("Unsupported Descriptor: " + descriptor.toString());
                break;
        }
    };
    BCI2K_DataConnection.prototype._decodePhysicalUnits = function (unitstr) {
        var units;
        units = {};
        var unit = unitstr.split(" ");
        var idx = 0;
        units.offset = Number(unit[idx++]);
        units.gain = Number(unit[idx++]);
        units.symbol = unit[idx++];
        units.vmin = Number(unit[idx++]);
        units.vmax = Number(unit[idx++]);
        return units;
    };
    BCI2K_DataConnection.prototype._decodeSignalProperties = function (data) {
        var propstr = this.getNullTermString(data);
        // Bugfix: There seems to not always be spaces after '{' characters
        propstr = propstr.replace(/{/g, " { ");
        propstr = propstr.replace(/}/g, " } ");
        this.signalProperties = {};
        var prop_tokens = propstr.split(" ");
        var props = [];
        for (var i = 0; i < prop_tokens.length; i++) {
            if (prop_tokens[i].trim() === "")
                continue;
            props.push(prop_tokens[i]);
        }
        var pidx = 0;
        this.signalProperties.name = props[pidx++];
        this.signalProperties.channels = [];
        if (props[pidx] === "{") {
            while (props[++pidx] !== "}")
                this.signalProperties.channels.push(props[pidx]);
            pidx++; // }
        }
        else {
            var numChannels = parseInt(props[pidx++]);
            for (var i = 0; i < numChannels; i++)
                this.signalProperties.channels.push((i + 1).toString());
        }
        this.signalProperties.elements = [];
        if (props[pidx] === "{") {
            while (props[++pidx] !== "}")
                this.signalProperties.elements.push(props[pidx]);
            pidx++; // }
        }
        else {
            var numElements = parseInt(props[pidx++]);
            for (var i = 0; i < numElements; i++)
                this.signalProperties.elements.push((i + 1).toString());
        }
        // Backward Compatibility
        this.signalProperties.numelements = this.signalProperties.elements.length;
        this.signalProperties.signaltype = props[pidx++];
        this.signalProperties.channelunit = this._decodePhysicalUnits(props.slice(pidx, (pidx += 5)).join(" "));
        this.signalProperties.elementunit = this._decodePhysicalUnits(props.slice(pidx, (pidx += 5)).join(" "));
        pidx++; // '{'
        this.signalProperties.valueunits = [];
        for (var i = 0; i < this.signalProperties.channels.length; i++)
            this.signalProperties.valueunits.push(this._decodePhysicalUnits(props.slice(pidx, (pidx += 5)).join(" ")));
        pidx++; // '}'
        this.onSignalProperties(this.signalProperties);
    };
    BCI2K_DataConnection.prototype._decodeStateFormat = function (data) {
        this.stateFormat = {};
        var formatStr = this.getNullTermString(data);
        var lines = formatStr.split("\n");
        for (var lineIdx = 0; lineIdx < lines.length; lineIdx++) {
            if (lines[lineIdx].trim().length === 0)
                continue;
            var stateline = lines[lineIdx].split(" ");
            var name_1 = stateline[0];
            this.stateFormat[name_1] = {};
            this.stateFormat[name_1].bitWidth = parseInt(stateline[1]);
            this.stateFormat[name_1].defaultValue = parseInt(stateline[2]);
            this.stateFormat[name_1].byteLocation = parseInt(stateline[3]);
            this.stateFormat[name_1].bitLocation = parseInt(stateline[4]);
        }
        var vecOrder = [];
        for (var state in this.stateFormat) {
            var loc = this.stateFormat[state].byteLocation * 8;
            loc += this.stateFormat[state].bitLocation;
            vecOrder.push([state, loc]);
        }
        // Sort by bit location
        vecOrder.sort(function (a, b) { return (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0); });
        // Create a list of ( state, bitwidth ) for decoding state vectors
        this.stateVecOrder = [];
        for (var i = 0; i < vecOrder.length; i++) {
            var state = vecOrder[i][0];
            this.stateVecOrder.push([state, this.stateFormat[state].bitWidth]);
        }
        this.onStateFormat(this.stateFormat);
    };
    BCI2K_DataConnection.prototype._decodeGenericSignal = function (data) {
        var index = 0;
        var signalType = data.getUint8(index);
        index = index + 1;
        var nChannels = data.getUint16(index, true);
        index = index + signalType;
        var nElements = data.getUint16(index, true);
        index = data.byteOffset + index + signalType;
        var signalData = new DataView(data.buffer, index);
        var signal = [];
        for (var ch = 0; ch < nChannels; ++ch) {
            signal.push([]);
            for (var el = 0; el < nElements; ++el) {
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
    };
    BCI2K_DataConnection.prototype._decodeStateVector = function (dv) {
        if (this.stateVecOrder == null)
            return;
        // Currently, states are maximum 32 bit unsigned integers
        // BitLocation 0 refers to the least significant bit of a byte in the packet
        // ByteLocation 0 refers to the first byte in the sequence.
        // Bits must be populated in increasing significance
        var index = 1;
        var _stateVectorLength = new DataView(dv.buffer, index, 2);
        index = index + 3;
        var stateVectorLength = parseInt(this.getNullTermString(_stateVectorLength));
        var _numVectors = new DataView(dv.buffer, index, 2);
        index = index + 3;
        var numVectors = parseInt(this.getNullTermString(_numVectors));
        var data = new DataView(dv.buffer, index);
        var states = {};
        for (var state in this.stateFormat)
            states[state] = Array(numVectors).fill(this.stateFormat[state].defaultValue);
        for (var vecIdx = 0; vecIdx < numVectors; vecIdx++) {
            var vec = new Uint8Array(data.buffer, data.byteOffset + (vecIdx * stateVectorLength), stateVectorLength);
            var bits = [];
            for (var byteIdx = 0; byteIdx < vec.length; byteIdx++) {
                bits.push((vec[byteIdx] & 0x01) !== 0 ? 1 : 0);
                bits.push((vec[byteIdx] & 0x02) !== 0 ? 1 : 0);
                bits.push((vec[byteIdx] & 0x04) !== 0 ? 1 : 0);
                bits.push((vec[byteIdx] & 0x08) !== 0 ? 1 : 0);
                bits.push((vec[byteIdx] & 0x10) !== 0 ? 1 : 0);
                bits.push((vec[byteIdx] & 0x20) !== 0 ? 1 : 0);
                bits.push((vec[byteIdx] & 0x40) !== 0 ? 1 : 0);
                bits.push((vec[byteIdx] & 0x80) !== 0 ? 1 : 0);
            }
            for (var stateIdx = 0; stateIdx < this.stateVecOrder.length; stateIdx++) {
                var fmt = this.stateFormat[this.stateVecOrder[stateIdx][0]];
                var offset = fmt.byteLocation * 8 + fmt.bitLocation;
                var val = 0;
                var mask = 0x01;
                for (var bIdx = 0; bIdx < fmt.bitWidth; bIdx++) {
                    if (bits[offset + bIdx])
                        val = (val | mask) >>> 0;
                    mask = (mask << 1) >>> 0;
                }
                states[this.stateVecOrder[stateIdx][0]][vecIdx] = val;
            }
        }
        this.onStateVector(states);
        this.states = states;
    };
    return BCI2K_DataConnection;
}());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CQ0kySy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQkNJMksvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQkNJMksvLi9iY2kyay50cyIsIndlYnBhY2s6Ly9CQ0kySy9leHRlcm5hbCBcIndlYnNvY2tldFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsOEVBQThFO0FBQzlFLEVBQUU7QUFDRixXQUFXO0FBQ1gscUNBQXFDO0FBQ3JDLEVBQUU7QUFDRiw4RUFBOEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFOUUsc0VBQXNFO0FBQ3RFLG1GQUFtRjtBQUduRixJQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFXLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFDcEQsMkNBQTJDO0FBQzNDLDBDQUEwQztBQUUxQztJQVNFO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLGNBQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQyxLQUFhLElBQU0sQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCwwQ0FBTyxHQUFQLFVBQVEsT0FBZTtRQUNyQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQUksT0FBTyxLQUFLLFNBQVM7Z0JBQ3ZCLHlCQUF5QjtnQkFDekIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRWpDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBRTdCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXZELFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLGVBQUs7Z0JBQ2hDLDREQUE0RDtnQkFDNUQsdUNBQXVDO2dCQUN2QyxNQUFNLENBQUMsaUNBQWlDLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pFLENBQUMsQ0FBQztZQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHO2dCQUMxQixVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBRXZCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDO1lBRUYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUc7Z0JBQzNCLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUM1QixDQUFDLENBQUM7WUFFRixVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxlQUFLO2dCQUNsQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNEQUFtQixHQUFuQixVQUFvQixLQUFZO1FBQzlCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQyxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssR0FBRyxFQUFFLHFDQUFxQztnQkFDN0MsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87b0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNO1lBQ1IsS0FBSyxHQUFHLEVBQUUsdUNBQXVDO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUTtvQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLE1BQU07WUFDUixLQUFLLEdBQUcsRUFBRSwrQkFBK0I7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU07b0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxzQ0FBRyxHQUFILFVBQUksUUFBZ0I7UUFDbEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFbkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBZ0I7WUFDOUUsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQzthQUM1RDtZQUNELElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTtnQkFDbkIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDckQ7WUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFFaEQsZ0RBQWdEO1lBQ2hELE9BQU8sY0FBYztpQkFDbEIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDO2lCQUM3RCxJQUFJLENBQUMsZUFBSztnQkFDVCx5REFBeUQ7Z0JBQ3pELCtDQUErQztnQkFDL0MscURBQXFEO2dCQUNyRCxPQUFPLGNBQWMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRDQUFTLEdBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDN0UsQ0FBQztJQUVELDBDQUFPLEdBQVAsVUFBUSxXQUFtQjtRQUN6QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNqQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUUzQywyQ0FBMkM7Z0JBQzNDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUc7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixNQUFNLEVBQUUsVUFBQyxJQUFJO3dCQUNYLGdCQUFnQjt3QkFDZCxnQkFBZ0I7d0JBQ2xCLElBQUk7d0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdDQUFnQztvQkFDeEQsQ0FBQztvQkFDRCxNQUFNLEVBQUUsRUFBRTtvQkFDVixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDO2dCQUNGLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQztnQkFDeEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELGtDQUFrQztRQUNsQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ25CLHNEQUFzRCxDQUN2RCxDQUFDO0lBQ0osQ0FBQztJQUVELDZDQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVMsSUFBSyxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCw2Q0FBVSxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCw2Q0FBVSxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwyQ0FBUSxHQUFSLFVBQVMsS0FBYSxFQUFFLEVBQVUsRUFBRSxJQUFZO1FBQzlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCw4Q0FBVyxHQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCw0Q0FBUyxHQUFUO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3Q0FBSyxHQUFMO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx1Q0FBSSxHQUFKO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCx1Q0FBSSxHQUFKO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCw4Q0FBVyxHQUFYO1FBQUEsaUJBV0M7UUFWQyxXQUFXLENBQUM7WUFDVixLQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO2lCQUM3QixJQUFJLENBQUMsVUFBQyxLQUFhO2dCQUNsQixJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFJLENBQUMsS0FBSyxFQUFFO29CQUM5QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNqQyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDM0I7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxHQUFHLENBQUM7SUFFVCxDQUFDO0lBR0ssaURBQWMsR0FBcEI7Ozs7NEJBQ1MscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQzs0QkFBdEQsc0JBQU8sU0FBK0MsRUFBQzs7OztLQUN4RDtJQUFBLENBQUM7SUFFSSw4Q0FBVyxHQUFqQjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDOzRCQUFuRCxzQkFBTyxTQUE0QyxFQUFDOzs7O0tBQ3JEO0lBQUEsQ0FBQztJQUVKLCtCQUFDO0FBQUQsQ0FBQztBQUVEO0lBaUJFO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFLLElBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBSSxJQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLGNBQUksSUFBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGNBQUksSUFBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFJLElBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBSyxJQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQU8sQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRTtRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEIsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDO0lBQ0osQ0FBQztJQUVELGdEQUFpQixHQUFqQixVQUFrQixFQUFFO1FBQ2xCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksS0FBSyxHQUFDLENBQUMsQ0FBQztRQUNaLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLE1BQU07WUFDbEIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxzQ0FBTyxHQUFQLFVBQVEsT0FBZSxFQUFFLFdBQW1CO1FBQzFDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1QyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRztnQkFDM0IsNERBQTREO2dCQUM1RCx1Q0FBdUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxxQ0FBcUMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDO1lBRUYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUc7Z0JBQzFCLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUM7WUFFRixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRztnQkFDM0IscUJBQXFCO2dCQUNyQix3REFBd0Q7Z0JBQ3hELFlBQVk7Z0JBQ1osVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzVCLENBQUMsQ0FBQztZQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBSztnQkFDbkMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtEQUFtQixHQUFuQixVQUFvQixLQUFLO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxFQUFFO1lBQ2pFLElBQUksa0JBQWtCLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUMxQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsV0FBQztnQkFDM0IsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQztZQUNGLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQsd0NBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQztJQUM1RSxDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFlLElBQUk7UUFDakIsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsUUFBUSxVQUFVLEVBQUU7WUFDbEIsS0FBSyxDQUFDO2dCQUNOLElBQUksZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNO1lBRVIsS0FBSyxDQUFDO2dCQUNKLElBQUksVUFBVSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxRQUFRLFVBQVUsRUFBRTtvQkFDbEIsS0FBSyxDQUFDO3dCQUNKLElBQUksaUJBQWlCLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDN0MsTUFBTTtvQkFDUixLQUFLLENBQUM7d0JBQ0osSUFBSSxrQkFBa0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUNqRCxNQUFNO29CQUNSO3dCQUNFLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ2xFLE1BQU07aUJBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUV0QixNQUFNO1lBRVIsS0FBSyxDQUFDO2dCQUNKLElBQUksZUFBZSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNO1lBRVI7Z0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEUsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVELG1EQUFvQixHQUFwQixVQUFxQixPQUFlO1FBQ3RDLElBQUksS0FBVSxDQUFDO1FBQ2YsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNQLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0IsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHNEQUF1QixHQUF2QixVQUF3QixJQUFjO1FBQ3BDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxtRUFBbUU7UUFDbkUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtnQkFBRSxTQUFTO1lBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtTQUNiO2FBQU07WUFDTCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtTQUNiO2FBQU07WUFDTCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQzNELEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUN6QyxDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQzNELEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUN6QyxDQUFDO1FBRUYsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNO1FBRWQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDbkMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3BFLENBQUM7UUFFSixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07UUFFZCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELGlEQUFrQixHQUFsQixVQUFtQixJQUFjO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ3ZELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUFFLFNBQVM7WUFDakQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLE1BQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFJLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBSSxDQUFDLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQUksQ0FBQyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFJLENBQUMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDbkQsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM3QjtRQUVELHVCQUF1QjtRQUN2QixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxRQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7UUFFbEUsa0VBQWtFO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsbURBQW9CLEdBQXBCLFVBQXFCLElBQWM7UUFDakMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxLQUFLLEdBQUcsS0FBSyxHQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUM7UUFDMUMsS0FBSyxHQUFHLEtBQUssR0FBQyxVQUFVO1FBQ3hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQztRQUMxQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBQyxLQUFLLEdBQUMsVUFBVSxDQUFDO1FBQ3pDLElBQUksVUFBVSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsS0FBSyxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEIsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDckMsUUFBUSxVQUFVLEVBQUU7b0JBQ2xCLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO3dCQUM1QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxNQUFNO29CQUVSLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPO3dCQUN4QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNuRSxNQUFNO29CQUVSLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO3dCQUN0QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNqRSxNQUFNO29CQUVSLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPO3dCQUMxQiw4QkFBOEI7d0JBQzlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLE1BQU07b0JBQ1I7d0JBQ0UsTUFBTTtpQkFDVDthQUNGO1NBQ0Y7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFHRCxpREFBa0IsR0FBbEIsVUFBbUIsRUFBWTtRQUM3QixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSTtZQUFFLE9BQU87UUFFdkMseURBQXlEO1FBQ3pELDRFQUE0RTtRQUM1RSwyREFBMkQ7UUFDM0Qsb0RBQW9EO1FBQ3BELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksa0JBQWtCLEdBQUcsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3hELEtBQUssR0FBRyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ2pELEtBQUssR0FBRyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXO1lBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FDckMsQ0FBQztRQUVKLEtBQUssSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsTUFBTSxHQUFDLGlCQUFpQixDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN0RyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hEO1lBRUQsS0FBSyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztnQkFDcEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDaEIsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7b0JBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUI7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDdkQ7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLE9BQU8sRUFBRSxvQkFBb0I7Q0FDOUIsQ0FBQzs7Ozs7Ozs7Ozs7O0FDeGpCRix1RCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIndlYnNvY2tldFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJ3ZWJzb2NrZXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQkNJMktcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJ3ZWJzb2NrZXRcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJDSTJLXCJdID0gZmFjdG9yeShyb290W1wid2Vic29ja2V0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfd2Vic29ja2V0X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIkM6XFxcXFVzZXJzXFxcXGZvcnR1XFxcXFByb2plY3RzXFxcXEhvcGtpbnNcXFxcQkNJMjAwMFxcXFxCQ0kyS1xcXFxCQ0kySy5qc1xcXFxkaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYmNpMmsudHNcIik7XG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cclxuLy9cclxuLy8gYmNpMmsuanNcclxuLy8gQSBqYXZhc2NyaXB0IGNvbm5lY3RvciBmb3IgQkNJMjAwMFxyXG4vL1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cclxuXHJcbi8vVG8gc2VlIGhvdyB0aGUgQkNJMjAwMCBtZXNzYWdlcyBhcmUgaW1wbGVtZW50ZWQgaW4gQkNJMjAwMCBzZWUgaGVyZTpcclxuLy8gaHR0cHM6Ly93d3cuYmNpMjAwMC5vcmcvbWVkaWF3aWtpL2luZGV4LnBocC9UZWNobmljYWxfUmVmZXJlbmNlOkJDSTIwMDBfTWVzc2FnZXNcclxuXHJcblxyXG5jb25zdCB3ZWJzb2NrZXQgPSByZXF1aXJlKFwid2Vic29ja2V0XCIpLnczY3dlYnNvY2tldDtcclxuLy8gaW1wb3J0ICogYXMgX3dlYnNvY2tldCBmcm9tIFwid2Vic29ja2V0XCI7XHJcbi8vIGxldCB3ZWJzb2NrZXQgPSBfd2Vic29ja2V0LnczY3dlYnNvY2tldFxyXG5cclxuY2xhc3MgQkNJMktfT3BlcmF0b3JDb25uZWN0aW9uIHtcclxuICBfc29ja2V0OiBXZWJTb2NrZXQ7XHJcbiAgX2V4ZWNpZDogYW55O1xyXG4gIF9leGVjOiBhbnk7XHJcbiAgc3RhdGU6IGFueTtcclxuICBvbmNvbm5lY3Q6IGFueTtcclxuICBvbmRpc2Nvbm5lY3Q6IGFueTtcclxuICBvblN0YXRlQ2hhbmdlOiBhbnk7XHJcbiAgYWRkcmVzczogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5vbmNvbm5lY3QgPSAoKSA9PiB7fTtcclxuICAgIHRoaXMub25kaXNjb25uZWN0ID0gKCkgPT4ge307XHJcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSAoZXZlbnQ6IHN0cmluZykgPT4ge307XHJcblxyXG4gICAgdGhpcy5fc29ja2V0ID0gbnVsbDtcclxuICAgIHRoaXMuX2V4ZWNpZCA9IDA7XHJcbiAgICB0aGlzLl9leGVjID0ge307XHJcbiAgICB0aGlzLnN0YXRlID0gJyc7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0KGFkZHJlc3M6IHN0cmluZykge1xyXG4gICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmIChhZGRyZXNzID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgLy8gVE9ETyBCcm93c2VyLWRlcGVuZGVudFxyXG4gICAgICAgIGFkZHJlc3MgPSB3aW5kb3cubG9jYXRpb24uaG9zdDtcclxuXHJcbiAgICAgIGNvbm5lY3Rpb24uYWRkcmVzcyA9IGFkZHJlc3M7XHJcblxyXG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQgPSBuZXcgd2Vic29ja2V0KGNvbm5lY3Rpb24uYWRkcmVzcyk7XHJcblxyXG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQub25lcnJvciA9IGVycm9yID0+IHtcclxuICAgICAgICAvLyBUaGlzIHdpbGwgb25seSBleGVjdXRlIGlmIHdlIGVyciBiZWZvcmUgY29ubmVjdGluZywgc2luY2VcclxuICAgICAgICAvLyBQcm9taXNlcyBjYW4gb25seSBnZXQgdHJpZ2dlcmVkIG9uY2VcclxuICAgICAgICByZWplY3QoXCJFcnJvciBjb25uZWN0aW5nIHRvIEJDSTIwMDAgYXQgXCIgKyBjb25uZWN0aW9uLmFkZHJlc3MpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29ubmVjdGlvbi5fc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgICAgICBjb25uZWN0aW9uLm9uY29ubmVjdCgpO1xyXG5cclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQub25jbG9zZSA9ICgpID0+IHtcclxuICAgICAgICBjb25uZWN0aW9uLm9uZGlzY29ubmVjdCgpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29ubmVjdGlvbi5fc29ja2V0Lm9ubWVzc2FnZSA9IGV2ZW50ID0+IHtcclxuICAgICAgICBjb25uZWN0aW9uLl9oYW5kbGVNZXNzYWdlRXZlbnQoZXZlbnQuZGF0YSk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVNZXNzYWdlRXZlbnQoZXZlbnQ6c3RyaW5nKSB7XHJcbiAgICBsZXQgYXJyID0gZXZlbnQuc3BsaXQoXCIgXCIpO1xyXG5cclxuICAgIGxldCBvcGNvZGUgPSBhcnJbMF07XHJcbiAgICBsZXQgaWQgPSBhcnJbMV07XHJcbiAgICBsZXQgbXNnID0gYXJyLnNsaWNlKDIpLmpvaW4oXCIgXCIpO1xyXG5cclxuICAgIHN3aXRjaCAob3Bjb2RlKSB7XHJcbiAgICAgIGNhc2UgXCJTXCI6IC8vIFNUQVJUOiBTdGFydGluZyB0byBleGVjdXRlIGNvbW1hbmRcclxuICAgICAgICBpZiAodGhpcy5fZXhlY1tpZF0ub25zdGFydCkgdGhpcy5fZXhlY1tpZF0ub25zdGFydCh0aGlzLl9leGVjW2lkXSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJPXCI6IC8vIE9VVFBVVDogUmVjZWl2ZWQgb3V0cHV0IGZyb20gY29tbWFuZFxyXG4gICAgICAgIHRoaXMuX2V4ZWNbaWRdLm91dHB1dCArPSBtc2cgKyBcIiBcXG5cIjtcclxuICAgICAgICBpZiAodGhpcy5fZXhlY1tpZF0ub25vdXRwdXQpIHRoaXMuX2V4ZWNbaWRdLm9ub3V0cHV0KHRoaXMuX2V4ZWNbaWRdKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIkRcIjogLy8gRE9ORTogRG9uZSBleGVjdXRpbmcgY29tbWFuZFxyXG4gICAgICAgIHRoaXMuX2V4ZWNbaWRdLmV4aXRjb2RlID0gcGFyc2VJbnQobXNnKTtcclxuICAgICAgICBpZiAodGhpcy5fZXhlY1tpZF0ub25kb25lKSB0aGlzLl9leGVjW2lkXS5vbmRvbmUodGhpcy5fZXhlY1tpZF0pO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9leGVjW2lkXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIlhcIjpcclxuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UobXNnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRhcChsb2NhdGlvbjogc3RyaW5nKXsvL30sIG9uU3VjY2Vzcywgb25GYWlsdXJlKSB7XHJcbiAgICBsZXQgY29ubmVjdGlvbiA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGxvY2F0aW9uUGFyYW1ldGVyID0gXCJXU1wiICsgbG9jYXRpb24gKyBcIlNlcnZlclwiO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJHZXQgUGFyYW1ldGVyIFwiICsgbG9jYXRpb25QYXJhbWV0ZXIpLnRoZW4oKGxvY2F0aW9uOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGxvY2F0aW9uLmluZGV4T2YoXCJkb2VzIG5vdCBleGlzdFwiKSA+PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiTG9jYXRpb24gcGFyYW1ldGVyIGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChsb2NhdGlvbiA9PT0gXCJcIikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIkxvY2F0aW9uIHBhcmFtZXRlciBub3Qgc2V0XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgZGF0YUNvbm5lY3Rpb24gPSBuZXcgQkNJMktfRGF0YUNvbm5lY3Rpb24oKTtcclxuXHJcbiAgICAgIC8vIFVzZSBvdXIgYWRkcmVzcyBwbHVzIHRoZSBwb3J0IGZyb20gdGhlIHJlc3VsdFxyXG4gICAgICByZXR1cm4gZGF0YUNvbm5lY3Rpb25cclxuICAgICAgICAuY29ubmVjdChjb25uZWN0aW9uLmFkZHJlc3MgKyBcIjpcIiArIGxvY2F0aW9uLnNwbGl0KFwiOlwiKVsxXSwnJylcclxuICAgICAgICAudGhlbihldmVudCA9PiB7XHJcbiAgICAgICAgICAvLyBUbyBrZWVwIHdpdGggb3VyIG9sZCBBUEksIHdlIGFjdHVhbGx5IHdhbnQgdG8gd3JhcCB0aGVcclxuICAgICAgICAgIC8vIGRhdGFDb25uZWN0aW9uLCBhbmQgbm90IHRoZSBjb25uZWN0aW9uIGV2ZW50XHJcbiAgICAgICAgICAvLyBUT0RPIFRoaXMgbWVhbnMgd2UgY2FuJ3QgZ2V0IHRoZSBjb25uZWN0aW9uIGV2ZW50IVxyXG4gICAgICAgICAgcmV0dXJuIGRhdGFDb25uZWN0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ja2V0ICE9PSBudWxsICYmIHRoaXMuX3NvY2tldC5yZWFkeVN0YXRlID09PSB3ZWJzb2NrZXQuT1BFTjtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUoaW5zdHJ1Y3Rpb246IHN0cmluZyl7Ly99LCBvbmRvbmUsIG9uc3RhcnQsIG9ub3V0cHV0KSB7XHJcbiAgICBsZXQgY29ubmVjdGlvbiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHRoaXMuY29ubmVjdGVkKCkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgaWQgPSAoKytjb25uZWN0aW9uLl9leGVjaWQpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gUHJvcGVybHkgaGFuZGxlIGVycm9ycyBmcm9tIEJDSTIwMDBcclxuICAgICAgICBjb25uZWN0aW9uLl9leGVjW2lkXSA9IHtcclxuICAgICAgICAgIC8vIG9uc3RhcnQ6IG9uc3RhcnQsXHJcbiAgICAgICAgICAvLyBvbm91dHB1dDogb25vdXRwdXQsXHJcbiAgICAgICAgICBvbmRvbmU6IChleGVjKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGlmIChvbmRvbmUpIHtcclxuICAgICAgICAgICAgICAvLyBvbmRvbmUoZXhlYyk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShleGVjLm91dHB1dCk7IC8vIFRPRE8gU2hvdWxkIHBhc3Mgd2hvbGUgdGhpbmc/XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb3V0cHV0OiBcIlwiLFxyXG4gICAgICAgICAgZXhpdGNvZGU6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBtc2cgPSBcIkUgXCIgKyBpZCArIFwiIFwiICsgaW5zdHJ1Y3Rpb247XHJcbiAgICAgICAgY29ubmVjdGlvbi5fc29ja2V0LnNlbmQobXNnKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2Fubm90IGV4ZWN1dGUgaWYgbm90IGNvbm5lY3RlZFxyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxyXG4gICAgICBcIkNhbm5vdCBleGVjdXRlIGluc3RydWN0aW9uOiBub3QgY29ubmVjdGVkIHRvIEJDSTIwMDBcIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFZlcnNpb24oKSB7XHJcbiAgICB0aGlzLmV4ZWN1dGUoXCJWZXJzaW9uXCIpLnRoZW4oKHg6IHN0cmluZykgPT4gY29uc29sZS5sb2coeC5zcGxpdChcIiBcIilbMV0pKTtcclxuICB9XHJcblxyXG4gIHNob3dXaW5kb3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlKFwiU2hvdyBXaW5kb3dcIik7XHJcbiAgfVxyXG5cclxuICBoaWRlV2luZG93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIkhpZGUgV2luZG93XCIpO1xyXG4gIH1cclxuXHJcbiAgc2V0V2F0Y2goc3RhdGU6IHN0cmluZywgaXA6IHN0cmluZywgcG9ydDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlKFwiQWRkIHdhdGNoIFwiICsgc3RhdGUgKyBcIiBhdCBcIiArIGlwICsgXCI6XCIgKyBwb3J0KTtcclxuICB9XHJcblxyXG4gIHJlc2V0U3lzdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIlJlc2V0IFN5c3RlbVwiKTtcclxuICB9XHJcblxyXG4gIHNldENvbmZpZygpIHtcclxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJTZXQgQ29uZmlnXCIpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlKFwiU3RhcnRcIik7XHJcbiAgfVxyXG5cclxuICBzdG9wKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIlN0b3BcIik7XHJcbiAgfVxyXG5cclxuICBraWxsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIkV4aXRcIik7XHJcbiAgfVxyXG5cclxuICBzdGF0ZUxpc3RlbigpIHtcclxuICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy5leGVjdXRlKFwiR0VUIFNZU1RFTSBTVEFURVwiKVxyXG4gICAgICAgIC50aGVuKChzdGF0ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAoc3RhdGUudHJpbSgpICE9IHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlKHN0YXRlLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZS50cmltKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCA1MDApXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGFzeW5jIGdldFN1YmplY3ROYW1lKCkge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZXhlY3V0ZSgnR2V0IFBhcmFtZXRlciBTdWJqZWN0TmFtZScpO1xyXG4gIH07XHJcblxyXG4gIGFzeW5jIGdldFRhc2tOYW1lKCkge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZXhlY3V0ZSgnR2V0IFBhcmFtZXRlciBEYXRhRmlsZScpO1xyXG4gIH07XHJcblxyXG59XHJcblxyXG5jbGFzcyBCQ0kyS19EYXRhQ29ubmVjdGlvbiB7XHJcbiAgX3NvY2tldDogYW55O1xyXG4gIHN0YXRlczogYW55O1xyXG4gIHNpZ25hbDogYW55O1xyXG4gIHNpZ25hbFByb3BlcnRpZXM6IGFueTtcclxuICBzdGF0ZUZvcm1hdDogYW55O1xyXG4gIHN0YXRlVmVjT3JkZXI6IGFueTtcclxuICBTaWduYWxUeXBlOiBhbnk7XHJcbiAgY2FsbGluZ0Zyb206IGFueTtcclxuICBvbmNvbm5lY3Q6IGFueTtcclxuICBvbkdlbmVyaWNTaWduYWw6IGFueTtcclxuICBvblN0YXRlVmVjdG9yOiBhbnk7XHJcbiAgb25TaWduYWxQcm9wZXJ0aWVzOiBhbnk7XHJcbiAgb25TdGF0ZUZvcm1hdDogYW55O1xyXG4gIG9uZGlzY29ubmVjdDogYW55O1xyXG4gIG9uUmVjZWl2ZUJsb2NrOiBhbnk7XHJcbiAgYWRkcmVzczogYW55O1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fc29ja2V0ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLm9uY29ubmVjdCA9IGV2ZW50ID0+IHt9O1xyXG4gICAgdGhpcy5vbkdlbmVyaWNTaWduYWwgPSBkYXRhID0+IHt9O1xyXG4gICAgdGhpcy5vblN0YXRlVmVjdG9yID0gZGF0YSA9PiB7fTtcclxuICAgIHRoaXMub25TaWduYWxQcm9wZXJ0aWVzID0gZGF0YSA9PiB7fTtcclxuICAgIHRoaXMub25TdGF0ZUZvcm1hdCA9IGRhdGEgPT4ge307XHJcbiAgICB0aGlzLm9uZGlzY29ubmVjdCA9IGV2ZW50ID0+IHt9O1xyXG4gICAgdGhpcy5vblJlY2VpdmVCbG9jayA9ICgpID0+IHt9O1xyXG5cclxuICAgIHRoaXMuY2FsbGluZ0Zyb20gPSAnJ1xyXG5cclxuICAgIHRoaXMuc3RhdGVzID0ge307XHJcbiAgICB0aGlzLnNpZ25hbCA9IG51bGw7XHJcbiAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMgPSBudWxsO1xyXG4gICAgdGhpcy5zdGF0ZUZvcm1hdCA9IG51bGw7XHJcbiAgICB0aGlzLnN0YXRlVmVjT3JkZXIgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuU2lnbmFsVHlwZSA9IHtcclxuICAgICAgSU5UMTY6IDAsXHJcbiAgICAgIEZMT0FUMjQ6IDEsXHJcbiAgICAgIEZMT0FUMzI6IDIsXHJcbiAgICAgIElOVDMyOiAzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0TnVsbFRlcm1TdHJpbmcoZHYpIHtcclxuICAgIHZhciB2YWwgPSBcIlwiO1xyXG4gICAgbGV0IGNvdW50PTA7XHJcbiAgICB3aGlsZSAoY291bnQgPCBkdi5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgIHZhciB2ID0gZHYuZ2V0VWludDgoY291bnQpO1xyXG4gICAgICBjb3VudCsrXHJcbiAgICAgIGlmICh2ID09IDApIGJyZWFrO1xyXG4gICAgICB2YWwgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh2KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0KGFkZHJlc3M6IHN0cmluZywgY2FsbGluZ0Zyb206IHN0cmluZykge1xyXG4gICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgdGhpcy5jYWxsaW5nRnJvbSA9IGNhbGxpbmdGcm9tO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29ubmVjdGlvbi5fc29ja2V0ID0gbmV3IHdlYnNvY2tldChhZGRyZXNzKTtcclxuXHJcbiAgICAgIGNvbm5lY3Rpb24uX3NvY2tldC5vbmVycm9yID0gKCkgPT4gIHtcclxuICAgICAgICAvLyBUaGlzIHdpbGwgb25seSBleGVjdXRlIGlmIHdlIGVyciBiZWZvcmUgY29ubmVjdGluZywgc2luY2VcclxuICAgICAgICAvLyBQcm9taXNlcyBjYW4gb25seSBnZXQgdHJpZ2dlcmVkIG9uY2VcclxuICAgICAgICByZWplY3QoXCJFcnJvciBjb25uZWN0aW5nIHRvIGRhdGEgc291cmNlIGF0IFwiICsgY29ubmVjdGlvbi5hZGRyZXNzKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbm5lY3Rpb24uX3NvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgY29ubmVjdGlvbi5vbmNvbm5lY3QoKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQub25jbG9zZSA9ICgpID0+IHtcclxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgIHRoaXMuY29ubmVjdChjb25uZWN0aW9uLl9zb2NrZXQudXJsLnNwbGl0KCcvLycpWzFdKVxyXG4gICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgIGNvbm5lY3Rpb24ub25kaXNjb25uZWN0KCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25uZWN0aW9uLl9zb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29ubmVjdGlvbi5faGFuZGxlTWVzc2FnZUV2ZW50KGV2ZW50KTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZU1lc3NhZ2VFdmVudChldmVudCkge1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnIHx8IHRoaXMuY2FsbGluZ0Zyb20gPT0gJ3dvcmtlcicpIHtcclxuICAgICAgbGV0IG1lc3NhZ2VJbnRlcnByZXRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgIG1lc3NhZ2VJbnRlcnByZXRlci5vbmxvYWQgPSBlID0+IHtcclxuICAgICAgICBjb25uZWN0aW9uLl9kZWNvZGVNZXNzYWdlKGUudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgIH07XHJcbiAgICAgIG1lc3NhZ2VJbnRlcnByZXRlci5yZWFkQXNBcnJheUJ1ZmZlcihldmVudC5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbm5lY3Rpb24uX2RlY29kZU1lc3NhZ2UoZXZlbnQuZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25uZWN0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ja2V0ICE9IG51bGwgJiYgdGhpcy5fc29ja2V0LnJlYWR5U3RhdGUgPT09IHdlYnNvY2tldC5PUEVOO1xyXG4gIH1cclxuXHJcbiAgX2RlY29kZU1lc3NhZ2UoZGF0YSkge1xyXG4gICAgbGV0IGRlc2NyaXB0b3IgPSBuZXcgRGF0YVZpZXcoZGF0YSwwLDEpLmdldFVpbnQ4KDApO1xyXG4gICAgc3dpdGNoIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgbGV0IHN0YXRlRm9ybWF0VmlldyA9IG5ldyBEYXRhVmlldyhkYXRhLDEsZGF0YS5ieXRlTGVuZ3RoLTEpO1xyXG4gICAgICB0aGlzLl9kZWNvZGVTdGF0ZUZvcm1hdChzdGF0ZUZvcm1hdFZpZXcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSA0OlxyXG4gICAgICAgIGxldCBzdXBwbGVtZW50ID0gbmV3IERhdGFWaWV3KGRhdGEsMSwyKS5nZXRVaW50OCgwKTtcclxuICAgICAgICBzd2l0Y2ggKHN1cHBsZW1lbnQpIHtcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgbGV0IGdlbmVyaWNTaWduYWxWaWV3ID0gbmV3IERhdGFWaWV3KGRhdGEsMixkYXRhLmJ5dGVMZW5ndGgtMik7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlY29kZUdlbmVyaWNTaWduYWwoZ2VuZXJpY1NpZ25hbFZpZXcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgbGV0IHNpZ25hbFByb3BlcnR5VmlldyA9IG5ldyBEYXRhVmlldyhkYXRhLDIsZGF0YS5ieXRlTGVuZ3RoLTIpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWNvZGVTaWduYWxQcm9wZXJ0aWVzKHNpZ25hbFByb3BlcnR5Vmlldyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuc3VwcG9ydGVkIFN1cHBsZW1lbnQ6IFwiICsgc3VwcGxlbWVudC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25SZWNlaXZlQmxvY2soKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDU6XHJcbiAgICAgICAgbGV0IHN0YXRlVmVjdG9yVmlldyA9IG5ldyBEYXRhVmlldyhkYXRhLDEsZGF0YS5ieXRlTGVuZ3RoLTEpO1xyXG4gICAgICAgIHRoaXMuX2RlY29kZVN0YXRlVmVjdG9yKHN0YXRlVmVjdG9yVmlldyk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbnN1cHBvcnRlZCBEZXNjcmlwdG9yOiBcIiArIGRlc2NyaXB0b3IudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZGVjb2RlUGh5c2ljYWxVbml0cyh1bml0c3RyOiBzdHJpbmcpIHtcclxubGV0IHVuaXRzOiBhbnk7XHJcbnVuaXRzID0ge307XHJcbiAgICBsZXQgdW5pdCA9IHVuaXRzdHIuc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IGlkeCA9IDA7XHJcbiAgICB1bml0cy5vZmZzZXQgPSBOdW1iZXIodW5pdFtpZHgrK10pO1xyXG4gICAgdW5pdHMuZ2FpbiA9IE51bWJlcih1bml0W2lkeCsrXSk7XHJcbiAgICB1bml0cy5zeW1ib2wgPSB1bml0W2lkeCsrXTtcclxuICAgIHVuaXRzLnZtaW4gPSBOdW1iZXIodW5pdFtpZHgrK10pO1xyXG4gICAgdW5pdHMudm1heCA9IE51bWJlcih1bml0W2lkeCsrXSk7XHJcbiAgICByZXR1cm4gdW5pdHM7XHJcbiAgfVxyXG5cclxuICBfZGVjb2RlU2lnbmFsUHJvcGVydGllcyhkYXRhOiBEYXRhVmlldykge1xyXG4gICAgbGV0IHByb3BzdHIgPSB0aGlzLmdldE51bGxUZXJtU3RyaW5nKGRhdGEpO1xyXG4gICAgLy8gQnVnZml4OiBUaGVyZSBzZWVtcyB0byBub3QgYWx3YXlzIGJlIHNwYWNlcyBhZnRlciAneycgY2hhcmFjdGVyc1xyXG4gICAgcHJvcHN0ciA9IHByb3BzdHIucmVwbGFjZSgvey9nLCBcIiB7IFwiKTtcclxuICAgIHByb3BzdHIgPSBwcm9wc3RyLnJlcGxhY2UoL30vZywgXCIgfSBcIik7XHJcblxyXG4gICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzID0ge307XHJcbiAgICBsZXQgcHJvcF90b2tlbnMgPSBwcm9wc3RyLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwcm9wcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wX3Rva2Vucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocHJvcF90b2tlbnNbaV0udHJpbSgpID09PSBcIlwiKSBjb250aW51ZTtcclxuICAgICAgcHJvcHMucHVzaChwcm9wX3Rva2Vuc1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBpZHggPSAwO1xyXG4gICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLm5hbWUgPSBwcm9wc1twaWR4KytdO1xyXG5cclxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5jaGFubmVscyA9IFtdO1xyXG4gICAgaWYgKHByb3BzW3BpZHhdID09PSBcIntcIikge1xyXG4gICAgICB3aGlsZSAocHJvcHNbKytwaWR4XSAhPT0gXCJ9XCIpXHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmNoYW5uZWxzLnB1c2gocHJvcHNbcGlkeF0pO1xyXG4gICAgICBwaWR4Kys7IC8vIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBudW1DaGFubmVscyA9IHBhcnNlSW50KHByb3BzW3BpZHgrK10pO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNoYW5uZWxzOyBpKyspXHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmNoYW5uZWxzLnB1c2goKGkgKyAxKS50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuZWxlbWVudHMgPSBbXTtcclxuICAgIGlmIChwcm9wc1twaWR4XSA9PT0gXCJ7XCIpIHtcclxuICAgICAgd2hpbGUgKHByb3BzWysrcGlkeF0gIT09IFwifVwiKVxyXG4gICAgICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5lbGVtZW50cy5wdXNoKHByb3BzW3BpZHhdKTtcclxuICAgICAgcGlkeCsrOyAvLyB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbnVtRWxlbWVudHMgPSBwYXJzZUludChwcm9wc1twaWR4KytdKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1FbGVtZW50czsgaSsrKVxyXG4gICAgICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5lbGVtZW50cy5wdXNoKChpICsgMSkudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFja3dhcmQgQ29tcGF0aWJpbGl0eVxyXG4gICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLm51bWVsZW1lbnRzID0gdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmVsZW1lbnRzLmxlbmd0aDtcclxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5zaWduYWx0eXBlID0gcHJvcHNbcGlkeCsrXTtcclxuICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5jaGFubmVsdW5pdCA9IHRoaXMuX2RlY29kZVBoeXNpY2FsVW5pdHMoXHJcbiAgICAgIHByb3BzLnNsaWNlKHBpZHgsIChwaWR4ICs9IDUpKS5qb2luKFwiIFwiKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuZWxlbWVudHVuaXQgPSB0aGlzLl9kZWNvZGVQaHlzaWNhbFVuaXRzKFxyXG4gICAgICBwcm9wcy5zbGljZShwaWR4LCAocGlkeCArPSA1KSkuam9pbihcIiBcIilcclxuICAgICk7XHJcblxyXG4gICAgcGlkeCsrOyAvLyAneydcclxuXHJcbiAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMudmFsdWV1bml0cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpZ25hbFByb3BlcnRpZXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspXHJcbiAgICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy52YWx1ZXVuaXRzLnB1c2goXHJcbiAgICAgICAgdGhpcy5fZGVjb2RlUGh5c2ljYWxVbml0cyhwcm9wcy5zbGljZShwaWR4LCAocGlkeCArPSA1KSkuam9pbihcIiBcIikpXHJcbiAgICAgICk7XHJcblxyXG4gICAgcGlkeCsrOyAvLyAnfSdcclxuXHJcbiAgICB0aGlzLm9uU2lnbmFsUHJvcGVydGllcyh0aGlzLnNpZ25hbFByb3BlcnRpZXMpO1xyXG4gIH1cclxuXHJcbiAgX2RlY29kZVN0YXRlRm9ybWF0KGRhdGE6IERhdGFWaWV3KSB7XHJcbiAgICB0aGlzLnN0YXRlRm9ybWF0ID0ge307XHJcbiAgICBsZXQgZm9ybWF0U3RyID0gdGhpcy5nZXROdWxsVGVybVN0cmluZyhkYXRhKTtcclxuXHJcbiAgICBsZXQgbGluZXMgPSBmb3JtYXRTdHIuc3BsaXQoXCJcXG5cIik7XHJcbiAgICBmb3IgKGxldCBsaW5lSWR4ID0gMDsgbGluZUlkeCA8IGxpbmVzLmxlbmd0aDsgbGluZUlkeCsrKSB7XHJcbiAgICAgIGlmIChsaW5lc1tsaW5lSWR4XS50cmltKCkubGVuZ3RoID09PSAwKSBjb250aW51ZTtcclxuICAgICAgbGV0IHN0YXRlbGluZSA9IGxpbmVzW2xpbmVJZHhdLnNwbGl0KFwiIFwiKTtcclxuICAgICAgbGV0IG5hbWUgPSBzdGF0ZWxpbmVbMF07XHJcbiAgICAgIHRoaXMuc3RhdGVGb3JtYXRbbmFtZV0gPSB7fTtcclxuICAgICAgdGhpcy5zdGF0ZUZvcm1hdFtuYW1lXS5iaXRXaWR0aCA9IHBhcnNlSW50KHN0YXRlbGluZVsxXSk7XHJcbiAgICAgIHRoaXMuc3RhdGVGb3JtYXRbbmFtZV0uZGVmYXVsdFZhbHVlID0gcGFyc2VJbnQoc3RhdGVsaW5lWzJdKTtcclxuICAgICAgdGhpcy5zdGF0ZUZvcm1hdFtuYW1lXS5ieXRlTG9jYXRpb24gPSBwYXJzZUludChzdGF0ZWxpbmVbM10pO1xyXG4gICAgICB0aGlzLnN0YXRlRm9ybWF0W25hbWVdLmJpdExvY2F0aW9uID0gcGFyc2VJbnQoc3RhdGVsaW5lWzRdKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmVjT3JkZXIgPSBbXTtcclxuICAgIGZvciAobGV0IHN0YXRlIGluIHRoaXMuc3RhdGVGb3JtYXQpIHtcclxuICAgICAgbGV0IGxvYyA9IHRoaXMuc3RhdGVGb3JtYXRbc3RhdGVdLmJ5dGVMb2NhdGlvbiAqIDg7XHJcbiAgICAgIGxvYyArPSB0aGlzLnN0YXRlRm9ybWF0W3N0YXRlXS5iaXRMb2NhdGlvbjtcclxuICAgICAgdmVjT3JkZXIucHVzaChbc3RhdGUsIGxvY10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNvcnQgYnkgYml0IGxvY2F0aW9uXHJcbiAgICB2ZWNPcmRlci5zb3J0KChhLCBiKSA9PiAoYVsxXSA8IGJbMV0gPyAtMSA6IGFbMV0gPiBiWzFdID8gMSA6IDApKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBsaXN0IG9mICggc3RhdGUsIGJpdHdpZHRoICkgZm9yIGRlY29kaW5nIHN0YXRlIHZlY3RvcnNcclxuICAgIHRoaXMuc3RhdGVWZWNPcmRlciA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZWNPcmRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgc3RhdGUgPSB2ZWNPcmRlcltpXVswXTtcclxuICAgICAgdGhpcy5zdGF0ZVZlY09yZGVyLnB1c2goW3N0YXRlLCB0aGlzLnN0YXRlRm9ybWF0W3N0YXRlXS5iaXRXaWR0aF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25TdGF0ZUZvcm1hdCh0aGlzLnN0YXRlRm9ybWF0KTtcclxuICB9XHJcblxyXG4gIF9kZWNvZGVHZW5lcmljU2lnbmFsKGRhdGE6IERhdGFWaWV3KSB7XHJcbiAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgbGV0IHNpZ25hbFR5cGUgPSBkYXRhLmdldFVpbnQ4KGluZGV4KTtcclxuICAgIGluZGV4ID0gaW5kZXgrMTtcclxuICAgIGxldCBuQ2hhbm5lbHMgPSBkYXRhLmdldFVpbnQxNihpbmRleCx0cnVlKVxyXG4gICAgaW5kZXggPSBpbmRleCtzaWduYWxUeXBlXHJcbiAgICBsZXQgbkVsZW1lbnRzID0gZGF0YS5nZXRVaW50MTYoaW5kZXgsdHJ1ZSlcclxuICAgIGluZGV4ID0gZGF0YS5ieXRlT2Zmc2V0K2luZGV4K3NpZ25hbFR5cGU7XHJcbiAgICBsZXQgc2lnbmFsRGF0YSA9IG5ldyBEYXRhVmlldyhkYXRhLmJ1ZmZlcixpbmRleClcclxuICAgIGxldCBzaWduYWwgPSBbXTtcclxuICAgIGZvciAobGV0IGNoID0gMDsgY2ggPCBuQ2hhbm5lbHM7ICsrY2gpIHtcclxuICAgICAgc2lnbmFsLnB1c2goW10pO1xyXG4gICAgICBmb3IgKGxldCBlbCA9IDA7IGVsIDwgbkVsZW1lbnRzOyArK2VsKSB7XHJcbiAgICAgICAgc3dpdGNoIChzaWduYWxUeXBlKSB7XHJcbiAgICAgICAgICBjYXNlIHRoaXMuU2lnbmFsVHlwZS5JTlQxNjpcclxuICAgICAgICBzaWduYWxbY2hdLnB1c2goc2lnbmFsRGF0YS5nZXRJbnQxNigobkVsZW1lbnRzKmNoK2VsKSoyLHRydWUpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgY2FzZSB0aGlzLlNpZ25hbFR5cGUuRkxPQVQzMjpcclxuICAgICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goc2lnbmFsRGF0YS5nZXRGbG9hdDMyKChuRWxlbWVudHMqY2grZWwpKjQsdHJ1ZSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIHRoaXMuU2lnbmFsVHlwZS5JTlQzMjpcclxuICAgICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goc2lnbmFsRGF0YS5nZXRJbnQzMigobkVsZW1lbnRzKmNoK2VsKSo0LHRydWUpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgY2FzZSB0aGlzLlNpZ25hbFR5cGUuRkxPQVQyNDpcclxuICAgICAgICAgICAgLy8gVE9ETzogQ3VycmVudGx5IFVuc3VwcG9ydGVkXHJcbiAgICAgICAgICAgIHNpZ25hbFtjaF0ucHVzaCgwLjApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zaWduYWwgPSBzaWduYWw7XHJcbiAgICB0aGlzLm9uR2VuZXJpY1NpZ25hbChzaWduYWwpO1xyXG4gIH1cclxuICBcclxuXHJcbiAgX2RlY29kZVN0YXRlVmVjdG9yKGR2OiBEYXRhVmlldykge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVWZWNPcmRlciA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgLy8gQ3VycmVudGx5LCBzdGF0ZXMgYXJlIG1heGltdW0gMzIgYml0IHVuc2lnbmVkIGludGVnZXJzXHJcbiAgICAvLyBCaXRMb2NhdGlvbiAwIHJlZmVycyB0byB0aGUgbGVhc3Qgc2lnbmlmaWNhbnQgYml0IG9mIGEgYnl0ZSBpbiB0aGUgcGFja2V0XHJcbiAgICAvLyBCeXRlTG9jYXRpb24gMCByZWZlcnMgdG8gdGhlIGZpcnN0IGJ5dGUgaW4gdGhlIHNlcXVlbmNlLlxyXG4gICAgLy8gQml0cyBtdXN0IGJlIHBvcHVsYXRlZCBpbiBpbmNyZWFzaW5nIHNpZ25pZmljYW5jZVxyXG4gICAgbGV0IGluZGV4ID0gMTtcclxuICAgIGxldCBfc3RhdGVWZWN0b3JMZW5ndGggPSBuZXcgRGF0YVZpZXcoZHYuYnVmZmVyLGluZGV4LDIpXHJcbiAgICBpbmRleCA9IGluZGV4KzM7XHJcbiAgICBsZXQgc3RhdGVWZWN0b3JMZW5ndGggPSBwYXJzZUludCh0aGlzLmdldE51bGxUZXJtU3RyaW5nKF9zdGF0ZVZlY3Rvckxlbmd0aCkpO1xyXG4gICAgbGV0IF9udW1WZWN0b3JzID0gbmV3IERhdGFWaWV3KGR2LmJ1ZmZlcixpbmRleCwyKVxyXG4gICAgaW5kZXggPSBpbmRleCszO1xyXG4gICAgbGV0IG51bVZlY3RvcnMgPSBwYXJzZUludCh0aGlzLmdldE51bGxUZXJtU3RyaW5nKF9udW1WZWN0b3JzKSk7XHJcbiAgICBsZXQgZGF0YSA9IG5ldyBEYXRhVmlldyhkdi5idWZmZXIsaW5kZXgpO1xyXG4gICAgbGV0IHN0YXRlcyA9IHt9O1xyXG4gICAgZm9yIChsZXQgc3RhdGUgaW4gdGhpcy5zdGF0ZUZvcm1hdClcclxuICAgICAgc3RhdGVzW3N0YXRlXSA9IEFycmF5KG51bVZlY3RvcnMpLmZpbGwoXHJcbiAgICAgICAgdGhpcy5zdGF0ZUZvcm1hdFtzdGF0ZV0uZGVmYXVsdFZhbHVlXHJcbiAgICAgICk7XHJcblxyXG4gICAgZm9yIChsZXQgdmVjSWR4ID0gMDsgdmVjSWR4IDwgbnVtVmVjdG9yczsgdmVjSWR4KyspIHtcclxuICAgICAgbGV0IHZlYyA9IG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLGRhdGEuYnl0ZU9mZnNldCArICh2ZWNJZHgqc3RhdGVWZWN0b3JMZW5ndGgpLCBzdGF0ZVZlY3Rvckxlbmd0aCk7XHJcbiAgICAgIGxldCBiaXRzID0gW107XHJcbiAgICAgIGZvciAobGV0IGJ5dGVJZHggPSAwOyBieXRlSWR4IDwgdmVjLmxlbmd0aDsgYnl0ZUlkeCsrKSB7XHJcbiAgICAgICAgYml0cy5wdXNoKCh2ZWNbYnl0ZUlkeF0gJiAweDAxKSAhPT0gMCA/IDEgOiAwKTtcclxuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MDIpICE9PSAwID8gMSA6IDApO1xyXG4gICAgICAgIGJpdHMucHVzaCgodmVjW2J5dGVJZHhdICYgMHgwNCkgIT09IDAgPyAxIDogMCk7XHJcbiAgICAgICAgYml0cy5wdXNoKCh2ZWNbYnl0ZUlkeF0gJiAweDA4KSAhPT0gMCA/IDEgOiAwKTtcclxuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MTApICE9PSAwID8gMSA6IDApO1xyXG4gICAgICAgIGJpdHMucHVzaCgodmVjW2J5dGVJZHhdICYgMHgyMCkgIT09IDAgPyAxIDogMCk7XHJcbiAgICAgICAgYml0cy5wdXNoKCh2ZWNbYnl0ZUlkeF0gJiAweDQwKSAhPT0gMCA/IDEgOiAwKTtcclxuICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4ODApICE9PSAwID8gMSA6IDApO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBmb3IgKGxldCBzdGF0ZUlkeCA9IDA7IHN0YXRlSWR4IDwgdGhpcy5zdGF0ZVZlY09yZGVyLmxlbmd0aDsgc3RhdGVJZHgrKykge1xyXG4gICAgICAgIGxldCBmbXQgPSB0aGlzLnN0YXRlRm9ybWF0W3RoaXMuc3RhdGVWZWNPcmRlcltzdGF0ZUlkeF1bMF1dO1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSBmbXQuYnl0ZUxvY2F0aW9uICogOCArIGZtdC5iaXRMb2NhdGlvbjtcclxuICAgICAgICBsZXQgdmFsID0gMDtcclxuICAgICAgICBsZXQgbWFzayA9IDB4MDE7XHJcbiAgICAgICAgZm9yIChsZXQgYklkeCA9IDA7IGJJZHggPCBmbXQuYml0V2lkdGg7IGJJZHgrKykge1xyXG4gICAgICAgICAgaWYgKGJpdHNbb2Zmc2V0ICsgYklkeF0pIHZhbCA9ICh2YWwgfCBtYXNrKSA+Pj4gMDtcclxuICAgICAgICAgIG1hc2sgPSAobWFzayA8PCAxKSA+Pj4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGVzW3RoaXMuc3RhdGVWZWNPcmRlcltzdGF0ZUlkeF1bMF1dW3ZlY0lkeF0gPSB2YWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub25TdGF0ZVZlY3RvcihzdGF0ZXMpO1xyXG4gICAgdGhpcy5zdGF0ZXMgPSBzdGF0ZXM7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBiY2lPcGVyYXRvcjogQkNJMktfT3BlcmF0b3JDb25uZWN0aW9uLFxyXG4gIGJjaURhdGE6IEJDSTJLX0RhdGFDb25uZWN0aW9uXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3dlYnNvY2tldF9fOyJdLCJzb3VyY2VSb290IjoiIn0=