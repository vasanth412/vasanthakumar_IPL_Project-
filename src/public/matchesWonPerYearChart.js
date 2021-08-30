function getPlotData(data) {
  return data.map((team) => ({
    name: team[0],
    y: team[1],
  }));
}

export function matchesWonPerYear(data) {
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
      align: 'center',
    },
    legend: {
      enabled: true,
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
