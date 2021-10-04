
var dvhToken = ''; 

export var intersectionByGeometry = async(geom, id) => {
  const query = `https://datavarehus.api.norkart.no/v2/datasets/features/intersectionquery`;
  const res = await fetch(query, {
      method: 'POST',
      headers: {
        Accept: 'application/json, */*',
        'X-WAAPI-TOKEN': `${dvhToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'ids' : [id], 'geometry': geom, 'mapAttributes': false, 'clipBuffer': 0 }),
    });
  const json = await res.json();
  return json[id];
}
