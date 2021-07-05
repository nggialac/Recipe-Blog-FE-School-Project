import { Link, useHistory } from "react-router-dom";

function CourseCardItem(props) {
  const history = useHistory();
  if (props)
    return (
      <>
        <li className="cards__item col-3">
          <Link className="cards__item__link" to={`/recipe/${props.courseId}`}>
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

export default CourseCardItem;
