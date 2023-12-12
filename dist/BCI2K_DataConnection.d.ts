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
export declare class BCI2K_DataConnection {
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
    constructor(address?: string);
    private getNullTermString;
    connect(address?: string, callingFrom?: string): Promise<void>;
    disconnect(): void;
    connected(): boolean;
    private _decodeMessage;
    private _decodePhysicalUnits;
    private _decodeSignalProperties;
    private _decodeStateFormat;
    private _decodeGenericSignal;
    private _decodeStateVector;
}
export default BCI2K_DataConnection;
