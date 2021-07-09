import { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";

function EditFc(props) {
  const [fc, setFc] = useState();
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFc({ ...fc, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fc.description === "") {
      alert("the fields are mandatory!");
      return;
    }
    props.updateFcHandler(fc);
    // props.history.push("/dashboard/tips");
  };

  useEffect(() => {
    console.log(props.location.state);
    setFc(props.location.state.fc);
  }, []);
  return (
    <div>
      <div
        style={{ justifyContent: "center", textAlign: "center", marginTop: 30 }}
      >
        <div className="ui main">
          {/* <h2>Add Food Category</h2> */}
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
              <h4>Food Category Name</h4>
              {fc ? 
              <TextField
                rows={300}
                type="text"
                name="foodCategoryName"
                placeholder="Food Category Name"
                value={fc.foodCategoryName}
                onChange={handleChangeInput}
                style={{ width: 360 }}
              />:<h1>Loading...</h1>}
            </div>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              SAVE
            </Button>
            <Link to={`/dashboard/fc`} className="link">
              <Button
                variant="contained"
                color="secondary"
                // endIcon={<DeleteIcon />}
              >
                CANCEL
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFc;
