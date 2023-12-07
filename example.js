import {BCI2K_OperatorConnection, BCI2K_DataConnection} from './dist/bci2k.es.js';
let bci = new BCI2K_OperatorConnection();

process.on('SIGINT', function() {
    // bci.kill();
    bci.disconnect();
});

(async () => {
    try{
        // const bciSourceConnection = new BCI2K_DataConnection();
        await bci.connect("ws://127.0.0.1:3998")
        // await bciSourceConnection.connect("ws://127.0.0.1:20100");
        // bciSourceConnection.onGenericSignal = x => console.log(x)
        await bci.execute("GET SYSTEM STATE")
        // await bci.execute("Start")
        // await bci.startExecutable("SignalGenerator")
        // await bci.resetSystem();
        // await bci.startDummyRun();
        let v = await bci.getVersion()
        // let name = await bci.execute("Stop");
        console.log(v)
    }
    catch(e){
        bci.disconnect();
        throw new Error(e)
    }
})()
