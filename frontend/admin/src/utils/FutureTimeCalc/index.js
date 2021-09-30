import * as dateFns from "date-fns";

function FutureTimeCalc(startTime, endTime) {
  let res = [],
    now = new Date(),
    parts = [
      { time: "day", abbr: "day" },
      { time: "hour", abbr: "hr" },
      { time: "minute", abbr: "min" },
      { time: "second", abbr: "sec" },
    ];
    startTime = dateFns.parseISO(startTime);
    endTime = dateFns.parseISO(endTime);

  parts.forEach((part, i) => {
    let capitalize = part.time.charAt(0).toUpperCase() + part.time.slice(1);
    let calcTime = dateFns[`differenceIn${capitalize}s`](endTime, now);
    if (calcTime) {
      res.push(
        `${calcTime} ${part.abbr}${calcTime === 1 ? "" : "s"}`
      );
      if (i < parts.length) endTime = dateFns[`sub${capitalize}s`](endTime, calcTime);
    }
  });
  return res.join(" ");
}

export default FutureTimeCalc;
