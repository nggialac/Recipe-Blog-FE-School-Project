import { useEffect, useState } from "react";

import AboutUs from "./AboutUs";
import Home from "./Home";

import "../css/HomeApp.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RecipeDataService from "../../../apis/RecipeServices";
import CourseService from "../../../apis/CourseService";

import Recipes from "./recipes/Recipes";
import RecipeDetail from "./recipes/RecipeDetail";
import Courses from "./courses/Courses";
import CourseDetailItem from "./courses/CourseDetailItem";
import Tips from "./tips/Tips";
import TipsDetailItem from "./tips/TipsDetailItem";

function HomeApp() {
  const [recipes, setRecipes] = useState([]);
  const [courses, setCourses] = useState([]);

  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  // const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    getRecipes();
    getCourses();
  }, []);

  const getRequestParams = (page, pageSize) => {
    let params = {}
    if (page) {
      params["pageNumber"] = page - 1;
    }

    if (pageSize) {
      params["pageSize"] = pageSize;
    }

    return params;
  };


  const getRecipes = () => {
      const params = getRequestParams(1, 8);
      RecipeDataService.getAllRecipe_Page_Desc(params)
      .then((response) =>{
        const { recipes, totalPages } = response.data;
        setRecipes(recipes);
        console.log(response.data);
      } )
      .catch((e) => {
        console.log(e);
      })
  };

  const getCourses = () => {
    const params = getRequestParams(1, 8);
    CourseService.getAllCourse_Page_Desc(params)
    .then((response) =>{
      setCourses(response.data.content);
      console.log(response.data);
    } )
    .catch((e) => {
      console.log(e);
    })
};

  return (
    <>
      <Router>
      
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Home recipes={recipes} courses={courses} />}
          />
          <Route exact path="/recipes" component={Recipes} />
          <Route path="/recipe/:recipeId" component={()=> <RecipeDetail/>} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/courses/:id" component={CourseDetailItem} />
          <Route exact path="/tips" component={Tips} />
          <Route exact path="/tips/:id" component={TipsDetailItem} />
          <Route path="/about-us" component={AboutUs} />
          {/* <Route path="/sign-up" component={Signup} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default HomeApp;
