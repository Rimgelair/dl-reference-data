import * as yup from "yup";

let newActiveIngredientRequest = yup.object().shape({
  name: yup.string().min(1).required(),
  userId: yup.number().min(1).required(),
});

let updateActiveIngredientRequest = yup.object().shape({
  name: yup.string().min(1).required(),
  userId: yup.number().min(1).required(),
});

export { newActiveIngredientRequest, updateActiveIngredientRequest };
