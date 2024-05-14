const detector = require("./detector");
const axios = require("axios");

const JSON = require("./channelAccessToken.json");


const sendMessage = async(url) => {
  axios.post(JSON.webhook_url, {
    content: "記事の変更が検出されました。\n新しい記事のURL: " + url,
  });
};

const announce = async(url) => {
  await sendMessage(url);
};

detector.start_detecting(announce);
