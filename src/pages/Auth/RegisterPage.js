import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import brandlogo from "../../assets/brandLogoEdited01.png";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, register } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  // if (user.error) {
  //   setError(user.error);
  // }

  useEffect(() => user.error && toast.error(user.error), [user.error]);

  // if(user.accountCreated){
  //   setTimeout(() => window.location.reload(),1500)
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      if (username && email && password) {
        register(username, email, password, history, from);
      }
    } else {
      toast.error(
        "Your password and confirm password field didn't match please try again"
      );
    }
  };

  console.log(user);
  return (
    <div className="container w-full p-10 max-w-lg shadow-md rounded mt-20 ml-90">
      <ToastContainer />
      <div className="mb-4 flex justify-center">
        <Link to="/sales">
          <img
            src={brandlogo}
            width={180}
            height={100}
            alt="logo"
            className=""
          />
        </Link>
      </div>
      <form className="w-full " onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex justify-between items-center relative">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="password"
                type={showPassword ? `text` : `password`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {
                showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} className="mb-3 absolute sm:inset-x-96 inset-x-72 top-5 text-gray-500 cursor-pointer"/> : <FaEye onClick={() =>  setShowPassword(true) } className="mb-3 absolute sm:inset-x-96 inset-x-72 top-5 text-gray-500 cursor-pointer" />
              }
            </div>
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="flex justify-between items-center relative">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="confirmPassword"
                type={showConfirmPassword ? `text` : `password`}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {
                showConfirmPassword ? <FaEyeSlash onClick={() => setShowConfirmPassword(false)} className="mb-3 absolute sm:inset-x-96 inset-x-72 top-5 text-gray-500 cursor-pointer"/> : <FaEye onClick={() =>  setShowConfirmPassword(true) } className="mb-3 absolute sm:inset-x-96 inset-x-72 top-5 text-gray-500 cursor-pointer" />
              }
            </div>
          </div>
        </div>
        <input
          type="submit"
          className="bg-black hover:text-gray-100 font-bold italic hover:bg-gray-700 text-white p-3 rounded-lg w-full cursor-pointer mt-1"
          value="Register"
        ></input>
      </form>

      {/* {user.error && <p className="text-danger mt-2">{user.error}</p>} */}

      {user.accountCreated && (
        <p className="mt-3 text-green-600">{user.accountCreated}</p>
      )}
      <p className="mt-3">
        Already have an account?
        <Link to="/login">
          <span className="hover:text-gray-500 cursor-pointer italic">
            {" "}
            Login
          </span>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
