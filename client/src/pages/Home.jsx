// /src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/service/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const addToCart = (service) => {
    const exists = cart.find((item) => item._id === service._id);
    if (exists) {
      const updated = cart.map((item) =>
        item._id === service._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  const goToCart = () => {
    // Pass cart via route state
    navigate("/cart", { state: { cart } });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Service List</h1>
        <button
          onClick={goToCart}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Go to Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{service.name}</h2>
            <p>{service.description}</p>
            <p className="mt-1 font-semibold">₹{service.price}</p>
            <button
              onClick={() => addToCart(service)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
