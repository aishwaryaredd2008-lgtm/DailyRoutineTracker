import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const completed = habits.filter((h) => h.done).length;
  const pending = habits.length - completed;

  function addHabit(name) {
    setHabits([
      ...habits,
      {
        id: Date.now(),
        name,
        done: false,
      },
    ]);
  }

  function toggleHabit(id) {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, done: !h.done } : h
      )
    );
  }

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        habits,
        addHabit,
        toggleHabit,
        completed,
        pending,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}