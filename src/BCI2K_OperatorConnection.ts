// ======================================================================== //
//
// bci2k.js
// A javascript connector for BCI2000
//
// ======================================================================== //

import W3CWebSocket from "websocket";
const WebSocket = W3CWebSocket.w3cwebsocket;

export class BCI2K_OperatorConnection {
  msgID: number;
  websocket: WebSocket;
  state: string;
  ondisconnect: () => void;
  onStateChange: (state: string) => void;
  address: string;
  latestIncomingData: string;
  newData: (data: string) => void;
  constructor(address?: string) {
    this.ondisconnect = () => {};
    this.onStateChange = () => {};
    this.websocket = null;
    this.state = "";
    this.address = address || undefined;
    this.latestIncomingData = "";
    this.msgID = 0;
    this.newData = () => {};
  }

  public connect(address?: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.address === undefined) {
        this.address =
          address || "ws://127.0.0.1:80" || `ws://${window.location.host}`;
      }
      this.websocket = new WebSocket(this.address);

      this.websocket.onerror = () => {
        reject(`Error connecting to BCI2000 at ${this.address}`);
      };
      this.websocket.onclose = () => {
        this.ondisconnect();
      };
      this.websocket.onopen = () => {
        resolve();
      };

      this.websocket.onmessage = ({ data }) => {
        if (!data.includes("BCI2000 Version")) this.newData(data);
      };
    });
  }

  public disconnect(): void {
    this.websocket.close();
  }

  public connected(): boolean {
    return (
      this.websocket !== null && this.websocket.readyState === WebSocket.OPEN
    );
  }

  public execute(instruction: string): Promise<string> {
    if (this.connected()) {
      return new Promise((resolve, reject) => {
        this.websocket.send(instruction);
        this.newData = (data: string) => {
          if (data.includes("Error: ")) reject(data);
          else {
            resolve(data);
          }
        };
      });
    }
    // Cannot execute if not connected
    return Promise.reject(
      "Cannot execute instruction: not connected to BCI2000"
    );
  }

  async getVersion(): Promise<string> {
    const resp = await this.execute("Version");
    return resp.split("\r")[0];
  }

  async showWindow(): Promise<void> {
    await this.execute("Show Window");
  }

  async hideWindow(): Promise<void> {
    await this.execute("Hide Window");
  }

  async startExecutable(executable: string): Promise<void> {
    await this.execute(`Start executable ${executable}`);
  }

  async startDummyRun(): Promise<void> {
    await this.execute("Startup system");
    await this.startExecutable("SignalGenerator");
    await this.startExecutable("DummySignalProcessing");
    await this.startExecutable("DummyApplication");
    await this.execute("Set Config");
    await this.execute("Start");
  }

  async setWatch(state: string, ip: string, port: string): Promise<void> {
    await this.execute("Add watch " + state + " at " + ip + ":" + port);
  }

  async resetSystem(): Promise<void> {
    await this.execute("Reset System");
  }

  async setConfig(): Promise<void> {
    await this.execute("Set Config");
  }

  async start(): Promise<void> {
    await this.execute("Start");
  }

  async stop(): Promise<void> {
    await this.execute("Stop");
  }

  async kill(): Promise<void> {
    await this.execute("Exit");
  }

  stateListen(): void {
    setInterval(async () => {
      const state: string = await this.execute("GET SYSTEM STATE");
      if (state.trim() != this.state) {
        this.onStateChange(state.trim());
      }
    }, 1000);
  }

  async getSubjectName(): Promise<string> {
    return await this.execute("Get Parameter SubjectName");
  }

  async getTaskName(): Promise<string> {
    return await this.execute("Get Parameter DataFile");
  }

  async setParameter(parameter): Promise<void> {
    await this.execute(`Set paramater ${parameter}`);
  }

  async setState(state): Promise<void> {
    await this.execute(`Set state ${state}`);
  }

  //See https://www.bci2000.org/mediawiki/index.php/Technical_Reference:Parameter_Definition
  async getParameters(): Promise<unknown> {
    const parameters = await this.execute("List Parameters");
    const allData = parameters.split("\n");
    const data = {};
    let el;
    allData.forEach((line) => {
      const descriptors = line.split("=")[0];
      const dataType = descriptors.split(" ")[1];
      const name = descriptors.split(" ")[2];
      const names = descriptors.split(" ")[0].split(":");
      names.forEach((x, i) => {
        switch (i) {
          case 0: {
            if (data[names[0]] == undefined) {
              data[names[0]] = {};
            }
            el = data[names[0]];
            break;
          }
          case 1: {
            if (data[names[0]][names[1]] == undefined) {
              data[names[0]][names[1]] = {};
            }
            el = data[names[0]][names[1]];
            break;
          }
          case 2: {
            if (data[names[0]][names[1]][names[2]] == undefined) {
              data[names[0]][names[1]][names[2]] = {};
            }
            el = data[names[0]][names[1]][names[2]];
            break;
          }
          default: {
            break;
          }
        }
      });
      const segmentTwo = line.split("=")[1]?.split("//") ?? [""];
      const segmentOne = segmentTwo[0]?.trim();
      const segmentThree = segmentOne.split(" ");
      if (dataType != "matrix") {
        if (segmentOne?.split(" ").length == 4) {
          el[name] = {
            dataType,
            value: {
              value: segmentThree[0],
              defaultValue: segmentThree[1],
              low: segmentThree[2],
              high: segmentThree[3],
            },
            comment: segmentTwo[1],
          };
        } else {
          el[name] = {
            dataType,
            value: segmentOne,
            comment: segmentTwo[1],
          };
        }
      } else {
        el[name] = {
          dataType,
          value: segmentOne,
          comment: segmentTwo[1],
        };
      }
    });

    return data;
  }
}
export default BCI2K_OperatorConnection;
