import schools from './data/schools';
import states from './data/us';
import * as rank from './data/top_ten';

 //Width and height of map
 const width = 1300;
 const height = 700;
 
 // create svg
 const svg = d3.select( "#map" )
     .append( "svg" )
     .attr( "width", width )
     .attr( "height", height )

 
 // Append empty placeholder g element to the SVG
 // g will contain geometry elements
 const g = svg.append( "g" );
 
 // D3 Projection
 const albersProjection= d3.geoAlbers()
     .scale( 1340 )
     .rotate( [90,0] )
     .center( [-6, 38] )
     .translate( [width/2,height/2] );
 
         
 // Create GeoPath function that uses built-in D3 functionality to turn
 // lat/lon coordinates into screen coordinates
 const geoPath = d3.geoPath()
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

  const close = document.getElementsByClassName("close")[0];
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
          return("<div class='tooltip-content'><h4>"+school.school+"</h4>"+
          "<p>Ranking: "+school.rank+"</p><button id='open-modal' onclick='openModal()'>See Statistics</button></div>");
      })
  
  svg.call(tip);
 
  /// Add content into modal 
  function fillModal(school) {
      document.getElementById("about-school").innerHTML = school.school;
      // make line graph 
      document.getElementById("rank-value").innerHTML = school.rank;
      document.getElementById("start-salary-value").innerHTML = school.start_salary;
      document.getElementById("mid-salary-value").innerHTML = school.end_salary;
      document.getElementById("tuition-value").innerHTML = school.tuition;
      document.getElementById("pay-off-value").innerHTML = school.percent_tuition_paid;
  };

  // draw line chart

  function drawGraph(school){
    debugger
    const x = d3.scaleLinear()
        .domain([0,10])
        .range([0, 10])
      
    const y = d3.scaleLinear()
        .domain([0, 13])
        .range([0, 1300000])
        // .clamp(true)

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const graphWidth = 600;
    const graphHeight = 400; 
    // const graphMargin = 20;

    let svg = d3.select("#line-graph").append("svg")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .append("g")
    // .attr("transform", "translate(" + graphMargin.left + "," + graphMargin.top + ")");
    
    svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + graphHeight + ")")
      .call(xAxis);
    
    svg.append("g")
      .attr("class", "yAxis")
      .call(yAxis);
    
      debugger
    // parse values 
    let parseSalary = parseFloat(school.start_salary.substring(1).replace(/,/g,''));
    let parseEndSalary = parseFloat(school.end_salary.substring(1).replace(/,/g,''));
    let parseTuition = parseFloat(school.tuition.substring(1).replace(/,/g,''));

    let parseReturn = parseFloat(school.investment_return.substring(1).replace(/,/g,''));

    debugger
    // const lines = [
    //     [{"x":0, "y": parseSalary}, {"x":10, "y": school.end_salary}]
    //     [{"x":0, "y": parseEndSalary}, {"x":10, "y": parseTuition}]
    //     [{"x":0, "y": parseTuition}, {"x":10, "y": parseReturn}]
    // ]

    // for (let i = 0; i < lines.length; i++) {
    //     debugger 
    //     svg.append("path")
    //       .attr("class", "plot")
    //       .datum(lines[i])
    //       .attr("d", line);
    // }
    

  }

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
            fillModal(school);
            drawGraph(school);
            
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

