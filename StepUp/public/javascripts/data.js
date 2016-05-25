 $(document).ready(function () {
      
     $('#container1').highcharts({
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: '3D chart with null values'
        },
        subtitle: {
            text: 'Notice the difference between a 0 value and a null point'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: Highcharts.getOptions().lang.shortMonths
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'Sales',
            data: [2, 3, null, 4, 0, 5, 1, 4, 6, 3]
        }]
    });          
     
     
     
     
    // Build the chart
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null ,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'עוגת זמנים בזמן המבחן'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Visual Studio',
                y: 56.33
            }, {
                name: 'Word',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Notepad++',
                y: 10.38
            }, {
                name: 'Eclipse',
                y: 4.77
            }, {
                name: 'תיקיות',
                y: 0.93
            },]
        }]
    });
     
     
     
});