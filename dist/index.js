(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Data", "./Operator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BCI2K_OperatorConnection = exports.BCI2K_DataConnection = void 0;
    var Data_1 = require("./Data");
    Object.defineProperty(exports, "BCI2K_DataConnection", { enumerable: true, get: function () { return Data_1.default; } });
    var Operator_1 = require("./Operator");
    Object.defineProperty(exports, "BCI2K_OperatorConnection", { enumerable: true, get: function () { return Operator_1.default; } });
});
//# sourceMappingURL=index.js.map