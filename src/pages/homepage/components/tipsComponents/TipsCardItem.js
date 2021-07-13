import { Link, useHistory } from "react-router-dom";

export default function TipsCardItem(props) {
  // const history = useHistory();
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  if (props)
    return (
      <>
        <li className="cards__item col-3">
          {/* <Link className="cards__item__link" to={`/tips/${props.tipsId}`}>
            <figure
              className="cards__item__pic-wrap"
              data-category={props.label}
            >
              <div className="cards__item__img">
                <img
                  className="cards__item__img"
                  alt="Travel"
                  src={`https://img.youtube.com/vi/${props.src}/0.jpg`}
                />
              </div>
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">{props.text ? truncate(props.text, 22) : ""}</h5>
            </div>
          </Link> */}

          <div class="tips-card">
            <img
              src={`https://img.youtube.com/vi/${props.src}/0.jpg`}
              alt="tips"
            />
            <h3>{props.text ? truncate(props.text, 22) : ""}</h3>
            <Link className="cards__item__link" to={`/tips/${props.tipsId}`}>
              <p>
                <button>See more</button>
              </p>
            </Link>
          </div>
        </li>
      </>
    );
}
