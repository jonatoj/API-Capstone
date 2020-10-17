'use strict';


//This function binds the query params together//
function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


// This function erases information in the DOM and replaces it with updated recipe name, image and number of minutes to it//
function displayResults(responseJson, maxRecipe) {
    $('.js-error').empty();
    $('.results-list').empty();


    for (let i = 0; i < responseJson.results.length & i < maxRecipe; i++) {
        $('.results-list').append(
            `<li class="jsform"><h3>${responseJson.results[i].title}</h3>
            <a href="${responseJson.results[i].spoonacularSourceUrl}"><img src="${responseJson.results[i].image}" alt="Food Recipe's Picture"></a>
            <p>Ready in ${responseJson.results[i].readyInMinutes} minutes</p>
             </li>`);
    }

    $('.results').removeClass('hidden')

}


// This function uses the parameters to them fetch the information from the server//
function getRecipe(recipe, maxRecipe=10, apiKey, searchURL, recipeInfo) {
    const params = {
        cuisine: recipe,
        number: maxRecipe,
        apiKey: apiKey,
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString

    fetch(url) 
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText)
    })

    .then(responseJson => displayResults(responseJson, maxRecipe))
    .catch(err => {
        $('.js-error').text(`Something went wrong: ${err.message}`);
    });
}


// This function renders the form to the DOM when the form is submitted//
function watchForm() {
    $('form').submit(event => {
        event.preventDefault(); 
        const recipe = $('#js-recipe').val()
        const maxRecipe = $('#js-totalRecipe').val()
        const apiKey = '53c819adac0245b5832e140e4f040b10';
        const searchURL = 'https://api.spoonacular.com/recipes/complexSearch';
        getRecipe(recipe, maxRecipe, apiKey, searchURL)
    })
}

$(watchForm);
