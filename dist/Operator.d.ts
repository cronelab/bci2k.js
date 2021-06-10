export default class BCI2K_OperatorConnection {
    client: any;
    _execid: any;
    _exec: any;
    state: string;
    onStateChange: any;
    address: string;
    onWatchReceived: any;
    constructor(address?: string);
    /**
     *
     * @param address address to bci2000web
     * @returns promise void
     */
    connect(address?: string): Promise<void>;
    disconnect(): void;
    connected(): boolean;
    execute(instruction: string): Promise<unknown>;
}
