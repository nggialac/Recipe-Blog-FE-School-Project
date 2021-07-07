import { useState, useEffect } from "react";
import RecipeServices from "../../../../apis/RecipeServices";
import Pagination from "@material-ui/lab/Pagination";
import "./RecipesMain.css";
import Cards from "../../components/Cards";

export default function RecipesMain() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchName, setSearchName] = useState();
  const pageSizes = [5, 10, 20];

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["pageNumber"] = page - 1;
    }

    if (pageSize) {
      params["pageSize"] = pageSize;
    }
    return params;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const getCourses = () => {
    const params = getRequestParams(searchName, page, pageSize);
    RecipeServices.getAllRecipe_Page(params)
      .then((response) => {
        let temp = response.data.recipes;
        setRecipes(temp);
        setCount(response.data.totalPages);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      </div>

      <div className="list-recipes">
        <Cards recipes={recipes}/>
      </div>
    </div>
  );
}
