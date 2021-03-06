const moment = require('moment');

// Moment has nothing like LocalTime.
function minutesDiff(t1, t2) {
  const t22 = t1.clone();

  t22.hours(t2.hours());
  t22.minutes(t2.minutes());

  return t22.diff(t1, 'minutes');
}

function makeSummaryResponse(sessions, currentTime) {
  const currentSession           = sessions.current(currentTime);
  const totalSessions            = sessions.available.length;
  const remainingSessions        = sessions.remaining(currentTime).length;
  const minutesLeftToNextSession = sessions.minutesToNextSession(currentTime);
  const completedSessions        = totalSessions - remainingSessions;
  const sessionsRatio            = `${completedSessions}/${totalSessions}`;

  if (sessions.available.length == 0) {
    return 'FREE_TIME';
  }
  else if (remainingSessions == 0) {
    return `GO_HOME_TIME|${sessionsRatio}`;
  }
  else if (!currentSession && remainingSessions > 0) {
    const sessionTime =
      currentTime.clone().add(minutesLeftToNextSession, 'minutes');
    const session = sessions.current(sessionTime);

    // Summary example: 'BREAK_TIME|2/3|120|AUTO|4201'
    return [
      'BREAK_TIME',
      sessionsRatio,
      minutesDiff(
        currentTime.clone(),
        session.startTime.clone()
      ),
      `${session.courseNames.short}|${session.classroom}`
    ].join('|');
  }
  else {
    let nextSessionSummary;

    if (Number.isNaN(minutesLeftToNextSession)) {
      nextSessionSummary = 'GO_HOME_TIME';
    } else {
      const nextSession = sessions
        .current(currentTime.clone()
        .add(minutesLeftToNextSession, 'minutes'));

      nextSessionSummary = [
        'SESSION_TIME',
        nextSession.courseNames.short,
        nextSession.classroom,
        Math.round(minutesLeftToNextSession)
      ].join('|');
    }

    // Summary example: 'SESSION_TIME|2/3|50|RED|2304|AUTO|4201'
    return [
      'SESSION_TIME',
      sessionsRatio,
      minutesDiff(
        currentTime.clone(),
        currentSession.endTime.clone()
      ),
      currentSession.courseNames.short,
      currentSession.classroom,
      nextSessionSummary
    ].join('|');
  }
}

module.exports = {
  makeSummaryResponse
};
