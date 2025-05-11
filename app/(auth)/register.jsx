import React, { useContext, useState } from "react";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Actions from "../../components/Actions";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useValidation } from "../../hooks/useValidation";
import useUser from "../../hooks/useUser";
import Error from "../../components/Error";

const Register = () => {
  const [error, setError] = useState(null);
  const { handleSubmit, control, errors } = useValidation("register");
  const { register, loading } = useUser();

  const onSubmit = async (data) => {
    try {
      await register(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Form title="Sign Up">
        {error && <Error message={error} />}
        <Input
          placeholder="Full Name"
          fieldName="name"
          control={control}
          errors={errors}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          fieldName="email"
          control={control}
          errors={errors}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          fieldName="password"
          control={control}
          errors={errors}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          fieldName="passwordConfirm"
          control={control}
          errors={errors}
        />
        <Button
          buttonName="Register"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <Actions message="Already have an account? Sign In" dest="/login" />
      </Form>
    </TouchableWithoutFeedback>
  );
};

export default Register;
