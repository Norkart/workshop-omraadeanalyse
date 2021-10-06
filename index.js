import L from 'leaflet';
import 'leaflet-draw';
import "leaflet/dist/leaflet.css";
import {
    webatlasTileLayer,
    WebatlasTileLayerTypes,
} from "leaflet-webatlastile";


import { setCurrentMap, map } from './state/map';
import { addGeoJson } from './utils/map';
import { runIntersection } from './utils/datavarehus';

//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
setCurrentMap(L.map('mapid').setView([58.14615, 7.99573], 13));

export var apiKey = '';
var baseLayers = {
    'Kart': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.VECTOR,
        apiKey: apiKey
    }).addTo(map),
    'Kart, Gråtone': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.GREY,
        apiKey: apiKey
    }),
    'Kart, medium': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.MEDIUM,
        apiKey: apiKey
    }),
    'Kart, lite': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.LITE,
        apiKey: apiKey
    }),
    'Foto': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.AERIAL,
        apiKey: apiKey
    }),
    'Hybrid': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.HYBRID,
        apiKey: apiKey
    }),
    'Custom-Kart': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.VECTOR, //This is a constant with value 'vector'
        apiKey: apiKey,
        tileset: {
            vector: {tileset: 'webatlas-1881-vektor', ext: 'png'} //We overwrite the default vector map with a custom tileset (also available on the same server)
        }
    }),
    'Custom-Hybrid': webatlasTileLayer({
        mapType: WebatlasTileLayerTypes.HYBRID, //This is a constant with value 'hybrid'
        apiKey: apiKey,
        tileset: {
            hybrid: {tileset: 'webatlas-1881-hybrid', ext: 'jpeg'} //We overwrite the default hybrid map with a custom tileset (also available on the same server)
        }
    })
};

L.control.layers(baseLayers, {}).addTo(map);

// Enable map drawing
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);
var options = {
    position: 'topright',
    draw: {
        marker: false,
        polyline: false,
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: 'We dont like polygons with self intersecrtion!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        circlemarker: false,
        circle: false,
        rectangle: false
    }
};

L.drawLocal.draw.toolbar.buttons.polygon = 'Draw';
var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    addGeoJson(e.layer.toGeoJSON(), "Run your intersectionquery on this polygon!");
});

