'use strict';	

//This function joins the query params together//	
function formatQueryParams(params) {	
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);	
    return queryItems.join('&');	
}

// This function erases information in the DOM and replaces it with meal type, cuisine, and images//	
function displayResults(responseJson, maxRecipe) {
    $('.js-error').empty();	
    $('.results-list').empty();	

    for (let i = 0; i < responseJson.results.length; i++) {	
        $('.results-list').append(	
            `<li><h3>${responseJson.results[i].title}</h3><a href="${responseJson.results[i].spoonacularSourceUrl}"><img src="${responseJson.results[i].image}" alt="Food Recipe's Picture"></a></li>`);	
        }	
        $('.results').removeClass('hidden')	
}	

// This function uses the parameters to them fetch the information from the server//	
function getRecipe(recipe, maxRecipe=20, mealType, apiKey, searchURL) {	
    const params = {	
        cuisine: recipe,	
        addRecipeNutrition: true,	
        number: maxRecipe,
        type: mealType,	
        apiKey: apiKey,
    };	

    const queryString = formatQueryParams(params)	
    const url = searchURL + '?' + queryString	

    fetch(url)
    .then(response => {	
        if(response.ok) {	
            return response.json();	
        }	
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
        const mealType = $('#js-mealType').val()	
        const apiKey = '53c819adac0245b5832e140e4f040b10';	
        const searchURL = 'https://api.spoonacular.com/recipes/complexSearch';	
        getRecipe(recipe, maxRecipe, mealType, apiKey, searchURL)	
    })	
}	

$(watchForm);
