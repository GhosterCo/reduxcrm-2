import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    // age: yup.number().positive().integer().max(116).required(),
    email: yup.string().email().required(),
  })
  .required();

export default schema
