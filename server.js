const express = require("express");
const line = require("@line/bot-sdk");
const detector = require("./detector");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const DATA_PATH = "./data.json";

const LINE_config = require("./channelAccessToken.json");
const client = new line.Client(LINE_config);

var user_list = (() => {
  if(!fs.existsSync(DATA_PATH)){
    fs.writeFileSync(DATA_PATH, "{}");
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
})();

const app = express();

app.post("/webhook", line.middleware(LINE_config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});


const addUser = (userId) => {
  user_list[userId] = "";
  fs.writeFileSync(DATA_PATH, JSON.stringify(user_list, null, 2));
  console.log("User Added", userId);
};

const handleEvent = async(event) => {
  if(event.type !== "message" || event.message.type !== "text"){
    return Promise.resolve(null);
  }
  addUser(event.source.userId);
};

const sendMessage = async(userId, url) => {
  await client.pushMessage(userId, {
    type: "text",
    text: "記事の変更が検出されました\n新しい記事のURL: " + url
  });
};

const announceAll = async(url) => {
  for(const key in user_list){
    sendMessage(key, url);
  }
};


app.listen(PORT);
console.log(`Server running at ${PORT}`);
detector.start_detecting(announceAll);
