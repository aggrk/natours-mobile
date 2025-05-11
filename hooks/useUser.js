import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function useUser() {
  const context = useContext(UserContext);
  return context;
}
