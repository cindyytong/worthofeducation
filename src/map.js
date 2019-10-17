import schools from './data/schools';
import states from './data/us';
import * as rank from './data/top_ten';

 //Width and height of map
 var width = 1300;
 var height = 700;
 
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
     .scale( 1340 )
     .rotate( [90,0] )
     .center( [-6, 38] )
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

  // modal functionality 

  let close = document.getElementsByClassName("close")[0];
  let modal = document.getElementById("modal");
  
  close.onclick = function(){
      modal.classList.add("hide");
  }
  function openModal() {
      modal.classList.remove("hide");
  }
  window.openModal = openModal;
  
  // // remove modal if clicking outside of modal
  // window.onclick = function(event) {
  //     console.log(event.target);
  //     if(event.target != modal && !modal.classList.contains("hide")) {
  //         modal.classList.add("hide");
  //     }
  // }
  
  // tooltip for school
  
  let tip = d3.tip()
      .html(function(school) {
          debugger
          return("<div class='tooltip-content'><h4>"+school.school+"</h4>"+
          "<p>Ranking: "+school.rank+"</p><button id='open-modal' onclick='openModal()'>See Statistics</button></div>");
      })
  
  svg.call(tip);
 
  /// Add content into modal 
  let fillModal = function(school) {
      document.getElementById("about-school").append(school.school);
  };



//Default have all schools shown
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
        .on('mouseover', function(){
            d3.select(this).classed("hover-pin", true)
        })	
        .on('click', function(school) {  // does not work for mouseover
            tip.show(school);
            console.log(school);
        })
        .on('mouseleave', function(){
            d3.select(this).classed("hover-pin", false)
        });	

// Filtering 
// Default select all
function filterSchools(filterId, dataSet, pinClass) {
    document.getElementById(filterId).onclick = function(){
        d3.selectAll("circle").remove();

        schoolPins.selectAll( "path" )
        .data(dataSet)
        .enter()
        .append("circle")
        .attr('class', pinClass)
        .attr("r", 3)
        .attr("transform", function(school) {
            return "translate(" + albersProjection([
            school.lon,
            school.lat
            ]) + ")";
        })
        	
    }
}

filterSchools('all', schools.features, 'default-pin');
filterSchools('tuition', rank.most_expensive, 'blue-pin');
filterSchools('start-salary', rank.highest_start, 'red-pin');
filterSchools('mid-salary', rank.highest_midcareer, 'purple-pin');
filterSchools('pay-off', rank.fastest_pay, 'pink-pin');

