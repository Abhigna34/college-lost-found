import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("User Registered Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl">

        {/* LEFT PANEL */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-cyan-600 p-12">

          <ShieldCheck
            size={70}
            className="text-white mb-8"
          />

          <h1 className="text-5xl font-bold text-white leading-tight">
            Join Lost & Found Portal
          </h1>

          <p className="text-blue-100 text-lg mt-6">
            Create an account and help people
            recover their lost belongings through
            a secure and smart platform.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
              📦 Report Lost Items
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
              🔍 Find Matching Reports
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
              🛡 Safe & Secure Access
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="bg-slate-900 p-8 md:p-12 flex items-center">

          <form
            onSubmit={handleSubmit}
            className="w-full"
          >

            <h2 className="text-4xl font-bold text-white mb-2">
              Create Account
            </h2>

            <p className="text-slate-400 mb-8">
              Register to continue
            </p>

            {/* NAME */}

            <div className="relative mb-5">

              <User
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
              />

            </div>

            {/* EMAIL */}

            <div className="relative mb-5">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              Register
            </button>

            <p className="text-center text-slate-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300"
              >
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;