(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bci2k"] = factory();
	else
		root["bci2k"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/es5-ext/global.js":
/*!****************************************!*\
  !*** ./node_modules/es5-ext/global.js ***!
  \****************************************/
/***/ ((module) => {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Fallback to standard globalThis if available
	if (typeof globalThis === "object" && globalThis) return globalThis;

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of updates to Object.prototype being restricted
		// via preventExtensions, seal or freeze
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ works, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
    if ( true && typeof module.exports === "object") {
        var v = factory(__webpack_require__("./src sync recursive"), exports);
        if (v !== undefined) module.exports = v;
    }
    else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! websocket */ "./node_modules/websocket/lib/browser.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BCI2K_DataConnection = exports.BCI2K_OperatorConnection = void 0;
    /**
     * Class that controls websocket communication to and from BCI2000 (via [BCI2000Web](https://github.com/cronelab/bci2000web))
     */
    const websocket_1 = require("websocket");
    // let websocket = w3cwebsocket;
    class BCI2K_OperatorConnection {
        constructor(address) {
            // this.ondisconnect = () => { };
            // this.onconnect = () => { };
            this.onStateChange = (event) => { };
            this.onWatchReceived = (event) => { };
            this.client = null;
            this._execid = 0;
            this._exec = {};
            this.state = "";
            this.address = address;
        }
        /**
         *
         * @param address address to bci2000web
         * @returns promise void
         */
        connect(address) {
            if (this.address === undefined)
                this.address = address;
            return new Promise((resolve, reject) => {
                this.client = new websocket_1.w3cwebsocket(this.address);
                console.log(this);
                this.client.onerror = (error) => {
                    // This will only execute if we err before connecting, since
                    // Promises can only get triggered once
                    reject(`Error connecting to BCI2000 at ${this.address} due to ${error}`);
                };
                this.client.onopen = () => {
                    // this.onconnect();
                    console.log("Connected");
                    resolve();
                };
                this.client.onclose = () => {
                    console.log("Disconnected");
                    // this.ondisconnect();
                    // this.websocket.close();
                };
                this.client.onmessage = (event) => {
                    let { opcode, id, contents } = JSON.parse(event.data);
                    switch (opcode) {
                        case "O": // OUTPUT: Received output from command
                            this._exec[id](contents);
                            delete this._exec[id];
                            break;
                        case "U":
                            let _id = contents.shift();
                            contents[contents.length - 1].trim();
                            this.onWatchReceived(contents);
                        default:
                            break;
                    }
                };
            });
        }
        disconnect() {
            this.client.close();
        }
        // /**
        //  * @deprecated
        //  */
        // public tap(location: string) {
        //   let connection = this;
        //   let locationParameter = "WS" + location + "Server";
        //   return this.execute("Get Parameter " + locationParameter).then(
        //     (location: string) => {
        //       if (location.indexOf("does not exist") >= 0) {
        //         return Promise.reject("Location parameter does not exist");
        //       }
        //       if (location === "") {
        //         return Promise.reject("Location parameter not set");
        //       }
        //       let dataConnection = new BCI2K_DataConnection();
        //       // Use our address plus the port from the result
        //       return dataConnection
        //         .connect(connection.address + ":" + location.split(":")[1])
        //         .then((event) => {
        //           // To keep with our old API, we actually want to wrap the
        //           // dataConnection, and not the connection event
        //           // TODO This means we can't get the connection event!
        //           return dataConnection;
        //         });
        //     }
        //   );
        // }
        connected() {
            return (this.client !== null && this.client.readyState === websocket_1.w3cwebsocket.OPEN);
        }
        execute(instruction) {
            if (this.connected()) {
                return new Promise((resolve, reject) => {
                    let id = (++this._execid).toString();
                    // TODO Properly handle errors from BCI2000
                    this._exec[id] = (exec) => resolve(exec);
                    this.client.send(JSON.stringify({
                        opcode: "E",
                        id: id,
                        contents: instruction,
                    }));
                });
            }
            // Cannot execute if not connected
            return Promise.reject("Cannot execute instruction: not connected to BCI2000");
        }
    }
    exports.BCI2K_OperatorConnection = BCI2K_OperatorConnection;
    class BCI2K_DataConnection {
        constructor(address) {
            this.websocket = null;
            this.onconnect = () => { };
            this.onGenericSignal = (data) => { };
            this.onStateVector = (data) => { };
            this.onSignalProperties = (data) => { };
            this.onStateFormat = (data) => { };
            this.ondisconnect = () => { };
            this.onReceiveBlock = () => { };
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
            this.address = address;
            this.reconnect = true;
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
        connect(address) {
            let connection = this;
            if (connection.address === undefined)
                connection.address = address;
            return new Promise((resolve, reject) => {
                connection.websocket = new websocket_1.w3cwebsocket(connection.address);
                connection.websocket.binaryType = "arraybuffer";
                connection.websocket.onerror = () => {
                    // This will only execute if we err before connecting, since
                    // Promises can only get triggered once
                    reject("Error connecting to data source at " + connection.address);
                };
                connection.websocket.onopen = () => {
                    connection.onconnect();
                    console.log("Connected");
                    resolve();
                };
                connection.websocket.onclose = (e) => {
                    connection.ondisconnect();
                    setTimeout(() => {
                        console.log("Disconnected");
                        if (this.reconnect != false) {
                            console.log("Reconnecting");
                            this.connect("");
                        }
                    }, 1000);
                };
                connection.websocket.onmessage = (event) => {
                    connection._decodeMessage(event.data);
                };
            });
        }
        disconnect() {
            this.reconnect = false;
            this.websocket.close(1000, "disconnect called");
        }
        connected() {
            return this.websocket != null && this.websocket.readyState === websocket_1.w3cwebsocket.OPEN;
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
            let i8Array = new Int8Array(dv.buffer);
            let firstZero = i8Array.indexOf(0);
            let secondZero = i8Array.indexOf(0, firstZero + 1);
            let decoder = new TextDecoder();
            let stateVectorLength = parseInt(decoder.decode(i8Array.slice(1, firstZero)));
            let numVectors = parseInt(decoder.decode(i8Array.slice(firstZero + 1, secondZero)));
            let index = secondZero + 1;
            let data = new DataView(dv.buffer, index);
            let states = {};
            for (let state in this.stateFormat) {
                states[state] = Array(numVectors).fill(this.stateFormat[state].defaultValue);
            }
            for (let vecIdx = 0; vecIdx < numVectors; vecIdx++) {
                let vec = new Uint8Array(data.buffer, data.byteOffset + vecIdx * stateVectorLength, stateVectorLength);
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
    exports.BCI2K_DataConnection = BCI2K_DataConnection;
});


/***/ }),

/***/ "./node_modules/websocket/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/browser.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _globalThis;
if (typeof globalThis === 'object') {
	_globalThis = globalThis;
} else {
	try {
		_globalThis = __webpack_require__(/*! es5-ext/global */ "./node_modules/es5-ext/global.js");
	} catch (error) {
	} finally {
		if (!_globalThis && typeof window !== 'undefined') { _globalThis = window; }
		if (!_globalThis) { throw new Error('Could not determine global this'); }
	}
}

var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = __webpack_require__(/*! ./version */ "./node_modules/websocket/lib/version.js");


/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */
function W3CWebSocket(uri, protocols) {
	var native_instance;

	if (protocols) {
		native_instance = new NativeWebSocket(uri, protocols);
	}
	else {
		native_instance = new NativeWebSocket(uri);
	}

	/**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */
	return native_instance;
}
if (NativeWebSocket) {
	['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(prop) {
		Object.defineProperty(W3CWebSocket, prop, {
			get: function() { return NativeWebSocket[prop]; }
		});
	});
}

/**
 * Module exports.
 */
module.exports = {
    'w3cwebsocket' : NativeWebSocket ? W3CWebSocket : null,
    'version'      : websocket_version
};


/***/ }),

/***/ "./node_modules/websocket/lib/version.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/version.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ../package.json */ "./node_modules/websocket/package.json").version;


/***/ }),

/***/ "./node_modules/websocket/package.json":
/*!*********************************************!*\
  !*** ./node_modules/websocket/package.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_from":"websocket@^1.0.34","_id":"websocket@1.0.34","_inBundle":false,"_integrity":"sha512-PRDso2sGwF6kM75QykIesBijKSVceR6jL2G8NGYyq2XrItNC2P5/qL5XeR056GhA+Ly7JMFvJb9I312mJfmqnQ==","_location":"/websocket","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"websocket@^1.0.34","name":"websocket","escapedName":"websocket","rawSpec":"^1.0.34","saveSpec":null,"fetchSpec":"^1.0.34"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/websocket/-/websocket-1.0.34.tgz","_shasum":"2bdc2602c08bf2c82253b730655c0ef7dcab3111","_spec":"websocket@^1.0.34","_where":"C:\\\\Nextcloud\\\\BCI2000\\\\bci2k.js","author":{"name":"Brian McKelvey","email":"theturtle32@gmail.com","url":"https://github.com/theturtle32"},"browser":"lib/browser.js","bugs":{"url":"https://github.com/theturtle32/WebSocket-Node/issues"},"bundleDependencies":false,"config":{"verbose":false},"contributors":[{"name":"Iñaki Baz Castillo","email":"ibc@aliax.net","url":"http://dev.sipdoc.net"}],"dependencies":{"bufferutil":"^4.0.1","debug":"^2.2.0","es5-ext":"^0.10.50","typedarray-to-buffer":"^3.1.5","utf-8-validate":"^5.0.2","yaeti":"^0.0.6"},"deprecated":false,"description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","devDependencies":{"buffer-equal":"^1.0.0","gulp":"^4.0.2","gulp-jshint":"^2.0.4","jshint":"^2.0.0","jshint-stylish":"^2.2.1","tape":"^4.9.1"},"directories":{"lib":"./lib"},"engines":{"node":">=4.0.0"},"homepage":"https://github.com/theturtle32/WebSocket-Node","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"license":"Apache-2.0","main":"index","name":"websocket","repository":{"type":"git","url":"git+https://github.com/theturtle32/WebSocket-Node.git"},"scripts":{"gulp":"gulp","test":"tape test/unit/*.js"},"version":"1.0.34"}');

/***/ }),

/***/ "./src sync recursive":
/*!*******************!*\
  !*** ./src/ sync ***!
  \*******************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive";
module.exports = webpackEmptyContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iY2kyay93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYmNpMmsvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vYmNpMmsvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmNpMmsvLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2JjaTJrLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9iY2kyay8uL3NyY3xzeW5jIiwid2VicGFjazovL2JjaTJrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JjaTJrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmNpMmsvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGFBQWEsRUFBRTtBQUNwQztBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNsQ0Q7O09BRUc7SUFDSCx5Q0FBc0Q7SUFDdEQsZ0NBQWdDO0lBRWhDLE1BQWEsd0JBQXdCO1FBVWpDLFlBQVksT0FBZ0I7WUFDeEIsaUNBQWlDO1lBQ2pDLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsR0FBRyxD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VUFDQTs7Ozs7V0N0QkEsd0Y7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYmNpMmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiY2kya1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiY2kya1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsInZhciBuYWl2ZUZhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZikgcmV0dXJuIHNlbGY7XG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHdpbmRvdykgcmV0dXJuIHdpbmRvdztcblx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHJlc29sdmUgZ2xvYmFsIGB0aGlzYFwiKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMpIHJldHVybiB0aGlzO1xuXG5cdC8vIFVuZXhwZWN0ZWQgc3RyaWN0IG1vZGUgKG1heSBoYXBwZW4gaWYgZS5nLiBidW5kbGVkIGludG8gRVNNIG1vZHVsZSlcblxuXHQvLyBGYWxsYmFjayB0byBzdGFuZGFyZCBnbG9iYWxUaGlzIGlmIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIgJiYgZ2xvYmFsVGhpcykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cblx0Ly8gVGhhbmtzIEBtYXRoaWFzYnluZW5zIC0+IGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9nbG9iYWx0aGlzXG5cdC8vIEluIGFsbCBFUzUrIGVuZ2luZXMgZ2xvYmFsIG9iamVjdCBpbmhlcml0cyBmcm9tIE9iamVjdC5wcm90b3R5cGVcblx0Ly8gKGlmIHlvdSBhcHByb2FjaGVkIG9uZSB0aGF0IGRvZXNuJ3QgcGxlYXNlIHJlcG9ydClcblx0dHJ5IHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgXCJfX2dsb2JhbF9fXCIsIHtcblx0XHRcdGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFVuZm9ydHVuYXRlIGNhc2Ugb2YgdXBkYXRlcyB0byBPYmplY3QucHJvdG90eXBlIGJlaW5nIHJlc3RyaWN0ZWRcblx0XHQvLyB2aWEgcHJldmVudEV4dGVuc2lvbnMsIHNlYWwgb3IgZnJlZXplXG5cdFx0cmV0dXJuIG5haXZlRmFsbGJhY2soKTtcblx0fVxuXHR0cnkge1xuXHRcdC8vIFNhZmFyaSBjYXNlICh3aW5kb3cuX19nbG9iYWxfXyB3b3JrcywgYnV0IF9fZ2xvYmFsX18gZG9lcyBub3QpXG5cdFx0aWYgKCFfX2dsb2JhbF9fKSByZXR1cm4gbmFpdmVGYWxsYmFjaygpO1xuXHRcdHJldHVybiBfX2dsb2JhbF9fO1xuXHR9IGZpbmFsbHkge1xuXHRcdGRlbGV0ZSBPYmplY3QucHJvdG90eXBlLl9fZ2xvYmFsX187XG5cdH1cbn0pKCk7XG4iLCIvKipcclxuICogQ2xhc3MgdGhhdCBjb250cm9scyB3ZWJzb2NrZXQgY29tbXVuaWNhdGlvbiB0byBhbmQgZnJvbSBCQ0kyMDAwICh2aWEgW0JDSTIwMDBXZWJdKGh0dHBzOi8vZ2l0aHViLmNvbS9jcm9uZWxhYi9iY2kyMDAwd2ViKSlcclxuICovXHJcbmltcG9ydCB7IHczY3dlYnNvY2tldCBhcyB3ZWJzb2NrZXQgfSBmcm9tICd3ZWJzb2NrZXQnO1xyXG4vLyBsZXQgd2Vic29ja2V0ID0gdzNjd2Vic29ja2V0O1xyXG5cclxuZXhwb3J0IGNsYXNzIEJDSTJLX09wZXJhdG9yQ29ubmVjdGlvbiB7XHJcbiAgICBjbGllbnQ6IGFueTtcclxuICAgIF9leGVjaWQ6IGFueTtcclxuICAgIF9leGVjOiBhbnk7XHJcbiAgICBzdGF0ZTogc3RyaW5nO1xyXG4gICAgLy8gb25kaXNjb25uZWN0OiBhbnk7XHJcbiAgICAvLyBvbmNvbm5lY3Q6IGFueTtcclxuICAgIG9uU3RhdGVDaGFuZ2U6IGFueTtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIG9uV2F0Y2hSZWNlaXZlZDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoYWRkcmVzcz86IHN0cmluZykge1xyXG4gICAgICAgIC8vIHRoaXMub25kaXNjb25uZWN0ID0gKCkgPT4geyB9O1xyXG4gICAgICAgIC8vIHRoaXMub25jb25uZWN0ID0gKCkgPT4geyB9O1xyXG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZSA9IChldmVudDogc3RyaW5nKSA9PiB7IH07XHJcbiAgICAgICAgdGhpcy5vbldhdGNoUmVjZWl2ZWQgPSAoZXZlbnQ6IHN0cmluZ1tdKSA9PiB7IH07XHJcbiAgICAgICAgdGhpcy5jbGllbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2V4ZWNpZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZXhlYyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGFkZHJlc3MgYWRkcmVzcyB0byBiY2kyMDAwd2ViXHJcbiAgICAgKiBAcmV0dXJucyBwcm9taXNlIHZvaWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbm5lY3QoYWRkcmVzcz86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmFkZHJlc3MgPT09IHVuZGVmaW5lZCkgdGhpcy5hZGRyZXNzID0gYWRkcmVzcztcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgd2Vic29ja2V0KHRoaXMuYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50Lm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IGV4ZWN1dGUgaWYgd2UgZXJyIGJlZm9yZSBjb25uZWN0aW5nLCBzaW5jZVxyXG4gICAgICAgICAgICAgICAgLy8gUHJvbWlzZXMgY2FuIG9ubHkgZ2V0IHRyaWdnZXJlZCBvbmNlXHJcbiAgICAgICAgICAgICAgICByZWplY3QoYEVycm9yIGNvbm5lY3RpbmcgdG8gQkNJMjAwMCBhdCAke3RoaXMuYWRkcmVzc30gZHVlIHRvICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9uY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWRcIilcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50Lm9uY2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMub25kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLndlYnNvY2tldC5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHsgb3Bjb2RlLCBpZCwgY29udGVudHMgfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJPXCI6IC8vIE9VVFBVVDogUmVjZWl2ZWQgb3V0cHV0IGZyb20gY29tbWFuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9leGVjW2lkXShjb250ZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9leGVjW2lkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9pZCA9IGNvbnRlbnRzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzW2NvbnRlbnRzLmxlbmd0aCAtIDFdLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uV2F0Y2hSZWNlaXZlZChjb250ZW50cylcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdCgpIHtcclxuICAgICAgICB0aGlzLmNsaWVudC5jbG9zZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIEBkZXByZWNhdGVkXHJcbiAgICAvLyAgKi9cclxuICAgIC8vIHB1YmxpYyB0YXAobG9jYXRpb246IHN0cmluZykge1xyXG4gICAgLy8gICBsZXQgY29ubmVjdGlvbiA9IHRoaXM7XHJcblxyXG4gICAgLy8gICBsZXQgbG9jYXRpb25QYXJhbWV0ZXIgPSBcIldTXCIgKyBsb2NhdGlvbiArIFwiU2VydmVyXCI7XHJcblxyXG4gICAgLy8gICByZXR1cm4gdGhpcy5leGVjdXRlKFwiR2V0IFBhcmFtZXRlciBcIiArIGxvY2F0aW9uUGFyYW1ldGVyKS50aGVuKFxyXG4gICAgLy8gICAgIChsb2NhdGlvbjogc3RyaW5nKSA9PiB7XHJcbiAgICAvLyAgICAgICBpZiAobG9jYXRpb24uaW5kZXhPZihcImRvZXMgbm90IGV4aXN0XCIpID49IDApIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiTG9jYXRpb24gcGFyYW1ldGVyIGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgICAgaWYgKGxvY2F0aW9uID09PSBcIlwiKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIkxvY2F0aW9uIHBhcmFtZXRlciBub3Qgc2V0XCIpO1xyXG4gICAgLy8gICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgIGxldCBkYXRhQ29ubmVjdGlvbiA9IG5ldyBCQ0kyS19EYXRhQ29ubmVjdGlvbigpO1xyXG5cclxuICAgIC8vICAgICAgIC8vIFVzZSBvdXIgYWRkcmVzcyBwbHVzIHRoZSBwb3J0IGZyb20gdGhlIHJlc3VsdFxyXG4gICAgLy8gICAgICAgcmV0dXJuIGRhdGFDb25uZWN0aW9uXHJcbiAgICAvLyAgICAgICAgIC5jb25uZWN0KGNvbm5lY3Rpb24uYWRkcmVzcyArIFwiOlwiICsgbG9jYXRpb24uc3BsaXQoXCI6XCIpWzFdKVxyXG4gICAgLy8gICAgICAgICAudGhlbigoZXZlbnQpID0+IHtcclxuICAgIC8vICAgICAgICAgICAvLyBUbyBrZWVwIHdpdGggb3VyIG9sZCBBUEksIHdlIGFjdHVhbGx5IHdhbnQgdG8gd3JhcCB0aGVcclxuICAgIC8vICAgICAgICAgICAvLyBkYXRhQ29ubmVjdGlvbiwgYW5kIG5vdCB0aGUgY29ubmVjdGlvbiBldmVudFxyXG4gICAgLy8gICAgICAgICAgIC8vIFRPRE8gVGhpcyBtZWFucyB3ZSBjYW4ndCBnZXQgdGhlIGNvbm5lY3Rpb24gZXZlbnQhXHJcbiAgICAvLyAgICAgICAgICAgcmV0dXJuIGRhdGFDb25uZWN0aW9uO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLmNsaWVudCAhPT0gbnVsbCAmJiB0aGlzLmNsaWVudC5yZWFkeVN0YXRlID09PSB3ZWJzb2NrZXQuT1BFTlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUoaW5zdHJ1Y3Rpb246IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSAoKyt0aGlzLl9leGVjaWQpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIFByb3Blcmx5IGhhbmRsZSBlcnJvcnMgZnJvbSBCQ0kyMDAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjW2lkXSA9IChleGVjKSA9PiByZXNvbHZlKGV4ZWMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQuc2VuZChcclxuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wY29kZTogXCJFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudHM6IGluc3RydWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2Fubm90IGV4ZWN1dGUgaWYgbm90IGNvbm5lY3RlZFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcclxuICAgICAgICAgICAgXCJDYW5ub3QgZXhlY3V0ZSBpbnN0cnVjdGlvbjogbm90IGNvbm5lY3RlZCB0byBCQ0kyMDAwXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKlxyXG4gICAgLy8gICogc2hvd3MgY3VycmVudCBCQ0kyMDAwIHZlcnNpb25cclxuICAgIC8vICAqL1xyXG4gICAgLy8gZ2V0VmVyc2lvbigpIHtcclxuICAgIC8vICAgdGhpcy5leGVjdXRlKFwiVmVyc2lvblwiKS50aGVuKCh4OiBzdHJpbmcpID0+IGNvbnNvbGUubG9nKHguc3BsaXQoXCIgXCIpWzFdKSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd1dpbmRvdygpIHtcclxuICAgIC8vICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIlNob3cgV2luZG93XCIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGhpZGVXaW5kb3coKSB7XHJcbiAgICAvLyAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJIaWRlIFdpbmRvd1wiKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzZXRXYXRjaChzdGF0ZTogc3RyaW5nLCBpcDogc3RyaW5nLCBwb3J0OiBzdHJpbmcpIHtcclxuICAgIC8vICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIkFkZCB3YXRjaCBcIiArIHN0YXRlICsgXCIgYXQgXCIgKyBpcCArIFwiOlwiICsgcG9ydCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiBbQkNJMjAwMCBkb2N1bWVudGF0aW9uXShodHRwczovL3d3dy5iY2kyMDAwLm9yZy9tZWRpYXdpa2kvaW5kZXgucGhwL1VzZXJfUmVmZXJlbmNlOk9wZXJhdG9yX01vZHVsZV9TY3JpcHRpbmcjUkVTRVRfU1lTVEVNKVxyXG4gICAgLy8gICogQHJldHVybnMgXHJcbiAgICAvLyAgKi9cclxuICAgIC8vIHJlc2V0U3lzdGVtKCkge1xyXG4gICAgLy8gICByZXR1cm4gdGhpcy5leGVjdXRlKFwiUmVzZXQgU3lzdGVtXCIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNldENvbmZpZygpIHtcclxuICAgIC8vICAgcmV0dXJuIHRoaXMuZXhlY3V0ZShcIlNldCBDb25maWdcIik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhcnQoKSB7XHJcbiAgICAvLyAgIHJldHVybiB0aGlzLmV4ZWN1dGUoXCJTdGFydFwiKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdG9wKCkge1xyXG4gICAgLy8gICByZXR1cm4gdGhpcy5leGVjdXRlKFwiU3RvcFwiKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBraWxsKCkge1xyXG4gICAgLy8gICByZXR1cm4gdGhpcy5leGVjdXRlKFwiRXhpdFwiKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIEBkZXByZWNhdGVkIGluIGZhdm9yIG9mIEJDSTIwMDAgd2F0Y2hlc1xyXG4gICAgLy8gICovXHJcbiAgICAvLyBzdGF0ZUxpc3RlbigpIHtcclxuICAgIC8vICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgLy8gICAgIHRoaXMuZXhlY3V0ZShcIkdFVCBTWVNURU0gU1RBVEVcIikudGhlbigoc3RhdGU6IHN0cmluZykgPT4ge1xyXG4gICAgLy8gICAgICAgaWYgKHN0YXRlLnRyaW0oKSAhPSB0aGlzLnN0YXRlKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZShzdGF0ZS50cmltKCkpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGUudHJpbSgpO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9LCA1MDApO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGFzeW5jIGdldFN1YmplY3ROYW1lKCkge1xyXG4gICAgLy8gICAvL1Byb21pc2U8c3RyaW5nPiB7XHJcbiAgICAvLyAgIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGUoXCJHZXQgUGFyYW1ldGVyIFN1YmplY3ROYW1lXCIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGFzeW5jIGdldFRhc2tOYW1lKCkge1xyXG4gICAgLy8gICByZXR1cm4gYXdhaXQgdGhpcy5leGVjdXRlKFwiR2V0IFBhcmFtZXRlciBEYXRhRmlsZVwiKTtcclxuICAgIC8vIH1cclxuICAgIC8vIC8vU2VlIGh0dHBzOi8vd3d3LmJjaTIwMDAub3JnL21lZGlhd2lraS9pbmRleC5waHAvVGVjaG5pY2FsX1JlZmVyZW5jZTpQYXJhbWV0ZXJfRGVmaW5pdGlvblxyXG4gICAgLy8gYXN5bmMgZ2V0UGFyYW1ldGVycygpIHtcclxuICAgIC8vICAgbGV0IHBhcmFtZXRlcnM6IGFueSA9IGF3YWl0IHRoaXMuZXhlY3V0ZShcIkxpc3QgUGFyYW1ldGVyc1wiKTtcclxuICAgIC8vICAgbGV0IGFsbERhdGEgPSBwYXJhbWV0ZXJzLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgLy8gICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgLy8gICBsZXQgZWw7XHJcbiAgICAvLyAgIGFsbERhdGEuZm9yRWFjaChsaW5lID0+IHtcclxuICAgIC8vICAgICBsZXQgZGVzY3JpcHRvcnMgPSBsaW5lLnNwbGl0KFwiPVwiKVswXVxyXG4gICAgLy8gICAgIGxldCBkYXRhVHlwZSA9IGRlc2NyaXB0b3JzLnNwbGl0KFwiIFwiKVsxXVxyXG4gICAgLy8gICAgIGxldCBuYW1lID0gZGVzY3JpcHRvcnMuc3BsaXQoXCIgXCIpWzJdXHJcbiAgICAvLyAgICAgbGV0IG5hbWVzID0gZGVzY3JpcHRvcnMuc3BsaXQoXCIgXCIpWzBdLnNwbGl0KFwiOlwiKTtcclxuICAgIC8vICAgICBuYW1lcy5mb3JFYWNoKCh4LCBpKSA9PiB7XHJcbiAgICAvLyAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgIC8vICAgICAgICAgY2FzZSAwOiB7XHJcbiAgICAvLyAgICAgICAgICAgaWYgKGRhdGFbbmFtZXNbMF1dID09IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgZGF0YVtuYW1lc1swXV0gPSB7fVxyXG4gICAgLy8gICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICBlbCA9IGRhdGFbbmFtZXNbMF1dXHJcbiAgICAvLyAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAvLyAgICAgICAgICAgaWYgKGRhdGFbbmFtZXNbMF1dW25hbWVzWzFdXSA9PSB1bmRlZmluZWQpIHtcclxuICAgIC8vICAgICAgICAgICAgIGRhdGFbbmFtZXNbMF1dW25hbWVzWzFdXSA9IHt9XHJcbiAgICAvLyAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgIGVsID0gZGF0YVtuYW1lc1swXV1bbmFtZXNbMV1dXHJcbiAgICAvLyAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgY2FzZSAyOiB7XHJcbiAgICAvLyAgICAgICAgICAgaWYgKGRhdGFbbmFtZXNbMF1dW25hbWVzWzFdXVtuYW1lc1syXV0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhW25hbWVzWzBdXVtuYW1lc1sxXV1bbmFtZXNbMl1dID0ge31cclxuICAgIC8vICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgZWwgPSBkYXRhW25hbWVzWzBdXVtuYW1lc1sxXV1bbmFtZXNbMl1dXHJcbiAgICAvLyAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgZGVmYXVsdDogeyB9XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfSlcclxuXHJcbiAgICAvLyAgICAgaWYgKGRhdGFUeXBlICE9IFwibWF0cml4XCIpIHtcclxuICAgIC8vICAgICAgIGlmIChsaW5lLnNwbGl0KFwiPVwiKVsxXS5zcGxpdChcIi8vXCIpWzBdLnRyaW0oKS5zcGxpdChcIiBcIikubGVuZ3RoID09IDQpIHtcclxuICAgIC8vICAgICAgICAgZWxbbmFtZV0gPSB7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YVR5cGUsXHJcbiAgICAvLyAgICAgICAgICAgdmFsdWU6IHtcclxuICAgIC8vICAgICAgICAgICAgIHZhbHVlOiBsaW5lLnNwbGl0KFwiPVwiKVsxXS5zcGxpdChcIi8vXCIpWzBdLnRyaW0oKS5zcGxpdChcIiBcIilbMF0sXHJcbiAgICAvLyAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGxpbmUuc3BsaXQoXCI9XCIpWzFdLnNwbGl0KFwiLy9cIilbMF0udHJpbSgpLnNwbGl0KFwiIFwiKVsxXSxcclxuICAgIC8vICAgICAgICAgICAgIGxvdzogbGluZS5zcGxpdChcIj1cIilbMV0uc3BsaXQoXCIvL1wiKVswXS50cmltKCkuc3BsaXQoXCIgXCIpWzJdLFxyXG4gICAgLy8gICAgICAgICAgICAgaGlnaDogbGluZS5zcGxpdChcIj1cIilbMV0uc3BsaXQoXCIvL1wiKVswXS50cmltKCkuc3BsaXQoXCIgXCIpWzNdLFxyXG4gICAgLy8gICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgY29tbWVudDogbGluZS5zcGxpdChcIj1cIilbMV0uc3BsaXQoXCIvL1wiKVsxXVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgICBlbHNlIHtcclxuICAgIC8vICAgICAgICAgZWxbbmFtZV0gPSB7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YVR5cGUsXHJcbiAgICAvLyAgICAgICAgICAgdmFsdWU6IGxpbmUuc3BsaXQoXCI9XCIpWzFdLnNwbGl0KFwiLy9cIilbMF0udHJpbSgpLFxyXG4gICAgLy8gICAgICAgICAgIGNvbW1lbnQ6IGxpbmUuc3BsaXQoXCI9XCIpWzFdLnNwbGl0KFwiLy9cIilbMV1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlIHtcclxuICAgIC8vICAgICAgIGVsW25hbWVdID0ge1xyXG4gICAgLy8gICAgICAgICBkYXRhVHlwZSxcclxuICAgIC8vICAgICAgICAgdmFsdWU6IGxpbmUuc3BsaXQoXCI9XCIpWzFdLnNwbGl0KFwiLy9cIilbMF0udHJpbSgpLFxyXG4gICAgLy8gICAgICAgICBjb21tZW50OiBsaW5lLnNwbGl0KFwiPVwiKVsxXS5zcGxpdChcIi8vXCIpWzFdXHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgfSk7XHJcblxyXG4gICAgLy8gICByZXR1cm4gZGF0YVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJDSTJLX0RhdGFDb25uZWN0aW9uIHtcclxuICAgIHdlYnNvY2tldDogYW55O1xyXG4gICAgc3RhdGVzOiBhbnk7XHJcbiAgICBzaWduYWw6IGFueTtcclxuICAgIHNpZ25hbFByb3BlcnRpZXM6IGFueTtcclxuICAgIHN0YXRlRm9ybWF0OiBhbnk7XHJcbiAgICBzdGF0ZVZlY09yZGVyOiBhbnk7XHJcbiAgICBTaWduYWxUeXBlOiBhbnk7XHJcbiAgICBjYWxsaW5nRnJvbTogYW55O1xyXG4gICAgLyoqIFxyXG4gICogRW1pdHRlZCB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlbGlucXVpc2hpbmcgb3duZXJzaGlwIG9mIGEgY2h1bmsgb2YgZGF0YSB0byBhIGNvbnN1bWVyLlxyXG4gICogQGV2ZW50XHJcbiAgKi9cclxuICAgIG9uY29ubmVjdDogYW55O1xyXG4gICAgLyoqIFxyXG4gICogRW1pdHRlZCB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlbGlucXVpc2hpbmcgb3duZXJzaGlwIG9mIGEgY2h1bmsgb2YgZGF0YSB0byBhIGNvbnN1bWVyLlxyXG4gICogQGV2ZW50XHJcbiAgKi9cclxuICAgIG9uR2VuZXJpY1NpZ25hbDogYW55O1xyXG4gICAgLyoqIFxyXG4gICogRW1pdHRlZCB3aGVuZXZlciB0aGUgc3RyZWFtIGlzIHJlbGlucXVpc2hpbmcgb3duZXJzaGlwIG9mIGEgY2h1bmsgb2YgZGF0YSB0byBhIGNvbnN1bWVyLlxyXG4gICogQGV2ZW50XHJcbiAgKi9cclxuICAgIG9uU3RhdGVWZWN0b3I6IGFueTtcclxuICAgIC8qKiBcclxuICAqIEVtaXR0ZWQgd2hlbmV2ZXIgdGhlIHN0cmVhbSBpcyByZWxpbnF1aXNoaW5nIG93bmVyc2hpcCBvZiBhIGNodW5rIG9mIGRhdGEgdG8gYSBjb25zdW1lci5cclxuICAqIEBldmVudFxyXG4gICovXHJcbiAgICBvblNpZ25hbFByb3BlcnRpZXM6IGFueTtcclxuICAgIC8qKiBcclxuICAqIEVtaXR0ZWQgd2hlbmV2ZXIgdGhlIHN0cmVhbSBpcyByZWxpbnF1aXNoaW5nIG93bmVyc2hpcCBvZiBhIGNodW5rIG9mIGRhdGEgdG8gYSBjb25zdW1lci5cclxuICAqIEBldmVudFxyXG4gICovXHJcbiAgICBvblN0YXRlRm9ybWF0OiBhbnk7XHJcbiAgICAvKiogXHJcbiAgKiBFbWl0dGVkIHdoZW5ldmVyIHRoZSBzdHJlYW0gaXMgcmVsaW5xdWlzaGluZyBvd25lcnNoaXAgb2YgYSBjaHVuayBvZiBkYXRhIHRvIGEgY29uc3VtZXIuXHJcbiAgKiBAZXZlbnRcclxuICAqL1xyXG4gICAgb25kaXNjb25uZWN0OiBhbnk7XHJcbiAgICAvKiogXHJcbiAgKiBFbWl0dGVkIHdoZW5ldmVyIGRlY29kaW5nIHNpZ25hbCBwcm9wZXJ0aWVzIG9yIGdlbmVyaWMgc2lnbmFsXHJcbiAgKiBAZXZlbnRcclxuICAqL1xyXG4gICAgb25SZWNlaXZlQmxvY2s6IGFueTtcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIHJlY29ubmVjdDogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGFkZHJlc3M/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLndlYnNvY2tldCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMub25jb25uZWN0ID0gKCkgPT4geyB9O1xyXG5cclxuICAgICAgICB0aGlzLm9uR2VuZXJpY1NpZ25hbCA9IChkYXRhOiBhbnkpID0+IHsgfTtcclxuICAgICAgICB0aGlzLm9uU3RhdGVWZWN0b3IgPSAoZGF0YTogYW55KSA9PiB7IH07XHJcbiAgICAgICAgdGhpcy5vblNpZ25hbFByb3BlcnRpZXMgPSAoZGF0YTogYW55KSA9PiB7IH07XHJcbiAgICAgICAgdGhpcy5vblN0YXRlRm9ybWF0ID0gKGRhdGE6IGFueSkgPT4geyB9O1xyXG4gICAgICAgIHRoaXMub25kaXNjb25uZWN0ID0gKCkgPT4geyB9O1xyXG4gICAgICAgIHRoaXMub25SZWNlaXZlQmxvY2sgPSAoKSA9PiB7IH07XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbGluZ0Zyb20gPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2lnbmFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhdGVGb3JtYXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhdGVWZWNPcmRlciA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuU2lnbmFsVHlwZSA9IHtcclxuICAgICAgICAgICAgSU5UMTY6IDAsXHJcbiAgICAgICAgICAgIEZMT0FUMjQ6IDEsXHJcbiAgICAgICAgICAgIEZMT0FUMzI6IDIsXHJcbiAgICAgICAgICAgIElOVDMyOiAzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gYWRkcmVzcztcclxuICAgICAgICB0aGlzLnJlY29ubmVjdCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROdWxsVGVybVN0cmluZyhkdjogRGF0YVZpZXcpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciB2YWwgPSBcIlwiO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGNvdW50IDwgZHYuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgdiA9IGR2LmdldFVpbnQ4KGNvdW50KTtcclxuICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgaWYgKHYgPT0gMCkgYnJlYWs7XHJcbiAgICAgICAgICAgIHZhbCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0KGFkZHJlc3M/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGNvbm5lY3Rpb24uYWRkcmVzcyA9PT0gdW5kZWZpbmVkKSBjb25uZWN0aW9uLmFkZHJlc3MgPSBhZGRyZXNzO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLndlYnNvY2tldCA9IG5ldyB3ZWJzb2NrZXQoY29ubmVjdGlvbi5hZGRyZXNzKTtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi53ZWJzb2NrZXQuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ud2Vic29ja2V0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHdpbGwgb25seSBleGVjdXRlIGlmIHdlIGVyciBiZWZvcmUgY29ubmVjdGluZywgc2luY2VcclxuICAgICAgICAgICAgICAgIC8vIFByb21pc2VzIGNhbiBvbmx5IGdldCB0cmlnZ2VyZWQgb25jZVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiRXJyb3IgY29ubmVjdGluZyB0byBkYXRhIHNvdXJjZSBhdCBcIiArIGNvbm5lY3Rpb24uYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLndlYnNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLndlYnNvY2tldC5vbmNsb3NlID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub25kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWNvbm5lY3QgIT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWNvbm5lY3RpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0KFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi53ZWJzb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl9kZWNvZGVNZXNzYWdlKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2Nvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgxMDAwLCBcImRpc2Nvbm5lY3QgY2FsbGVkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJzb2NrZXQgIT0gbnVsbCAmJiB0aGlzLndlYnNvY2tldC5yZWFkeVN0YXRlID09PSB3ZWJzb2NrZXQuT1BFTjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kZWNvZGVNZXNzYWdlKGRhdGE6IEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBuZXcgRGF0YVZpZXcoZGF0YSwgMCwgMSkuZ2V0VWludDgoMCk7XHJcbiAgICAgICAgc3dpdGNoIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZUZvcm1hdFZpZXcgPSBuZXcgRGF0YVZpZXcoZGF0YSwgMSwgZGF0YS5ieXRlTGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWNvZGVTdGF0ZUZvcm1hdChzdGF0ZUZvcm1hdFZpZXcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VwcGxlbWVudCA9IG5ldyBEYXRhVmlldyhkYXRhLCAxLCAyKS5nZXRVaW50OCgwKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VwcGxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdlbmVyaWNTaWduYWxWaWV3ID0gbmV3IERhdGFWaWV3KGRhdGEsIDIsIGRhdGEuYnl0ZUxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWNvZGVHZW5lcmljU2lnbmFsKGdlbmVyaWNTaWduYWxWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2lnbmFsUHJvcGVydHlWaWV3ID0gbmV3IERhdGFWaWV3KGRhdGEsIDIsIGRhdGEuYnl0ZUxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWNvZGVTaWduYWxQcm9wZXJ0aWVzKHNpZ25hbFByb3BlcnR5Vmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbnN1cHBvcnRlZCBTdXBwbGVtZW50OiBcIiArIHN1cHBsZW1lbnQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJlY2VpdmVCbG9jaygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlVmVjdG9yVmlldyA9IG5ldyBEYXRhVmlldyhkYXRhLCAxLCBkYXRhLmJ5dGVMZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlY29kZVN0YXRlVmVjdG9yKHN0YXRlVmVjdG9yVmlldyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5zdXBwb3J0ZWQgRGVzY3JpcHRvcjogXCIgKyBkZXNjcmlwdG9yLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RlY29kZVBoeXNpY2FsVW5pdHModW5pdHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHVuaXRzOiBhbnk7XHJcbiAgICAgICAgdW5pdHMgPSB7fTtcclxuICAgICAgICBsZXQgdW5pdCA9IHVuaXRzdHIuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIGxldCBpZHggPSAwO1xyXG4gICAgICAgIHVuaXRzLm9mZnNldCA9IE51bWJlcih1bml0W2lkeCsrXSk7XHJcbiAgICAgICAgdW5pdHMuZ2FpbiA9IE51bWJlcih1bml0W2lkeCsrXSk7XHJcbiAgICAgICAgdW5pdHMuc3ltYm9sID0gdW5pdFtpZHgrK107XHJcbiAgICAgICAgdW5pdHMudm1pbiA9IE51bWJlcih1bml0W2lkeCsrXSk7XHJcbiAgICAgICAgdW5pdHMudm1heCA9IE51bWJlcih1bml0W2lkeCsrXSk7XHJcbiAgICAgICAgcmV0dXJuIHVuaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RlY29kZVNpZ25hbFByb3BlcnRpZXMoZGF0YTogRGF0YVZpZXcpIHtcclxuICAgICAgICBsZXQgcHJvcHN0ciA9IHRoaXMuZ2V0TnVsbFRlcm1TdHJpbmcoZGF0YSk7XHJcbiAgICAgICAgLy8gQnVnZml4OiBUaGVyZSBzZWVtcyB0byBub3QgYWx3YXlzIGJlIHNwYWNlcyBhZnRlciAneycgY2hhcmFjdGVyc1xyXG4gICAgICAgIHByb3BzdHIgPSBwcm9wc3RyLnJlcGxhY2UoL3svZywgXCIgeyBcIik7XHJcbiAgICAgICAgcHJvcHN0ciA9IHByb3BzdHIucmVwbGFjZSgvfS9nLCBcIiB9IFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgbGV0IHByb3BfdG9rZW5zID0gcHJvcHN0ci5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgbGV0IHByb3BzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wX3Rva2Vucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocHJvcF90b2tlbnNbaV0udHJpbSgpID09PSBcIlwiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcHJvcHMucHVzaChwcm9wX3Rva2Vuc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGlkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLm5hbWUgPSBwcm9wc1twaWR4KytdO1xyXG5cclxuICAgICAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuY2hhbm5lbHMgPSBbXTtcclxuICAgICAgICBpZiAocHJvcHNbcGlkeF0gPT09IFwie1wiKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChwcm9wc1srK3BpZHhdICE9PSBcIn1cIilcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5jaGFubmVscy5wdXNoKHByb3BzW3BpZHhdKTtcclxuICAgICAgICAgICAgcGlkeCsrOyAvLyB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG51bUNoYW5uZWxzID0gcGFyc2VJbnQocHJvcHNbcGlkeCsrXSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ2hhbm5lbHM7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5jaGFubmVscy5wdXNoKChpICsgMSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuZWxlbWVudHMgPSBbXTtcclxuICAgICAgICBpZiAocHJvcHNbcGlkeF0gPT09IFwie1wiKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChwcm9wc1srK3BpZHhdICE9PSBcIn1cIilcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5lbGVtZW50cy5wdXNoKHByb3BzW3BpZHhdKTtcclxuICAgICAgICAgICAgcGlkeCsrOyAvLyB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG51bUVsZW1lbnRzID0gcGFyc2VJbnQocHJvcHNbcGlkeCsrXSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtRWxlbWVudHM7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFsUHJvcGVydGllcy5lbGVtZW50cy5wdXNoKChpICsgMSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBCYWNrd2FyZCBDb21wYXRpYmlsaXR5XHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLm51bWVsZW1lbnRzID0gdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmVsZW1lbnRzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnNpZ25hbFByb3BlcnRpZXMuc2lnbmFsdHlwZSA9IHByb3BzW3BpZHgrK107XHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmNoYW5uZWx1bml0ID0gdGhpcy5fZGVjb2RlUGh5c2ljYWxVbml0cyhcclxuICAgICAgICAgICAgcHJvcHMuc2xpY2UocGlkeCwgKHBpZHggKz0gNSkpLmpvaW4oXCIgXCIpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLmVsZW1lbnR1bml0ID0gdGhpcy5fZGVjb2RlUGh5c2ljYWxVbml0cyhcclxuICAgICAgICAgICAgcHJvcHMuc2xpY2UocGlkeCwgKHBpZHggKz0gNSkpLmpvaW4oXCIgXCIpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcGlkeCsrOyAvLyAneydcclxuXHJcbiAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLnZhbHVldW5pdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2lnbmFsUHJvcGVydGllcy5jaGFubmVscy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5zaWduYWxQcm9wZXJ0aWVzLnZhbHVldW5pdHMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlY29kZVBoeXNpY2FsVW5pdHMocHJvcHMuc2xpY2UocGlkeCwgKHBpZHggKz0gNSkpLmpvaW4oXCIgXCIpKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICBwaWR4Kys7IC8vICd9J1xyXG4gICAgICAgIHRoaXMub25TaWduYWxQcm9wZXJ0aWVzKHRoaXMuc2lnbmFsUHJvcGVydGllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVjb2RlU3RhdGVGb3JtYXQoZGF0YTogRGF0YVZpZXcpIHtcclxuICAgICAgICB0aGlzLnN0YXRlRm9ybWF0ID0ge307XHJcbiAgICAgICAgbGV0IGZvcm1hdFN0ciA9IHRoaXMuZ2V0TnVsbFRlcm1TdHJpbmcoZGF0YSk7XHJcblxyXG4gICAgICAgIGxldCBsaW5lcyA9IGZvcm1hdFN0ci5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICBmb3IgKGxldCBsaW5lSWR4ID0gMDsgbGluZUlkeCA8IGxpbmVzLmxlbmd0aDsgbGluZUlkeCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lc1tsaW5lSWR4XS50cmltKCkubGVuZ3RoID09PSAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbGV0IHN0YXRlbGluZSA9IGxpbmVzW2xpbmVJZHhdLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBzdGF0ZWxpbmVbMF07XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVGb3JtYXRbbmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUZvcm1hdFtuYW1lXS5iaXRXaWR0aCA9IHBhcnNlSW50KHN0YXRlbGluZVsxXSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVGb3JtYXRbbmFtZV0uZGVmYXVsdFZhbHVlID0gcGFyc2VJbnQoc3RhdGVsaW5lWzJdKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZUZvcm1hdFtuYW1lXS5ieXRlTG9jYXRpb24gPSBwYXJzZUludChzdGF0ZWxpbmVbM10pO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlRm9ybWF0W25hbWVdLmJpdExvY2F0aW9uID0gcGFyc2VJbnQoc3RhdGVsaW5lWzRdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ZWNPcmRlciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHN0YXRlIGluIHRoaXMuc3RhdGVGb3JtYXQpIHtcclxuICAgICAgICAgICAgbGV0IGxvYyA9IHRoaXMuc3RhdGVGb3JtYXRbc3RhdGVdLmJ5dGVMb2NhdGlvbiAqIDg7XHJcbiAgICAgICAgICAgIGxvYyArPSB0aGlzLnN0YXRlRm9ybWF0W3N0YXRlXS5iaXRMb2NhdGlvbjtcclxuICAgICAgICAgICAgdmVjT3JkZXIucHVzaChbc3RhdGUsIGxvY10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29ydCBieSBiaXQgbG9jYXRpb25cclxuICAgICAgICB2ZWNPcmRlci5zb3J0KChhLCBiKSA9PiAoYVsxXSA8IGJbMV0gPyAtMSA6IGFbMV0gPiBiWzFdID8gMSA6IDApKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbGlzdCBvZiAoIHN0YXRlLCBiaXR3aWR0aCApIGZvciBkZWNvZGluZyBzdGF0ZSB2ZWN0b3JzXHJcbiAgICAgICAgdGhpcy5zdGF0ZVZlY09yZGVyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZWNPcmRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB2ZWNPcmRlcltpXVswXTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVZlY09yZGVyLnB1c2goW3N0YXRlLCB0aGlzLnN0YXRlRm9ybWF0W3N0YXRlXS5iaXRXaWR0aF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vblN0YXRlRm9ybWF0KHRoaXMuc3RhdGVGb3JtYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RlY29kZUdlbmVyaWNTaWduYWwoZGF0YTogRGF0YVZpZXcpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBzaWduYWxUeXBlID0gZGF0YS5nZXRVaW50OChpbmRleCk7XHJcbiAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XHJcbiAgICAgICAgbGV0IG5DaGFubmVscyA9IGRhdGEuZ2V0VWludDE2KGluZGV4LCB0cnVlKTtcclxuICAgICAgICBpbmRleCA9IGluZGV4ICsgMjtcclxuICAgICAgICBsZXQgbkVsZW1lbnRzID0gZGF0YS5nZXRVaW50MTYoaW5kZXgsIHRydWUpO1xyXG4gICAgICAgIGluZGV4ID0gaW5kZXggKyAyO1xyXG4gICAgICAgIGluZGV4ID0gaW5kZXggKyBkYXRhLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgbGV0IHNpZ25hbERhdGEgPSBuZXcgRGF0YVZpZXcoZGF0YS5idWZmZXIsIGluZGV4KTtcclxuICAgICAgICBsZXQgc2lnbmFsID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgY2ggPSAwOyBjaCA8IG5DaGFubmVsczsgKytjaCkge1xyXG4gICAgICAgICAgICBzaWduYWwucHVzaChbXSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGVsID0gMDsgZWwgPCBuRWxlbWVudHM7ICsrZWwpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc2lnbmFsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5TaWduYWxUeXBlLklOVDE2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxEYXRhLmdldEludDE2KChuRWxlbWVudHMgKiBjaCArIGVsKSAqIDIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuU2lnbmFsVHlwZS5GTE9BVDMyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxEYXRhLmdldEZsb2F0MzIoKG5FbGVtZW50cyAqIGNoICsgZWwpICogNCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5TaWduYWxUeXBlLklOVDMyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxbY2hdLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxEYXRhLmdldEludDMyKChuRWxlbWVudHMgKiBjaCArIGVsKSAqIDQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMuU2lnbmFsVHlwZS5GTE9BVDI0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBDdXJyZW50bHkgVW5zdXBwb3J0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsW2NoXS5wdXNoKDAuMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2lnbmFsID0gc2lnbmFsO1xyXG4gICAgICAgIHRoaXMub25HZW5lcmljU2lnbmFsKHNpZ25hbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVjb2RlU3RhdGVWZWN0b3IoZHY6IERhdGFWaWV3KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVWZWNPcmRlciA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgLy8gQ3VycmVudGx5LCBzdGF0ZXMgYXJlIG1heGltdW0gMzIgYml0IHVuc2lnbmVkIGludGVnZXJzXHJcbiAgICAgICAgLy8gQml0TG9jYXRpb24gMCByZWZlcnMgdG8gdGhlIGxlYXN0IHNpZ25pZmljYW50IGJpdCBvZiBhIGJ5dGUgaW4gdGhlIHBhY2tldFxyXG4gICAgICAgIC8vIEJ5dGVMb2NhdGlvbiAwIHJlZmVycyB0byB0aGUgZmlyc3QgYnl0ZSBpbiB0aGUgc2VxdWVuY2UuXHJcbiAgICAgICAgLy8gQml0cyBtdXN0IGJlIHBvcHVsYXRlZCBpbiBpbmNyZWFzaW5nIHNpZ25pZmljYW5jZVxyXG5cclxuICAgICAgICBsZXQgaThBcnJheSA9IG5ldyBJbnQ4QXJyYXkoZHYuYnVmZmVyKTtcclxuICAgICAgICBsZXQgZmlyc3RaZXJvID0gaThBcnJheS5pbmRleE9mKDApO1xyXG4gICAgICAgIGxldCBzZWNvbmRaZXJvID0gaThBcnJheS5pbmRleE9mKDAsIGZpcnN0WmVybyArIDEpO1xyXG5cclxuICAgICAgICBsZXQgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xyXG4gICAgICAgIGxldCBzdGF0ZVZlY3Rvckxlbmd0aCA9IHBhcnNlSW50KGRlY29kZXIuZGVjb2RlKGk4QXJyYXkuc2xpY2UoMSwgZmlyc3RaZXJvKSkpXHJcbiAgICAgICAgbGV0IG51bVZlY3RvcnMgPSBwYXJzZUludChkZWNvZGVyLmRlY29kZShpOEFycmF5LnNsaWNlKGZpcnN0WmVybyArIDEsIHNlY29uZFplcm8pKSlcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gc2Vjb25kWmVybyArIDE7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IERhdGFWaWV3KGR2LmJ1ZmZlciwgaW5kZXgpO1xyXG4gICAgICAgIGxldCBzdGF0ZXMgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBzdGF0ZSBpbiB0aGlzLnN0YXRlRm9ybWF0KSB7XHJcbiAgICAgICAgICAgIHN0YXRlc1tzdGF0ZV0gPSBBcnJheShudW1WZWN0b3JzKS5maWxsKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUZvcm1hdFtzdGF0ZV0uZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHZlY0lkeCA9IDA7IHZlY0lkeCA8IG51bVZlY3RvcnM7IHZlY0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZWMgPSBuZXcgVWludDhBcnJheShcclxuICAgICAgICAgICAgICAgIGRhdGEuYnVmZmVyLFxyXG4gICAgICAgICAgICAgICAgZGF0YS5ieXRlT2Zmc2V0ICsgdmVjSWR4ICogc3RhdGVWZWN0b3JMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZVZlY3Rvckxlbmd0aFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBsZXQgYml0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBieXRlSWR4ID0gMDsgYnl0ZUlkeCA8IHZlYy5sZW5ndGg7IGJ5dGVJZHgrKykge1xyXG4gICAgICAgICAgICAgICAgYml0cy5wdXNoKCh2ZWNbYnl0ZUlkeF0gJiAweDAxKSAhPT0gMCA/IDEgOiAwKTtcclxuICAgICAgICAgICAgICAgIGJpdHMucHVzaCgodmVjW2J5dGVJZHhdICYgMHgwMikgIT09IDAgPyAxIDogMCk7XHJcbiAgICAgICAgICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MDQpICE9PSAwID8gMSA6IDApO1xyXG4gICAgICAgICAgICAgICAgYml0cy5wdXNoKCh2ZWNbYnl0ZUlkeF0gJiAweDA4KSAhPT0gMCA/IDEgOiAwKTtcclxuICAgICAgICAgICAgICAgIGJpdHMucHVzaCgodmVjW2J5dGVJZHhdICYgMHgxMCkgIT09IDAgPyAxIDogMCk7XHJcbiAgICAgICAgICAgICAgICBiaXRzLnB1c2goKHZlY1tieXRlSWR4XSAmIDB4MjApICE9PSAwID8gMSA6IDApO1xyXG4gICAgICAgICAgICAgICAgYml0cy5wdXNoKCh2ZWNbYnl0ZUlkeF0gJiAweDQwKSAhPT0gMCA/IDEgOiAwKTtcclxuICAgICAgICAgICAgICAgIGJpdHMucHVzaCgodmVjW2J5dGVJZHhdICYgMHg4MCkgIT09IDAgPyAxIDogMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHN0YXRlSWR4ID0gMDsgc3RhdGVJZHggPCB0aGlzLnN0YXRlVmVjT3JkZXIubGVuZ3RoOyBzdGF0ZUlkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm10ID0gdGhpcy5zdGF0ZUZvcm1hdFt0aGlzLnN0YXRlVmVjT3JkZXJbc3RhdGVJZHhdWzBdXTtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBmbXQuYnl0ZUxvY2F0aW9uICogOCArIGZtdC5iaXRMb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hc2sgPSAweDAxO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYklkeCA9IDA7IGJJZHggPCBmbXQuYml0V2lkdGg7IGJJZHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiaXRzW29mZnNldCArIGJJZHhdKSB2YWwgPSAodmFsIHwgbWFzaykgPj4+IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzayA9IChtYXNrIDw8IDEpID4+PiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhdGVzW3RoaXMuc3RhdGVWZWNPcmRlcltzdGF0ZUlkeF1bMF1dW3ZlY0lkeF0gPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vblN0YXRlVmVjdG9yKHN0YXRlcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBzdGF0ZXM7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9nbG9iYWxUaGlzO1xuaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0Jykge1xuXHRfZ2xvYmFsVGhpcyA9IGdsb2JhbFRoaXM7XG59IGVsc2Uge1xuXHR0cnkge1xuXHRcdF9nbG9iYWxUaGlzID0gcmVxdWlyZSgnZXM1LWV4dC9nbG9iYWwnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0fSBmaW5hbGx5IHtcblx0XHRpZiAoIV9nbG9iYWxUaGlzICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IF9nbG9iYWxUaGlzID0gd2luZG93OyB9XG5cdFx0aWYgKCFfZ2xvYmFsVGhpcykgeyB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBkZXRlcm1pbmUgZ2xvYmFsIHRoaXMnKTsgfVxuXHR9XG59XG5cbnZhciBOYXRpdmVXZWJTb2NrZXQgPSBfZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgX2dsb2JhbFRoaXMuTW96V2ViU29ja2V0O1xudmFyIHdlYnNvY2tldF92ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cblxuLyoqXG4gKiBFeHBvc2UgYSBXM0MgV2ViU29ja2V0IGNsYXNzIHdpdGgganVzdCBvbmUgb3IgdHdvIGFyZ3VtZW50cy5cbiAqL1xuZnVuY3Rpb24gVzNDV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzKSB7XG5cdHZhciBuYXRpdmVfaW5zdGFuY2U7XG5cblx0aWYgKHByb3RvY29scykge1xuXHRcdG5hdGl2ZV9pbnN0YW5jZSA9IG5ldyBOYXRpdmVXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdG5hdGl2ZV9pbnN0YW5jZSA9IG5ldyBOYXRpdmVXZWJTb2NrZXQodXJpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAnbmF0aXZlX2luc3RhbmNlJyBpcyBhbiBpbnN0YW5jZSBvZiBuYXRpdmVXZWJTb2NrZXQgKHRoZSBicm93c2VyJ3MgV2ViU29ja2V0XG5cdCAqIGNsYXNzKS4gU2luY2UgaXQgaXMgYW4gT2JqZWN0IGl0IHdpbGwgYmUgcmV0dXJuZWQgYXMgaXQgaXMgd2hlbiBjcmVhdGluZyBhblxuXHQgKiBpbnN0YW5jZSBvZiBXM0NXZWJTb2NrZXQgdmlhICduZXcgVzNDV2ViU29ja2V0KCknLlxuXHQgKlxuXHQgKiBFQ01BU2NyaXB0IDU6IGh0dHA6Ly9iY2xhcnkuY29tLzIwMDQvMTEvMDcvI2EtMTMuMi4yXG5cdCAqL1xuXHRyZXR1cm4gbmF0aXZlX2luc3RhbmNlO1xufVxuaWYgKE5hdGl2ZVdlYlNvY2tldCkge1xuXHRbJ0NPTk5FQ1RJTkcnLCAnT1BFTicsICdDTE9TSU5HJywgJ0NMT1NFRCddLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXM0NXZWJTb2NrZXQsIHByb3AsIHtcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBOYXRpdmVXZWJTb2NrZXRbcHJvcF07IH1cblx0XHR9KTtcblx0fSk7XG59XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICd3M2N3ZWJzb2NrZXQnIDogTmF0aXZlV2ViU29ja2V0ID8gVzNDV2ViU29ja2V0IDogbnVsbCxcbiAgICAndmVyc2lvbicgICAgICA6IHdlYnNvY2tldF92ZXJzaW9uXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vc3JjIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=