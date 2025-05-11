import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Actions from "../../components/Actions";
import { Link, useRouter } from "expo-router";
import { useValidation } from "../../hooks/useValidation";
import useUser from "../../hooks/useUser";
import Error from "../../components/Error";

const Login = () => {
  const [error, setError] = useState(null);
  const { handleSubmit, control, errors } = useValidation("login");
  const { login, loading } = useUser();
  const router = useRouter();

  const onSubmit = async (data) => {
    setError(null);
    try {
      await login(data);
      router.replace("/(profile)");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Form title="Login">
        {error && <Error message={error} />}
        <Input
          placeholder="Username"
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
        <Button
          buttonName="Login"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <Actions message="No account? Sign Up" dest="/register">
          <Link
            href=""
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#1B4332",
              textDecorationLine: "underline",
              fontFamily: "Inter-Medium",
            }}
          >
            Forgot Password?
          </Link>
        </Actions>
      </Form>
    </TouchableWithoutFeedback>
  );
};

export default Login;
