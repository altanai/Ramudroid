
    google.load("visualization", "1", {packages: ["bar","corechart",'table',"geochart"]});

    google.setOnLoadCallback(function() {
        drawChart('barChart', 'barchartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('lineChart', 'linechartDiv', arrData, null);
    });

    google.setOnLoadCallback(function() {
       drawChart('geoChart', 'geochartDiv', arrData, null);
    });



function drawChart(chartType, containerID, arrayVals, options) {
            
    var containerDiv = document.getElementById(containerID);
    var chart = false;

    if (chartType.toUpperCase() == 'BARCHART') {

        /*
        var dataArray = arrayVals.map(function(item){
            return item.splice(10,1);
        });*/


        for(x=1 ;x< arrayVals[x].length ; x++){
            //console.log("before ",arrayVals[x][4]);
            arrayVals[x][4]=arrayVals[x][4]/1000;
            //console.log("after",arrayVals[x][4]);
        }
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
         //console.log(data);

         var view = new google.visualization.DataView(data);
         view.setColumns([0,1]);

         var options = {
            title: "Latitude Longitude Distance",
            hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
            vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
            legend: 'none',
            backgroundColor: 'black',
            chartArea: {
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

    else if (chartType.toUpperCase() == 'PIECHART') {
        chart = new google.visualization.PieChart(containerDiv);
    }
    
    else if (chartType.toUpperCase() == 'GEOCHART'){

        var dataArray=[];

        dataArray = arrayVals.map(function(item){
            // the 0,2 tells the splice function to remove (skip) the last item in this array
            return item.splice(0,2);
        });
        
        dataArray[0]=['City',   'Latitude' , 'Longitude'];
        for ( x in dataArray ){
          dataArray[x][1]=dataArray[x][0];
          dataArray[x][2]=dataArray[x][1];
          dataArray[x][0]="Bangalore";
        }

        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
            region: 'IT',
            displayMode: 'markers',
            colorAxis: {colors: ['green', 'blue']},
            crosshair: {
                  orientation: 'vertical'
            },
            animation: {
                  startup: true,
                  duration: 5000
            },
        };

        chart = new google.visualization.GeoChart(containerDiv);
        chart.draw(data, options);

        //chart = new google.visualization.Table(containerDiv);
    }

    if (chart == false) {
        return false;
    }

   chart.draw(data, options);
}

