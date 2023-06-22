const EventEmitter = require("events");

class ServerSubscriptionHandler extends EventEmitter {
  constructor() {
    super();
    this.interval;
    // 5 seconds
    this.intervalTime = 5000;
  }

  subscribe(getServers) {
    this.interval = setInterval(async () => {
      console.log("Getting servers...");
      const data = await getServers();

      this.emit("ServerUpdate", data);
    }, this.intervalTime);
  }

  unsubscribe() {
    clearInterval(this.interval);
  }
}

module.exports = ServerSubscriptionHandler;
