import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    webatlasTileLayer,
    WebatlasTileLayerTypes,
} from "leaflet-webatlastile";

import { intersectionByCoordinate } from './api/datavarehus';
import { setCurrentMapFeature } from './state/mapfeature';
import { removeMapFeatureIfExists } from './utils/maputil';

//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
var map = L.map('mapid').setView([58.14615, 7.99573], 13);

var apiKey = '';

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


async function onMapClick(e) {

    var dataset = '72'; //Radon
    var res = await intersectionByCoordinate(e.latlng.lat, e.latlng.lng, dataset); //Dvh call 
    
    if(res.features.length != 0){
        removeMapFeatureIfExists();
        var featureRes = L.geoJSON(res).bindPopup(function (layer) {
            return `Treff på radon: ${layer.feature.properties.aktso_navn}`;
        }).addTo(map);
        setCurrentMapFeature(featureRes);
    }
    else
    {
        removeMapFeatureIfExists();
        L.popup().setLatLng(e.latlng).setContent('No radon over here').openOn(map);
    }
}
map.on('click', onMapClick);


