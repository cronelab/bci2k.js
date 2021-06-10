(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "websocket"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = BCI2K_OperatorConnection;
});
//# sourceMappingURL=Operator.js.map