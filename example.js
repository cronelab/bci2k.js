import {BCI2K_OperatorConnection, BCI2K_DataConnection} from './dist'
let bci = new BCI2K_OperatorConnection();
(async () => {
    try{
        await bci.connect("ws://127.0.0.1")
        console.log('connected')
        // bci.showWindow()
        // bci.execute("GET SYSTEM STATE")
        // await bci.startExecutable("SignalGenerator")
        // await bci.resetSystem();
        // await bci.startDummyRun();
        let v = await bci.getVersion()
        // let name = await bci.execute("Stop");
        console.log(v)
    }
    catch(e){
        console.log(e)
    }
})()
