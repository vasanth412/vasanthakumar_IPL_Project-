import { matchesPerYear } from './matchesPerYearChart.js';
import { matchesWonPerYear } from './matchesWonPerYearChart.js';
import { extraRuns2016 } from './extraRuns2016Chart.js';
import { economicalBowlers2015 } from './economicalBowlers2015Chart.js';

function plotMatchesPerYear(data) {
  matchesPerYear(data);
}

function plotMatchesWonPerYear(data) {
  matchesWonPerYear(data);
}

function plotExtraRuns2016(data) {
  extraRuns2016(data);
}

function plotEconomicalBowlers2015(data) {
  economicalBowlers2015(data);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/output/matchesPerYear.json')
    .then((Response) => Response.json())
    .then(plotMatchesPerYear);

  fetch('http://localhost:8080/output/matchesWonPerYear.json')
    .then((Response) => Response.json())
    .then(plotMatchesWonPerYear);

  fetch('http://localhost:8080/output/extraRunsPerTeam2016.json')
    .then((Response) => Response.json())
    .then(plotExtraRuns2016);

  fetch('http://localhost:8080/output/economicalBowlers2015.json')
    .then((Response) => Response.json())
    .then(plotEconomicalBowlers2015);
});
