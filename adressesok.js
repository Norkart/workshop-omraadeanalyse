const data = ["wergelands", "blue", "green", "yellow", "purple", "orange", "black", "white", "brown"];

const autocomplete = document.getElementById("autocomplete");
const resultsHTML = document.getElementById("results");

autocomplete.oninput = async function () {
    const userInput = this.value;
    resultsHTML.innerHTML = "";
    if (userInput.length > 0) {
      const results = await getResults(userInput)
      resultsHTML.style.display = "block";
      for (i = 0; i < results.length; i++) {
        resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
      }
    }
  };

  async function getResults(input) {
    const token = '';
    const request = new Request(`https://www.webatlas.no/WAAPI-FritekstSok/suggest/kommunecustom?Targets=gateadresse&Query=${input}`, {
      method: "GET",
      headers: new Headers({
        'X-WAAPI-TOKEN': token,
        Accept: 'application/json; charset=utf-8'
      })
    });

    const res = await fetch(request);
    const jsonResponse = await res.json();
    console.log(jsonResponse);
    const results = [];
    for (i = 0; i < jsonResponse.Options.length; i++) {
        results.push(jsonResponse.Options[i].Text);
    }
    return results;
  }

  resultsHTML.onclick = async function (event) {
    const setValue = event.target.innerText;
    autocomplete.value = setValue;
    console.log(setValue)
    this.innerHTML = "";
  };
  