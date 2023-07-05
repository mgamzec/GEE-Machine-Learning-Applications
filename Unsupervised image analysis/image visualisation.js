var geometry = /* color: #98ff00 */ee.Geometry.Point([138.51255455017096, 36.25429278707702]),
    imageVisParam = {"opacity":1,"bands":["B4","B3","B2"],"min":-0.032756556459479905,"max":0.21319116468123273,"gamma":0.608};

var landsat = ee.ImageCollection("LANDSAT/LC8_L1T")
    .filterDate('2016-01-01', '2017-01-01')
    .filterBounds(geometry)

var composite = ee.Algorithms.Landsat.simpleComposite({
  collection: landsat,
  asFloat: true
})

var rgbVis = {bands: ["B4", "B3", "B2"], min:0, max: 0.2}
var nirVis = {bands: ["B5", "B4", "B3"], min:0, max: [0.5, 0.3, 0.3]}
var tempVis = {bands: ["B10"], min: 280, max: 310, palette: ["blue", "red", "green", "yellow"]}

Map.addLayer(composite, rgbVis, "RGB")
Map.addLayer(composite, nirVis, "False Color")
Map.addLayer(composite, tempVis, "Thermal")

Map.centerObject(geometry, 11)
