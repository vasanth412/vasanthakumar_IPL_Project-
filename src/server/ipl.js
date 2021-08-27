function totalMatches(matches) {
  const matchesCount = {};
  matches.forEach((element) => {
    const currentSeason = element.season;
    if (matchesCount[currentSeason] === undefined) {
      matchesCount[currentSeason] = 1;
    } else {
      matchesCount[currentSeason] += 1;
    }
  });
  return matchesCount;
}

function teamPerSeason(matches) {
  const team = {};

  matches.forEach((match) => {
    const currentSeason = match.season;
    const teamOne = match.team1;
    const teamTwo = match.team2;

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
  });

  return team;
}

function matchesWonPerYear(matches) {
  const winningTeam = {};

  matches.forEach((match) => {
    const currentSeason = match.season;
    const currentWinner = match.winner;

    if (winningTeam[currentSeason] === undefined) {
      winningTeam[currentSeason] = {};
      winningTeam[currentSeason][currentWinner] = 1;
    } else if (winningTeam[currentSeason][currentWinner] === undefined) {
      winningTeam[currentSeason][currentWinner] = 1;
    } else {
      winningTeam[currentSeason][currentWinner] += 1;
    }
  });
  return winningTeam;
}

function extraRuns2016(matches, deliveries) {
  const extraRun = {};
  const matchID = [];

  const match2016 = matches.filter((match) => match.season === '2016');

  match2016.forEach((match) => {
    matchID.push(match.id);
  });
  deliveries.forEach((delivery) => {
    const bowlingTeam = delivery.bowling_team;
    const deliveryID = delivery.match_id;

    if (matchID.includes(deliveryID)) {
      const extras = Number(delivery.extra_runs);

      if (extraRun[bowlingTeam] === undefined) {
        extraRun[bowlingTeam] = extras;
      } else {
        extraRun[bowlingTeam] += extras;
      }
    }
  });
  return extraRun;
}

function totalOver(bowler, deliveries, matchID) {
  let overs = 1;
  let checkOver = 0;
  let flag = true;

  deliveries.forEach((delivery) => {
    const id = delivery.match_id;
    const currentOver = delivery.over;
    const currentBowler = delivery.bowler;

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
  });
  return overs;
}

function economicalBowlers2015(matches, deliveries) {
  const bowlers = {};
  const matchID = [];

  matches.forEach((match) => {
    const currentSeason = match.season;
    const currentID = match.id;

    if (currentSeason === '2015') {
      matchID.push(currentID);
    }
  });

  deliveries.forEach((delivery) => {
    const currentBowler = delivery.bowler;
    const totalRun = Number(delivery.total_runs);
    const id = delivery.match_id;

    if (matchID.includes(id)) {
      if (bowlers[currentBowler] === undefined) {
        bowlers[currentBowler] = totalRun;
      } else {
        bowlers[currentBowler] += totalRun;
      }
    }
  });

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
