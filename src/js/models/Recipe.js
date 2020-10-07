import axios from 'axios';

export default class Recipe{
    constructor(id) {
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch (error){
            console.log(error);
            alert(`Opps! Something went wrong :(`);
        }
    }

    calcTime(){
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(this.numIng / 3);
        this.time = periods * 15;
    }

    calServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) =>{
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            // 3. Parse ingredients into count, unit and ingredients

            return ingredient;
        });
        this.ingredients = newIngredients;
    }
}