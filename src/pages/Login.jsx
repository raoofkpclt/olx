import React, { useState, useEffect, useContext } from "react";
import { X, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../services/firebaseService";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import OlxLogo from "../assets/OlxLogo";

const Login = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const { login, user } = userContext;
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [errMsg, setErrMsg] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  },[user]);

  useEffect(() => {
    navigate(isLogin ? "/login" : "/register", { replace: true });
  }, [isLogin, navigate]);

  const validation = (type, value) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,14}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (isLogin && type === "username") return;

    switch (type) {
      case "username":
        if (value.trim().length === 0) {
          setErrMsg({ ...errMsg, usernameErr: "Please enter a username" });
        } else if (value.trim().length < 3) {
          setErrMsg({
            ...errMsg,
            usernameErr: "Username must be at least 3 characters long",
          });
        } else if (value.trim().length > 20) {
          setErrMsg({
            ...errMsg,
            usernameErr: "Username must be at most 20 characters long",
          });
        } else if (!usernameRegex.test(value)) {
          setErrMsg({
            ...errMsg,
            usernameErr:
              "Username can only contain letters, numbers, and underscores, and must start with a letter.",
          });
        } else {
          setErrMsg({ ...errMsg, usernameErr: "" });
        }
        break;

      case "email":
        if (value.trim().length === 0) {
          setErrMsg({ ...errMsg, emailErr: "Please enter your email" });
        } else if (!emailRegex.test(value)) {
          setErrMsg({
            ...errMsg,
            emailErr: "Please enter a valid email address",
          });
        } else {
          setErrMsg({ ...errMsg, emailErr: "" });
        }
        break;

      case "password":
        if (value.trim().length === 0) {
          setErrMsg({ ...errMsg, passwordErr: "Please enter your password" });
        } else if (value.length < 8) {
          setErrMsg({
            ...errMsg,
            passwordErr: "Password must be at least 8 characters long",
          });
        } else if (!passwordRegex.test(value)) {
          setErrMsg({
            ...errMsg,
            passwordErr:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).",
          });
        } else {
          setErrMsg({ ...errMsg, passwordErr: "" });
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = Object.keys(errMsg).every((key) => {
        return errMsg[key]?.trim().length === 0;
    });

    if (valid) {
        if (isLogin) {
            try {
                const response = await loginUser(formData.email, formData.password);
                if (response) {
                    console.log(response);
                    const { username, email, uid } = response;
                    login({ username, email, uid });
                    toast("User Login successfully");
                    navigate('/');
                } else {
                    toast("User Login failed");
                }
            } catch (err) {
                if (err instanceof Error) {
                    toast(err.message);
                } else {
                    toast("An Unexpected Error Occurred");
                }
            }
        } else {
            try {
                const response = await registerUser(
                    formData.username,
                    formData.email,
                    formData.password
                );
                if (response) {
                    console.log(response);
                    const { username, email, uid } = response;
                    login({ username, email, uid });
                    toast("User created successfully");
                    navigate('/');
                } else {
                    toast("User creation failed");
                }
            } catch (err) {
                if (err instanceof Error) {
                    toast(err.message);
                } else {
                    toast("An Unexpected Error Occurred");
                }
            }
        }
    }
};


  const handleChange = (e) => {
    validation(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/")}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="text-teal-700 text-3xl font-bold mb-6">
            <OlxLogo />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {isLogin ? "Login to OLX" : "Create an Account"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {errMsg.usernameErr && (
                <div className="flex items-center gap-2 p-2 text-red-600 bg-red-100 border border-red-400 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium">{errMsg.usernameErr}</p>
                </div>
              )}
            </>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {errMsg.emailErr && (
            <div className="flex items-center gap-2 p-2 text-red-600 bg-red-100 border border-red-400 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm font-medium">{errMsg.emailErr}</p>
            </div>
          )}

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {errMsg.passwordErr && (
            <div className="flex items-center gap-2 p-2 text-red-600 bg-red-100 border border-red-400 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm font-medium">{errMsg.passwordErr}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-700 text-white rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-semibold"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <p>
              New to OLX?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-teal-700 hover:underline font-semibold"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-teal-700 hover:underline font-semibold"
              >
                Login
              </button>
            </p>
          )}
        </div>

        <p className="mt-6 text-xs text-center text-gray-500">
          By continuing, you agree to OLX's Terms of Use and Privacy Policy
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
