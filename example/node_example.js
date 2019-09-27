const BCI2K = require("../dist");

let bci = new BCI2K.bciOperator();
const bciSourceData = new BCI2K.bciData();
const bciFilterData = new BCI2K.bciData();

bci.connect("ws://127.0.0.1").then(() => {
  console.log("Connected to Operator layer through NodeJS server");

  bciSourceData.connect("ws://127.0.0.1:20100").then(y => {
    console.log("Source connected");
    bciSourceData.onGenericSignal = x => {
    let stimCodeVector = bciSourceData.states["StimulusCode"] || []
    // if(stimCodeVector[0]>0){
    //   console.log("Stim!")
    // }

      // console.log(x)
    };
  });

  // bciFilterData.connect("ws://127.0.0.1:20203").then(y => {
  //   console.log("Filter connected");
  //   bciFilterData.onGenericSignal = x => console.log(x);
  // });



  //Acts on the BCI2K_Connection class
    // bci.showWindow();
    // bci.hideWindow();
    // bci.resetSystem();
    // bci.start();
    // bci.getVersion();
    // bci.setWatch("Keyword","127.0.0.1","3000")

});
