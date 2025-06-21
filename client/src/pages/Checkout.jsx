import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const loadRazorpay = (orderId) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: "rzp_test_dsX0XfBwKPyYBX", // Replace with your actual Razorpay key
        amount: total * 100,
        currency: "INR",
        name: "Service Booking",
        description: "Service Payment",
        handler: function (response) {
          fetch(`http://localhost:8080/api/service/orders/${orderId}/pay`, {
            method: "PUT",
          });
          navigate("/success");
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "7970381197",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  const createOrderAndPay = async () => {
    const res = await fetch("http://localhost:8080/api/service/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ services: cart, totalAmount: total }),
    });
    const data = await res.json();
    loadRazorpay(data._id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-2">Total Amount: ₹{total}</p>
      <button
        onClick={createOrderAndPay}
        className="bg-purple-600 text-white px-6 py-2 rounded"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Checkout;
