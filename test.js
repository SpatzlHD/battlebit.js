const { BattleBitAPI } = require("./index.js");

const api = new BattleBitAPI(true);

api.on("ServerUpdate", (data) => {
  console.log(data);
});
