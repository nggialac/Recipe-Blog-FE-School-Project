import { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import StepServices from "../../apis/StepServices";
// import "./css/steps.css";
// import parse from "html-react-parser";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Steps = (props) => {
  const [data, setData] = useState("");
  const [steps, setSteps] = useState();
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const classes = useStyles();
  const [done, setDone] = useState(false);

  const handleOnChange = (e, editor) => {
    const text = editor.getData();
    setData(text);
  };

  const handleSubmit = () => {
    saveSteps();
  };

  const handleCancel = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    getStepData();
    if (submitted) {
      props.history.push("/dashboard/recipe");
    }
  }, [submitted]);

  const getStepData = async () => {
    StepServices.getStepById(id)
      .then((response) => {
        console.log(response.data);
        if (response.data.stepsId !== null) setSteps(response.data);
        setDone(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveSteps = () => {
    if (steps === null || steps === undefined) {
      StepServices.createStepById(id, { stepDescription: data })
        .then((res) => {
          alert("Success!");
          setSubmitted(true);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      var updateData = {
        stepId: steps.stepId,
        stepDescription: data,
      };
      StepServices.updateStepById(id, updateData)
        .then((response) => {
          alert("Update Success!");
          setSubmitted(true);
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div>
          <h2>Adding Steps For</h2>
          <h2>{props.location.state.name}</h2>
        </div>
      </div>
      <div className="wrapper">
        <div className="form-group editor">
          {done ? (
            <CKEditor
              editor={ClassicEditor}
              data={steps.stepDescription}
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
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className="form-group">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            SAVE
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<DeleteIcon />}
            onClick={handleCancel}
          >
            CANCEL
          </Button>
        </div>
      </div>

      <div>
        {/* <h2>Content</h2>
        <p>{parse(data)}</p> */}
      </div>
    </div>
  );
};

export default Steps;
