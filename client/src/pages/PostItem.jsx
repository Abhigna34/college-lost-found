import React, { useState } from "react";
import {
  Upload,
  Package,
  MapPin,
  Tag,
  FileText,
} from "lucide-react";
import axios from "axios";
import * as mobilenet from
"@tensorflow-models/mobilenet";

import "@tensorflow/tfjs";
function PostItem() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost"
  });

  const [image, setImage] = useState(null);




  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };




  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("status", formData.status);
      data.append("image", image);




      const response = await axios.post(

        "http://localhost:5000/api/items",

        data,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );




      alert(response.data.message);




      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        status: "lost"
      });

      setImage(null);




    } catch (error) {

  console.log(error);

  console.log(error.response);

  alert(
    error.response?.data?.message || error.message
  );

}

  };




  return (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-cyan-600 p-12">

        <Package
          size={70}
          className="text-white mb-8"
        />

        <h1 className="text-5xl font-bold text-white leading-tight">
          Report Lost & Found Items
        </h1>

        <p className="text-blue-100 text-lg mt-6">
          Submit detailed information about
          lost or found items and help reunite
          people with their belongings.
        </p>

        <div className="mt-10 space-y-4">

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
            📦 Item Information
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
            📍 Location Tracking
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-white">
            🔍 Smart Matching System
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="bg-slate-900 p-8 md:p-12">

        <h2 className="text-4xl font-bold text-white mb-2">
          Post Item
        </h2>

        <p className="text-slate-400 mb-8">
          Fill in the details below
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}

          <div className="relative">

            <Package
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              name="title"
              placeholder="Item Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
            />

          </div>

          {/* DESCRIPTION */}

          <div className="relative">

            <FileText
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              name="description"
              placeholder="Item Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
            />

          </div>

          {/* CATEGORY */}

          <div className="relative">

            <Tag
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
            />

          </div>

          {/* LOCATION */}

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
            />

          </div>

          {/* STATUS */}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white p-4 rounded-xl border border-slate-700 outline-none focus:border-blue-500"
          >
            <option value="lost">
              Lost
            </option>

            <option value="found">
              Found
            </option>
          </select>

          {/* IMAGE */}

          <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center">

            <Upload
              size={30}
              className="mx-auto text-slate-400 mb-3"
            />

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-slate-300"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
          >
            Submit Item
          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default PostItem;