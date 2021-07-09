import { useEffect } from "react";
import { Link } from "react-router-dom";

function FcDetail(props) {
    const fc = props.location.state.fc;
  return (
    <div>
      <div className="main-tips">
        <h2>
          Recipes By Category List
          <Link to={`/dashboard/fc`}>
            <button className="ui button pink right">Back</button>
          </Link>
        </h2>
        <div className="ui celled list">
            {console.log(fc)}
          {fc.recipe.length > 0 ? fc.recipe.map((data) => {
            return (
              <div className="item">
                <img
                  className="ui avatar image"
                  src={`${data.recipeImage}`}
                  alt="recipeImage"
                />
                <div className="content">
                  <div className="header">{data.recipeName}</div>
                </div>
              </div>
            );
          }): <h1>0 RECORD</h1>}
          ;
        </div>
      </div>
    </div>
  );
}

export default FcDetail;
