import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import brandlogo from "../../assets/brandLogoEdited01.png";
import { AuthContext } from "../../context/AuthContext";
import { handleGoogleSignIn } from "../../helpers/loginManager";

const LoginPage = () => {
  const {user, login} = useContext(AuthContext); 
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if(data.email && data.password){
        login(data.email, data.password,history, from)
      }
    console.log(data);
  };

  console.log(location)
  
  console.log(user)
  return (
    <div className="container w-full p-10 max-w-lg shadow-md rounded mt-20 ml-90">
      <div className="mb-4 flex justify-center">
        <Link to="/sales">
        <img src={brandlogo} width={180} height={100} alt="logo"  />
        </Link>
      </div>
      <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
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
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>

        <input
          type="submit"
          className="bg-black hover:text-gray-100 font-bold italic hover:bg-gray-700 text-white p-3 rounded-lg w-full cursor-pointer"
          value="Login"
        ></input>
      </form>
      {
        user.error && <p className="text-danger mt-2">{user.error}</p>
      }
      <p className="mt-2">
        <Link to="/forgotpassword">
          <span className="hover:text-gray-500 cursor-pointer ">Forgot password? click here to reset password.</span>
        </Link>
      </p>        

      {/* <hr className="mt-3" />
      <h4 className="text-center mb-3 mt-2 font-bold">Or</h4>
      <button
        className="bg-black w-full text-white rounded p-2 mb-2"
        onClick={handleGoogleSignIn}
      >
        Google Sign In
      </button>
      <p>
        Dont have an account?{" "}
        <Link to="/register">
          <span className="hover:text-gray-500 cursor-pointer">Register</span>
        </Link>
      </p> */}
    </div>
  );
};

export default LoginPage;
