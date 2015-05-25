// JavaScript Document
$(function () {
    Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Arial'
            }
           }
        });
    
    $('#nationalLandscape').highcharts({
        title: {
            text: 'Percent of Children Ages 3 to 4 Not Attending Preschool',
            x: -20 //center
        },
        subtitle: {
            text: '2005 to 2012',
            x: -20
        },
        xAxis: {
            categories: ['2005-2007', '2006-2008', '2007-2009', '2008-2010', '2009-2011', '2010-2012']
        },
   
        yAxis: {
            
            title: {
                text: 'Percentage (%)'
            },
            min: 0,
            plotLines: [{
                value: 0,
                width: 1,
				color: '#E86421'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
         legend: {
            enabled: false
        },
		credits: {
			enabled: false
		},
        series: 
            [{
             name: 'USA',
            color:'#E86421',
            data: [56, 54, 53, 53, 54, 54]
        }]
    });
});