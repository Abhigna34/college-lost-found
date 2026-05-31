function ItemCard({ item }) {

  return (

    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">




      {/* IMAGE */}
      {item.image && (

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-60 object-cover"
        />

      )}






      <div className="p-5">




        {/* TITLE + STATUS */}
        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold text-blue-600">

            {item.title}

          </h2>




          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              item.status === "lost"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >

            {item.status}

          </span>

        </div>






        {/* DESCRIPTION */}
        <p className="text-gray-600 mt-4">

          {item.description}

        </p>






        {/* CATEGORY */}
        <p className="mt-3">

          <span className="font-bold">

            Category:

          </span>{" "}

          {item.category}

        </p>






        {/* LOCATION */}
        <p className="mt-2">

          <span className="font-bold">

            Location:

          </span>{" "}

          {item.location}

        </p>

      </div>

    </div>

  );
}

export default ItemCard;