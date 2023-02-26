const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", express.json(), (request, response) => {
  const agent = new WebhookClient({ request, response });

  const demo = (agent) => {
    agent.add("Sending response from Webhook server as Pinbot v.1!");
  };

  const checkSchedule = (agent) => {
    const a = 1;
    const b = 2;
    const c = 3;
    const payloadData = {
      richContent: [
        [
          {
            type: "info",
            title: "Jadwal Kuliah",
            subtitle: "Berikut adalah jadwal kuliah Anda",
          },
          {
            type: "divider",
          },
          {
            type: "list",
            title: "Rabu 09.00-11.00",
            subtitle: "Pemrograman Berbasis Objek - PBO01",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: a,
              },
            },
          },
          {
            type: "list",
            title: "Kamis 13.00-15.00",
            subtitle: "Algoritma Pemrograman - AP01",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: b,
              },
            },
          },
          {
            type: "list",
            title: "Sabtu 07.00-09.00",
            subtitle: "Jaringan Komputer - JK50",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: c,
              },
            },
          },
        ],
      ],
    };
    agent.add(
      new Payload(agent.UNSPECIFIED, payloadData, {
        sendAsMessage: true,
        rawPayload: true,
      })
    );
  };

  const intentMap = new Map();

  intentMap.set("01_Demo", demo);
  intentMap.set("02_CheckSchedule", checkSchedule);

  agent.handleRequest(intentMap);
});

module.exports = app;
