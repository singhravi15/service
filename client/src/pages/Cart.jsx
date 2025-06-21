// /src/pages/Cart.jsx
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const { state } = useLocation();
  const cart = state?.cart || [];
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 underline"
      >
        ← Back to Home
      </button>

      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="mb-4 border-b pb-2">
              <h2 className="text-xl">{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="mt-4 text-xl font-semibold">Total: ₹{total}</div>
          <button
            onClick={() => navigate("/checkout", { state: { cart } })}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
