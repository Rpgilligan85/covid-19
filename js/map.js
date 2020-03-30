//Create Map
var map = L.map("map").setView([42, -100.9], 4);

//Load data
d3.json("../data/usa.json").then(data => {
	var geo = data.features;
	console.log("map", geo);

	//Add data to map
	L.geoJSON(geo, {
		onEachFeature: onEachPoly,
		style: stylePolys
	}).addTo(map);
});

//Create map popup
function onEachPoly(feature, layer) {
	layer.bindPopup(
		"<h3>" +
			feature.properties.name +
			"</h3><b>Total: </b>" +
			(Math.random() * 100).toFixed(0) +
			"<br/> <b>No Issue: </b>" +
			(Math.random() * 100).toFixed(0) +
			"%" +
			"<br/> <b>Some Issue: </b>" +
			(Math.random() * 100).toFixed(0) +
			"%" +
			"<br/> <b>Difficulty Breathing: </b>" +
			(Math.random() * 100).toFixed(0) +
			"%"
	);
	layer.on("mouseout", e => {
		layer.closePopup();
	});
	layer.on("mousemove", e => {
		layer.openPopup(e.latlng);
	});
}
//Style polygons
function stylePolys(feature) {
	return {
		fillColor: this.getColor(Math.random(), feature),
		weight: 2,
		opacity: 1,
		color: "white",
		dashArray: "3",
		fillOpacity: 0.7
	};
}

//Get color from data
function getColor(number, feature) {
	//blue -> yellow -> orange
	const val = number * 100;
	console.log("val", val, feature.id);
	const color =
		val > 80
			? "#E65100"
			: val > 60
			? "#FB8C00"
			: val > 40
			? "#FFE082"
			: val > 20
			? "#64B5F6"
			: "#0D47A1";
	return color;
}
