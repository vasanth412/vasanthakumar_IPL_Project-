const csv = require('csv-parser');
const fs = require('fs');
const myFunction = require('./ipl');

const matches = [];
const deliveries = [];

fs.createReadStream('src/data/matches.csv')
  .pipe(csv({}))
  .on('data', (data) => matches.push(data))
  .on('end', () => {
    fs.createReadStream('src/data/deliveries.csv')
      .pipe(csv({}))
      .on('data', (data) => deliveries.push(data))
      .on('end', () => {
        const DeliveryLength = deliveries.length;

        const matchesPerYear = JSON.stringify(myFunction.totalMatches(matches));
        const matchesWonPerYear = JSON.stringify(
          myFunction.matchesWonPerYear(matches),
        );
        const extraRunsPerTeam2016 = JSON.stringify(
          myFunction.extraRuns2016(matches, deliveries),
        );
        const economicalBowlers2015 = JSON.stringify(
          myFunction.economicalBowlers2015(matches, deliveries, DeliveryLength),
        );

        fs.writeFileSync(
          './src/public/output/matchesPerYear.json',
          matchesPerYear,
        );
        fs.writeFileSync(
          './src/public/output/matchesWonPerYear.json',
          matchesWonPerYear,
        );
        fs.writeFileSync(
          './src/public/output/extraRunsPerTeam2016.json',
          extraRunsPerTeam2016,
        );
        fs.writeFileSync(
          './src/public/output/economicalBowlers2015.json',
          economicalBowlers2015,
        );
      });
  });
