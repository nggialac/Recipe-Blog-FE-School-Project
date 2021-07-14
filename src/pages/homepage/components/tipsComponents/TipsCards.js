import "../../css/Cards.css";
import React from "react";
import TipsCardItem from "./TipsCardItem";

export default function TipsCards(props) {
  return (
    <div className="cards">
      <div className="container">
        {/* <div className="cards__wrapper">  */}
          <ul className="row">
            {props.tips ? (
              props.tips.map((tips) => {
                return (
                  <TipsCardItem
                    tipsId={tips.tipsId || ""}
                    src={tips.video || ""}
                    text={tips.title || ""}
                    content={tips.title || ""}
                    label="tips"
                    path={`/${tips.courseId || ""}`}
                  />
                );
              })
            ) : (
              <></>
            )}
          </ul>
        {/* </div> */}
      </div> 
    </div>
  );
}
