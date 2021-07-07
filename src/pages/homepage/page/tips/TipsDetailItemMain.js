import React from "react";
import "./TipsDetailItemMain.css";

export default function TipsDetailItemMain(props) {
  return (
    <div>
      {console.log(props)}
      <header></header>
      <main>
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div className="content">
                <h2>Title TIps</h2>
                <div className="tips-video">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/wHRXUeVsAQQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="tips-description">
                  <h2>Description</h2>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <h2>This is advisor</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
