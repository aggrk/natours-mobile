import { useContext } from "react";

export default function useTours() {
  const context = useContext(ToursContext);

  return context;
}
