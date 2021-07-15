import React, { useState, useEffect } from "react";
import IngredientService from "../../apis/IngredientService";
import { useParams } from "react-router-dom";
// import Container from "@material-ui/core/Container";
import {
  TextField,
  Container,
  makeStyles,
  Button,
  IconButton,
  Icon,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Ingredient(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [ingredient, setIngredient] = useState([]);
  const [firstData, setFirstData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  const handleChangeInput = (id, event, stt) => {
    const values = ingredient.map((i, index) => {
      if (id === i.ingredientId) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setIngredient(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempFirstDataId = [];
    firstData.map((ing) => {
      tempFirstDataId.push(ing["ingredientId"]);
    });
    let tempDataId = [];
    ingredient.map((ing) => {
      tempDataId.push(ing["ingredientId"]);
    });
    let removeList = tempFirstDataId.filter((e) => !tempDataId.includes(e));
    removeList.map((orderId) => {
      return removeIngredient(orderId);
    });

    ingredient.map((ing, index) => {
      if (
        ing.ingredientId !== undefined &&
        ing.ingredientName !== "" &&
        ing.ingredientQuantity > 0 &&
        ing.measurement !== ""
      )
        updateIngredient(ing.ingredientId, ing);
      else if (
        ing.ingredientId === undefined &&
        ing.ingredientName !== "" &&
        ing.ingredientQuantity > 0 &&
        ing.measurement !== ""
      )
        createIngredient(ing);
      else alert("Failed!");
    });
    // let checker = (arr, target) => target.every(v => arr.includes(v));

    //setCount(0);
    setSubmitted(true);
  };

  const handleCancel = () => {
    props.history.push(`/dashboard/recipe`);
  };

  const handleAddFields = (index) => {
    console.log(index);
    const fields = [...ingredient];
    fields.splice(index + 1, 0, {
      // ingredientId: 9999,
      ingredientName: "",
      ingredientQuantity: 0,
      measurement: "",
    });
    setCount(1);
    setIngredient(fields);
    console.log(ingredient);
  };

  const handleRemoveFields = (id) => {
    const values = [...ingredient];
    values.splice(
      values.findIndex((value) => value.ingredientId === id),
      1
    );
    setIngredient(values);
    console.log(values);
  };

  useEffect(() => {
    getIngredient();
    // if (submitted) {
    // props.history.push(`/dashboard/recipe/${id}/ingredient-adding`);
    // alert("success!");
    // props.history.push(`/dashboard/recipe`);
    
    if (submitted) 
    {
      setCount(0);
      setSubmitted(false);
    }
  }, [submitted]);

  const getIngredient = () => {
    IngredientService.getAllIngredientById(id)
      .then((response) => {
        setIngredient(response.data);
        setFirstData(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const createIngredient = async (data) => {
    IngredientService.createIngredientById(id, data)
      .then((response) => {
        console.log(response);
        // alert("success!");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const updateIngredient = async (orderId, data) => {
    IngredientService.updateIngredientById(id, orderId, data)
      .then((response) => {
        console.log(response);
        // alert("success!");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeIngredient = async (orderId) => {
    IngredientService.removeAIngredientById(id, orderId)
      .then((response) => {
        console.log(response);
        // alert("success!");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className="container">
      <h1>Add Ingredients</h1>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <form className={classes.root} onSubmit={async () => handleSubmit}>
          {ingredient.length > 0 ? (
            ingredient.map((ing, index) => (
              <div key={ing.ingredientId}>
                <TextField
                  variant="filled"
                  label="Name"
                  name="ingredientName"
                  type="text"
                  value={ing.ingredientName}
                  onChange={(event) =>
                    handleChangeInput(ing.ingredientId, event, index)
                  }
                  required
                />
                <TextField
                  variant="filled"
                  label="Quantity"
                  name="ingredientQuantity"
                  type="number"
                  value={ing.ingredientQuantity}
                  onChange={(event) =>
                    handleChangeInput(ing.ingredientId, event, index)
                  }
                  required
                />
                <TextField
                  variant="filled"
                  label="Measurement"
                  name="measurement"
                  type="text"
                  value={ing.measurement}
                  onChange={(event) =>
                    handleChangeInput(ing.ingredientId, event, index)
                  }
                  required
                />
                <IconButton
                  onClick={() => handleRemoveFields(ing.ingredientId)}
                >
                  <RemoveIcon />
                </IconButton>
                {count === 0 ? (
                  <IconButton onClick={() => handleAddFields(index)}>
                    <AddIcon />
                  </IconButton>
                ) : (
                  <div>{console.log(count)}</div>
                )}
              </div>
            ))
          ) : (
            <Button
              className={classes.button}
              variant="contained"
              color="default"
              type="submit"
              onClick={() => handleAddFields(-1)}
            >
              Add New Ingredient
            </Button>
          )}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
      </Container>
    </div>
  );
}
