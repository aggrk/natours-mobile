import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function useValidation(mode) {
  let schema;

  if (mode === "register") {
    schema = yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must have atleast 8 characters")
        .required("Password is required"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("You must confirm your password"),
    });
  } else if (mode === "login") {
    schema = yup.object().shape({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must have atleast 8 characters")
        .required("Password is required"),
    });
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  return { control, errors, handleSubmit };
}
