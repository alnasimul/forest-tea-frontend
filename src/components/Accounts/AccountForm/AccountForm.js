import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import forestTeaApi from "../../../helpers/forestTeaApi";

const AccountForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    data.paymentStatus = false;
    data.deliveredStatus = false;
    data.purchaseDate = new Date().toDateString();

    try {
      forestTeaApi.post(`/insertDailyAccountRecord`,data)
      .then(res => {
        if(res.data){
          toast('This Account record insterted successfully to database...')
        }
      })
    } catch (error) {
      
    }
    console.log(data)
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer/>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="customer-name"
          >
            Customer's Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="customer-name"
            type="text"
            placeholder="Customer's Name"
            {...register("customerName", { required: true })}
          />
          {errors.customerName && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="product-name"
          >
            Product's Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="product-name"
            type="text"
            placeholder="Product Name"
            {...register("productName", { required: true })}
          />
           {errors.productName && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="customer-email"
          >
            Customer's Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="customer-email"
            type="text"
            placeholder="Email"
            {...register("email", { required: false })}

          />
           {errors.email && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="customer-phone"
          >
            Customer's Phone
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="customer-phone"
            type="text"
            placeholder="Contact No"
            {...register("phone", { required: true })}

          />
           {errors.phone && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="customer-address"
          >
            Cutomer's Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="customer-address"
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}

          />
           {errors.address && <span className="text-red-600">This field is required</span>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="product-quantity"
          >
            Product's Quantity <span>(Sold)</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="product-quantity"
            type="text"
            placeholder="Sold"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && <span className="text-red-600">This field is required</span>}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="total-sale"
          >
            Total Sale
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="total-sale"
            type="text"
            placeholder="Sale"
            {...register("totalSale", { required: true })}
          />
           {errors.totalSale && <span className="text-red-600">This field is required</span>}
        </div>
        {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            Months
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
             {
                 months.map( month => <option> {month} </option>)
             }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div> */}
        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="profit"
          >
            Profit
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="profit"
            type="text"
            placeholder="Profit"
            {...register("profit", { required: false })}
          />
          {errors.profit && <span className="text-red-600">This field is required</span>}
        </div>
      </div>
      <input
        type="submit"
        className="bg-black hover:text-gray-100 font-bold italic hover:bg-gray-700 text-white p-3 rounded-lg w-full cursor-pointer mt-3"
        value="Submit"
      ></input>
    </form>
  );
};

export default AccountForm;
