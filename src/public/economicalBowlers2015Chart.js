export function economicalBowlers2015(datas) {
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