import React from 'react'

export default function Home(props) {

    const displayRecipes = (props) => {
        const recipes = props.recipe;
        console.log(props);
        console.log(recipes);
    
        if(recipes.length > 0) {
          recipes.map((recipe, index) => {
            console.log(recipe);
            return (
              <div className="recipe" key={recipe.recipeId}>
                <h3>{recipe.prepTime}</h3>
                <h3>{recipe.cookTime}</h3>
              </div>
              )
          })
        }
        else{
          return (<h3>No Recipes yet</h3>);
        }
      }


      return (
        <div className="App">
          {() => displayRecipes(props)}
        </div>
      );
    
}
