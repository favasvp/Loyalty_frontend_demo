import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
const navigate = useNavigate();
  const { useLogin } = useAuth();
  const { mutate: login, isLoading, error: loginError } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/dashboard"); // Navigate to dashboard on success
        },
      },
      {
        onError: (err) => {
          setError(err?.response?.data?.message || "Login failed. Please try again.");
        },
      }
    );
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: "0.5rem 0", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: "0.5rem 0", padding: "0.5rem" }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "0.5rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
        {loginError && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>
            {loginError?.response?.data?.message || "An error occurred"}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
