import React from "react";
import "./TipsDetailItemMain.css";
import { Route, Link } from "react-router-dom";

export default function TipsDetailItemMain(props) {
  return (
    <div key={props.tips.tipsId}>
      {console.log(props)}
      <main>
        <div class="container">
          <div class="row">
            <div class="col-md-8 tips-content">
              <div className="mb-4 box-shadow">
                <div className="card-body">
                  <div className="content">
                    <h2>{props.tips.title}</h2>
                    <h3>Author:{props.tips.author}</h3>
                    <div className="tips-video">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${props.tips.video}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="tips-description">
                      <h2>Description</h2>
                    </div>
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: props.tips.description,
                        }}
                      />
                      {/* {props.tips.description} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 tips-side">
              <div className="mb-4 box-shadow">
                <div className="card-body">
                  <h2>Some tips another: </h2>
                  <ul>
                    {props.anotherTips
                      ? props.anotherTips.map((data) => {
                          if (data.tipsId !== props.tips.tipsId)
                            return (
                              <Link to={`/tips/${data.tipsId}`}>
                                <li>
                                  <h3 style={{marginTop: "6px"}}>{data.title}</h3>
                                </li>
                              </Link>
                            );
                        })
                      : ""}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
