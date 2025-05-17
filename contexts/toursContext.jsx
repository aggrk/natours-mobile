import { createContext, useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const ToursContext = createContext();

const URL = "https://natours-api-chd9.onrender.com/api/v1";

export default function ToursProvider({ children }) {
  const [tours, setTours] = useState();
  const { user } = useUser();

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/tours`, {
        withCredentials: true,
      });
      const tourData = res.data.data.data;
      setTours(tourData);
      // Initialize favorites based on fetched tours
      setFavorites(
        tourData.reduce(
          (acc, tour) => ({ ...acc, [tour.id]: tour.isFavorite || false }),
          {}
        )
      );
    } catch (err) {
      const errMessage = err?.response?.data?.message;
      console.log(errMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTours();
    } else {
      setTours([]);
    }
  }, [user]);

  return (
    <ToursContext.Provider value={{ tours, fetchTours }}>
      {children}
    </ToursContext.Provider>
  );
}
