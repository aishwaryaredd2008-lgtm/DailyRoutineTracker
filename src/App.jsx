import "./App.css";
import { useState, useRef, Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AppProvider, useApp } from "./Store";
import ErrorBoundary from "./ErrorBoundary";

const HabitContainer = lazy(() => import("./HabitContainer"));

function Fallback() {
  return <h2>Loading...</h2>;
}

function Protected({ children }) {
  const { loggedIn } = useApp();
  return loggedIn ? children : <Navigate to="/" />;
}

function Login() {
  const { setLoggedIn } = useApp();
  const [email, setEmail] = useState("");
  const passRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (email.trim() === "" || passRef.current.value.trim() === "") {
      setError("Fill all fields");
    } else {
      setLoggedIn(true);
      navigate("/dashboard");
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        ref={passRef}
      />

      <button onClick={handleLogin}>Login</button>
      <p className="error">{error}</p>
    </div>
  );
}

function Dashboard() {
  const { habits, completed, pending } = useApp();

  return (
    <div className="card">
      <h2>Daily Routine Tracker</h2>

      <nav>
        <Link to="/dashboard">Home</Link> |{" "}
        <Link to="/dashboard/habits">Habits</Link>
      </nav>

      <Routes>
        <Route
          index
          element={
            <>
              <h3>Total Habits: {habits.length}</h3>
              <h3>Completed: {completed}</h3>
              <h3>Pending: {pending}</h3>
            </>
          }
        />

        <Route
          path="habits"
          element={
            <Suspense fallback={<Fallback />}>
              <HabitContainer />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

function HabitDetails() {
  const { id } = useParams();
  const { habits } = useApp();

  const habit = habits.find((h) => h.id === Number(id));

  return (
    <div className="card">
      <h2>Habit Details</h2>

      {habit ? (
        <>
          <p>ID: {habit.id}</p>
          <p>Name: {habit.name}</p>
          <p>Status: {habit.done ? "Completed" : "Pending"}</p>
        </>
      ) : (
        <p>Habit not found</p>
      )}

      <Link to="/dashboard/habits">Back</Link>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard/*"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />

            <Route
              path="/habit/:id"
              element={
                <Protected>
                  <HabitDetails />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}