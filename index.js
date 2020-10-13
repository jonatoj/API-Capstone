'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson, maxRecipe) {
    console.log(responseJson);
    $('.js-error').empty();
    $('.results-list').empty();

    for (let i = 0; i < responseJson.results.length & i < maxRecipe; i++) {
        $('.results-list').append(
            `<li><a href="${responseJson.results[i].spoonacularSourceUrl}"><h3>${responseJson.results[i].title}</a></h3>
            <img src="${responseJson.results[i].image}">
            <p>${responseJson.results[i].summary}</p>
        </li>`);
    }
    $('.results').removeClass('hidden')
}


function getRecipe(recipe, maxRecipe, apiKey, searchURL, recipeInfo) {
    const params = {
        includeIngredients: recipe,
        addRecipeInformation: true,
        number: maxRecipe,
        apiKey: apiKey,

    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString
    console.log(url);

    fetch(url) 
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxRecipe))
    .catch(err => {
        $('.js-error').text(`Something went wrong: ${err.message}`);
    });
}


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