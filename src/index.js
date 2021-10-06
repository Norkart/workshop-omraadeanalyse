import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  webatlasTileLayer,
  WebatlasTileLayerTypes,
} from "leaflet-webatlastile";

//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
var map = L.map("mapid").setView([58.14615, 7.99573], 13);

//Add a background layer, using Norkart Tiles
var apiKey = "";
webatlasTileLayer({
  mapType: WebatlasTileLayerTypes.VECTOR,
  apiKey: apiKey,
}).addTo(map);
