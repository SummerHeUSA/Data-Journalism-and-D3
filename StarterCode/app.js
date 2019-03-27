// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 800;
var padding = 100;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("data.csv").then(function (chart_data) {

  // console.log(chart_data)
  // obesity and income

  var xScale = d3.scaleLinear()
    .domain([0, d3.max(chart_data, d => d.income)])
    .range([0, chartWidth]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(chart_data, d => d.obesity)])
    .range([chartHeight, 0]);

  var bottomAxis = d3.axisBottom(xScale)

  var leftAxis = d3.axisLeft(yScale);

  chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);


  chartGroup.append("g").call(leftAxis);


  chartGroup.selectAll("circle")
    .data(chart_data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.income) })
    .attr("cy", function (d) { return yScale(d.obesity) })
    .attr("r", '15')
    .attr("stroke", "white")
    .attr("fill", "orange")
    .attr("opacity", ".8")
    .on("mouseover",function(d){
      console.log(d.state
      )
    })
    


  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (padding / 8) + "," + (svgHeight / 2) + ")rotate(-90)")
    .text("% Obesity");
    

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (svgWidth / 2) + "," + (svgHeight - (padding / 60)) + ")")
    .text("% Income");

      
    chartGroup.selectAll(".stateText")
      .data(chart_data)
      .enter()
      .append("text")
      .attr("class","stateText")
      .text(function(d) {
          console.log(d.abbr)
          return d.abbr;
      })
      .attr("x", function(d) {
          return xScale(d.income);  
      })
      .attr("y", function(d) {
          return yScale(d.obesity) ; 
      })
      .attr("font_family", "sans-serif")  
      .attr("font-size", "10px")  
      .attr("fill", "darkgreen")
      .attr("text-anchor","middle");  
      
      // have no idea why there has no text in circles ....

    });
  



