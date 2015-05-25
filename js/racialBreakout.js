// JavaScript Document
$(function () {
    $('#racialBreakout').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            //text: 'Children not attending pre-school (2010-2012)'
			text: ''
        },
		subtitle:{
			text: 'National Average: 54% in 2010-2012'
		},
        xAxis: {
            categories: ['African American', 'American Indian', 'Asian and Pacific Islander', 'Hispanic', 'Non-Hispanic White', 'Two or More Races']
        },
		yAxis:{
			title: {
				text: ''
			}
		},
		 tooltip: {
            valueSuffix: '%'
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Percent difference from National Average',
            data: [-3,	5,	-6,	9,	-3,	-1],
			color: '#333333'
        }, ]
    });
});