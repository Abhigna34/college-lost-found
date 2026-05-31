import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Package,
  MapPin,
  Tag,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/items/${id}`
        );

        setItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h1 className="text-3xl text-white">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

          {/* IMAGE */}

          <div className="relative">

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute top-6 right-6">

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.status === "lost"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {item.status}
              </span>

            </div>

          </div>

          {/* CONTENT */}

          <div className="p-8">

            <div className="flex items-center gap-3 mb-4">

              <Package
                size={35}
                className="text-blue-500"
              />

              <h1 className="text-4xl font-bold text-white">
                {item.title}
              </h1>

            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {item.description}
            </p>

            {/* DETAILS */}

            <div className="grid md:grid-cols-3 gap-5">

              {/* CATEGORY */}

              <div className="bg-slate-800 rounded-2xl p-5">

                <Tag
                  size={28}
                  className="text-blue-400 mb-3"
                />

                <h3 className="text-slate-400 text-sm uppercase">
                  Category
                </h3>

                <p className="text-white text-lg font-semibold mt-2">
                  {item.category}
                </p>

              </div>

              {/* LOCATION */}

              <div className="bg-slate-800 rounded-2xl p-5">

                <MapPin
                  size={28}
                  className="text-cyan-400 mb-3"
                />

                <h3 className="text-slate-400 text-sm uppercase">
                  Location
                </h3>

                <p className="text-white text-lg font-semibold mt-2">
                  {item.location}
                </p>

              </div>

              {/* STATUS */}

              <div className="bg-slate-800 rounded-2xl p-5">

                {item.status === "lost" ? (
                  <AlertCircle
                    size={28}
                    className="text-red-400 mb-3"
                  />
                ) : (
                  <CheckCircle
                    size={28}
                    className="text-green-400 mb-3"
                  />
                )}

                <h3 className="text-slate-400 text-sm uppercase">
                  Status
                </h3>

                <p
                  className={`text-lg font-semibold mt-2 ${
                    item.status === "lost"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {item.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ItemDetails;