import schools from './data/schools';
import states from './data/us';
import * as rank from './data/top_ten';

 const width = 1300;
 const height = 700;
 
 const svg = d3.select( "#map" )
     .append( "svg" )
     .attr( "width", width )
     .attr( "height", height )

const g = svg.append( "g" );
 
const albersProjection= d3.geoAlbers()
     .scale( 1340 )
     .rotate( [90,0] )
     .center( [-6, 38] )
     .translate( [width/2,height/2] );
 
const geoPath = d3.geoPath()
     .projection( albersProjection );
  

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
      document.getElementById("line-graph").innerHTML = "";
      document.getElementById("page-wrap").classList.remove('modal-is-open')
  }
  function openModal() {
      modal.classList.remove("hide");
      document.getElementById("page-wrap").classList.add('modal-is-open')
  }
  window.openModal = openModal;

  
  let tip = d3.tip()
      .html(function(school) {
          return("<div class='tooltip-content'><h4>"+school.school+"</h4>"+
          "<p>Ranking: "+school.rank+"</p><button id='open-modal' onclick='openModal()'>See Statistics</button></div>");
      })
  
  svg.call(tip);
 
  /// Add content into modal 
  function fillModal(school) {
      document.getElementById("about-school").innerHTML = school.school;
      document.getElementById("rank-value").innerHTML = school.rank;
      document.getElementById("start-salary-value").innerHTML = school.start_salary;
      document.getElementById("mid-salary-value").innerHTML = school.end_salary;
      document.getElementById("tuition-value").innerHTML = school.tuition;
      document.getElementById("pay-off-value").innerHTML = school.percent_tuition_paid;
  };

  // draw graph
  function drawGraph(school){
    const graphWidth = 900;  // 450 + 50; 35 ea *10
    const graphHeight = 500;  // 455 + 50; 35 ea * 13
    const graphSVG = d3.select("#line-graph")
        .append("svg")
        .attr("class", "axis")
        .attr("width", graphWidth) //
        .attr("height", graphHeight) //

    const xscale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, graphWidth - 80 ])

    const x = d3.scaleLinear()
    .domain([0, 10])

    
    const yscale = d3.scaleLinear()
        .domain([0, 1300000])
        .range([graphHeight-50, 0]);

    const y = d3.scaleLinear()
        .domain([0, 1300000])
    
    const xaxis = d3.axisBottom()
        .scale(xscale);
    
    const yaxis = d3.axisLeft()
        .scale(yscale);
    
    graphSVG.append("g")
        .attr("transform", "translate(80,10)")
        .call(yaxis)
        .attr("class", "axis-tick-label");
    
    let xAxisTranslate = graphHeight - 40;
    
    graphSVG.append("g")
        .attr("transform", "translate(80, " + xAxisTranslate  +")")
        .call(xaxis)
        .attr("class", "axis-tick-label");
  
    graphSVG.append("text")             
    .attr("transform",
          "translate(" + (graphWidth/2) + " ," + 
                         (graphHeight) + ")")
    .style("text-anchor", "middle")
    .text("Working Years Post Graduation")
    .attr("class", "axis-label")

    graphSVG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 )
        .attr("x",0 - (graphHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Median Earnings in USD")
        .attr("class", "axis-label");      

    // parse coordinates for lines
    let parseSalary = parseFloat(school.start_salary.substring(1).replace(/,/g,''));
    let parseEndSalary = parseFloat(school.end_salary.substring(1).replace(/,/g,''));
    let parseTuition = parseFloat(school.tuition.substring(1).replace(/,/g,''));
    let parseReturn = parseFloat(school.investment_return.substring(1).replace(/,/g,''));

    const salaryData = [
        {"date":0, "value": parseSalary}, 
        {"date":10, "value": parseEndSalary}];
    
    const tuitionData = [
        {"date":0, "value": parseTuition}, 
        {"date":10, "value": parseTuition}];
    
    const investmentData = [
        {"date":0, "value": parseTuition}, 
        {"date":10, "value": parseReturn}];

    let lineFunction = d3.line()
        .x(function(d) { return xscale(d.date) })
        .y(function(d) { return yscale(d.value) });

    function drawLine(dataSet, color){
        graphSVG.append("g")
        .attr("transform", "translate(80,10)")
        .append("path")
        .attr("class", "line")
        .attr("d", lineFunction(dataSet))
            .attr("stroke", color)
    };

    drawLine(salaryData, "#7CDBF2");
    drawLine(tuitionData, "#E74B6F");
    drawLine(investmentData, "#7360CC");

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
        .on('mouseover', function(school){
            tip.show(school);
            fillModal(school);
            document.getElementById("line-graph").innerHTML = "";
            drawGraph(school);
        })	
        // .on('mouseleave', function(school){
        // });	

// Filtering 
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

