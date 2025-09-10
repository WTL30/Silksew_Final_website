// "use client"
// import { useContext, useState } from "react"
// import { ShopContext } from "../../context/ShopContext"
// import razorpay from "../Assets/razorpay_logo.png"
// import CashonDelivery from "../Assets/CashonDelivery.jpg"
// import stripe from "../Assets/stripe_logo.png"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import axios from "axios"
// import { BASEURL } from "../../config"
// import { useNavigate } from "react-router-dom"
// import { useLocation } from "react-router-dom";
// import "./Checkout.css"

// const OrderSuccessPopup = () => {
//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Order Placed Successfully!</h2>
//         <p>Thank you for your purchase. Your order has been placed and will be processed soon.</p>
//       </div>
//     </div>
//   )
// }

// const Checkout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const offerCode = location.state?.offerCode || ""
//   const [method, setMethod] = useState("Cash on Delivery")
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)
//   const [isLoading, setIsLoading] = useState(false) // Added loading state
//   const { cartItems, delivery_fee, setCartItems, getTotalCartAmount, products } = useContext(ShopContext)
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     street: "",
//     landMark: "",
//     city: "",
//     zipcode: "",
//     country: "",
//     state: "",
//     phone: "",
//     email: "",
//   })

//   const subtotal = getTotalCartAmount()
//   const totalAmount = subtotal + delivery_fee

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target
//     setFormData((data) => ({ ...data, [name]: value }))
//   }
//   const onSubmitHandler = async (event) => {
//     event.preventDefault()
//     setIsLoading(true) 
//     setShowSuccessPopup(true)

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         toast.error("You are not authorized. Please log in.")
//         navigate("/login")
//         return
//       }

//       if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
//         console.error("Cart is empty or invalid.")
//         toast.error("Your cart is empty!")
//         return
//       }

//       const orderItems = cartItems
//         .map((cartItem) => {
//           const product = products.find((p) => p._id === cartItem.productId)
//           if (!product) {
//             console.warn(`Product not found for productId: ${cartItem.productId}`)
//             return null
//           }
//           return {
//             productId: cartItem.productId,
//             size: cartItem.size,
//             productName: product.name,
//             quantity: cartItem.quantity,
//             price: product.price,
//           }
//         })
//         .filter((item) => item !== null)

//       if (orderItems.length === 0) {
//         toast.error("No valid products found in cart.")
//         return
//       }

//       const totalAmount = getTotalCartAmount() + delivery_fee

//       const orderData = {
//         address: formData,
//         items: orderItems,
//         totalAmount,
//         paymentMethod: method,
//         offerCode: offerCode || undefined, 
//       }


//       const response = await axios.post(`${BASEURL}/api/orders/place`, orderData, {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       if (response.data.success) {
//         setCartItems([])
//         setTimeout(() => {
//           setShowSuccessPopup(false)
//           setIsLoading(false) 
//           navigate("/")
//         }, 2000)
//       } else {
//         setShowSuccessPopup(false)
//         setIsLoading(false) 
//         toast.error(response.data.message || "Failed to place order.")
//       }
//     } catch (error) {
//       console.error(error)
//       setShowSuccessPopup(false)
//       setIsLoading(false) 
//       toast.error(error.response?.data?.message || "An error occurred while placing your order.")
//     }
//   }

//   return (
//     <form className="form-container" onSubmit={onSubmitHandler}>
//       <div className="form-left">
//         <fieldset className="payment-method">
//           <legend>Payment Options</legend>
//           <div className="payment-options">
//             <div
//               className={`payment-option ${method === "Stripe" ? "selected" : ""}`}
//               onClick={() => setMethod("Stripe")}
//             >
//               <img src={stripe || "/placeholder.svg"} alt="Stripe" className="payment-logo" />
//             </div>
//             <div
//               className={`payment-option ${method === "Razorpay" ? "selected" : ""}`}
//               onClick={() => setMethod("Razorpay")}
//             >
//               <img src={razorpay || "/placeholder.svg"} alt="Razorpay" className="payment-logo" />
//             </div>
//             <div
//               className={`payment-option ${method === "CashonDelivery" ? "selected" : ""}`}
//               onClick={() => setMethod("Cash on Delivery")}
//             >
//               <img src={CashonDelivery || "/placeholder.svg"} alt="CashonDelivery" className="payment-logo" />
//             </div>
//           </div>
//         </fieldset>

//         <div className="form-title">
//           <h2>Shipping Address</h2>
//         </div>
//         <div className="form-row">
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             className="form-input"
//             placeholder="First Name"
//             onChange={onChangeHandler}
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             className="form-input"
//             placeholder="Last Name"
//             onChange={onChangeHandler}
//             required
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           className="form-input"
//           placeholder="Email Address"
//           onChange={onChangeHandler}
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           value={formData.phone}
//           className="form-input"
//           placeholder="Phone Number"
//           onChange={onChangeHandler}
//           required
//         />
//         <input
//           type="text"
//           name="street"
//           value={formData.street}
//           className="form-input"
//           placeholder="Street Address"
//           onChange={onChangeHandler}
//           required
//         />
//         <input
//           type="text"
//           name="landMark"
//           value={formData.landMark}
//           className="form-input"
//           placeholder="Landmark"
//           onChange={onChangeHandler}
//         />
//         <div className="form-row">
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             className="form-input"
//             placeholder="City"
//             onChange={onChangeHandler}
//             required
//           />
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             className="form-input"
//             placeholder="State"
//             onChange={onChangeHandler}
//             required
//           />
//         </div>
//         <div className="form-row">
//           <input
//             type="text"
//             name="zipcode"
//             value={formData.zipcode}
//             className="form-input"
//             placeholder="Zipcode"
//             onChange={onChangeHandler}
//             required
//           />
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             className="form-input"
//             placeholder="Country"
//             onChange={onChangeHandler}
//             required
//           />
//         </div>
//       </div>

//       <div className="form-right">
//         <div className="cart-total">
//           <h3>Cart Totals</h3>
//           <div className="cart-total-item">
//             <span>Subtotal: </span>
//             <span> Rs {subtotal} </span>
//           </div>
//           <div className="cart-total-item">
//             <span>Shipping Fee: </span>
//             <span> Rs {delivery_fee} </span>
//           </div>
//           <div className="cart-total-item">
//             <span>Total: </span>
//             <span> Rs {totalAmount} </span>
//           </div>
//         </div>

//         <button type="submit" className="submit-button" disabled={isLoading}>
//           {isLoading ? "Processing..." : "PLACE ORDER"}
//         </button>
//       </div>

//       {showSuccessPopup && <OrderSuccessPopup />}
//     </form>
//   )
// }

// export default Checkout



"use client"
import { useContext, useState } from "react"
import { ShopContext } from "../../context/ShopContext"
import razorpay from "../Assets/razorpay_logo.png"
import CashonDelivery from "../Assets/CashonDelivery.jpg"
import stripe from "../Assets/stripe_logo.png"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { BASEURL } from "../../config"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import "./Checkout.css"

const OrderSuccessPopup = () => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been placed and will be processed soon.</p>
      </div>
    </div>
  )
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const offerCode = location.state?.offerCode || ""
  const [method, setMethod] = useState("Cash on Delivery")
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Added loading state
  const { cartItems, delivery_fee, setCartItems, getTotalCartAmount, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    landMark: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
    email: "",
  })

  const subtotal = getTotalCartAmount()
  const totalAmount = subtotal + delivery_fee

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  // ---------- Razorpay helpers (ADDED) ----------
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const openRazorpayPopup = async () => {
    try {
      setIsLoading(true);

      // 0) Optional auth header if your payment endpoints require auth
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // 1) Make sure script is ready
      const ok = await loadRazorpayScript();
      if (!ok) {
        toast.error("Failed to load Razorpay. Check your internet connection.");
        setIsLoading(false);
        return;
      }

      // 2) Create order on backend with cart amount (INR)
      console.log("Hitting:", `${BASEURL}/api/payment/create-order`);
      const createRes = await axios.post(
        `${BASEURL}/api/payment/create-order`,
        { amount: totalAmount }, // INR -> backend converts to paise
        { headers }
      );
      const order = createRes.data; // should contain { id, amount, currency, ... }


      // 3) Configure Razorpay
      console.log("ENV key:", process.env.REACT_APP_RAZORPAY_KEY_ID);
      console.log("VITE key:", import.meta?.env?.VITE_RAZORPAY_KEY_ID);

      const key = process.env.REACT_APP_RAZORPAY_KEY_ID || import.meta?.env?.VITE_RAZORPAY_KEY_ID || "";
      if (!key) {
        toast.error("Missing Razorpay public key. Set REACT_APP_RAZORPAY_KEY_ID in your .env");
        setIsLoading(false);
        return;
      }

      const options = {
        key,
        amount: order.amount,      // paise (backend returns this)
        currency: order.currency,  // "INR"
        name: "Silksew",
        description: "Order Payment",
        order_id: order.id,        // razorpay order id
        handler: async function (response) {
          // Called on success
          try {
            // 4) Verify signature on backend
            const verifyRes = await axios.post(
              `${BASEURL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: totalAmount, // send INR for your records
              },
              { headers }
            );

            if (verifyRes.data?.success) {
              toast.success("Payment successful ✅");
              // (Optional) After payment success you can now submit your order to /api/orders/place
              // using the same logic below, or keep your existing flow as-is.
              setShowSuccessPopup(true);
            } else {
              toast.error(verifyRes.data?.message || "Payment verification failed");
            }
          } catch (err) {
            console.error("Verify error:", err);
            toast.error(err.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: function () {
            // user closed the modal
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      toast.error(err.response?.data?.message || "Unable to open Razorpay");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRazorpayClick = async (e) => {
    // This runs when user clicks PLACE ORDER and Razorpay is selected.
    // We DO NOT submit the form (so required fields don't block).
    e.preventDefault();
    await openRazorpayPopup();
  };
  // ---------- End Razorpay helpers ----------

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setShowSuccessPopup(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("You are not authorized. Please log in.")
        navigate("/login")
        return
      }

      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        console.error("Cart is empty or invalid.")
        toast.error("Your cart is empty!")
        return
      }

      const orderItems = cartItems
        .map((cartItem) => {
          const product = products.find((p) => p._id === cartItem.productId)
          if (!product) {
            console.warn(`Product not found for productId: ${cartItem.productId}`)
            return null
          }
          return {
            productId: cartItem.productId,
            size: cartItem.size,
            productName: product.name,
            quantity: cartItem.quantity,
            price: product.price,
          }
        })
        .filter((item) => item !== null)

      if (orderItems.length === 0) {
        toast.error("No valid products found in cart.")
        return
      }

      const totalAmount = getTotalCartAmount() + delivery_fee

      const orderData = {
        address: formData,
        items: orderItems,
        totalAmount,
        paymentMethod: method,
        offerCode: offerCode || undefined,
      }

      const response = await axios.post(`${BASEURL}/api/orders/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data.success) {
        setCartItems([])
        setTimeout(() => {
          setShowSuccessPopup(false)
          setIsLoading(false)
          navigate("/")
        }, 2000)
      } else {
        setShowSuccessPopup(false)
        setIsLoading(false)
        toast.error(response.data.message || "Failed to place order.")
      }
    } catch (error) {
      console.error(error)
      setShowSuccessPopup(false)
      setIsLoading(false)
      toast.error(error.response?.data?.message || "An error occurred while placing your order.")
    }
  }

  return (
    <form className="form-container" onSubmit={onSubmitHandler}>
      <div className="form-left">
        <fieldset className="payment-method">
          <legend>Payment Options</legend>
          <div className="payment-options">
            <div
              className={`payment-option ${method === "Stripe" ? "selected" : ""}`}
              onClick={() => setMethod("Stripe")}
            >
              <img src={stripe || "/placeholder.svg"} alt="Stripe" className="payment-logo" />
            </div>
            <div
              className={`payment-option ${method === "Razorpay" ? "selected" : ""}`}
              onClick={() => setMethod("Razorpay")}
            >
              <img src={razorpay || "/placeholder.svg"} alt="Razorpay" className="payment-logo" />
            </div>
            <div
              className={`payment-option ${method === "CashonDelivery" ? "selected" : ""}`}
              onClick={() => setMethod("Cash on Delivery")}
            >
              <img src={CashonDelivery || "/placeholder.svg"} alt="CashonDelivery" className="payment-logo" />
            </div>
          </div>
        </fieldset>

        <div className="form-title">
          <h2>Shipping Address</h2>
        </div>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            className="form-input"
            placeholder="First Name"
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            className="form-input"
            placeholder="Last Name"
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-input"
          placeholder="Email Address"
          onChange={onChangeHandler}
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          className="form-input"
          placeholder="Phone Number"
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          className="form-input"
          placeholder="Street Address"
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="landMark"
          value={formData.landMark}
          className="form-input"
          placeholder="Landmark"
          onChange={onChangeHandler}
        />
        <div className="form-row">
          <input
            type="text"
            name="city"
            value={formData.city}
            className="form-input"
            placeholder="City"
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            className="form-input"
            placeholder="State"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            className="form-input"
            placeholder="Zipcode"
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            className="form-input"
            placeholder="Country"
            onChange={onChangeHandler}
            required
          />
        </div>
      </div>

      <div className="form-right">
        <div className="cart-total">
          <h3>Cart Totals</h3>
          <div className="cart-total-item">
            <span>Subtotal: </span>
            <span> Rs {subtotal} </span>
          </div>
          <div className="cart-total-item">
            <span>Shipping Fee: </span>
            <span> Rs {delivery_fee} </span>
          </div>
          <div className="cart-total-item">
            <span>Total: </span>
            <span> Rs {totalAmount} </span>
          </div>
        </div>

        {/* KEY PART: for Razorpay we make the button act like a normal button to bypass required fields */}
        <button
          type={method === "Razorpay" ? "button" : "submit"}
          className="submit-button"
          disabled={isLoading}
          onClick={method === "Razorpay" ? handleRazorpayClick : undefined}
        >
          {isLoading ? "Processing..." : "PLACE ORDER"}
        </button>
      </div>

      {showSuccessPopup && <OrderSuccessPopup />}
    </form>
  )
}

export default Checkout


