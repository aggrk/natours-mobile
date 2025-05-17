import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext();

const URL = "https://natours-api-chd9.onrender.com/api/v1";

export default function CurrentUserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // const [userUpdated, setUserUpdated] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/users/me`, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const changeUser = () => setUserUpdated((prev) => !prev);

  return (
    <CurrentUserContext.Provider
      value={{ loading, currentUser, changeUser: fetchUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
