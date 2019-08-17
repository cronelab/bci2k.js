const BCI2K = require("../dist");

let bci = new BCI2K.bciOperator();
const bciData = new BCI2K.bciData();

//Connect directly to the WSIO filter, bypassing the Operator layer
// let bciDataConnection = new BCI2K.bciData();
// bciDataConnection.connect("127.0.0.1:20205")

bci.connect("ws://127.0.0.1").then(() => {
  console.log("con");

  bciData.connect("ws://127.0.0.1:20100").then(y => {
    console.log("Source connected");
    bciData.onGenericSignal = x => console.log(x);
  });

  //Acts on the BCI2K_OperatorConnection
  const connectToSockets = async () => {
    //Taps the ws connection to the WSSourceServer (defaults on port 20100)
    // let sourceConnection = await bci.tap("Source");
    // try {
    //   // sourceConnection.onStateFormat = data => console.log(data);
    //   sourceConnection.onSignalProperties = data => console.log(data);
    //   // sourceConnection.onGenericSignal = data => console.log(data);
    //   // sourceConnection.onStateVector = data => console.log(data);
    // } catch (err) {
    //   console.log(err);
    // }
    //Taps the ws connection to the WSSpectralOutputServer (defaults on port 20203)
  };

  //Acts on the BCI2K_Connection class
  const operatorInterfacers = () => {
    // bci.showWindow();
    // bci.hideWindow();
    // bci.resetSystem();
    // bci.start();
    // bci.getVersion();
    // bci.setWatch("Keyword","127.0.0.1","3000")
  };

  // connectToSockets();
  // operatorInterfacers();
});
