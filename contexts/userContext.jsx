import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const UserContext = createContext();

const URL = "https://natours-api-chd9.onrender.com/api/v1";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const login = async (userCred) => {
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/users/login`, userCred, {
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.message);
      throw Error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const register = async (userCred) => {
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/users/signup`, userCred, {
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      // setUser(res.data);
    } catch (err) {
      console.log(err.response.data.message);
      throw Error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get(`${URL}/users/logout`, { withCredentials: true });
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    } catch (err) {
      console.log(
        err.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const getInitialUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/users/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.message);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    getInitialUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
