import React from "react";
import { Link, Route, useHistory } from "react-router-dom";
import RecipeDetail from "../page/recipes/RecipeDetail";

function CardItem(props) {
  const history = useHistory();
  if (props)
    return (
      <>
        <li className="cards__item col-3">
          <Link className="cards__item__link" to={`/recipe/${props.recipeId}`}>
            <figure
              className="cards__item__pic-wrap"
              data-category={props.label}
            >
              <img className="cards__item__img" alt="Travel" src={props.src} />
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">{props.text}</h5>
            </div>
          </Link>
        </li>
      </>
    );
}

export default CardItem;
