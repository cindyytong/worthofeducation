import schools from './data/schools';
import states from './data/us';


 //Width and height of map
 var width = 1300;
 var height = 800;
 
 // create svg
 var svg = d3.select( "#map" )
     .append( "svg" )
     .attr( "width", width )
     .attr( "height", height )

 
 // Append empty placeholder g element to the SVG
 // g will contain geometry elements
 var g = svg.append( "g" );
 
 // D3 Projection
 var albersProjection= d3.geoAlbers()
     .scale( 1300 )
     .rotate( [90,0] )
    //  .center( [0, 42.313] )
     .translate( [width/2,height/2] );
 
         
 // Create GeoPath function that uses built-in D3 functionality to turn
 // lat/lon coordinates into screen coordinates
 var geoPath = d3.geoPath()
     .projection( albersProjection );
  
 // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes

   g.selectAll( "path" )
       .data( states.features ) 
       .enter()
       .append( "path" )
       .attr( "fill", "#1E1E2F" )
       .attr( "stroke", "#EDECF4")
       .attr( "d", geoPath );

 
 
   // Map schools

//    schools.features.forEach(school => {
//        console.log(school.lon, school.lat)
//    })



// let tip = d3.tip()
// .attr('class', 'd3-tip')
// .offset([-5, 0])
// .style("left", "300px")
// .style("top", "400px")
// .html(function(d) {
//     return ("<a href="+d.school+" target='_blank'>"+d.school +"</a>");
// })
    
// svg.call(tip);

// var projection = d3.geoMercator().scale(1100).translate([-1000,800]);

let schoolPins = svg.append("g");
schoolPins.selectAll( "path" )
    .data(schools.features)
    .enter()
    .append("circle", ".pin")
    .attr("r", 5)
    .attr("transform", function(d) {
        return "translate(" + albersProjection([
        d.lon,
        d.lat
        ]) + ")";
    })
// .on('mouseover', tip.show)
// .on('click', tip.hide);		
