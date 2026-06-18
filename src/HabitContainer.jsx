import { useState } from "react";
import { useApp } from "./Store";
import HabitList from "./HabitList";

export default function HabitContainer() {
  const { habits, addHabit, toggleHabit } = useApp();
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() !== "") {
      addHabit(text);
      setText("");
    }
  }

  return (
    <>
      <input
        placeholder="Enter habit"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAdd}>Add Habit</button>

      <HabitList habits={habits} toggleHabit={toggleHabit} />
    </>
  );
}