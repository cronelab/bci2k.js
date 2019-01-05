const BCI2K = require("../dist/bci2k");

let bci = new BCI2K();

bci.connect("127.0.0.1").then(() => {
  //Acts on the BCI2K_OperatorConnection
  const connectToSockets = async () => {
    //Taps the ws connection to the WSSourceServer (defaults on port 20100)
    let sourceConnection = await bci.tap("Source");
    //Taps the ws connection to the WSSpectralOutputServer (defaults on port 20203)
    let spectralConnection = await bci.tap("SpectralOutput");

    try {
      // sourceConnection.onStateFormat = data => console.log(data);
      // sourceConnection.onSignalProperties = data => console.log(data);
      // sourceConnection.onGenericSignal = data => console.log(data);
      spectralConnection.onGenericSignal = data => console.log(data);
      // spectralConnection.onStateVector = data => console.log(data);
    } catch (err) {
      console.log(err);
    }
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

  connectToSockets();
  // operatorInterfacers();
});


