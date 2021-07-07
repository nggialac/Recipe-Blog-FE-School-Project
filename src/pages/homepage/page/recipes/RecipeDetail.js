import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const RecipeDetail = props => {

  const [recipeDetail, setRecipeDetail] = useState([]);

  useEffect(()=>{
    console.log(props);
  })

  return (
    <div>
      <Navbar isActive={true} />
      <div>
        <div class="recipe-card">
          <div className="image-recipe"></div>
          <div class="recipe-card__body">
            <h1 class="recipe-card__heading">Oatmeal Cookies</h1>
            <h2 class="recipe-card__subhead">
              Crunchy around the edges, softer in the center, these oatmeal
              cookies feature the nutty taste and nubbly texture of oats.{" "}
            </h2>

            <ul class="recipe-card__nav">
              <li>
                <h3 class="active">Ingredients</h3>
              </li>
              <li>
                <h3>Method</h3>
              </li>
            </ul>

            <ul class="recipe-card__ingredients">
              <li>&frac14; cup unsalted butter</li>
              <li>&frac14; cup vegetable shortening</li>
              <li>&frac12; cup light brown sugar</li>
              <li>&frac14; cup granulated sugar</li>
              <li>1 teaspoon vanilla extract</li>
              <li>1 &frac14; teaspoons ground cinnamon</li>
              <li>&#8539; teaspoon ground nutmeg</li>
              <li>1/2 teaspoon salt</li>
              <li>1 teaspoon cider or white vinegar*</li>
              <li>1 large egg</li>
              <li>&frac12; teaspoon baking soda</li>
              <li>&frac34; cup All-Purpose Flour</li>
              <li>1 &frac12; cups rolled oats</li>
              <li>1 cup golden raisins, optional</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RecipeDetail;