import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TipsCard from "./TipsCard";
import Pagination from "@material-ui/lab/Pagination";

function TipsList(props) {
  const [tips, setTips] = useState([]);
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

  const deleteTipsHandler = (id) => {
    props.getTipsId(id);
  };

  const paginate = () =>{
    const params = getRequestParams(searchName, page, pageSize);
    props.retrieveTipsPages(params);
  } 

  useEffect(() => {
    // console.log(props);
    paginate();
  }, [page, pageSize]);


  return (
    <div className="main-tips">
      <h2>
        Tips List
        {/* <Link to={`/dashboard/tips`}>
          <button className="ui button pink right">Back</button>
        </Link> */}
        <Link to={`/dashboard/tips/add`}>
          <button className="ui button blue right">Add Tips</button>
        </Link>
      </h2>
      <div className="ui celled list">
        {props.tips.map((data) => {
          return (
            <TipsCard
              tips={data}
              clickHander={deleteTipsHandler}
              key={data.tipsId}
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
  );
}

export default TipsList;
