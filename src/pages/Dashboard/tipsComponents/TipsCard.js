import {useEffect} from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";


export default function TipsCard(props) {
    useEffect(() => {
      // console.log(props);
    }, [])
    const {
      tipsId,
      title,
      description,
      video,
      author,
    } = props.tips;
    return (
      <div className="item">
        <img className="ui avatar image" src={`https://img.youtube.com/vi/${video}/0.jpg`} alt="user" />
        <div className="content">
          <Link
            to={{ pathname: `/dashboard/tips/detail/${tipsId}`, state: { tips: props.tips} }}
          >
            <div className="header">{title}</div>
            {/* <div>{description}</div> */}
          </Link>
        </div>
        <i
          className="trash alternate outline icon"
          style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
          onClick={() => props.clickHander(tipsId)}
        ></i>
        <Link to={{ pathname: `/dashboard/tips/edit`, state: { tips: props.tips } }}>
          <i
            className="edit alternate outline icon"
            style={{ color: "blue", marginTop: "7px" }}
          ></i>
        </Link>
      </div>
    );
}
