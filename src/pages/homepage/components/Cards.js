import "../css/Cards.css";
import CardItem from "./CardItem";

function Cards(props) {
  return (
    <div className="cards">
      <h1 style={{paddingTop: "100px", marginTop: "100px"}}>Check out these RECIPES!</h1>
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
  );
}

export default Cards;
