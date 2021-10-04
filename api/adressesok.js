export async function getResults(input, token) {
  const request = new Request(`https://www.webatlas.no/WAAPI-FritekstSok/suggest/kommunecustom?Targets=gateadresse&Query=${input}`, {
    method: "GET",
    headers: new Headers({
      'X-WAAPI-TOKEN': token,
      Accept: 'application/json; charset=utf-8'
    })
  });

  const res = await fetch(request);
  const jsonResponse = await res.json();
  return jsonResponse.Options;
}


  