import L from "leaflet";
import { intersectionByGeometry } from "../api/datavarehus";
import { removeMapFeatureIfExists, addGeoJson } from "./map";
import { map, currentMapFeature } from "../state/map";

export var runIntersection = async () => {
  if (currentMapFeature) {
    var geom = currentMapFeature.toGeoJSON().features[0].geometry;
    var res = await intersectionByGeometry(geom, "sv_svv_24_aadt");
    if (res.features.length != 0) {
      removeMapFeatureIfExists();
      addGeoJson(res, null);
    } else {
      removeMapFeatureIfExists();
      L.popup()
        .setLatLng(map.getCenter())
        .setContent("No hit for dataset on selected area")
        .openOn(map);
    }
  } else {
    removeMapFeatureIfExists();
    L.popup()
      .setLatLng(map.getCenter())
      .setContent("No area selected for intersection query")
      .openOn(map);
  }
};
