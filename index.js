"use strict";

const apiKey = "O1hykHcgTDB8Tv12NAWQ0G6DgAwQj88u2Ctgi0Wb";
const searchURL = `https://developer.nps.gov/api/v1/parks`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for(let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li class="park-list">
            <p class="parkURL">${responseJson.data[i].url}<p>
            <a href="${responseJson.data[i].url}">
            <h3 class="park-names">${responseJson.data[i].fullName}</h3></a>
            <p>${responseJson.data[i].description}</p>
            <div class="address">
            <p>Physical Address:</p>
            <p>${responseJson.data[i].addresses[0].line1}</p>
            <p>${responseJson.data[i].addresses[0].line2}</p>
            <p>${responseJson.data[i].addresses[0].line3}</p>
            <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[1].stateCode} ${responseJson.data[i].addresses[1].postalCode}</p>
            </div>
            <br>
            </li>`
    )};

    $('#results').removeClass('hidden');
}

function getParks(stateQuery, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: stateQuery,
    limit: maxResults,
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("js-error-message").text(`Whoops! ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const stateSearch = $("#js-statecode").val();
    const maxResults = [$("#js-max-results").val()];
    getParks(stateSearch, maxResults);
  });
}

$(watchForm);
