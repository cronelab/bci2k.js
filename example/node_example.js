const BCI2K = require("../dist");

// let bci = new BCI2K.bciOperator("ws://127.0.0.1:80");
// const bciSourceData = new BCI2K.bciData();
const bciFilterData = new BCI2K.bciData();


// bci.connect().then(() => {
//   console.log("Connected to the Operator layer.")
//   bci.stop() //("StimulusCode", "127.0.0.1", "3000")

// })

bciFilterData.connect().then(() => {
  console.log("Connected to Filter layer");
  // bciFilterData.onSignalProperties = x => console.log(x);
  bciFilterData.onGenericSignal = x => console.log(x);
  // bciFilterData.onStateVector = x => console.log(x);
});


//Acts on the BCI2K_Connection class
// bci.showWindow();
// bci.hideWindow();
// bci.resetSystem();
// bci.start();
// bci.getVersion();