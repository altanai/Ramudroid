// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

// this has to be a global function
function drawChart() {
   // grab the CSV
   $.get("geoipcity.csv", function(csvString) {
      // transform the CSV string into a 2-dimensional array
      var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

      // this new DataTable object holds all the data
      var data = new google.visualization.arrayToDataTable(arrayData);

      // this view can select a subset of the data at a time
      var view = new google.visualization.DataView(data);
      view.setColumns([0,1]);

     // set chart options
     var options = {
        title: "Geo IP city Chart",
        hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max},
        vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max},
        legend: 'none'
     };

     // create the chart object and draw it
     var chart = new google.visualization.ScatterChart(document.getElementById('chart'));
     chart.draw(view, options);
  });
}
