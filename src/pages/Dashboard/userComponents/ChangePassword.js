import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import UserServices from "../../../apis/UserServices";
import "../css/ChangePassword.css";

const useStyles = makeStyles((theme) => ({
  button: {
    "& ": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ChangePassword(props) {
  const classes = useStyles();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const getRequestParams = (oldpass, newpass) => {
    let params = {};

    if (oldpass) {
      params["oldpass"] = oldpass;
    }

    if (newpass) {
      params["newpass"] = newpass;
    }
    return params;
  };

  const changePass = async () => {
    const params = getRequestParams(oldPass, newPass);
    UserServices.changePassword(props.info.userId, params)
      .then((response) => {
        console.log(response.data);
        alert("Success!");
      })
      .catch((e) => {
        alert("Cannot change your password! Try login again.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPass === "" || newPass === "") alert("Invalid data!");
    changePass();
  };

  return (
    <div>
      <div className="container submit-form">
        <div className="main-change">
          <h1>Change your Password</h1>
          <form onSubmit={handleSubmit} className="form-changePass">
            <div className="form-group">
              <TextField
                label="Old Pass"
                name="oldpass"
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                required
                style={{ width: 300 }}
              />
            </div>
            <div className="form-group">
              <TextField
                label="New Pass"
                name="newpass"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                style={{ width: 300 }}
              />
            </div>
            <div className="form-group">
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Link to={`/dashboard/user`}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
