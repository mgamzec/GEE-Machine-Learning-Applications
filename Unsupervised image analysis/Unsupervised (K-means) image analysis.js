var Izmir = 
    /* color: #98ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[27.132462352430828, 38.471424182722544],
          [27.132462352430828, 38.41495540467253],
          [27.218979686415203, 38.41495540467253],
          [27.218979686415203, 38.471424182722544]]], null, false);


// import the satellite data from the European Space Agency
var S2 = ee.ImageCollection("COPERNICUS/S2");

//filter for Izmir
S2 = S2.filterBounds(Izmir);
print(S2);

//filter for date
S2 = S2.filterDate("2022-06-01", "2022-09-11");
print(S2);

var image = ee.Image(S2.first());
print(image)

//Map.addLayer(image,{min:0,max:3000,bands:"B4,B3,B2"}, "Izmir");

Map.addLayer(image,{min:0,max:3000,bands:"B8,B4,B3"}, "Izmir");

// Create training dataset.
var training = image.sample({
  region: Izmir,
  scale: 20,
  numPixels: 5000
});

// Start unsupervised clusterering algorithm and train it.
var kmeans = ee.Clusterer.wekaKMeans(5).train(training);
// Cluster the input using the trained clusterer.
var result =  image.cluster(kmeans);
// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'Unsupervised K-means Classification');

// Export the image to Drive
Export.image.toDrive({
  image: result,
  description: 'kmeans_Izmir',
  scale: 20,
  region: Izmir
});
