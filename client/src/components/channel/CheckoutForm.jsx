import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);

    if (!error) {
      const amount = 500;
      const response = await axios.post(
        "http://localhost:8000/api/v1/confirm-payment",
        {
          paymentMethodId: paymentMethod.id,
        }
      );
      if (response.data.clientSecret) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          response.data.clientSecret,
          {
            payment_method: paymentMethod.id,
          }
        );
        if (!error) {
          messageApi.success("Payment successfull");
          localStorage.setItem("payment", true);
        }
      } else {
        messageApi.error("Payment failed");
        localStorage.setItem("payment", false);
      }
    }

    setLoading(false);
  };

  return (
    <div className="py-4">
      {contextHolder}
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="border border-2 my-2 bg-gray-800 text-white rounded p-2 px-4"
        onClick={handleSubmit}
      >
        {loading ? "Processing..." : "Pay 5$"}
      </button>
    </div>
  );
};

export default CheckoutForm;
