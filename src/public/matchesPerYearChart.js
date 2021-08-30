export function matchesPerYear(datas) {
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