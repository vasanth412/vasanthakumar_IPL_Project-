function totalMatches(matches) {
  matchesCount = matches
    .map((match) => match.season)
    .reduce((season, currentSeason) => {
      if (season[currentSeason]) {
        season[currentSeason] += 1;
      } else {
        season[currentSeason] = 1;
      }
      return season;
    }, {});

  return matchesCount;
}

// function teamPerSeason(matches) {
//   const team = {};

//   matches.forEach((match) => {
//     const currentSeason = match.season;
//     const teamOne = match.team1;
//     const teamTwo = match.team2;

//     if (team[currentSeason] === undefined) {
//       team[currentSeason] = {};
//     } else {
//       if (team[currentSeason][teamTwo] === undefined) {
//         team[currentSeason][teamTwo] = 1;
//       } else {
//         team[currentSeason][teamTwo] += 1;
//       }
//       if (team[currentSeason][teamOne] === undefined) {
//         team[currentSeason][teamOne] = 1;
//       } else {
//         team[currentSeason][teamOne] += 1;
//       }
//     }
//   });

//   return team;
// }

function matchesWonPerYear(matches) {
  const winningTeam = {};

  matches.forEach((match) => {
    const currentSeason = match.season;
    const currentWinner = match.winner;

    if (currentWinner != '') {
      if (winningTeam[currentSeason] === undefined) {
        winningTeam[currentSeason] = {};
        winningTeam[currentSeason][currentWinner] = 1;
      } else if (winningTeam[currentSeason][currentWinner] === undefined) {
        winningTeam[currentSeason][currentWinner] = 1;
      } else {
        winningTeam[currentSeason][currentWinner] += 1;
      }
    }
  });

  return winningTeam;
}

function extraRuns2016(matches, deliveries) {
  const matchID = matches
    .filter((match) => match.season === '2016')
    .map((match) => match.id);

  const extraRun = deliveries
    .filter((delivery) => matchID.includes(delivery.match_id))
    .reduce((delivery, currentDelivery) => {
      const extras = Number(currentDelivery.extra_runs);
      const bowlingTeam = currentDelivery.bowling_team;

      if (delivery[bowlingTeam]) {
        delivery[bowlingTeam] += extras;
      } else {
        delivery[bowlingTeam] = extras;
      }
      return delivery;
    }, {});

  return extraRun;
}

function totalOver(bowler, deliveries, matchID) {
  let overs = 1;
  let checkOver = 0;
  let flag = true;

  let overIterate = deliveries
    .filter((delivery) => matchID.includes(delivery.match_id))
    .filter((delivery) => delivery.bowler === bowler);

  overIterate.forEach((delivery) => {
    const currentOver = delivery.over;
    const currentBowler = delivery.bowler;

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
  });
  return overs;
}

function economicalBowlers2015(matches, deliveries) {
  const matchID = matches
    .filter((match) => match.season === '2015')
    .map((match) => match.id);

  const bowlers = deliveries
    .filter((delivery) => matchID.includes(delivery.match_id))
    .reduce((delivery, currentDelivery) => {
      const currentBowler = currentDelivery.bowler;
      const totalRun = Number(currentDelivery.total_runs);

      if (delivery[currentBowler]) {
        delivery[currentBowler] += totalRun;
      } else {
        delivery[currentBowler] = totalRun;
      }

      return delivery;
    }, {});

  const economy = {};

  for (const key of Object.keys(bowlers)) {
    const overs = totalOver(key, deliveries, matchID);
    const rate = Math.round((bowlers[key] / overs) * 100) / 100;
    economy[key] = rate;
  }

  const topEconomy = Object.entries(economy)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10);

  return topEconomy;
}

module.exports = {
  totalMatches,
  matchesWonPerYear,
  extraRuns2016,
  economicalBowlers2015,
  //teamPerSeason,
};
