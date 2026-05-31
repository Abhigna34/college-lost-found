import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      alert("Login Successful");

      navigate("/");

      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-cyan-600 p-12">

          <div className="mb-8">
            <ShieldCheck
              size={70}
              className="text-white"
            />
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Lost & Found Portal
          </h1>

          <p className="text-blue-100 text-lg mt-6">
            Helping people reconnect with
            their belongings through a smart
            and secure platform.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
              📦 Track Lost Items
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
              🔍 Search Found Items
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
              🛡 Secure User Access
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="bg-slate-900 p-8 md:p-12 flex items-center">

          <form
            onSubmit={handleSubmit}
            className="w-full"
          >

            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome Back
            </h2>

            <p className="text-slate-400 mb-8">
              Login to continue
            </p>

            {/* EMAIL */}

            <div className="relative mb-5">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
              />

            </div>

            {/* PASSWORD */}

            <div className="relative mb-6">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >
              Login
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-slate-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300"
              >
                Register
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;