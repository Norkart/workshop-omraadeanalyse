# workshop-omraadeanalyse
Workshop for Linjeforeningen Hybrida 6/10-2021

## Komme i gang:
1. Klon prosjektet ```git clone https://github.com/Norkart/workshop-omraadeanalyse.git && cd Norkart/workshop-omraadeanalyse```
2. Installer yarn: ```npm install -g yarn```
3. Installer pakker: ```yarn```
4. Kjør opp prosjektet med ```yarn dev```
5. Nå kan du editere koden, ta utgangspunkt i src/index.js

## Oppgave

Som sagt er oppgaven å lage en client-side "områdeanalyse". 

Kort fortalt:

1. Presenter brukeren for et kart
2. Velg område å undersøke
   a. La bruker tegne et polygon i kartet (tips: [Leaflet.Draw][leaflet-draw])
   b. La bruker velge en eiendomsteig (tips: [WAAPI-Matrikkelkart][matrikkelkart])
3. Sjekk hvilke datasett som toucher området, ved bruk av [WAAPI-Datavarehus][datavarehus], [Dokumentasjon][dvh_dok]
   - [Liste over datasett](#datasett)
4. Presenter resultatet. Her kan dere gjøre mye, muligheter: vise geometrier, vise attributter, etc
 

## Forbedringer
1. La bruker definere en buffer rundt valgt område (tips: [Turf.js][turf])
2. Legg inn et søkefelt for å la bruker finne adresser (tips: [fritekstsøk][fritekst])

## Nøkkel
Nøkkel for tilgang til alle norkarts tjenester er 

  ```48252c1a-f12b-4fb5-913c-a2f3c1cc0a9e```


## Datasett

Nøkkelen dere har fått gir dere tilgang til 8 datasett i datavarehuset.

- **sv_svv_24_aadt** -  Trafikkmengde fra Statens Vegvesen
- **sv_ra_69_fredabygg** - Freda bygg fra Riksantikvaren
- **sv_ra_49_tettetrehusmiljoe**  - Tette trehusmiljøer fra Riksantikvaren
- **sv_nve_9_kvikkleiresone** - Kvikkleiresoner fra NVE
- **sv_ngu_72_aktsomhetsomraade** - Radon aktsomhetsområde fra NGU
- **sv_kartverket_206_markagrense** - Markagrense fra Kartverket
- **sv_nibio_63_arealressursflate** - Dyrkbar jord fra NIBIO
- **sv_miljodir_34_kartlagtfriluftslivsomraade** - Karlagte verdisatte friluftsområde fra Miljødirektoratet




[leaflet-draw]: http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
[matrikkelkart]: https://www.webatlas.no/WAAPI-Matrikkelkart/swagger-ui
[datavarehus]: https://www.webatlas.no/WAAPI-Datavarehus/swagger-ui/
[turf]: https://turfjs.org
[fritekst]: https://github.com/Norkart/API-documentation/tree/main/code_and_tutorials/getting%20started%20-%20fritekstsok
[dvh_dok]: https://github.com/Norkart/API-documentation/tree/main/API-datavarehus