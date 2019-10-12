
    google.load("visualization", "1", {packages: ["bar","corechart",'table',"geochart"]});

    google.setOnLoadCallback(function() {
        drawChart('barChart', 'barchartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('lineChart', 'linechartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('bubbleChart', 'bubblechartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('areaChart', 'areachartDiv', arrData, null);
    });



function drawChart(chartType, containerID, arrayVals, options) {
            
    var containerDiv = document.getElementById(containerID);
    var chart = false;

    if (chartType.toUpperCase() == 'BARCHART') {

        var data = google.visualization.arrayToDataTable(arrayVals);

        var options = {
            chart: {
                title: "barchart for Lat Long",
                subtitle: "maps the movemenet by bot",
            },
            backgroundColor: {
                fill: '#000000'
            },
            legend: {
                position: 'none'
            },
            bars: 'horizontal' // Required for Material Bar Charts.
        };

        chart = new google.charts.Bar(document.getElementById('barchartDiv'));
        //chart.draw(data, options);
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

    else if (chartType.toUpperCase() == 'LINECHART') {

        var data = new google.visualization.arrayToDataTable(arrayVals);
        var view = new google.visualization.DataView(data);
        view.setColumns([0,1]);

        var options = {
            title: "Humidity",
            hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
            vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
            legend: 'none',
            backgroundColor: 'black',
            chartArea: {
                        color:"white",
                        backgroundColor: 'black'
                    },
            crosshair: {
                  orientation: 'vertical'
            },
            animation: {
                  startup: true,
                  duration: 5000
            },
         };
         
        chart = new google.visualization.LineChart(containerDiv);
        chart.draw(view, options);
    }

    else if (chartType.toUpperCase() == 'BUBBLECHART') {

        for( var x=1 ;x<arrayVals.length;x++ ){
            arrayVals[x][2]=String(arrayVals[x][2]);
        }

        var data = new google.visualization.arrayToDataTable(arrayVals);
        var view = new google.visualization.DataView(data);
        view.setColumns([2,3,4]);
        
        //view[0]=["Sat","Prec","Chars"];
        //console.log(view);
        var options = {
            backgroundColor: 'black',
            chartArea: {
                        color:"white",
                        backgroundColor: 'black'
            },
            title: "Temperature",
            colorAxis: {colors: ['yellow', 'red']}
        };

        var chart = new google.visualization.BubbleChart(containerDiv);
        chart.draw(view, options);
    }
    else if (chartType.toUpperCase() == 'PIECHART') {
       chart = new google.visualization.PieChart(containerDiv);
    }
    else if (chartType.toUpperCase() == 'AREACHART') {

        var data = new google.visualization.arrayToDataTable(arrayVals);
        var view = new google.visualization.DataView(data);
        view.setColumns([4 ,5]);

        var options = {
            backgroundColor: 'black',
            chartArea: {
                        color:"white",
                        backgroundColor: 'black'
            },
            title: 'Heat',
            hAxis: {title: 'Heat',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(containerDiv);
        chart.draw(view, options);
    }

    if (chart == false) {
        return false;
    }


}

