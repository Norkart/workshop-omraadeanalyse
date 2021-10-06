import L from "leaflet";
import "leaflet-draw";

export const enableDraw = (map, onCreated) => {
  // Enable map drawing
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);
  var options = {
    position: "topright",
    draw: {
      marker: false,
      polyline: false,
      polygon: {
        allowIntersection: false, // Restricts shapes to simple polygons
        drawError: {
          color: "#e1e100", // Color the shape will turn when intersects
          message: "We dont like polygons with self intersecrtion!", // Message that will show when intersect
        },
        shapeOptions: {
          color: "#bada55",
        },
      },
      circlemarker: false,
      circle: false,
      rectangle: false,
    },
  };

  L.drawLocal.draw.toolbar.buttons.polygon = "Draw";
  var drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, (e) => onCreated(e.layer.toGeoJSON()));
};
