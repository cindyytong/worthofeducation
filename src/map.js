import schools from './data/schools';
import states from './data/us';


 //Width and height of map
 var width = 960;
 var height = 500;
 
 // create svg
 var svg = d3.select( "body" )
     .append( "svg" )
     .attr( "width", width )
     .attr( "height", height );
 
 // Append empty placeholder g element to the SVG
 // g will contain geometry elements
 var g = svg.append( "g" );
 
 // D3 Projection
 var albersProjection= d3.geoAlbers()
     .scale( 100 )
     .rotate( [71.057,0] )
     .center( [0, 42.313] )
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
       .attr( "fill", "#ccc" )
       .attr( "stroke", "#333")
       .attr( "d", geoPath );

 
 
   // Map schools
   var schoolLocations = svg.append("g");
     schoolLocations.selectAll( "path" )
       .data( schools.features )
       .enter()
       .append( "path" )
       .attr( "fill", "#900" )
       .attr( "stroke", "#999" )
       .attr( "d", geoPath );