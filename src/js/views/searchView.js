import { elements } from './base';

export const getInput = () => elements.searchInput.value;

// clearing the input field
export const clearInput = () => {
    elements.searchInput.value = '';
};

// c;earing the results list
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

/*
// 'pasta with tomato and spinach'
acc: 0 / acc + cur.length =5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'Tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'Tomato']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'Tomato']
*/
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) =>{
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}


/*
// alternate solution for limitRecipeTitle function
const limitRecipeTitle = ( title, limit = 17 ) => {
    let shortenedTitle = title
 
    if( title.length > limit )
    {
        const index = title.substring( 0, limit ).lastIndexOf( ' ' );
        shortenedTitle = title.substring( 0, index );
    }
 
    return shortenedTitle;
};
*/

const renderRecipe = recipe => {
    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next' 
const createButton = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? page - 1 : page + 1}"></use>
                    </svg>
                    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Btn to go to next page
        button = createButton(page, 'next');
    } else if (page < pages){
        // Both btns
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10 ) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);      
    

    // render pagination button
    renderButtons(page, recipes.length, resPerPage);
};