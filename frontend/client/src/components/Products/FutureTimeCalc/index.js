import * as dateFns from "date-fns";

const FutureTimeCalc = () => {

  return (startTime, endTime) => {
    let result = [],
      start = dateFns.parseISO(startTime),
      end = dateFns.parseISO(endTime);
      // parts = ["year", "month", "day", "hour", "minute"];
      // parts = ["hour", "minute", "second"];
      // parts = [{time: "hour", abbr: "hr"}, {time: "minute", abbr: "min"}, {time: "second", abbr: "sec"}];

      let days = dateFns.differenceInDays(end, start);
      let hours = dateFns.differenceInHours(end, start) % 24;
      let mins = dateFns.differenceInMinutes(end, start) % 60;
      let secs = dateFns.differenceInSeconds(end, start) % 60;

      return `${days}days : ${hours}hrs : ${mins}mins : ${secs}secs`;

    /* parts.forEach((part, i) => {
      let camelDate = part.time.charAt(0).toUpperCase() + part.time.slice(1);
      let dateAbbr = part.abbr.charAt(0).toUpperCase() + part.abbr.slice(1);
      let time = dateFns[`differenceIn${camelDate}s`](end, start);
      if (time) {
        result.push(
          `${i === parts.length - 1 ? "and " : ""}${time} ${dateAbbr}${
            time === 1 ? "" : "s"
          }`
        );
        if (i < parts.length) end = dateFns[`sub${camelDate}s`](end, time);
      }
    });
    return result.join(" "); */
  };
};

export default FutureTimeCalc;
