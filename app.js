const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));

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
    const meetings = [
      {
        day: "Rabu",
        time: "09.00-11.00",
        course: "Pemrograman Berbasis Objek - PBO01",
        value: a,
      },
      {
        day: "Kamis",
        time: "13.00-15.00",
        course: "Algoritma Pemrograman - AP01",
        value: b,
      },
      {
        day: "Sabtu",
        time: "07.00-09.00",
        course: "Jaringan Komputer - JK50",
        value: c,
      },
    ];

    const richContent = [
      {
        type: "info",
        title: "Jadwal Kuliah",
        subtitle: "Berikut adalah jadwal kuliah Anda",
      },
      {
        type: "divider",
      },
    ];

    for (let i = 0; i < meetings.length; i++) {
      const meeting = meetings[i];
      richContent.push({
        type: "list",
        title: `${meeting.day} ${meeting.time}`,
        subtitle: meeting.course,
        event: {
          name: "meeting_date",
          languageCode: "",
          parameters: {
            value: meeting.value,
          },
        },
      });
    }

    const payloadData = { richContent: [richContent] };

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
