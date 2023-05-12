const axios = require("axios");
const HTMLParser = require("node-html-parser");

const URL = "https://www.procon.gr.jp/";
const interval_time = 300; // [s]

var latest_news_url = "";

const detect = async() => {
  try {
    const response = await axios.get(URL);
    const root = HTMLParser.parse(response.data);

    const latest_content = root.querySelector(".new-entry-content > a")
    let current_url = latest_content.rawAttrs;
    current_url = current_url.substring(6).trim();
    current_url = current_url.substring(0, current_url.indexOf('"'));
    if(latest_news_url === current_url) return false;
    if(latest_news_url === ""){
      latest_news_url = current_url;
      return false;
    }
    latest_news_url = current_url;
  }catch(error){
    console.error(error.response);
    return false;
  }
  return true;
};

exports.start_detecting = (callback) => {
  console.log("Start Detecting");
  setInterval(async() => {
    const is_detected = await detect();
    if(is_detected){
      console.log("Change Detected!!!", latest_news_url);
      callback(latest_news_url);
    }
  }, interval_time * 1000);
};
