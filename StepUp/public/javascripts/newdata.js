 $(document).ready(function () {
     $.ajax({ 
        type: 'GET', 
        url: '/getWorkTime', 
        success: function (work) { 
        var json = JSON.stringify(eval("(" + work + ")"));
            
            
           myData =  JSON.parse(json);
            // Build the chart
                $('.firstCake').highcharts({
                    chart: {
                        plotBackgroundColor: null ,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'התפלגות תהליכים בזמן המבחן'
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
                        data: myData[1].processesSum
                    }]
                });
            
            
            var delta = 3000;
            var keys = myData[3].keystats;
            var keyCategories = [];
            var dataF10 = [];
            var dataF5 = [];
            var sumf10;
            var sumf5;
            var prev;
            
            var index = 0;
            while (index < keys.length) {
                var b = new Date(keys[index].Time);
                keyCategories.push(b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds());
                prev = keys[index];
                sumf10 = 0;
                sumf5 = 0;
                while ((index < keys.length) && (Date.parse(keys[index].Time) - Date.parse(prev.Time) < delta)) {
                    if (keys[index].Key == "F10") {
                        sumf10++;
                    } else {
                        sumf5++;
                    }
 
                    index++;
                }
                
                dataF10.push(sumf10);
                dataF5.push(sumf5);
            }
            
            
            $('.keyStats').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'ניתוח שימוש במקשי דיבאג'
                },
                subtitle: {
                    text: 'תר"ץ 1'
                },
                xAxis: {
                    categories: keyCategories
                },
                yAxis: {
                    title: {
                        text: 'מספר לחיצות'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'F10',
                    data: dataF10
                }, {
                    name: 'F5',
                    data: dataF5
                }]
            });
            
            
            
            var table = "<table class='table'>" +
                        "<thead><tr>" +
                        "<th>File</th>" +
                        "<th>Proccess</th>" +
                        "<th>Time</th>" +
                        "</tr></thead><tbody>";
            
            myData[0].maavarim.forEach(function(entry) {
                table += "<tr><td>" + entry.file + "</td>" +
                        "<td>" + entry.process + "</td>" +
                        "<td>" + entry.time + "</td></tr>"
            });
            
            table += "</tbody></table>";
            
            $(".proccessSwitch").html(table);  
            
            
            var colors = Highcharts.getOptions().colors,
                categories = myData[2].categories,
                data = myData[2].data,
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


            // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('.fullCake').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'התפלגות החלונות הפעילים'
        },
        subtitle: {
            text: 'תר"ץ 1'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Browsers',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: 'Versions',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }]
    });
        }
    });          
 });