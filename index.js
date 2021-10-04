import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    webatlasTileLayer,
    WebatlasTileLayerTypes,
} from "leaflet-webatlastile";

import { getResults } from "./api/adressesok";

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

var results = [];

const autocomplete = document.getElementById("autocomplete");
const resultsHTML = document.getElementById("searchResults");
const searchResultHTML = document.getElementById("result");

autocomplete.oninput = async function () {
  const userInput = this.value;
  if (userInput.length > 0) {
    results = await getResults(userInput, apiKey);
    resultsHTML.innerHTML = results.map(res => "<li>" + res.Text + "</li>").join("");
  }
};

resultsHTML.onclick = async function (event) {
    const setValue = event.target.innerText;
    autocomplete.value = setValue;
    const adresse = results.filter(res => res.Text == setValue)[0];
    const latitude = adresse.PayLoad.Posisjon.Y;
    const longitude = adresse.PayLoad.Posisjon.X;

    map.setView([latitude, longitude], 13);

    searchResultHTML.innerHTML = "<p>Navn: " + adresse.PayLoad.Text + "</p>";
    searchResultHTML.innerHTML += "<p>Eiendomsident: " + adresse.PayLoad.AdresseMatrikkelNummer + "</p>";
    searchResultHTML.innerHTML += "<p>Latitude " + latitude + "</p>";
    searchResultHTML.innerHTML += "<p>Longitude " + longitude + "</p>";
    this.innerHTML = "";
};