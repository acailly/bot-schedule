const chalk = require("chalk");
const jsonfile = require("jsonfile");
const later = require("later");
const path = require("path");

const startJobs = vorpal => {
  const { jobs } = vorpal.config.schedule;

  jobs.forEach(jobProps => {
    startJob(jobProps, vorpal);
  });
};

const startJob = ({ command, pattern }, vorpal) => {
  const isStartPattern = pattern === "startup";
  const isPatternText = later.parse.text(pattern).error === -1;

  let sched;
  let humanSched;
  if (isStartPattern) {
    humanSched = "at startup";
  } else if (isPatternText) {
    sched = later.parse.text(pattern);
    humanSched = pattern;
  } else {
    sched = later.parse.cron(pattern);
    humanSched = `on '${pattern}'`;
  }

  const jobFunction = () => {
    vorpal
      .exec(command)
      .then(res => {
        if (res) vorpal.log(res);
      })
      .catch(error => {
        if (error) console.log("error", error);
      });
  };

  vorpal.log(
    chalk.yellow(`[SCHEDULED] Executing command '${command}' ${humanSched}`)
  );

  if (isStartPattern) {
    jobFunction();
  } else {
    later.setInterval(jobFunction, sched);
  }
};

module.exports = function(vorpal) {
  later.date.localTime();
  startJobs(vorpal);
};
