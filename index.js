'use strict'

const apiKey = 'O1hykHcgTDB8Tv12NAWQ0G6DgAwQj88u2Ctgi0Wb';
const searchURL =  `https://developer.nps.gov/api/v1/parks`;

function getParks(parkQuery, stateQuery, maxResults=10) {
    const params = {
        key: apiKey,
        parkCode: parkQuery,
        stateCode: stateQuery,
        maxResults,
    }
}

function watchForm () {
    $('form').submit(event => {
        event.preventDefault();
        const parkSearch = $('#js-parkcode').val();
        const stateSearch = $('#js-statecode').val();
        const maxResults = $('#js-max-results').val();
        getParks(parkSearch, stateSearch, maxResults);
    });
}

$(watchForm);