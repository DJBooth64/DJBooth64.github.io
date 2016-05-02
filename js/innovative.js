/**
 * Created by djboo on 4/25/2016.
 */

Innovative = function (_infoElement, _barLineElement, _barElement, _data) {

    this.infoElement = [];
    this.infoElement.name = _infoElement;
    this.barLineElement = [];
    this.barLineElement.name = _barLineElement;
    this.barElement = [];
    this.barElement.name = _barElement;
    this.data = _data;
    this.bundleOne = []; // see data wrangling
    this.bundleTwo = [];
    this.barLineElement.displayData = [];
    this.barElement.displayData = [];

    this.initVis();
};

Innovative.prototype.initVis = function(){
    var vis = this;

    //Instantiate the barLineElement graph
    vis.barLineElement.margin = { top: 40, right: 40, bottom: 120, left: 40 };

    vis.barLineElement.width = 500 - vis.barLineElement.margin.left - vis.barLineElement.margin.right;
    vis.barLineElement.height = 400 - vis.barLineElement.margin.top - vis.barLineElement.margin.bottom;

    // SVG drawing area
    vis.barLineElement.svg = d3.select("#" + vis.barLineElement.name).append("svg")
        .attr("width", vis.barLineElement.width + vis.barLineElement.margin.left + vis.barLineElement.margin.right)
        .attr("height", vis.barLineElement.height + vis.barLineElement.margin.top + vis.barLineElement.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.barLineElement.margin.left + "," + vis.barLineElement.margin.top + ")");

    // Scales and axes
    vis.barLineElement.x = d3.scale.ordinal()
        .rangeRoundBands([0, vis.barLineElement.width],.1);

    vis.barLineElement.y = d3.scale.linear()
        .range([vis.barLineElement.height, 0]);

    vis.barLineElement.xAxis = d3.svg.axis()
        .scale(vis.barLineElement.x)
        .orient("bottom");

    vis.barLineElement.yAxis = d3.svg.axis()
        .scale(vis.barLineElement.y)
        .orient("left");

    vis.barLineElement.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.barLineElement.height + ")");

    vis.barLineElement.svg.append("g")
        .attr("class", "y-axis axis");

    vis.barLineElement.svg.append("text")
        .attr("x", 100)
        .attr("y", 0)
        .text("Properties in Bundles (in millions of $)")
        .style("stroke", "#ffffff");

    //Instantiate the standalone bar graph
    vis.barElement.margin = { top: 40, right: 40, bottom: 40, left: 40 };

    vis.barElement.width = 600 - vis.barElement.margin.left - vis.barElement.margin.right;
    vis.barElement.height = 400 - vis.barElement.margin.top - vis.barElement.margin.bottom;

    // SVG drawing area
    vis.barElement.svg = d3.select("#" + vis.barElement.name).append("svg")
        .attr("width", vis.barElement.width + vis.barElement.margin.left + vis.barElement.margin.right)
        .attr("height", vis.barElement.height + vis.barElement.margin.top + vis.barElement.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.barElement.margin.left + "," + vis.barElement.margin.top + ")");

    // Scales and axes
    vis.barElement.x = d3.scale.ordinal()
        .rangeRoundBands([0, vis.barElement.width],.1);

    vis.barElement.y = d3.scale.linear()
        .range([vis.barElement.height, 0]);

    vis.barElement.xAxis = d3.svg.axis()
        .scale(vis.barElement.x)
        .orient("bottom");

    vis.barElement.yAxis = d3.svg.axis()
        .scale(vis.barElement.y)
        .orient("left");

    vis.barElement.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.barElement.height + ")");

    vis.barElement.svg.append("g")
        .attr("class", "y-axis axis");

    vis.barElement.svg.append("text")
        .attr("x", 200)
        .attr("y", 0)
        .text("Bundle Values (in millions of $)")
        .style("stroke", "#ffffff");

    // TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();
};

/*
 * Data wrangling
 */

Innovative.prototype.wrangleData = function(){
    var vis = this;

    if (vis.bundleOne.length == 0 && vis.bundleTwo.length == 0) {
        vis.updateVis();
    }

    else {

        //Only want unique bars in the bar line graph
        var concatenated = vis.bundleOne.concat(vis.bundleTwo.filter(function (item) {
            return vis.bundleOne.indexOf(item) < 0;
        }));

        concatenated.sort(function (a, b) {
            return b["GROSS_VALUE"] - a["GROSS_VALUE"];
        });

        vis.barLineElement.displayData = concatenated;

        var bundleOneSum = 0;
        var bundleTwoSum = 0;

        vis.bundleOne.forEach(function (prop) {
            bundleOneSum += prop["GROSS_VALUE"];
        });

        vis.bundleTwo.forEach(function (prop) {
            bundleTwoSum += prop["GROSS_VALUE"];
        });

        if (bundleOneSum >= bundleTwoSum) {
            vis.barElement.displayData = [[1, bundleOneSum], [2, bundleTwoSum]];
        }
        else {
            vis.barElement.displayData = [[2, bundleTwoSum], [1, bundleOneSum]];
        }

        // Update the visualization
        vis.updateVis();
    }
};



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

Innovative.prototype.updateVis = function(){
    var vis = this;

    console.log(vis.barLineElement.displayData);

    if (vis.barLineElement.displayData.length > 0) {

        // Update domain
        // Get the maximum of the multi-dimensional array or in other words, get the highest peak of the uppermost layer
        vis.barLineElement.y.domain([0, d3.max(vis.barLineElement.displayData, function (d) {
            return d["GROSS_VALUE"] / 1000000;
        })
        ]);

        vis.barLineElement.x.domain(vis.barLineElement.displayData.map(function (d) {
            return d["full_address"];
        }));

        // Draw the bars
        vis.barLineElement.bars = vis.barLineElement.svg.selectAll(".bar")
            .data(vis.barLineElement.displayData);

        vis.barLineElement.bars.enter().append("rect")
            .attr("class", "bar");

        vis.barLineElement.bars
            .attr("x", function (d) {
                return vis.barLineElement.x(d["full_address"]);
            })
            .attr("width", vis.barLineElement.x.rangeBand())
            .attr("y", function (d) {
                return vis.barLineElement.y(d["GROSS_VALUE"] / 1000000);
            })
            .attr("height", function (d) {
                return vis.barLineElement.height - vis.barLineElement.y(d["GROSS_VALUE"] / 1000000);
            })
            .attr("fill", function (d) {
                if (vis.bundleOne.indexOf(d) >= 0 && vis.bundleTwo.indexOf(d) >= 0) {
                    return "purple";
                }
                else if (vis.bundleOne.indexOf(d) >= 0) {
                    return "red";
                }
                else {
                    return "blue";
                }
            });

        // TO-DO: Update tooltip text

        vis.barLineElement.bars.exit().remove();

        // Call axis functions with the new domain
        vis.barLineElement.svg.select(".x-axis").call(vis.barLineElement.xAxis)
            .selectAll("text")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start");
        vis.barLineElement.svg.select(".y-axis").call(vis.barLineElement.yAxis);

        // Update domain
        // Get the maximum of the multi-dimensional array or in other words, get the highest peak of the uppermost layer
        vis.barElement.y.domain([0, vis.barElement.displayData[0][1]/1000000]
        );

        console.log(vis.barElement.displayData[0][1]);

        vis.barElement.x.domain(["Bundles"]);

        // Draw the bars
        vis.barElement.bars = vis.barElement.svg.selectAll(".bar")
            .data(vis.barElement.displayData);

        vis.barElement.bars.enter().append("rect")
            .attr("class", "bar");

        vis.barElement.bars
            .attr("x", function(d,i) {
                return vis.barElement.x("Bundles") + i*15;
            })
            .attr("width", function (d, i) {
                if (i == 0) {
                    return 90;
                }
                else {
                    return 60;
                }
            })
            .attr("y", function (d) {
                return vis.barElement.y(d[1]/1000000);
            })
            .attr("height", function (d) {
                return vis.barElement.height - vis.barElement.y(d[1]/1000000);
            })
            .attr("fill", function (d) {
                if (d[0] == 1) {
                    return "red";
                }
                else {
                    return "blue";
                }
            });

        console.log(vis.barElement.y(0));

        // TO-DO: Update tooltip text

        vis.barElement.bars.exit().remove();

        // Call axis functions with the new domain
        vis.barElement.svg.select(".x-axis").call(vis.barElement.xAxis);
        vis.barElement.svg.select(".y-axis").call(vis.barElement.yAxis);
    }


};

