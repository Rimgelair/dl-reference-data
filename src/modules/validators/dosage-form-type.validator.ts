import * as yup from "yup";

let newDosageFormTypeRequest = yup.object().shape({
  name: yup.string().min(1).required(),
  userId: yup.number().min(1).required(),
});

let updateDosageFormTypeRequest = yup.object().shape({
  name: yup.string().min(1).required(),
  userId: yup.number().min(1).required(),
});

export { newDosageFormTypeRequest, updateDosageFormTypeRequest };
