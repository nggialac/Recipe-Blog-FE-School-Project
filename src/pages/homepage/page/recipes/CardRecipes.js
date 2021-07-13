import "../../css/Cards.css";
import CardItem from "../../components/CardItem";

const CardRecipes = (props) => {
  return (
    <div>
      <div className="cards">
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items row">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardRecipes;
