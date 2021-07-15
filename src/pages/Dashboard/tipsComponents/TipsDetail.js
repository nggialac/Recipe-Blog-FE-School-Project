import React from "react";
import { Link } from "react-router-dom";

export default function TipsDetail(props) {
  const tips = props.location.state.tips;
  return (
    <div>
      <div className="main">
        <div className="ui centered" style={{textAlign: "center"}}>
          <div className="image">
            {/* <img src={``} alt="video" /> */}
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${tips.video}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content">
            <div className="header">{tips.title}</div>
            <div className="description" dangerouslySetInnerHTML={{ __html: tips.description }}></div>
          </div>
        </div>
        <div className="center-div">
          <Link to="/dashboard/tips">
            <button className="ui button blue center">Back to Tips List</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
