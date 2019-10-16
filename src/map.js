import schools from './data/schools';
import states from './data/us';
import * as rank from './data/top_ten';

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
       .attr('class', 'boundary')
       .attr( "d", geoPath );

 
 
// Map schools
// make tooltip for school

// let getTooltip = document.getElementById("tooltip");

let tip = d3.tip()
    .html(function(school) {
        return("<div class='tooltip-content'><h4>"+school.school+"</h4>"+
        "<p>Ranking: "+school.rank+"</p>"+
        "<a href='#'>See Statistics<a></div>");
    })

svg.call(tip);

//Select All
let schoolPins = svg.append("g");

// Filtering 
// All 
function filterSchools(filterId, dataSet) {
    document.getElementById(filterId).onclick = function(){
        d3.selectAll("circle").remove();

        schoolPins.selectAll( "path" )
        .data(dataSet)
        .enter()
        .append("circle")
        .attr('class', 'default-pin')
        .attr("r", 3)
        .attr("transform", function(school) {
            return "translate(" + albersProjection([
            school.lon,
            school.lat
            ]) + ")";
        })
        .on('mouseover', tip.show)
        .on('click', tip.hide);		
    }
}

filterSchools('all', schools.features);
filterSchools('tuition', rank.most_expensive);
filterSchools('start-salary', rank.highest_start);
filterSchools('mid-salary', rank.highest_midcareer);
filterSchools('pay-off', rank.fastest_pay);



// highest tuition 
// document.getElementById('tuition').onclick = function(){
//     schoolPins.selectAll( "path" )
//     .data(rank.most_expensive)
//     .enter()
//     .append("circle")
//     .attr('class', 'default-pin')
//     .attr("r", 3)
//     .attr("transform", function(school) {
//         return "translate(" + albersProjection([
//         school.lon,
//         school.lat
//         ]) + ")";
//     })
//     .on('mouseover', tip.show)
// 	.on('click', tip.hide);		
// }

