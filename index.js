'use strict'

const apiKey = 'O1hykHcgTDB8Tv12NAWQ0G6DgAwQj88u2Ctgi0Wb';
const searchURL =  `https://developer.nps.gov/api/v1/parks?parkCode=hoba&stateCode=NC`;



function watchForm () {
    $('form').submit(event => {
        event.preventDefault();
        const parkSearch = $('#js-park-search').val();
        const maxResults = $('#js-max-results').val();
        getParks(parkSearch, maxResults);
    });
}

$(watchForm);