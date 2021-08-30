function matchesPerYear(datas) {
  const season = [];
  const matchCount = [];
  for (const data in datas) {
    season.push(data);
    matchCount.push(datas[data]);
  }
  Highcharts.chart('matchesPerYear', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Matches per year',
    },
    xAxis: {
      type: 'categories',
      title: {
        text: 'IPL years',
      },
      categories: season,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Matches count',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
      pointFormat: `<tr><td style="color:{series.color};padding:0">{point.key}</td>
        <td style="padding:0"><b>{point.y}</b></td></tr>`,
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Matches 2008-2017',
        data: matchCount,
      },
    ],
  });
}

function getPlotData(data) {
  return data.map((team) => ({
    name: team[0],
    y: team[1],
  }));
}

function matchesWonPerYear(data) {
  const years = Object.keys(data);
  const chartData = {};
  const currentYear = '2008';

  for (const year of years) {
    const matches = data[year];
    const teamsWins = Object.keys(matches).map((team) => [team, matches[team]]);
  
    chartData[year] = [...teamsWins];
  }
  const chart = Highcharts.chart('matchesWonPerYear', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'IPL matches won by teams per year',
      align: 'left',
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size: 12px">{point.point.name}</span><br/><br/>',
      pointFormat: '{series.name}: <b>{point.y} wins</b><br/>',
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'IPL Teams',
      },
      categories: Object.keys(data[currentYear]),
    },
    yAxis: [
      {
        title: {
          text: 'Matches Won',
        },
        showFirstLabel: false,
      },
    ],
    series: [
      {
        name: currentYear,
        data: getPlotData(chartData[currentYear]).slice(),
      },
    ],
  });

  const yearSelect = document.getElementById('iplyear');
  const options = years.map(
    (year) => `<option value="${year}">${year}</option>`
  );
  yearSelect.innerHTML = options.join('');

  yearSelect.addEventListener('input', (event) => {
    const year = event.target.value;

    chart.update(
      {
        xAxis: {
          categories: Object.keys(data[year]),
        },
        series: [
          {
            name: year,
            data: getPlotData(chartData[year]).slice(),
          },
        ],
      },
      true,
      false,
      {
        duration: 800,
      }
    );
  });
}

function extraRuns2016(datas) {
  const teams = [];
  const extraRuns = [];
  for (const data in datas) {
    teams.push(data);
    extraRuns.push(datas[data]);
  }
  Highcharts.chart('extraRuns2016', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Extra runs',
    },
    xAxis: {
      type: 'categories',
      title: {
        text: 'IPL 2016 teams',
      },
      categories: teams,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Extra runs',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
      pointFormat: `<tr><td style="color:{series.color};padding:0">{point.key}</td>
        <td style="padding:0"><b>{point.y}</b></td></tr>`,
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'extra runs 2016',
        data: extraRuns,
      },
    ],
  });
}

function economicalBowlers2015(datas) {
  const bowlers = [];
  const economicRate = [];
  for (let index = 0; index < datas.length; index += 1) {
    bowlers.push(datas[index][0]);
    economicRate.push(datas[index][1]);
  }
  Highcharts.chart('economicalBowlers', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Economical bowlers 2015',
    },
    xAxis: {
      type: 'categories',
      title: {
        text: 'Bowlers name',
      },
      categories: bowlers,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'economical rate',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
      pointFormat: `<tr><td style="color:{series.color};padding:0">{point.key}</td>
        <td style="padding:0"><b>{point.y}</b></td></tr>`,
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'extra runs 2016',
        data: economicRate,
      },
    ],
  });
}

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
