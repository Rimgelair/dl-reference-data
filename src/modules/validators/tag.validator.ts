import * as yup from "yup";

let newTagRequest = yup.object().shape({
  name: yup.string().min(1).required(),
  userId: yup.number().min(1).required(),
});

let updateTagRequest = yup.object().shape({
  id: yup.number().min(1).required(),
  name: yup.string().min(1).required(),
  userId: yup.number().min(1).required(),
});

export { newTagRequest, updateTagRequest };
