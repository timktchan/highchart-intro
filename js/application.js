$(document).ready(function(){
// Get Data
// Class
  var Charts = function(){
    // equals to var graphData = [], but it doesnt leverage OPP
    this.graphData = [];
  };
  Charts.prototype.makeAjaxRequest = function (){
    $.ajax({
      context: this,
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?auth_token=E6kNzExHjay2DNP8pKvB',
      success: function (response){
// Data Wrangling
        var items = response.data;
        var item;
        for (var i=0; i<items.length; i++){
          item = items[i];
          this.graphData.push({
            //transform string into date
            x: new Date(item[0]),
            y: item[1]  
          }); 
        }
        console.log(this.graphData);
        this.graph();
      }
    });
  };
  Charts.prototype.graph = function(){
    var highchartConfig = {
      title: {
        text: 'Average retail gas price'
      },
      subtitle: {
        text: 'Bureau of Transportation Statistics(Multimodal)'
      },
      xAxis: {
        type: 'datetime'
      },
      //series is array
      series: [
        {  name: 'US',
           data: this.graphData.reverse()
        }
      ]
    };
    $('#chart').highcharts(highchartConfig);
  }
// Instance
  var chart = new Charts();
  chart.makeAjaxRequest();



});