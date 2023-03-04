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

  const arrangeMeeting = (agent) => {
    const a = 1;
    const b = 2;
    const c = 3;
    var payloadData = {
      richContent: [
        [
          {
            type: "info",
            title: "Tanggal Tersedia Bimbingan",
            subtitle:
              "Berikut adalah jadwal dosen pembimbing Anda untuk konsultasi. Silahkan pilih 1:",
          },
          {
            type: "divider",
          },
          {
            type: "list",
            title: "31/05/2023",
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
            title: "02/06/2023",
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
            title: "03/06/2023",
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

  function getMeetingDate(agent) {
    agent.add(`Baik, Anda telah memilih tanggal tersebut`);
    console.log(request.body.queryResult.outputContexts);

    infoContext = agent.context.get("meeting_date");
    console.log(infoContext);
    choice = infoContext.parameters.value;

    if (choice == 1) {
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: "Konfimasi pertemuan",
              subtitle:
                "Mohon konfirmasi Anda benar ingin membuat pertemuan ini",
            },
            {
              type: "divider",
            },
            {
              type: "chips",
              options: [
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/succes_icon.png",
                    },
                  },
                  text: "Ya, saya yakin",
                },
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/fail_icon.png",
                    },
                  },
                  text: "Tidak, saya ingin merubah jadwal",
                },
              ],
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
    } else if (choice == 2) {
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: "Final Meeting Confirmation",
              subtitle:
                "Please confirm are you sure want to arrange a meeting with the Academic Director?",
            },
            {
              type: "divider",
            },
            {
              type: "chips",
              options: [
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/succes_icon.png",
                    },
                  },
                  text: "Ya, saya yakin",
                },
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/fail_icon.png",
                    },
                  },
                  text: "Tidak, saya ingin merubah jadwal",
                },
              ],
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
    } else {
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: "Final Meeting Confirmation",
              subtitle:
                "Please confirm are you sure want to arrange a meeting with the Academic Director?",
            },
            {
              type: "divider",
            },
            {
              type: "chips",
              options: [
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/succes_icon.png",
                    },
                  },
                  text: "Ya, saya yakin",
                },
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/fail_icon.png",
                    },
                  },
                  text: "Tidak, saya ingin merubah jadwal",
                },
              ],
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
    }
  }

  function arrangeMeetingConfirmationYes(agent) {
    agent.add(
      "Terima kasih atas konfirmasinya, kami akan mengirim detail pertemuan ke Email Anda"
    );
  }

  function arrangeMeetingConfirmationNo(agent) {
    agent.add("Baik, tidak masalah");
    agent.add("Ada yang bisa dibantu?");
  }

  function kontakKetuaKelas(agent) {
    const payload = {
      richContent: [
        [
          {
            type: "info",
            title: "Kontak WA Ketua Kelas Matematika Wajib",
            subtitle: "Kontak WA",
            image: {
              src: {
                rawUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png",
              },
            },
            actionLink:
              "https://api.whatsapp.com/send?phone=6281572697825&text=Halo, ketua kelas Matematika Wajib? Minta tolong diinvite ke grup yaa.",
          },
        ],
      ],
    };

    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        sendAsMessage: true,
        rawPayload: true,
      })
    );
  }

  const intentMap = new Map();

  intentMap.set("01_Demo", demo);
  intentMap.set("02_CheckSchedule", checkSchedule);
  intentMap.set("03_JadwalDospem", arrangeMeeting);
  intentMap.set("03_JadwalDospem - custom", getMeetingDate);
  intentMap.set(
    "03_JadwalDospem - custom - yes",
    arrangeMeetingConfirmationYes
  );
  intentMap.set("03_JadwalDospem - custom - no", arrangeMeetingConfirmationNo);
  intentMap.set("04_KontakKetuaKelas", kontakKetuaKelas);

  agent.handleRequest(intentMap);
});

module.exports = app;
