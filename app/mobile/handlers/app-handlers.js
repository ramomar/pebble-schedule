const moment = require('moment');

const Client          = require('../io/client.js');
const Schedule        = require('../schedule/schedule.js');
const SummaryHandlers = require('./summary-handlers.js');

function handleAppMessage(message) {
  if (message.payload['Summary']) {
    SummaryHandlers.handleSummaryRequest(schedule, moment());
  }
}

function handleMobileReady() {
  console.info('Phone is ready.');
  Client.sendMobileReady(() => {
    SummaryHandlers.handleSummaryRequest(schedule, moment());
  });
}

module.exports = {
  handleAppMessage,
  handleMobileReady
};

// Temporal schedule ;(
const schedule = Schedule([
  {
    "longName": "AUTOMATIZACION Y CONTROL DE SIST.DINAMICOS",
    "shortName": "AUTO",
    "sessions": [
      {
        "weekday": 5,
        "turn": 5,
        "group": "505",
        "classroom": "4205",
        "startTime": "13:40",
        "endTime": "14:30"
      },
      {
        "weekday": 5,
        "turn": 6,
        "group": "505",
        "classroom": "4205",
        "startTime": "14:30",
        "endTime": "15:20"
      },
      {
        "weekday": 2,
        "turn": 7,
        "group": "002",
        "classroom": "4212",
        "startTime": "17:00",
        "endTime": "17:50"
      },
      {
        "weekday": 2,
        "turn": 8,
        "group": "002",
        "classroom": "4212",
        "startTime": "17:50",
        "endTime": "18:40"
      },
      {
        "weekday": 2,
        "turn": 9,
        "group": "002",
        "classroom": "4212",
        "startTime": "18:40",
        "endTime": "19:30"
      }
    ],
    "frequency": 5
  },
  {
    "longName": "REDES DE TELECOMUNICACIONES",
    "shortName": "RED",
    "sessions": [
      {
        "weekday": 2,
        "turn": 1,
        "group": "002",
        "classroom": "4204",
        "startTime": "7:00",
        "endTime": "7:50"
      },
      {
        "weekday": 2,
        "turn": 2,
        "group": "002",
        "classroom": "4204",
        "startTime": "7:50",
        "endTime": "8:40"
      },
      {
        "weekday": 2,
        "turn": 3,
        "group": "002",
        "classroom": "4204",
        "startTime": "8:40",
        "endTime": "9:30"
      },
      {
        "weekday": 4,
        "turn": 11,
        "group": "409",
        "classroom": "4102",
        "startTime": "20:20",
        "endTime": "21:10"
      },
      {
        "weekday": 4,
        "turn": 12,
        "group": "409",
        "classroom": "4102",
        "startTime": "21:10",
        "endTime": "22:00"
      }
    ],
    "frequency": 5
  },
  {
    "longName": "PROYECTO INTEGRADOR 2",
    "shortName": "PROYINT",
    "sessions": [
      {
        "weekday": 2,
        "turn": 10,
        "group": "002",
        "classroom": "4211",
        "startTime": "19:30",
        "endTime": "20:20"
      },
      {
        "weekday": 2,
        "turn": 11,
        "group": "002",
        "classroom": "4211",
        "startTime": "20:20",
        "endTime": "21:10"
      },
      {
        "weekday": 2,
        "turn": 12,
        "group": "002",
        "classroom": "4211",
        "startTime": "21:10",
        "endTime": "22:00"
      }
    ],
    "frequency": 3
  },
  {
    "longName": "VERIFICACION Y VALIDACION DE SOFTWARE",
    "shortName": "VERISOFT",
    "sessions": [
      {
        "weekday": 1,
        "turn": 7,
        "group": "002",
        "classroom": "4203",
        "startTime": "17:00",
        "endTime": "17:50"
      },
      {
        "weekday": 3,
        "turn": 7,
        "group": "002",
        "classroom": "4203",
        "startTime": "17:00",
        "endTime": "17:50"
      },
      {
        "weekday": 5,
        "turn": 7,
        "group": "002",
        "classroom": "4203",
        "startTime": "17:00",
        "endTime": "17:50"
      }
    ],
    "frequency": 3
  },
  {
    "longName": "TEMAS SEL. DE SISTEMAS INTELIGENTES",
    "shortName": "SISINT",
    "sessions": [
      {
        "weekday": 1,
        "turn": 4,
        "group": "001",
        "classroom": "4206",
        "startTime": "12:50",
        "endTime": "13:40"
      },
      {
        "weekday": 3,
        "turn": 4,
        "group": "001",
        "classroom": "4206",
        "startTime": "12:50",
        "endTime": "13:40"
      },
      {
        "weekday": 5,
        "turn": 4,
        "group": "001",
        "classroom": "4206",
        "startTime": "12:50",
        "endTime": "13:40"
      },
      {
        "weekday": 4,
        "turn": 8,
        "group": "417",
        "classroom": "SIST4",
        "startTime": "17:50",
        "endTime": "18:40"
      }
    ],
    "frequency": 4
  },
  {
    "longName": "VISION COMPUTACIONAL",
    "shortName": "VISIO",
    "sessions": [
      {
        "weekday": 1,
        "turn": 3,
        "group": "001",
        "classroom": "4204",
        "startTime": "8:40",
        "endTime": "9:30"
      },
      {
        "weekday": 3,
        "turn": 3,
        "group": "001",
        "classroom": "4204",
        "startTime": "8:40",
        "endTime": "9:30"
      },
      {
        "weekday": 5,
        "turn": 3,
        "group": "001",
        "classroom": "4204",
        "startTime": "8:40",
        "endTime": "9:30"
      },
      {
        "weekday": 4,
        "turn": 9,
        "group": "408",
        "classroom": "SIST5",
        "startTime": "18:40",
        "endTime": "19:30"
      },
      {
        "weekday": 4,
        "turn": 10,
        "group": "408",
        "classroom": "SIST5",
        "startTime": "19:30",
        "endTime": "20:20"
      }
    ],
    "frequency": 5
  }
]);
