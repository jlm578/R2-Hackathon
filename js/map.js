// JavaScript Document
    
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
			//d3.select(".contentBox").html("<h1>"+ stateInfo.name + "</h1> <br/><p>" + stateInfo.desc + "</p>");
			d3.select(".contentBox .stateName").text(stateInfo.name);
			d3.select(".contentBox .statePercent").text(stateInfo.value);
			d3.select(".contentBox .stateLaws").text("This is the state law information");
			d3.select(".contentBox .stateConcerns").text("This is the state concerns info");
			d3.select(".contentBox .notAttendPSNum").text(stateInfo.notAttendNum);
			d3.select(".contentBox .notAttendPSPerc").text(stateInfo.notAttendPerc);
			d3.select(".contentBox .totalChildPop").text(stateInfo.totalPop);
		};
		
    
        d3.csv("data/ChildrenNotAttendingPreschool.csv", function(data) {
            //console.log(data);
            color.domain([
                    d3.min(data, function(d) { return +d.PercentChange0512; }),
                    d3.max(data, function(d) { return +d.PercentChange0512; })
            ]);
    
    
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
					
					//Grab data description
					//var dataDescription = parseFloat(data[i].StateDescription);
					var dataDescription = data[i].stateDesc;
					//console.log(dataDescription);
					
					//Get Child Population Information
					var childNotAttendNum = data[i].childPop2010NotAttendPS;
					var childNotAttendPerc = data[i].percentChildPop2010NotAttendPS;
					var childPopTotal = data[i].totalChildPop2010;
					
                    //Find the corresponding state inside the GeoJSON
                    for (var j = 0; j < json.features.length; j++) {
                        //console.log(json.features)
    
                        var jsonState = json.features[j].properties.name;
                        //console.log(json.features[j].properties);
    
                        if (dataState == jsonState) {
                            //console.log("match")
    
                            //Copy the data value into the JSON
                            json.features[j].properties.value = dataValue;
    						json.features[j].properties.desc = dataDescription;
							
							//Add child pop data to json
							json.features[j].properties.notAttendNum = childNotAttendNum;
							json.features[j].properties.notAttendPerc = childNotAttendPerc;
							json.features[j].properties.totalPop = childPopTotal;
							
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
    
                        if ((value > 0) && (value <= 5)) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#998ec3";
                        } if ((value < 0) && (value >= -5)) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#fee0b6";
                        } if ((value <= -6) && (value >= -10)) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#f1a340";
                        } if (value <= -11) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#b35806";
                        } if (value == 0) {
                            console.log(value)
                                //If value exists…
                                //return color(value);
                                return "#ffffff";
                        }
                        else {
                                //If value is undefined…
                                return "#333333";
                        }
                   });
               }
            })
        })   
    
            
    
    
        