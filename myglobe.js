var width = 960,
    height = 500;
    //rotate = [10, -10],
    //velocity = [.003, -.001];

var projection = d3.geoOrthographic()
    .scale(240);
    //.translate([width / 2, height / 2])
    //.clipAngle(90 + 1e-6)
    //.precision(.3);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Creating the sphere
svg.append("path")
    .datum({type: "Sphere"})
    .attr("class", "sphere")
    .attr("d", path);

// Adding the lines for the globe
svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

// svg.append("path")
//     .attr("class", "equator")
//     .attr("d", path);

d3.json("land.json", function(error, land){
    if (error){
        throw error;
    }
    svg.insert("path", ".graticule")
        .datum(topojson.feature(land, land.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(land, land.objects.countries, function(a, b){return a !== b;}))
        .attr("class", "boundary")
        .attr("d", path);
});