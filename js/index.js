/**
 * Created by djboo on 5/2/2016.
 */

// Store the upcoming data
var valueData = [];

// Start by loading the data
startHere();

// Once the data is in the required format, put it in the right spot
function dataLoaded(_valueData) {
    valueData = _valueData;
    initVis();
}

// Load the data correctly
function startHere () {
    d3.json("data/data2015.json", function(errorValue, ValueData) {
        if (!errorValue) {
            dataLoaded(ValueData);

            //d3.csv("data/data2015.csv", function(error, routeData) {
            //if (!error) {
            //    dataLoaded(valueData);
            //}

        }
    });
}

function initVis () {
    innovative = new Innovative("bundleinfo", "bundlebarlines", "bundlebars", valueData);
}

function addBundleOne (propID) {
    var choice;

    valueData.forEach(function (a) {
        if (a["PID"] == propID) {
            choice = a;
        }
    });

    console.log(choice);

    innovative.bundleOne.push(choice);

    innovative.wrangleData();
}

function addBundleTwo (propID) {
    var choice;

    valueData.forEach(function (a) {
        if (a["PID"] == propID) {
            choice = a;
        }
    });

    innovative.bundleTwo.push(choice);

    innovative.wrangleData();
}

function remove () {
    innovative.bundleOne = [];
    innovative.bundleTwo = [];

    innovative.wrangleData();
}