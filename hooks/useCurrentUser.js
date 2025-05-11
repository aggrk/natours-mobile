import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

export default function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  return context;
}
