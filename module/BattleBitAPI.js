const ServerSubscriptionHandler = require("../handler/ServerSubscriptionHandler.js");
const axios = require("axios");
const EventEmitter = require("events");

class BattleBitAPI extends EventEmitter {
  constructor(subscribe = false) {
    super();
    this.serverSubscriptionHandler;
    if (subscribe) {
      this.subscribeToServers();
    }
  }

  async getServers() {
    try {
      const response = await axios.get(
        "https://publicapi.battlebit.cloud/Servers/GetServerList"
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async subscribeToServers() {
    this.serverSubscriptionHandler = new ServerSubscriptionHandler();
    this.serverSubscriptionHandler.subscribe(this.getServers);
    this.serverSubscriptionHandler.on("ServerUpdate", (data) => {
      this.emit("ServerUpdate", data);
    });
  }
}

module.exports = BattleBitAPI;
