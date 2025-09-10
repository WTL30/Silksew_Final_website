import { useState } from "react"
import "../CSS/LoginSignup.css"
import axios from "axios"
import { BASEURL } from "../config"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const LoginSignup = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value })
  }

  const handleLoginClick = () => {
    navigate("/login")
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${BASEURL}/api/users/register`, signUp)
      console.log(response)

      toast.success("Registration successful! You can now log in.")

      // Reset form fields
      setSignUp({
        name: "",
        email: "",
        password: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
      })

      // Redirect to login page after success
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Registration failed. Please try again.")
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <div className="input-row">
              <input
                name="name"
                value={signUp.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                name="email"
                value={signUp.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="input-row">
              <input
                name="password"
                value={signUp.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
              />
              <input
                name="phone"
                value={signUp.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                required
              />
            </div>
            <input
              name="street"
              value={signUp.street}
              onChange={handleChange}
              type="text"
              placeholder="Address"
              required
            />
            <div className="input-row">
              <input name="city" value={signUp.city} onChange={handleChange} type="text" placeholder="City" required />
              <input
                name="state"
                value={signUp.state}
                onChange={handleChange}
                type="text"
                placeholder="State"
                required
              />
            </div>
            <input
              name="zipcode"
              value={signUp.zipcode}
              onChange={handleChange}
              type="text"
              placeholder="Zipcode"
              required
            />
          </div>
          <button type="submit">Continue</button>
          <p className="loginsignup-login">
            Already have an account?
            <span className="loginsignup-link" onClick={handleLoginClick}>
              {" "}
              Login here
            </span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name="terms" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} />
    </form>
  )
}

export default LoginSignup

