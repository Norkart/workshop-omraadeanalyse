import L from "leaflet";
import { map, currentMapFeature, setCurrentMapFeature } from "../state/map";

export var removeMapFeatureIfExists = () => {
  if (currentMapFeature) {
    currentMapFeature.remove();
    setCurrentMapFeature(null);
  }
};

export var addGeoJson = (geojson, popuptextoverride) => {
  removeMapFeatureIfExists();
  var featureRes = L.geoJSON(geojson)
    .bindPopup(
      function (feature) {
        if (popuptextoverride) {
          return popuptextoverride;
        }
        return `${JSON.stringify(feature?.feature.properties, null, 2)}`;
      },
      { maxHeight: 600, maxWidth: 600 }
    )
    .addTo(map);
  setCurrentMapFeature(featureRes);
};
