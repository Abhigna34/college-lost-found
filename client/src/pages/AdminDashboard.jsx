import { useEffect, useState } from "react";
import axios from "axios";
import {
  Shield,
  Users,
  Package,
  Search,
  CheckCircle,
  Trash2,
} from "lucide-react";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  const [loadingUsers, setLoadingUsers] =
    useState(true);

  const [loadingItems, setLoadingItems] =
    useState(true);

  const lostCount = items.filter(
  (item) => item.status === "lost"
).length;

const foundCount = items.filter(
  (item) => item.status === "found"
).length;


  useEffect(() => {

    fetchUsers();
    fetchItems();

  }, []);




  // FETCH USERS
  const fetchUsers = async () => {

    try {

      setLoadingUsers(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(

        "http://localhost:5000/api/admin/users",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setUsers(res.data);

      setLoadingUsers(false);

    } catch (error) {

      console.log(error);

      setLoadingUsers(false);

    }

  };




  // FETCH ITEMS
  const fetchItems = async () => {

    try {

      setLoadingItems(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(

        "http://localhost:5000/api/admin/items",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setItems(res.data);

      setLoadingItems(false);

    } catch (error) {

      console.log(error);

      setLoadingItems(false);

    }

  };




  // DELETE ITEM
  const deleteItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/items/${id}`
      );

      alert("Item Deleted Successfully");

      fetchItems();

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

          <Shield
            size={42}
            className="text-red-500"
          />

          <h1 className="text-5xl font-bold text-white">
            Admin Dashboard
          </h1>

        </div>

        <p className="text-slate-400">
          Manage users and items across the platform
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-5 mb-12">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <Users
            size={32}
            className="text-cyan-500 mb-3"
          />

          <h3 className="text-slate-400">
            Total Users
          </h3>

          <p className="text-4xl text-white font-bold">
            {users.length}
          </p>

        </div>

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

      {/* USERS */}

      <div className="mb-14">

        <h2 className="text-3xl font-bold text-white mb-6">
          All Users
        </h2>

        {loadingUsers ? (

          <h3 className="text-center text-slate-400">
            Loading Users...
          </h3>

        ) : users.length === 0 ? (

          <h3 className="text-slate-400">
            No Users Found
          </h3>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {users.map((user) => (

              <div
                key={user._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >

                <h3 className="text-xl font-bold text-white mb-4">
                  {user.name}
                </h3>

                <p className="text-slate-300">
                  {user.email}
                </p>

                <span className="inline-block mt-4 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ITEMS */}

      <div>

        <h2 className="text-3xl font-bold text-white mb-6">
          All Items
        </h2>

        {loadingItems ? (

          <h3 className="text-center text-slate-400">
            Loading Items...
          </h3>

        ) : items.length === 0 ? (

          <h3 className="text-slate-400">
            No Items Found
          </h3>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {items.map((item) => (

              <div
                key={item._id}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
              >

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
                    onClick={() =>
                      deleteItem(item._id)
                    }
                    className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete Item
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>
);
};

export default AdminDashboard;