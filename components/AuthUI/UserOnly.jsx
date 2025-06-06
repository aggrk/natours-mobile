import { useEffect } from "react";
import { Text } from "react-native";
import useUser from "../../hooks/useUser";
import { useRouter } from "expo-router";

export default function UserOnly({ children }) {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/login");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    return <Text>Loading...</Text>;
  }

  return children;
}
