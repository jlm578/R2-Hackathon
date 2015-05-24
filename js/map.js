// JavaScript Document
//<script> 
    
        var width = 960,
            height = 600;
    
        var svg = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height);
        
        var path = d3.geo.path();
    
        
        var color = d3.scale.quantize()
           .range(["rgb(230,97,1)","rgb(253,184,99)","rgb(247,247,247)","rgb(178,171,210)","rgb(94,60,153)"]);  
         
    	var stateContent = function(stateInfo){
			console.log(stateInfo);
			d3.select(".contentBox").html("<h1>"+ stateInfo.name + "</h1>");
			//d3.select(".contentBox .stateLaws").text("askdaskdjaks");
		};
		
    
        d3.csv("data/ChildrenNotAttendingPreschool.csv", function(data) {
            //console.log(data);
            /*color.domain([
                    d3.min(data, function(d) { return +d.PercentChange0512; }),
                    d3.max(data, function(d) { return +d.PercentChange0512; })
            ]);*/
    
    
            d3.json("data/us-states.json", function(json) {
                //console.log(json);
    
                //Merge the ag. data and GeoJSON
                //Loop through once for each ag. data value
                for (var i = 0; i < data.length; i++) {
    
                    //Grab state name
                    var dataState = data[i].name;
                    //console.log(dataState);
    
                    //Grab data value, and convert from string to float
                    var dataValue = parseFloat(data[i].PercentChange0512);
                    //console.log(dataValue);
    
                    //Find the corresponding state inside the GeoJSON
                    for (var j = 0; j < json.features.length; j++) {
                        //console.log(json.features)
    
                        var jsonState = json.features[j].properties.name;
                        //console.log(json.features[j].properties);
    
                        if (dataState == jsonState) {
                            //console.log("match")
    
                            //Copy the data value into the JSON
                            json.features[j].properties.value = dataValue;
    
                            //Stop looking through the JSON
                            break;
    
                        }
    
                    }
                }
    
                for (var i = 0; i < data.length; i++) {
                svg.selectAll("path")
                   .data(json.features)
                   .enter()
                   .append("path")
                   .attr("d", path)
                   .on("mouseover", function() {
                       d3.select(this).classed("hover",true)
                   })
                   .on("mouseout", function() {
                       d3.select(this).classed("hover",false)
                   })
                   .on("click", function(){
                       console.log(d3.select(this).data());
                       
                        var clickedState = d3.select(this).data()[0].properties;
                        console.log(clickedState);
						
						stateContent(clickedState);
						
                       
                   })
                   .style("fill", function(d) {
                        //Get data value
                        var value = d.properties.value;
    
                        if ((value > 0) && (value < 5)) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#fdb863";
                        } if ((value < 0) && (value > -5)) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#e66101";
                        } if ((value < -6) && (value > -10)) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#b2abd2";
                        } if (value < -11) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#333333";
                        } if (value = 0) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#ffffff";
                        }
                        else {
                                //If value is undefined…
                                return "#f0f0f0";
                        }
                   });
               }
            })
        })   
    
            
    
    
        //</script>