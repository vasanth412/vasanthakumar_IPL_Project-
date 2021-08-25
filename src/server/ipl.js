function totalMatches(matches) {
  const matchesCount = {};

  for (let index = 0; index < matches.length; index += 1) {
    const seasons = matches[index].season;

    if (matchesCount[seasons] === undefined) {
      matchesCount[seasons] = 1;
    } else {
      matchesCount[seasons] += 1;
    }
  }
  return matchesCount;
}

function teamPerSeason(matches) {
  const team = {};

  for (let index = 0; index < matches.length; index += 1) {
    const currentSeason = matches[index].season;
    const teamOne = matches[index].team1;
    const teamTwo = matches[index].team2;

    if (team[currentSeason] === undefined) {
      team[currentSeason] = {};
    } else {
      if (team[currentSeason][teamTwo] === undefined) {
        team[currentSeason][teamTwo] = 1;
      } else {
        team[currentSeason][teamTwo] += 1;
      }
      if (team[currentSeason][teamOne] === undefined) {
        team[currentSeason][teamOne] = 1;
      } else {
        team[currentSeason][teamOne] += 1;
      }
    }
  }

  return team;
}

function matchesWonPerYear(matches) {
  const winningTeam = {};

  for (let index = 0; index < matches.length; index += 1) {
    const currentSeason = matches[index].season;
    const currentWinner = matches[index].winner;

    if (winningTeam[currentSeason] === undefined) {
      winningTeam[currentSeason] = {};
      winningTeam[currentSeason][currentWinner] = 1;
    } else if (winningTeam[currentSeason][currentWinner] === undefined) {
      winningTeam[currentSeason][currentWinner] = 1;
    } else {
      winningTeam[currentSeason][currentWinner] += 1;
    }
  }
  return winningTeam;
}

function extraRuns2016(matches, length, deliveries) {
  const extraRun = {};

  for (let index1 = 0; index1 < matches.length; index1 += 1) {
    const currentSeason = matches[index1].season;

    if (currentSeason === '2016') {
      const matchID = matches[index1].id;

      for (let index = 0; index < length; index += 1) {
        const bowlingTeam = deliveries[index].bowling_team;
        const deliveryID = deliveries[index].match_id;

        if (deliveryID === matchID) {
          const extras = Number(deliveries[index].extra_runs);

          if (extraRun[bowlingTeam] === undefined) {
            extraRun[bowlingTeam] = extras;
          } else {
            extraRun[bowlingTeam] += extras;
          }
        }
      }
    }
  }
  return extraRun;
}

function totalOver(bowler, deliveries, matchID) {
  let overs = 1;
  let checkOver = 0;
  let flag = true;

  for (let index = 0; index < deliveries.length; index += 1) {
    const id = deliveries[index].match_id;
    const currentOver = deliveries[index].over;
    const currentBowler = deliveries[index].bowler;

    if (matchID.includes(id)) {
      if (currentBowler === bowler) {
        if (flag) {
          flag = false;
          checkOver = currentOver;
        }

        if (checkOver !== currentOver) {
          overs += 1;
          flag = true;
        }
      }
    }
  }
  return overs;
}

function economicalBowlers2015(matches, deliveries, length) {
  const bowlers = {};
  const matchID = [];

  for (let index = 0; index < matches.length; index += 1) {
    const currentSeason = matches[index].season;
    const currentID = matches[index].id;

    if (currentSeason === '2015') {
      matchID.push(currentID);
    }
  }

  for (let index = 0; index < length; index += 1) {
    const currentBowler = deliveries[index].bowler;
    const totalRun = Number(deliveries[index].total_runs);
    const id = deliveries[index].match_id;

    if (matchID.includes(id)) {
      if (bowlers[currentBowler] === undefined) {
        bowlers[currentBowler] = totalRun;
      } else {
        bowlers[currentBowler] += totalRun;
      }
    }
  }

  const economy = {};

  for (const key of Object.keys(bowlers)) {
    const overs = totalOver(key, deliveries, matchID);
    const rate = Math.round((bowlers[key] / overs) * 100) / 100;
    economy[key] = rate;
  }

  const sorted = Object.entries(economy).sort((a, b) => a[1] - b[1]);
  const topEconomy = [];

  for (let index = 0; index < 10; index += 1) {
    topEconomy.push(sorted[index]);
  }

  return topEconomy;
}

module.exports = {
  totalMatches,
  matchesWonPerYear,
  extraRuns2016,
  economicalBowlers2015,
  teamPerSeason,
};
