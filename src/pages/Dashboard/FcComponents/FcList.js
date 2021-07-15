import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FcCard from "./FcCard";
import Pagination from "@material-ui/lab/Pagination";


export default function FcList(props) {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchName, setSearchName] = useState();
  const pageSizes = [5, 10, 20];

  const getRequestParams = (page, pageSize) => {
    let params = {};

    // if (searchName) {
    //   params["name"] = searchName;
    // }

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

  const paginate = () =>{
    const params = getRequestParams(page, pageSize);
    props.retrieveFc(params);
  } 

  const deleteFcHandler = (id) => {
    props.getFcId(id);
  };

  useEffect(() => {
    // console.log(props);
    // props.retrieveFc();
    paginate();
  }, [page, pageSize]);

  return (
    <div>
      <div className="main-tips">
        <h2>
          Food Category List
          {/* <Link to={`/dashboard/tips`}>
          <button className="ui button pink right">Back</button>
        </Link> */}
          <Link to={`/dashboard/fc/add`}>
            <button className="ui button blue right">Add Food category</button>
          </Link>
        </h2>
        <div className="ui celled list">
          {props.fc.map((data) => {
            return (
              <FcCard
                fc={data}
                clickHander={deleteFcHandler}
                key={data.foodCategoryId}
                // recipeId={props.recipeId}s
              />
            );
          })}
          ;
        </div>

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
            count={props.count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      </div>

      </div>
    </div>
  );
}
