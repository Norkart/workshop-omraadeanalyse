import L from "leaflet";
import {
  webatlasTileLayer,
  WebatlasTileLayerTypes,
} from "leaflet-webatlastile";

//add css for leaflet and leaflet draw
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { setCurrentMap, map } from "./state/map";
import { addGeoJson, removeMapFeatureIfExists } from "./utils/map";
import { runIntersection } from "./utils/datavarehus";
import { enableDraw } from "./utils/draw";

//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
setCurrentMap(L.map("mapid").setView([58.14615, 7.99573], 13));

//Add a background layer, using Norkart Tiles
export const apiKey = "";
const baseLayers = {
  Kart: webatlasTileLayer({
    mapType: WebatlasTileLayerTypes.VECTOR,
    apiKey: apiKey,
  }).addTo(map),
};
L.control.layers(baseLayers, {}).addTo(map);

//enable draw
enableDraw(map, (geoJson) => {
  //this function is called when something is drawn
  addGeoJson(geoJson, "Run your intersectionquery on this polygon!");
});

//register button clicks
document.getElementById("remove_layers").onclick = removeMapFeatureIfExists;
document.getElementById("run_intersection").onclick = runIntersection;
