import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import FoodCategoryService from "../../apis/FoodCategoryService";
import "./css/Fc.css";
import AddFc from "./FcComponents/AddFc";
import EditFc from "./FcComponents/EditFc";
import FcDetail from "./FcComponents/FcDetail";
import FcList from "./FcComponents/FcList";
import EditTips from "./tipsComponents/EditTips";

export default function FoodCategory() {
  const [fc, setFc] = useState([]);
  const [tempParams, setTempParams] = useState();
  const [count, setCount] = useState();

  const addFc = async (data) => {
    const request = {
      ...data,
    };
    console.log(request);

    FoodCategoryService.createFc(request)
      .then((response) => {
        console.log(response.data);
        setFc([...fc, response.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const retrieveFc = async () => {
  //   // setTempParams();
  //   FoodCategoryService.getAllCategory()
  //     .then((response) => {
  //       console.log(response.data);
  //       setFc(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

    const retrieveFc_Page = async (params) => {
    setTempParams(params);
    FoodCategoryService.getAllCategory_Page(params)
      .then((response) => {
        console.log(response.data);
        setFc(response.data.fcList);
        setCount(response.data.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateFc = async (temp) => {
    FoodCategoryService.updateFcByRecipe(temp.foodCategoryId, temp)
      .then((response) => {
        console.log(response.data);
        const { foodCategoryId, foodCategoryName, recipe } = response.data;
        setFc(
          fc.map((data) => {
            return data.foodCategoryName === foodCategoryName
              ? { ...response.data }
              : data;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFc = async (orderId) => {
    FoodCategoryService.deleteFc(orderId)
      .then((response) => {
        console.log(response.data);
        let newFcList = fc.filter((data) => {
          return data.foodCategoryId !== orderId;
        });
        setFc(newFcList);
      })
      .catch((e) => {
        // console.log(e);
        alert(e);
      });
  };

  useEffect(() => {
    // retrieveTips();
    retrieveFc_Page(tempParams);
  }, []);

  return (
    <div className="tips-wrapper">
      <div className="ui container">
        <Router>
          <div className="ui fixed">
            <div className="ui center">
              <h1>Food Category Manager</h1>
            </div>
          </div>

          <Switch>
            <Route
              path={`/dashboard/fc`}
              exact
              render={(props) => (
                <FcList
                  {...props}
                  fc={fc}
                  retrieveFc={retrieveFc_Page}
                  getFcId={removeFc}
                  count={count}
                />
              )}
            />
            <Route
              path={`/dashboard/fc/add`}
              render={(props) => <AddFc {...props} addFcHandler={addFc} />}
            />

            <Route
              path={`/dashboard/fc/edit`}
              render={(props) => (
                <EditFc {...props} updateFcHandler={updateFc} />
              )}
            />

            <Route path={`/dashboard/fc/detail/:id`} component={FcDetail} />

            {/* <Route path={"/dashboard"}><DashboardGeneral/></Route> */}
          </Switch>
        </Router>
      </div>
    </div>
  );
}
