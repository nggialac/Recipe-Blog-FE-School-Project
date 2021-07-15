import { useState } from "react";
import UserServices from "../../../apis/UserServices";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import "../css/CreateUser.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    "& ": {
      margin: theme.spacing(1),
    },
  },
}));
export default function CreateUser() {
  const classes = useStyles();
  const state = {
    userName: "",
    password: "",
    fullName: "",
    status: true,
    role: "admin",
  };

  const [user, setUser] = useState(state);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userName === "" || user.password === "" || user.fullName === "") {
      console.log(user);
      alert("Invalid Data!");
      return;
    }
    createUser(user);
  };

  const createUser = (data) => {
    UserServices.createUser(data)
      .then((res) => {
        console.log(res);
        alert("Success!")
      })
      .catch((e) => {
        alert("Cannot create new account! Try login again.");
      });
  };

  return (
    <div>
      <h1>Create user</h1>
      <div className="ui container">
        <div class="">
          <div className="ui main">
            {/* <h2>Add User</h2> */}
            <form
              className="ui center form form-create-user"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <h4>Full Name</h4>
                <TextField
                  required
                  rows={100}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={user.fullName}
                  onChange={handleChangeInput}
                  style={{ width: 300 }}
                />
              </div>
              <div className="field">
                <h4>Username</h4>
                <TextField
                  // className={}
                  required
                  rows={100}
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={user.userName}
                  onChange={handleChangeInput}
                  style={{ width: 300 }}
                />
              </div>
              <div className="field">
                <h4>Password</h4>
                <TextField
                  // className={}
                  required
                  rows={100}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChangeInput}
                  style={{ width: 300 }}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                SAVE
              </Button>
              <Link to={`/dashboard/user`} className="link">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  // endIcon={<DeleteIcon />}
                >
                  CANCEL
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
