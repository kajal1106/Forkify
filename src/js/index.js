import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search Object
 * - Current Recipe object
 * - Shopping list object
 * - Liked Recipe
 */
const state = {};

const controlSearch = async  () => {
    // 1. Get Query from view
    const query = searchView.getInput();
    console.log(query);

    if(query){
        // 2. New Search Object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    console.log(e.target);
});

const search = new Search('pizza');
console.log(search);
search.getResults();