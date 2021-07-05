import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardGeneral from "./pages/Dashboard/DashboardGeneral";
import LoginGeneral from "./pages/login/LoginGeneral";
// import Login from "./pages/login/Login";
import SearchGeneral from "./pages/home/SearchGeneral";
import HomeRecipe from "./pages/home/components/HomeRecipe";
import HomeApp from "./pages/homepage/page/HomeApp";

// import BlankPage from "./pages/blankpage/BlankPage";
import RecipeList from "./pages/Dashboard/ListRecipe";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/search">
            <SearchGeneral />
          </Route>
          <Route path="/home/recipe/:id">
            <HomeRecipe />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/dashboard">
            <DashboardGeneral />
          </Route>
          {/* <Route exact path="/dashboard/recipe">
            <RecipeList />
          </Route> */}
        </Switch>
        <Switch>
          <Route exact path="/login">
            <LoginGeneral />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/" component={HomeApp}/>
        </Switch>
        {/* <Switch>
          <Route path="*" component={BlankPage}/>
        </Switch> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
