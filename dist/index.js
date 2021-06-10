(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('websocket')) :
    typeof define === 'function' && define.amd ? define(['exports', 'websocket'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bci2k = {}, global.websocket));
}(this, (function (exports, websocket) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    var BCI2K_OperatorConnection = /** @class */ (function () {
        function BCI2K_OperatorConnection(address) {
            // this.ondisconnect = () => { };
            // this.onconnect = () => { };
            this.onStateChange = function (event) { };
            this.onWatchReceived = function (event) { };
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
        BCI2K_OperatorConnection.prototype.connect = function (address) {
            var _this = this;
            if (this.address === undefined)
                this.address = address;
            return new Promise(function (resolve, reject) {
                _this.client = new websocket.w3cwebsocket(_this.address);
                console.log(_this);
                _this.client.onerror = function (error) {
                    // This will only execute if we err before connecting, since
                    // Promises can only get triggered once
                    reject("Error connecting to BCI2000 at " + _this.address + " due to " + error);
                };
                _this.client.onopen = function () {
                    // this.onconnect();
                    console.log("Connected");
                    resolve();
                };
                _this.client.onclose = function () {
                    console.log("Disconnected");
                    // this.ondisconnect();
                    // this.websocket.close();
                };
                _this.client.onmessage = function (event) {
                    var _a = JSON.parse(event.data), opcode = _a.opcode, id = _a.id, contents = _a.contents;
                    switch (opcode) {
                        case "O": // OUTPUT: Received output from command
                            _this._exec[id](contents);
                            delete _this._exec[id];
                            break;
                        case "U":
                            contents.shift();
                            contents[contents.length - 1].trim();
                            _this.onWatchReceived(contents);
                    }
                };
            });
        };
        BCI2K_OperatorConnection.prototype.disconnect = function () {
            this.client.close();
        };
        // /**
        //  * @deprecated
        //  */
        // public tap(location: string) {
        //     let connection = this;
        //     let locationParameter = "WS" + location + "Server";
        //     return this.execute("Get Parameter " + locationParameter).then(
        //         (location: string) => {
        //             if (location.indexOf("does not exist") >= 0) {
        //                 return Promise.reject("Location parameter does not exist");
        //             }
        //             if (location === "") {
        //                 return Promise.reject("Location parameter not set");
        //             }
        //             let dataConnection = new BCI2K_DataConnection();
        //             // Use our address plus the port from the result
        //             return dataConnection
        //                 .connect(connection.address + ":" + location.split(":")[1])
        //                 .then((event) => {
        //                     // To keep with our old API, we actually want to wrap the
        //                     // dataConnection, and not the connection event
        //                     // TODO This means we can't get the connection event!
        //                     return dataConnection;
        //                 });
        //         }
        // );
        // }
        BCI2K_OperatorConnection.prototype.connected = function () {
            return (this.client !== null && this.client.readyState === websocket.w3cwebsocket.OPEN);
        };
        BCI2K_OperatorConnection.prototype.execute = function (instruction) {
            var _this = this;
            if (this.connected()) {
                return new Promise(function (resolve, reject) {
                    var id = (++_this._execid).toString();
                    // TODO Properly handle errors from BCI2000
                    _this._exec[id] = function (exec) { return resolve(exec); };
                    _this.client.send(JSON.stringify({
                        opcode: "E",
                        id: id,
                        contents: instruction
                    }));
                });
            }
            // Cannot execute if not connected
            return Promise.reject("Cannot execute instruction: not connected to BCI2000");
        };
        /**
         * shows current BCI2000 version
         */
        // getVersion() {
        //     this.execute("Version").then((x: string) => console.log(x.split(" ")[1]));
        // }
        BCI2K_OperatorConnection.prototype.showWindow = function () {
            return this.execute("Show Window");
        };
        BCI2K_OperatorConnection.prototype.hideWindow = function () {
            return this.execute("Hide Window");
        };
        BCI2K_OperatorConnection.prototype.setWatch = function (state, ip, port) {
            return this.execute("Add watch " + state + " at " + ip + ":" + port);
        };
        /**
         * [BCI2000 documentation](https://www.bci2000.org/mediawiki/index.php/User_Reference:Operator_Module_Scripting#RESET_SYSTEM)
         * @returns
         */
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
        /**
         * @deprecated in favor of BCI2000 watches
         */
        BCI2K_OperatorConnection.prototype.stateListen = function () {
            var _this = this;
            setInterval(function () {
                _this.execute("GET SYSTEM STATE").then(function (state) {
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
                        case 0: return [4 /*yield*/, this.execute("Get Parameter SubjectName")];
                        case 1: 
                        //Promise<string> {
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        BCI2K_OperatorConnection.prototype.getTaskName = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute("Get Parameter DataFile")];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        //See https://www.bci2000.org/mediawiki/index.php/Technical_Reference:Parameter_Definition
        BCI2K_OperatorConnection.prototype.getParameters = function () {
            return __awaiter(this, void 0, void 0, function () {
                var parameters, allData, data, el;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute("List Parameters")];
                        case 1:
                            parameters = _a.sent();
                            allData = parameters.split("\n");
                            data = {};
                            allData.forEach(function (line) {
                                var descriptors = line.split("=")[0];
                                var dataType = descriptors.split(" ")[1];
                                var name = descriptors.split(" ")[2];
                                var names = descriptors.split(" ")[0].split(":");
                                names.forEach(function (x, i) {
                                    switch (i) {
                                        case 0: {
                                            if (data[names[0]] == undefined) {
                                                data[names[0]] = {};
                                            }
                                            el = data[names[0]];
                                            break;
                                        }
                                        case 1: {
                                            if (data[names[0]][names[1]] == undefined) {
                                                data[names[0]][names[1]] = {};
                                            }
                                            el = data[names[0]][names[1]];
                                            break;
                                        }
                                        case 2: {
                                            if (data[names[0]][names[1]][names[2]] == undefined) {
                                                data[names[0]][names[1]][names[2]] = {};
                                            }
                                            el = data[names[0]][names[1]][names[2]];
                                            break;
                                        }
                                    }
                                });
                                if (dataType != "matrix") {
                                    if (line.split("=")[1].split("//")[0].trim().split(" ").length == 4) {
                                        el[name] = {
                                            dataType: dataType,
                                            value: {
                                                value: line.split("=")[1].split("//")[0].trim().split(" ")[0],
                                                defaultValue: line.split("=")[1].split("//")[0].trim().split(" ")[1],
                                                low: line.split("=")[1].split("//")[0].trim().split(" ")[2],
                                                high: line.split("=")[1].split("//")[0].trim().split(" ")[3]
                                            },
                                            comment: line.split("=")[1].split("//")[1]
                                        };
                                    }
                                    else {
                                        el[name] = {
                                            dataType: dataType,
                                            value: line.split("=")[1].split("//")[0].trim(),
                                            comment: line.split("=")[1].split("//")[1]
                                        };
                                    }
                                }
                                else {
                                    el[name] = {
                                        dataType: dataType,
                                        value: line.split("=")[1].split("//")[0].trim(),
                                        comment: line.split("=")[1].split("//")[1]
                                    };
                                }
                            });
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        return BCI2K_OperatorConnection;
    }());

    var BCI2K_DataConnection = /** @class */ (function () {
        function BCI2K_DataConnection(address) {
            this.websocket = null;
            this.onconnect = function () { };
            this.onGenericSignal = function (data) { };
            this.onStateVector = function (data) { };
            this.onSignalProperties = function (data) { };
            this.onStateFormat = function (data) { };
            this.ondisconnect = function () { };
            this.onReceiveBlock = function () { };
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
                INT32: 3
            };
            this.address = address;
            this.reconnect = true;
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
        BCI2K_DataConnection.prototype.connect = function (address) {
            var _this = this;
            var connection = this;
            if (connection.address === undefined)
                connection.address = address;
            return new Promise(function (resolve, reject) {
                connection.websocket = new WebSocket(connection.address);
                connection.websocket.binaryType = "arraybuffer";
                connection.websocket.onerror = function () {
                    // This will only execute if we err before connecting, since
                    // Promises can only get triggered once
                    reject("Error connecting to data source at " + connection.address);
                };
                connection.websocket.onopen = function () {
                    connection.onconnect();
                    console.log("Connected");
                    resolve();
                };
                connection.websocket.onclose = function (e) {
                    connection.ondisconnect();
                    setTimeout(function () {
                        console.log("Disconnected");
                        if (_this.reconnect != false) {
                            console.log("Reconnecting");
                            _this.connect("");
                        }
                    }, 1000);
                };
                connection.websocket.onmessage = function (event) {
                    connection._decodeMessage(event.data);
                };
            });
        };
        BCI2K_DataConnection.prototype.disconnect = function () {
            this.reconnect = false;
            this.websocket.close(1000, "disconnect called");
        };
        BCI2K_DataConnection.prototype.connected = function () {
            return this.websocket != null && this.websocket.readyState === WebSocket.OPEN;
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
            index = index + 2;
            var nElements = data.getUint16(index, true);
            index = index + 2;
            index = index + data.byteOffset;
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
            var i8Array = new Int8Array(dv.buffer);
            var firstZero = i8Array.indexOf(0);
            var secondZero = i8Array.indexOf(0, firstZero + 1);
            var decoder = new TextDecoder();
            var stateVectorLength = parseInt(decoder.decode(i8Array.slice(1, firstZero)));
            var numVectors = parseInt(decoder.decode(i8Array.slice(firstZero + 1, secondZero)));
            var index = secondZero + 1;
            var data = new DataView(dv.buffer, index);
            var states = {};
            for (var state in this.stateFormat) {
                states[state] = Array(numVectors).fill(this.stateFormat[state].defaultValue);
            }
            for (var vecIdx = 0; vecIdx < numVectors; vecIdx++) {
                var vec = new Uint8Array(data.buffer, data.byteOffset + vecIdx * stateVectorLength, stateVectorLength);
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

    exports.BCI2K_DataConnection = BCI2K_DataConnection;
    exports.BCI2K_OperatorConnection = BCI2K_OperatorConnection;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
