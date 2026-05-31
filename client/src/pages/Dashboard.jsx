import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  Package,
  Search,
  CheckCircle,
  Trash2,
} from "lucide-react";
const Dashboard = () => {

  const [items, setItems] = useState([]);

  const lostCount = items.filter(
  (item) => item.status === "lost"
).length;

const foundCount = items.filter(
  (item) => item.status === "found"
).length;


  useEffect(() => {

    fetchMyItems();

  }, []);




  const fetchMyItems = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(

        "http://localhost:5000/api/items/my-items",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setItems(res.data);

    } catch (error) {

      console.log(error);

    }

  };





  const deleteItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/items/${id}`
      );

      alert("Item deleted successfully");

      fetchMyItems();

    } catch (error) {

      console.log(error);

    }

  };





  return (
  <div className="min-h-screen bg-slate-950 p-6">

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="mb-10">

        <div className="flex items-center gap-4 mb-4">

          <LayoutDashboard
            size={40}
            className="text-blue-500"
          />

          <h1 className="text-5xl font-bold text-white">
            My Dashboard
          </h1>

        </div>

        <p className="text-slate-400">
          Manage all your posted items
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <Package
            size={32}
            className="text-blue-500 mb-3"
          />

          <h3 className="text-slate-400">
            Total Items
          </h3>

          <p className="text-4xl text-white font-bold">
            {items.length}
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <Search
            size={32}
            className="text-red-500 mb-3"
          />

          <h3 className="text-slate-400">
            Lost Items
          </h3>

          <p className="text-4xl text-white font-bold">
            {lostCount}
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <CheckCircle
            size={32}
            className="text-green-500 mb-3"
          />

          <h3 className="text-slate-400">
            Found Items
          </h3>

          <p className="text-4xl text-white font-bold">
            {foundCount}
          </p>

        </div>

      </div>

      {/* NO ITEMS */}

      {items.length === 0 ? (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

          <Package
            size={60}
            className="mx-auto text-slate-500 mb-4"
          />

          <h2 className="text-3xl font-bold text-white">
            No Items Posted Yet
          </h2>

          <p className="text-slate-400 mt-3">
            Start posting lost or found items.
          </p>

        </div>

      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {items.map((item) => (

            <Link
              key={item._id}
              to={`/item/${item._id}`}
              className="block"
            >

              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300">

                {item.image && (

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />

                )}

                <div className="p-6">

                  <div className="flex justify-between items-center mb-4">

                    <h2 className="text-white text-xl font-bold">
                      {item.title}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "lost"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <p className="text-slate-400 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <p className="text-slate-300 text-sm mb-2">
                    <strong>Category:</strong>{" "}
                    {item.category}
                  </p>

                  <p className="text-slate-300 text-sm">
                    <strong>Location:</strong>{" "}
                    {item.location}
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteItem(item._id);
                    }}
                    className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>

  </div>
);

};

export default Dashboard;