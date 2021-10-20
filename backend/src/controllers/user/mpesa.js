import Mpesa from "../../models/Mpesa.js";
import unirest from "unirest";
import request from "request";
import https from "https";

export const callback = (req, res) => {
  try {
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const stkPush = (amount, mssisdn) => {
  try {
    let amount = "1";
    let mssidn = "254708058225";
    var postBody = JSON.stringify({
      BusinessShortCode: "174379",
      Password: Buffer.from(
        "174379" +
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
          getTimeStamp()
      ).toString("base64"),
      Timestamp: getTimeStamp(),
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: mssidn,
      PartyB: "174379",
      PhoneNumber: mssidn,
      CallBackURL: "https://api.bidspesa.com/mpesa/callback",
      AccountReference: "LNMOnGlitch",
      TransactionDesc: "@SandboxTests",
    });
    /*This generates an access_token for each request, and 
            returns a promise.*/
    var aTPromise = getAT();

    return aTPromise
      .then(
        function (resObj) {
          return resObj["access_token"];
        },
        function (err) {
          return "";
        }
      )
      .then(function (_at) {
        /*If access_token is valid, proceed to invoke the LNM API*/
        var postOptions = {
          host: "sandbox.safaricom.co.ke",
          path: "/mpesa/stkpush/v1/processrequest",
          method: "POST",
          headers: {
            Authorization: "Bearer " + _at,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postBody, "utf8"),
          },
        };
        return new Promise(function (resolve, reject) {
          var post = https.request(postOptions, function (res) {
            res.setEncoding("utf-8");
            res.on("data", function (d) {
              resolve(JSON.parse(d));
            });
            res.on("error", function (e) {
              reject(e);
            });
          });
          post.write(postBody);
          post.end();
        });
      });

    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmation = (req, res) => {
  try {
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const validation = (req, res) => {
  try {
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function getAccessToken() {
    const consumerKey = "nG5XTbbAgpnREsv2ihHPeXzXCJKH7jPx";
    const consumerSecret = "ihbsgAtffLsAPJ7C";
    var getOptions = {
      host: "sandbox.safaricom.co.ke",
      path: "/oauth/v1/generate?grant_type=client_credentials",
      method: "GET",
      headers: {
        "Authorization": "Bearer " + Buffer.from("OYVtkaCW2lRJl4ysFGcmU2UrffGPMgJ8"
          + ":" + "eoCzeBSPDIwRqxma").toString("base64"),
          "Accept":"application/json"
      }
    }
    return new Promise(function(resolve, reject) {
      https.request(getOptions, function(res) {
        res.setEncoding("utf-8");
        res.on("data", function(d) {
          resolve(JSON.parse(d));
        });
        res.on("error", function(e) {
          reject(e);
        });
      }).end();
    });
  }
  
  function getTimeStamp() {
    function parseDate(e) { return (e < 10) ? "0" + e : e; }
    var _date = new Date();
    var currentTime = 
        new Date(_date.toLocaleString("en-us", {timeZone: "Africa/Nairobi"}));
    var month = parseDate(currentTime.getMonth() + 1);
    var date = parseDate(currentTime.getDate());
    var hour = parseDate(currentTime.getHours());
    var minutes = parseDate(currentTime.getMinutes());
    var seconds = parseDate(currentTime.getSeconds());
    return currentTime.getFullYear() + "" + month + "" + date + "" + 
        hour + "" + minutes + "" + seconds;
  }
