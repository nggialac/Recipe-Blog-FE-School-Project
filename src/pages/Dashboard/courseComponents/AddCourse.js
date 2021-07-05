import { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET,
} from "../../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const AddCourse = (props) => {
  const state = {
    courseName: "",
    courseContent: "",
    courseImage: "",
  };

  const [course, setCourse] = useState(state);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const fileSelect = useRef(null);
  const dropbox = useRef(null);
  const classes = useStyles();

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    console.log("handleFiles");
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      uploadFile(files[i]);
    }
    console.log(image);
  }

  function handleCancel() {
    setImage(null);
    setProgress(0);
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setImage(response.secure_url);
        setCourse({...course, courseImage: response.secure_url});
        console.log(response.secure_url);
      }
    };

    fd.append("upload_preset", NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET);
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  }

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleOnChange = (e, editor) => {
    const text = editor.getData();
    setCourse({...course, courseContent: text});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course.courseName === "" || course.courseContent === "") {
      alert("Invalid Data!");
      return;
    }
    props.addCourseHandler(course);
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
          <h4>Name</h4>
          <TextField
            // className={}
            required
            rows={300}
            type="text"
            name="courseName"
            placeholder="Name"
            value={course.courseName}
            onChange={handleChangeInput}
            style={{ width: 1096 }}
          />
        </div>
        <div className="field">
          <h4>Image</h4>
          <div style={{ justifyContent: "center", textAlign: "center" }}>
            <div
              ref={dropbox}
              className="upload-image center"
              style={{ display: "inline-block" }}
            >
              {image ? (
                <>
                  <img
                    alt=""
                    className="rounded-lg center"
                    src={image.replace("upload/", "upload/w_600/")}
                    style={{ height: 350, width: 600 }}
                  />
                  <div className="btn-upload-image flex justify-center items-center mt-2">
                    <button
                      className=" border-2 px-4 py-2 rounded w-1/2 btn-danger"
                      onClick={handleCancel}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div
                  className="bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg"
                  // style={{ height: 400, width: 600 }}
                >
                  <form className="flex justify-center items-center h-full">
                    {progress === 0 ? (
                      <div className="text-gray-700 text-center ">
                        <button
                          className="btn btn-primary"
                          onClick={handleImageUpload}
                          type="button"
                        >
                          Browse
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        <span className="text-gray-700">{progress}%</span>
                      </div>
                    )}

                    <input
                      ref={fileSelect}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="field">
          <h4>Content</h4>
          {/* <TextField
            required
            label="Required"
            type="text"
            name="courseContent"
            placeholder="Content"
            value={course.courseContent}
            onChange={handleChangeInput}
          /> */}

          <div className="form-group editor">
            <CKEditor
              editor={ClassicEditor}
              data={course.courseContent}
              onChange={handleOnChange}
              onReady={(editor) => {
                // console.log("Editor is ready to use!", editor);
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "340px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
            ></CKEditor>
          </div>
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
        <Link
          to={`/dashboard/recipe/${props.recipeId}/course`}
          className="link"
        >
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

export default AddCourse;
