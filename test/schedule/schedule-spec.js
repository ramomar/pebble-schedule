const assert = require('chai').assert;
const moment = require('moment');

const scheduleJson = require('./schedule.json');
const Schedule     = require('mobile/schedule/schedule.js')(scheduleJson);

describe('Schedule#weekdayCourses', function test() {
  it('should yield the courses for a given weekday', function() {
    const expected = ['VISIO', 'SISINT', 'VERISOFT'];
    const actual = Schedule.weekdayCourses(1).courses.map(c => c.names.short);

    assert.sameMembers(actual, expected);
  });
});

describe('Schedule#weekdayCourses#current', function test() {
  it('should yield the current session for a given time', function() {
    const time = moment('7:00', ['H:m']);

    const expected = {
      courseNames: {
        short:  'RED',
        long: 'REDES DE TELECOMUNICACIONES'
      },
      weekday:      2,
      turn:         1,
      group:        '002',
      classroom:    '4204',
      startTimeStr: '7:00',
      endTimeStr:   '7:50'
    };
    const actual = Schedule.weekdayCourses(2).sessions.current(time);

    assert.equal(actual.courseNames.short, expected.courseNames.short);
    assert.equal(actual.weekday, expected.weekday);
    assert.equal(actual.turn, expected.turn);
    assert.equal(actual.classroom, expected.classroom);
    assert.equal(actual.startTimeStr, expected.startTimeStr);
    assert.equal(actual.endTimeStr, expected.endTimeStr);
  });
});

describe('Schedule#weekdayCourses#available', function test() {
  it('should return the available sessions for the day', function () {
    const expected = [
      {name: 'VISIO', time: '8:40'},
      {name: 'SISINT', time: '12:50'},
      {name: 'VERISOFT', time: '17:00'}
    ];
    const actual   = Schedule.weekdayCourses(1)
      .sessions
      .available
      .map(toTestFmt);

    assert.sameDeepMembers(actual, expected);
  });
});

describe('Schedule#weekdayCourses#remaining', function test() {
  it ('should yield the remaining sessions for the day given a time',
    function () {
      const timeA = moment('9:29', ['H:m']);
      const expectedA = [
        {name: 'VISIO', time: '8:40'},
        {name: 'SISINT', time: '12:50'},
        {name: 'VERISOFT', time: '17:00'}
      ];
      const actualA = Schedule
        .weekdayCourses(1)
        .sessions
        .remaining(timeA)
        .map(toTestFmt);

      const timeB = moment('9:30', ['H:m']);
      const expectedB = [
        {name: 'SISINT', time: '12:50'},
        {name: 'VERISOFT', time: '17:00'}
      ];
      const actualB = Schedule
        .weekdayCourses(1)
        .sessions
        .remaining(timeB)
        .map(toTestFmt);

      assert.sameDeepMembers(actualA, expectedA);
      assert.sameDeepMembers(actualB, expectedB);
    });
});

describe('Schedule#weekdayCourses#remainingMinutes', function test() {
  it ('should yield the remaining minutes of sessions for the day given a time',
    function () {
      const time1     = moment('9:29', ['H:m']);
      const expected1 = 150;
      const actual1   = Schedule
        .weekdayCourses(1)
        .sessions
        .remainingMinutes(time1);

      const time2     = moment('9:30', ['H:m']);
      const expected2 = 100;
      const actual2   = Schedule
        .weekdayCourses(1)
        .sessions.remainingMinutes(time2);

      assert.equal(actual1, expected1);
      assert.equal(actual2, expected2);
    });
});

function toTestFmt(session) {
  return {
    name: session.courseNames.short,
    time: session.startTimeStr
  };
}
