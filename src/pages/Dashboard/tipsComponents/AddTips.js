import { useState, useEffect, useRef } from "react";
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
}));

export default function AddTips(props) {
  const state = {
    title: "",
    description: "",
    author: "",
    video: "",
  };

  const [tips, setTips] = useState(state);
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setTips({ ...tips, [name]: value });
  };

  const handleOnChange = (e, editor) => {
    const text = editor.getData();
    setTips({ ...tips, description: text });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tips.title === "" || tips.description === "" || tips.video === "") {
      console.log(tips);
      alert("Invalid Data!");
      return;
    }
    props.addTipsHandler(tips);
    // props.history.push(props.match.path);
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="ui main">
      <h2>Add Course</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <h4>Title</h4>
          <TextField
            // className={}
            required
            rows={300}
            type="text"
            name="title"
            placeholder="Title"
            value={tips.title}
            onChange={handleChangeInput}
            style={{ width: 1096 }}
          />
        </div>
        <div className="field">
          <h4>Author</h4>
          <TextField
            // className={}
            required
            rows={300}
            type="text"
            name="author"
            placeholder="Author"
            value={tips.author}
            onChange={handleChangeInput}
            style={{ width: 1096 }}
          />
        </div>
        <div className="field">
          <h4>Video ID</h4>
          <TextField
            // className={}
            required
            rows={300}
            type="text"
            name="video"
            placeholder="Video"
            value={tips.video}
            onChange={handleChangeInput}
            style={{ width: 1096 }}
          />
        </div>
        <div className="field">
          <h4>Description</h4>
          <div className="form-group editor">
            <CKEditor
              editor={ClassicEditor}
              data={tips.description}
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
        <Link to={`/dashboard/tips`} className="link">
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
}
