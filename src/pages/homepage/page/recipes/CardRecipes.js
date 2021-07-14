import "../../css/Cards.css";
import CardItem from "../../components/CardItem";
import {Link} from "react-router-dom";

const CardRecipes = (props) => {
  return (
    <div>
      {/* <div className="cards">
        <div className="cards__container"> */}
          {/* <div className="cards__wrapper"> */}
            {/* <ul className="cards__items row">
              {props.recipes ? (
                props.recipes.map((recipe) => {
                  return (
                    <CardItem
                      recipeId={recipe.recipeId || ""}
                      src={recipe.recipeImage || ""}
                      text={recipe.recipeName || ""}
                      label="Recipe"
                      path={`/${recipe.recipeId || ""}`}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </ul> */}
          {/* </div> */}
          <div className="container">
      <div className="row">
        {props.recipes.map((recipe) => {
          return (
            <div
              className="col-md-4"
              key={recipe.recipeId}
              style={{ marginBottom: "2rem" }}
            >
              <div className="recipes__box">
                <img
                  className="recipe__box-img"
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                />
                <div className="recipe__text">
                  <h2 className="recipes__title" style={{fontSize: "1.5rem", color: "#e74c3c"}}>
                    {recipe.recipeName.length < 30
                      ? `${recipe.recipeName}`
                      : `${recipe.recipeName.substring(0, 24)}...`}
                  </h2>
                  {/* <p className="recipes__subtitle">
                  Publisher: <span>{recipe.publisher}</span>
                </p> */}
                </div>
                
                <button className="recipe_buttons">
                  <Link to={`/recipe/${recipe.recipeId}`}><h3>View More</h3></Link>
                  {/* <Link to={generatePath(`${url}/:id`, { recipeId })}>View Detail</Link> */}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
        {/* </div>
      </div> */}
    </div>
  );
};
export default CardRecipes;
