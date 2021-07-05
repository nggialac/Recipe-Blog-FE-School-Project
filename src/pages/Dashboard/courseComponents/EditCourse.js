import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EditCourse = (props) => {
  const state = {
    courseId: 0,
    courseName: "",
    courseContent: "",
    courseImage: "",
    createBy: "",
    createDate: null,
  };

  const [course, setCourse] = useState(state);
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course.courseName === "" || course.courseContent === "") {
      alert("Invalid Data!");
      return;
    }
    props.updateCourseHandler(course);
    // setCourse({ courseName: "", courseContent: "", courseImage: "" });
    props.history.push(props.match.path);
  };

  useEffect(() => {
    console.log(props);
  }, []);

  // const handleCancel = () => {
  //   props.history.push("/dashboard/");
  // };

  return (
    <div className="ui main">
      <h2>Add Course</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <TextField
            required
            label="Required"
            type="text"
            name="courseName"
            placeholder="Name"
            value={course.courseName}
            onChange={handleChangeInput}
          />
        </div>
        <div className="field">
          <TextField
            required
            label="Required"
            type="text"
            name="courseContent"
            placeholder="Content"
            value={course.courseContent}
            onChange={handleChangeInput}
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
        <Link to={`/dashboard/recipe/${props.recipeId}/course`} className="link">
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
  );
};

export default EditCourse;
