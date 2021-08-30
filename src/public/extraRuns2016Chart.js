export function extraRuns2016(datas) {
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