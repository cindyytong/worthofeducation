import {schools, most_expensive, highest_start, highest_midcareer, fastest_pay } from './data/schools';
import states from './data/us';
// import * as rank from './data/top_ten';

const width = 1300;
const height = 700;

// draw states 
 
const svg = d3.select( "#map" )
     .append( "svg" )
     .attr( "width", width )
     .attr( "height", height )

     
const albersProjection= d3.geoAlbers()
     .scale( 1340 )
     .rotate( [90,0] )
     .center( [-6, 38] )
     .translate( [width/2,height/2] );
     
const geoPath = d3.geoPath()
     .projection( albersProjection )
     
const g = svg.append( "g" )

g.selectAll( "path" )
    .data( states.features ) 
    .enter()
    .append( "path" )
    .attr('class', 'boundary')
    .attr( "d", geoPath )


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
  .offset([-80, 0])
    .html(function(school) {
        return("<div class='tooltip-content'><h4>"+school.school+"</h4>"+
        "<p>Ranking: "+school.rank+"</p><button id='open-modal' onclick='openModal()'>See Statistics</button></div>");
    })
  
  svg.call(tip);
 
  /// Add content into modal 
  function fillModal(school) {
      document.getElementById("about-school").innerHTML = school.school;
      document.getElementById("rank-value").innerHTML = school.rank;
      document.getElementById("start-salary-value").innerHTML =  `$${school.start_salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      document.getElementById("mid-salary-value").innerHTML = `$${school.end_salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      document.getElementById("tuition-value").innerHTML = `$${school.tuition.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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

    // data for lines 
    debugger
    const salaryValues = [school.start_salary, school.salary_total_1, school.salary_total_2, school.salary_total_3, school.salary_total_4, school.salary_total_5, school.salary_total_6, school.salary_total_7, school.salary_total_8, school.salary_total_9, school.total_earnings];
    const payOffValues = [school.payoff_0, school.payoff_1, school.payoff_2, school.payoff_3, school.payoff_4, school.payoff_5, school.payoff_6, school.payoff_7, school.payoff_8, school.payoff_9, school.payoff_10];
    const investmentValues = [school.tuition, school.invest_1, school.invest_2, school.invest_3, school.invest_4, school.invest_5, school.invest_6, school.invest_7, school.invest_8, school.invest_9, school.investment_return];

    const salaryData = [];
    for(let i = 0; i <=10; i++){
        salaryData.push({"date":i, "value": salaryValues[i]})
    }

    const tuitionData = [
        {"date":0, "value": school.tuition}, 
        {"date":10, "value": school.tuition}];

    const payOffData = [];
    for(let i = 0; i <=10; i++){
        payOffData.push({"date":i, "value": payOffValues[i]})
    }
    
    const investmentData = [];
    for(let i = 0; i <=10; i++){
        investmentData.push({"date":i, "value": investmentValues[i]})
    }

    let lineFunction = d3.line()
        .x(function(d) { return xscale(d.date) })
        .y(function(d) { return yscale(d.value) })
        .curve(d3.curveBasis);

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
    drawLine(payOffData, "#75F1AA");
    drawLine(investmentData, "#7360CC");

  }

//Default have all schools shown
let schoolPins = svg.append("g");
// let tipWithContent = d3.selectAll(".tooltip-content");

// function equalToEventTarget(){
//     return this == d3.event.target;
// }

// d3.select("body").on("click",function(){

//     var outside = tipWithContent.filter(equalToEventTarget).empty();
//     if (outside) {

//         tipWithContent.classed("hide", true);
//     }
// });

 schoolPins.selectAll( "path" )
         .data(schools)
         .enter()
         .append("circle")
         .attr('class', 'default-pin')
         .attr("r", 4)
         .attr("transform", function(school) {
             return "translate(" + albersProjection([
             school.lon,
             school.lat
             ]) + ")";
         })
         .on('mouseover', function(school){
             tip.show(school);
             fillModal(school);
             document.getElementById("line-graph").innerHTML = "";
             drawGraph(school);
             setTimeout(() => {tip.hide(school)}, 2000);
         }) 

// Filtering 

function filterSchools(filterId, dataSet, pinClass) {
    document.getElementById(filterId).onclick = function(){
        d3.selectAll("circle").remove();
        schoolPins.selectAll( "path" )
        .data(dataSet)
        .enter()
        .append("circle")
        .attr('class', pinClass)
        .attr("r", 4)
        .attr("transform", function(school) {
            return "translate(" + albersProjection([
            school.lon,
            school.lat
            ]) + ")";
        })
        .on('mouseover', function(school){
                 tip.show(school);
                 fillModal(school);
                 document.getElementById("line-graph").innerHTML = "";
                 drawGraph(school);
                 setTimeout(() => {tip.hide(school)}, 2000);
         }) 
    }
}


filterSchools('all', schools, 'default-pin');
filterSchools('tuition', most_expensive, 'blue-pin');
filterSchools('start-salary', highest_start, 'red-pin');
filterSchools('mid-salary', highest_midcareer, 'purple-pin');
filterSchools('pay-off', fastest_pay, 'pink-pin');