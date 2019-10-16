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
       .attr('class', 'boundary')
       .attr( "d", geoPath );

 
 
// Map schools
// make tooltip for school

let getTooltip = document.getElementById("tooltip");

//Add pins for all schools 
let schoolPins = svg.append("g");
schoolPins.selectAll( "path" )
    .data(schools.features)
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
.on('mousemove', function(school){
    d3.select(this)
    .attr('class', 'hover-pin');

    let schoolInfo = "<h4>"+school.school+"</h4>"+
    "<p>Ranking"+school.rank+"</p>"+
    "<a href='#'>See Statistics<a>"

    console.log(schoolInfo);
    getTooltip.innerHTML = schoolInfo;
    getTooltip.show();
})
.on("mouseout", function(school){
    d3.select(this)
    .attr('class', 'default-pin')
});
// .on('click', tip.hide);		

// only allow one active at a time 