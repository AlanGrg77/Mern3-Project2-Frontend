import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { handleCheckout, PaymentMethod } from "../../store/checkoutSlice";
import Khalti from "../../img/khalti.png";
import Esewa from "../../img/esewa.png";
import { Status } from "../../globals/types/authType";

const Checkout = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { khaltiUrl, error, status, esewaFormData } = useAppSelector(
    (state) => state.checkout
  );
  const subTotal = cartItems.reduce(
    (acc, cartItems) =>
      cartItems.product.productPrice * cartItems.quantity + acc,
    0
  );
  const shippingCost = 125;
  const Total = subTotal + shippingCost;
  const [paymentMethodValue, setPaymentMethodValue] = useState<PaymentMethod>(
    PaymentMethod.Cod
  );
  console.log(paymentMethodValue);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    addressLine: "",
    city: "",
    totalAmount: 0,
    zipCode: "",
    email: "",
    phoneNumber: "",
    state: "",
    paymentMethod: PaymentMethod.Cod,
    products: [],
  });
  useEffect(() => {
    if (khaltiUrl != null) {
      window.location.href = khaltiUrl;
      return;
    }
    if (esewaFormData != null){
      console.log(esewaFormData)
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; // eSewa URL

      // Append hidden input fields
      Object.entries(esewaFormData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit(); // Auto-submit the form
    }
    if (status === Status.Error) {
      console.log("Error in useEffect: ", error);
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (status === Status.Success) {
      navigate("/");
      return;
    }
  }, [khaltiUrl, esewaFormData, status]);
  
  const handlePayment = (method: PaymentMethod) => {
    setPaymentMethodValue(method);
    setData({
      ...data,
      paymentMethod: method,
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData =
      cartItems.length > 0
        ? cartItems.map((c) => ({
            productId: c.product.id,
            productQty: c.quantity,
          }))
        : [];
    const submitData = {
      ...data,
      products: productData,
      totalAmount: Total,
    };
    await dispatch(handleCheckout(submitData));
  };

  return (
    <>
      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {cartItems.length > 0 ? (
                    cartItems.map((c) => {
                      return (
                        <div className="flex items-start gap-4">
                          <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                            <img
                              src={`http://localhost:3000/${c.product.productImageUrl}`}
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm lg:text-base text-gray-800">
                              {c.product.productName}
                            </h3>
                            <ul className="text-xs text-gray-800 space-y-1 mt-3">
                              <li className="flex flex-wrap gap-4">
                                Quantity{" "}
                                <span className="ml-auto">{c.quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price{" "}
                                <span className="ml-auto">
                                  Rs. {c.product.productPrice}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>No items in cart</div>
                  )}
                </div>
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                  Total <span className="ml-auto">Rs. {Total} </span>
                </h4>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form onSubmit={handleForm} className="mt-8">
              <div>
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      placeholder="First Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Email"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="phoneNumber"
                      onChange={handleChange}
                      placeholder="Phone No."
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="addressLine"
                      onChange={handleChange}
                      placeholder="Address Line"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      placeholder="City"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      onChange={handleChange}
                      placeholder="State"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zipCode"
                      onChange={handleChange}
                      placeholder="Zip Code"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  <span>PaymentMethod:</span>
                  <img
                    onClick={() => handlePayment(PaymentMethod.Khalti)}
                    className={`w-[100px] h-[90px]  transition-all duration-200 ${
                      paymentMethodValue === PaymentMethod.Khalti
                        ? "border-b-2 border-blue-500"
                        : "hover:scale-125"
                    } cursor-pointer`}
                    src={Khalti}
                    alt=""
                  />
                  ``
                  <img
                    onClick={() => handlePayment(PaymentMethod.Esewa)}
                    className={`w-[100px] h-[80px] mt-[10px]  transition-all duration-200 ${
                      paymentMethodValue === PaymentMethod.Esewa
                        ? "border-b-2 border-blue-500"
                        : "hover:scale-125"
                    } cursor-pointer`}
                    src={Esewa}
                    alt=""
                  />
                  <span
                    onClick={() => handlePayment(PaymentMethod.Cod)}
                    className={`my-8 text-lg pb-[30px] transition-all duration-200 ${
                      paymentMethodValue === PaymentMethod.Cod
                        ? "border-b-2 border-blue-500"
                        : "hover:text-2xl"
                    }  cursor-pointer`}
                  >
                    Cash On Delivery
                  </span>
                </div>
                {showError && error && (
                  <div className="text-red-500 mt-4">{error}</div>
                )}
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <Link to="/cart">
                    {" "}
                    <button
                      type="button"
                      className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
