import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "./Toast";
import FlipLabel from "./FlipLabel";
import Button from "./Button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");
  const emailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  function validatePassword(input) {
    if (input.length < 8) {
      setToastType("error");
      setToastMessage("Password needs to be at least 8 characters");
      return false;
    }
    return true;
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!validatePassword(password)) return;

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToastType("error");
        setToastMessage(data.message || "Registration failed");
        return;
      }

      setToastType("success");
      setToastMessage("User created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setToastType("error");
      setToastMessage("Something went wrong");
    }
  }

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} type={toastType} />}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <FlipLabel />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Register a new account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <p className="mt-6 text-center text-sm/6 text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Sign in here
              </Link>
            </p>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
