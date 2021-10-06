# workshop-omraadeanalyse
Workshop for Linjeforeningen Hybrida 6/10-2021

## Komme i gang:
1. Klon prosjektet
2. Installer yarn: ```npm install -g yarn```
3. Installer pakker: ```yarn```
4. Kjør opp prosjektet med ```yarn dev```


## Oppgave

Som sagt er oppgaven å lage en client-side "områdeanalyse". 

Kort fortalt:

1. Presenter brukeren for et kart
2. Velg område å undersøke
   a. La bruker tegne et polygon i kartet (tips: [Leaflet.Draw][leaflet-draw])
   b. La bruker velge en eiendomsteig (tips: [WAAPI-Matrikkelkart][matrikkelkart])
3. Sjekk hvilke datasett som toucher området, ved bruk av [WAAPI-Datavarehus][datavarehus]
4. Presenter resultatet. Her kan dere gjøre mye, muligheter: vise geometrier, vise attributter, etc
 

Forbedringer
1. La bruker definere en buffer rundt valgt område (tips: [Turf.js][turf])




[leaflet-draw]: http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
[matrikkelkart]: https://www.webatlas.no/WAAPI-Matrikkelkart/swagger-ui
[datavarehus]: https://www.webatlas.no/WAAPI-Datavarehus/swagger-ui/
[turf]: https://turfjs.org