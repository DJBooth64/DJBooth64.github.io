//hold current choice
var currentProperty, currentPropertyID;

//initialize map
L.mapbox.accessToken = 'pk.eyJ1IjoidmluY2VudGppYW5nNzc3IiwiYSI6IkNUeUV4LWMifQ.OuNUoSfqSTSyu4R-dffXKQ';
var map = L.mapbox.map('map', 'mapbox.light')
	.setView([42.355, -71.060], 15);

var customLayer = L.geoJson(null, {
	// http://leafletjs.com/reference.html#geojson-style
	pointToLayer: function (feature, latlng) {
		return L.circle(latlng,feature.properties.GROSS_AREA/10000);
	}
});

var points;

function loadMarkers(customLayer){
	points = omnivore.csv('data/assorted_dataset.csv',{
			latfield: 'Lat',
			lonfield: 'Lon'
		},customLayer)
		.on('ready', function(layer) {
			map.fitBounds(points.getBounds());
			// An example of customizing marker styles based on an attribute.
			// In this case, the data, a CSV file, has a column called 'state'
			// with values referring to states. Your data might have different
			// values, so adjust to fit.
			this.eachLayer(function(marker) {

				// Bind a popup to each icon based on the same properties
				marker.bindPopup(marker.toGeoJSON().properties.OWNER + ', ' +
					marker.toGeoJSON().properties.OWNER_MAIL_ADDRESS);
				marker.on('mouseover', function () {
					openNav();
					$("#marketTrend").html(marker.toGeoJSON().properties.OWNER + ', ' +
						marker.toGeoJSON().properties.OWNER_MAIL_ADDRESS);
				marker.on('click', function () {
					$("#choices").css("display", "block");
					$("#property-description").html(marker.toGeoJSON().properties.OWNER + ', ' +
						marker.toGeoJSON().properties.OWNER_MAIL_ADDRESS);
					currentProperty = marker.toGeoJSON().properties;
					currentPropertyID = currentProperty.PID;
				})
				});
			});
		}).addTo(map);
}

var newcustomLayer = L.geoJson(null, {
	// http://leafletjs.com/reference.html#geojson-style
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
			radius: 8,
			fillColor: "#f00",
			color: "#000",
			weight: 0,
			opacity: 1,
			fillOpacity: feature.properties.GROSS_VALUE/100000000
		});
	}
});

loadMarkers(customLayer);

$('select#filter').change(function(){
	map.removeLayer(points);
	if($(this).val() === 'gv'){
		loadMarkers(newcustomLayer);
	}else{
		loadMarkers(customLayer);
	}
});

function seeStats() {
	enlargeNav();
	document.getElementById("stats").style.display = "block";
	document.getElementById("stats").innerHTML =
		"Current Owner: " + currentProperty.OWNER + "<br/>" +
		"Address: " + currentProperty.full_address + "<br/>" +
		"Total Value: $" + currentProperty.GROSS_VALUE
}

function openNav() {
	if (document.getElementById("mySidenav").style.width != "700px") {
		document.getElementById("mySidenav").style.width = "350px";
	}
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("stats").style.display = "none";
	document.getElementById("bundlebarlines").style.display = "none";
	document.getElementById("bundlebars").style.display = "none";
}

function enlargeNav() {
	document.getElementById("mySidenav").style.width = "700px";
	document.getElementById("enlargeButton").style.display = "none";
	document.getElementById("shrinkButton").style.display = "block";
}

function shrinkNav() {
	document.getElementById("mySidenav").style.width = "350px";
	document.getElementById("shrinkButton").style.display = "none";
	document.getElementById("enlargeButton").style.display = "block";
	document.getElementById("stats").style.display = "none";
	document.getElementById("bundlebarlines").style.display = "none";
	document.getElementById("bundlebars").style.display = "none";
	document.getElementById("legend").style.display = "none"
}

function addOne() {
	addBundleOne(currentPropertyID);
	document.getElementById("viewbundles").style.display = "block";
}

function addTwo() {
	addBundleTwo(currentPropertyID);
	document.getElementById("viewbundles").style.display = "block"
}

function viewBundles() {
	enlargeNav();
	document.getElementById("legend").style.display = "block";
	document.getElementById("bundlebarlines").style.display = "block";
	document.getElementById("bundlebars").style.display = "block";
	document.getElementById("choices").style.display = "none";
	document.getElementById("clear").style.display = "block";
}

function clearBundles() {
	remove();
	shrinkNav();
	document.getElementById("clear").style.display = "none";
	document.getElementById("viewbundles").style.display = "none";
}