const { match } = require('assert');
const csv = require('csv-parser');
const fs = require('fs');
var myFunction = require("../server/ipl.js");

let matches = [];
let deliveries = [];

fs.createReadStream('src/data/matches.csv').pipe(csv({}))
.on('data', (data) => matches.push(data))
.on('end',()=> {
fs.createReadStream('src/data/deliveries.csv').pipe(csv({}))
.on('data', (data) => deliveries.push(data))
.on('end',()=> {

let length = deliveries.length;
let matchesPerYear = JSON.stringify(myFunction.totalMatches(matches));
let matchesWonPerYear = JSON.stringify(myFunction.matchesWonPerYear(matches));
let extraRunsPerTeam2016 = JSON.stringify(myFunction.extraRuns2016(matches, length, deliveries));
let economicalBowlers2015 = JSON.stringify(myFunction.economicalBowlers2015(matches, deliveries, length));

fs.writeFileSync("./src/public/output/matchesPerYear.json", matchesPerYear);
fs.writeFileSync("./src/public/output/matchesWonPerYear.json", matchesWonPerYear);
fs.writeFileSync("./src/public/output/extraRunsPerTeam2016.json", extraRunsPerTeam2016);
fs.writeFileSync("./src/public/output/economicalBowlers2015.json", economicalBowlers2015);

}
)});