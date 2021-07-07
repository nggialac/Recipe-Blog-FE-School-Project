import TipsServices from "../../apis/TipsServices";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./css/Tips.css";
import TipsList from "./tipsComponents/TipsList";
import AddTips from "./tipsComponents/AddTips";
import EditTips from "./tipsComponents/EditTips";
import TipsDetail from "./tipsComponents/TipsDetail";

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [tempParams, setTempParams] = useState();
  const [count, setCount] = useState();

  const addTips = async (data) => {
    const request = {
      ...data,
    };
    console.log(request);

    TipsServices.createTips(request)
      .then((response) => {
        console.log(response.data);
        setTips([...tips, response.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // retrieveTips();
    retrieveTipsPage(tempParams);
  }, []);

  const retrieveTips = async () => {
    TipsServices.getAllTips()
      .then((response) => {
        console.log(response.data);
        setTips(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveTipsPage = async (params) => {
    setTempParams(params);
    TipsServices.getAllTips_Page(params)
      .then((response) => {
        console.log(response.data);
        setTips(response.data.tips);
        setCount(response.data.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTips = async (temp) => {
    TipsServices.updateTips(temp.tipsId, temp)
      .then((response) => {
        console.log(response.data);
        const { tipsId, title, description, author, video } = response.data;
        setTips(
          tips.map((data) => {
            return data.tipsId === tipsId ? { ...response.data } : data;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeCourse = async (orderId) => {
    TipsServices.removeTips(orderId)
      .then((response) => {
        console.log(response.data);
        let newTipsList = tips.filter((data) => {
          return data.tipsId !== orderId;
        });
        setTips(newTipsList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="tips-wrapper">
      <div className="ui container">
        <Router>
          <div className="ui fixed">
            <div className="ui center">
              <h1>Tips Manager</h1>
            </div>
          </div>

          <Switch>
            <Route
              path={`/dashboard/tips`}
              exact
              render={(props) => (
                <TipsList {...props} tips={tips} retrieveTipsPages={retrieveTipsPage} getTipsId={removeCourse} count={count}/>
              )}
            />
            <Route
              path={`/dashboard/tips/add`}
              render={(props) => (
                <AddTips {...props} addTipsHandler={addTips} />
              )}
            />

            <Route
              path={`/dashboard/tips/edit`}
              render={(props) => (
                <EditTips {...props} updateTipsHandler={updateTips} />
              )}
            />

            <Route path={`/dashboard/tips/detail/:id`} component={TipsDetail} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
