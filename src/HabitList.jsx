import { Link } from "react-router-dom";

export default function HabitList({ habits, toggleHabit }) {
  return (
    <>
      {habits.map((h) => (
        <div className="habit" key={h.id}>
          <input
            type="checkbox"
            checked={h.done}
            onChange={() => toggleHabit(h.id)}
          />

          <Link to={`/habit/${h.id}`}>{h.name}</Link>
        </div>
      ))}
    </>
  );
}