import Highcharts from 'highcharts/highstock';
import moment from 'moment';

import csv from './csv';

let csvData = csv.split('\n').map(row => row.split(';'));
let headers = csvData.splice(0, 1)[0];

const series = headers.map((item, index) => {
    return {
        name: item,
        data: csvData.map(row => [
            +(moment(`2020-02-14 ${row[0]}`, 'YYYY-MM-DD HH:mm:ss').unix() + '000'),
            +(row[index].replace(',', '.'))
        ]).splice(0, 2880),
        type: 'spline',
        tooltip: {
            valueDecimals: 2
        },
    }
}).filter(item => item.name === 'Qliq' 
                    || item.name == 'Tliq'
                    || item.name == 'Pin');

const legend = {
    enabled: true,
};

const xAxis = {
    zoomEnabled: true
};

const yAxis = {
    min: 0,
};

const chart = {
    zoomType: 'x',
};

Highcharts.stockChart('container', {
    legend,
    rangeSelector: {
        selected: 1
    },
    chart,
    title: {
        text: 'AAPL Stock Price'
    },
    series,
    xAxis,
    yAxis,
});

