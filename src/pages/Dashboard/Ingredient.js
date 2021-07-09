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

  const handleChangeInput = (id, event) => {
    const values = ingredient.map((i) => {
      if (id === i.ingredientId) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setIngredient(values);
  };

  const handleSubmit = async (e) => {

    let tempFirstDataId = [];
    firstData.map((ing) => {
      tempFirstDataId.push(ing["ingredientId"]);
    });
    let tempDataId = [];
    ingredient.map((ing) => {
      tempDataId.push(ing["ingredientId"]);
    });
    let removeList = tempFirstDataId.filter((e) => !tempDataId.includes(e));
    removeList.map(orderId => {
      removeIngredient(orderId);
    })

    ingredient.map((ing, index) => {
      if (ing.ingredientId !== undefined)
        updateIngredient(ing.ingredientId, ing);
      else if (ing.ingredientId === undefined) createIngredient(ing);
    });
    // let checker = (arr, target) => target.every(v => arr.includes(v));

    setSubmitted(true);
  };

  const handleCancel = () => {
    setSubmitted(true);
  };

  const handleAddFields = (index) => {
    console.log(index);
    const fields = [...ingredient];
    fields.splice(index + 1, 0, {
      ingredientName: "",
      ingredientQuantity: 0,
      measurement: "",
    });
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
    console.log(ingredient);
    if (submitted) {
      props.history.push("/dashboard/recipe");
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

  const createIngredient = (data) => {
    IngredientService.createIngredientById(id, data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const updateIngredient = (orderId, data) => {
    IngredientService.updateIngredientById(id, orderId, data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeIngredient = (orderId) => {
    IngredientService.removeAIngredientById(id, orderId)
    .then((response)=>{
      console.log(response);
    })
    .catch((e) => {
      alert(e);
    })
  }

  return (
    <div className="container">
      <h1>Add Ingredients</h1>
      <Container style={{display: "flex", justifyContent: "center"}}>
        <form className={classes.root} onSubmit={async () => handleSubmit}>
          {ingredient.length > 0 ? ingredient.map((ing, index) => (
            <div key={ing.ingredientId}>
              <TextField
                variant="filled"
                label="Name"
                name="ingredientName"
                type="text"
                value={ing.ingredientName}
                onChange={(event) => handleChangeInput(ing.ingredientId, event)}
                required
              />
              <TextField
                variant="filled"
                label="Quantity"
                name="ingredientQuantity"
                type="number"
                value={ing.ingredientQuantity}
                onChange={(event) => handleChangeInput(ing.ingredientId, event)}
                required
              />
              <TextField
                variant="filled"
                label="Measurement"
                name="measurement"
                type="text"
                value={ing.measurement}
                onChange={(event) => handleChangeInput(ing.ingredientId, event)}
                required
              />
              <IconButton onClick={() => handleRemoveFields(ing.ingredientId)}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleAddFields(index)}>
                <AddIcon />
              </IconButton>
            </div>
          )):           <Button
          className={classes.button}
          variant="contained"
          color="default"
          type="submit"
          onClick={() => handleAddFields(0)}
        >
          Add New Ingredient
        </Button>}
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
