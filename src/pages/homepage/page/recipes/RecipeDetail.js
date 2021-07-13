import { useEffect, useState } from "react";
import { useParams } from "react-router";
import IngredientService from "../../../../apis/IngredientService";
import RecipeServices from "../../../../apis/RecipeServices";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./RecipeDetail.scss";

const RecipeDetail = (props) => {
  const { recipeId } = useParams();
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [cardHeight, setCardHeight] = useState(1000);

  // const getHightElement = () => {
  //   // const height = document.getElementById('container').clientHeight;
  //   setCardHeight(ref.current.clientHeight);
  // }

  useEffect(() => {
    getRecipeById(recipeId);
    getIngredientById(recipeId);
    console.log(cardHeight);
  }, [cardHeight]);

  const getRecipeById = (id) => {
    RecipeServices.getRecipeByIdWithCategory(id)
      .then((response) => {
        console.log(response.data);
        setRecipeDetail(response.data);
        if(document.getElementById('card-rdi').clientHeight) setCardHeight(document.getElementById('card-rdi').clientHeight);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const getIngredientById = (id) => {
    IngredientService.getAllIngredientById(id)
      .then((response) => {
        console.log(response.data);
        setIngredient(response.data);
        if(document.getElementById('card-rdi').clientHeight) setCardHeight(document.getElementById('card-rdi').clientHeight);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <Navbar isActive={true} />
      <div className="recipe-bg">
        <img className="rd-bg" src={recipeDetail.recipeImage} alt="background" style={{height: `${cardHeight + 140}px`}}/>
        </div>
      <div className="recipe-detail">

        
        <div className="card-recipe-body">
          {recipeDetail ? (
            <div id="card-rdi" class="card-rd">
              <div class="card__title-box card--title">
                <h2>{recipeDetail.recipeName}</h2>
              </div>

              <div class="card__image--wrapper">
                <span class="card__food-type card--title">
                  {recipeDetail.foodCategories
                    ? recipeDetail.foodCategories
                        .map((fc) => {
                          return fc.foodCategoryName;
                        })
                        .join(", ")
                    : ""}
                </span>
                <img
                  src={recipeDetail.recipeImage}
                  alt=""
                  class="card__image"
                />
              </div>
              <div class="card__ingredients" style={{ marginTop: "16px" }}>
                <h3 class="card--title">Cooking Time</h3>
                <ul class="card_ingredients--wrapper">
                  <li>Cooking: {recipeDetail.prepTime} minutes</li>
                  <li>Prepare: {recipeDetail.cookTime} minutes</li>
                </ul>
              </div>
              <div class="card__ingredients">
                <h3 class="card--title">Ingredients</h3>
                <ul class="card_ingredients--wrapper">
                  {ingredient ? (
                    ingredient.map((ig) => {
                      return <li>{ig.ingredientName} {ig.ingredientQuantity} {ig.measurement}</li>;
                    })
                  ) : (
                    <div></div>
                  )}
                </ul>
              </div>

              <div class="card__directions">
                <h3 class="card--title">Description</h3>
                <p>
                  {recipeDetail.recipeDescription}
                </p>
              </div>
            </div>
          ) : (
            <h1>0 Record</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
