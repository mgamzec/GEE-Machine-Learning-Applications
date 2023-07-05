// import the satellite data from the European Space Agency
var S2 = ee.ImageCollection("COPERNICUS/S2");

//filter for İzmir
S2 = S2.filterBounds(Izmir);
print(S2);

//filter for date
S2 = S2.filterDate("2022-06-01", "2022-09-11");
print(S2);

// Visualize the first image - True colour composite
var image = ee.Image(S2.first());
Map.addLayer(image,{min:0,max:3000,bands:"B4,B3,B2"}, "Izmir_TrueComposite");

// Visualize the first image - False colour composite
Map.addLayer(image,{min:0,max:3000,bands:"B8,B4,B3"}, "Izmir_FalseComposite");
