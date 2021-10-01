
var dvhToken = ''; 

export async function intersectionByCoordinate(lat, lng, id) {
    const query = `https://datavarehus.api.norkart.no/v2/datasets/features/coordinatequery`;
    const res = await fetch(query, {
        method: 'POST',
        headers: {
          Accept: 'application/json, */*',
          'X-WAAPI-TOKEN': `${dvhToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'ids' : [id], 'lat': lat, 'lon': lng, 'mapAttributes': false }),
      });
    const json = await res.json();
    return json[id];
}
