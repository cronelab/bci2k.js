import {
  BCI2K_OperatorConnection,
  BCI2K_DataConnection,
} from "./dist/bci2k.es.js";
const bci = new BCI2K_OperatorConnection();
const bciSourceConnection = new BCI2K_DataConnection();

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  bci.disconnect();
  bciSourceConnection.disconnect();
});

(async () => {
  try {
    await bci.connect("ws://127.0.0.1:3998");
    // await bci.execute("SET PARAMETER WSSourceServer *:20100");
    // await bci.execute("SET config; Start");
    await bciSourceConnection.connect("ws://127.0.0.1:20100");
    console.log(bciSourceConnection.connected());
    // await bci.execute("Set config");
    // await bci.execute("Start");

    // bciSourceConnection.onGenericSignal = (x) => console.log(x);
    // await bci.startDummyRun();
    // console.log(state);
    // await bci.startExecutable("SignalGenerator")
    // await bci.resetSystem();
    // await bci.startDummyRun();
    // let v = await bci.getVersion();
    // let name = await bci.execute("Stop");
    // console.log(v);
  } catch (e) {
    bci.disconnect();
    throw new Error(e);
  }
})();
