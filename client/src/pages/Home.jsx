import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Search,
  CheckCircle,
  ShieldAlert,
} from "lucide-react";

const Home = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const lostCount = items.filter(
  (item) => item.status?.toLowerCase() === "lost"
).length;

const foundCount = items.filter(
  (item) => item.status?.toLowerCase() === "found"
).length;
  // FETCH ITEMS
  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/items"
      );

      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE ITEM (ADMIN)
  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/items/${id}`
      );

      alert("Post Deleted Successfully");

      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, []);

  // NOT LOGGED IN
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
        <div className="max-w-xl text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-600/20 flex items-center justify-center">
            <ShieldAlert
              size={48}
              className="text-blue-400"
            />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Lost & Found Portal
          </h1>

          <p className="text-slate-400 text-lg">
            Login to access reported lost and found
            items and help reunite owners with
            their belongings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">

      {/* HERO SECTION */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-3xl p-10 shadow-2xl">

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Lost & Found Management Portal
            </h1>

            <p className="text-blue-100 text-lg max-w-2xl">
              Report, track, and recover lost items
              efficiently. Helping people reconnect
              with their belongings faster.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-10">

  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
    <Package
      className="text-white mb-3"
      size={30}
    />
    <h3 className="text-white font-semibold">
      Total Items
    </h3>
    <p className="text-3xl font-bold text-white mt-2">
      {items.length}
    </p>
  </div>

  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
    <Search
      className="text-white mb-3"
      size={30}
    />
    <h3 className="text-white font-semibold">
      Lost Items
    </h3>
    <p className="text-3xl font-bold text-white mt-2">
      {lostCount}
    </p>
  </div>

  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
    <CheckCircle
      className="text-white mb-3"
      size={30}
    />
    <h3 className="text-white font-semibold">
      Found Items
    </h3>
    <p className="text-3xl font-bold text-white mt-2">
      {foundCount}
    </p>
  </div>

</div>
          </div>

        </div>
      </section>

      {/* ITEMS SECTION */}
      <section className="px-6 pb-12">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold text-white mb-8">
            Recent Lost & Found Reports
          </h2>

          {items.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
              <Package
                size={60}
                className="mx-auto text-slate-500 mb-4"
              />

              <h3 className="text-white text-2xl font-semibold mb-2">
                No Items Available
              </h3>

              <p className="text-slate-400">
                No lost or found items have been
                posted yet.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {items.map((item) => (

                <div
                  key={item._id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-blue-900/30 transition-all duration-300 hover:-translate-y-2"
                >

                  {/* IMAGE */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      onClick={() =>
                        navigate(`/item/${item._id}`)
                      }
                      className="w-full h-64 object-cover cursor-pointer"
                    />
                  )}

                  {/* CONTENT */}
                  <div className="p-6">

                    <div className="flex justify-between items-center mb-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "lost"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="text-slate-500 text-sm">
                        {item.category}
                      </span>

                    </div>

                    <h3
                      onClick={() =>
                        navigate(`/item/${item._id}`)
                      }
                      className="text-white text-xl font-bold cursor-pointer hover:text-blue-400 transition"
                    >
                      {item.title}
                    </h3>

                    <p className="text-slate-400 mt-3 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-5">
                      <p className="text-slate-300 text-sm">
                        📍 {item.location}
                      </p>
                    </div>

                    {/* ADMIN DELETE BUTTON */}
                    {role === "admin" && (
                      <button
                        onClick={() =>
                          deleteItem(item._id)
                        }
                        className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        Delete Post
                      </button>
                    )}

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default Home;