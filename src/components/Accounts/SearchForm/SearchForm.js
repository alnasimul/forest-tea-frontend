import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";
import forestTeaApi from "../../../helpers/forestTeaApi";

const SearchForm = ({ closeSearchForm, getSearchRecords }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [month, setMonth] = useState("")

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

  const onSubmit = (data) => {
    data.invoiceNo = parseInt(data.invoiceNo)  
    data.month = month;

    try {
        forestTeaApi.post(`/searchAccountRecords`,data)
        .then(res => {
            if(res.data){
                getSearchRecords(res.data);
                closeSearchForm();
            }
        })
    } catch (error) {
        
    }
    console.log(data);
  };
  console.log(month)
  return (
    <div className="bg-gray-50 p-3 rounded mb-10">
      <div className="relative mb-10">
        <button
          className="bg-red-700 hover:bg-red-800 p-2 rounded text-white absolute top-0 right-0"
          onClick={closeSearchForm}
        >
          Close x
        </button>
      </div>
      <form className="w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap mx-.5 mb-2">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="InvoiceNo"
            >
              Invoice No
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="invoiceNo"
              type="text"
              {...register("invoiceNo", { required: false })}
            />
            {errors.invoiceNo && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
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
              {...register("customerName", { required: false })}
            />
            {errors.customerName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mx-.5 mb-2">
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
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
              {...register("email", { required: false })}
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
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
              {...register("phone", { required: false })}
            />
            {errors.phone && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mx-.5 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="customer-address"
            >
              Customer's Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="customer-address"
              type="text"
              {...register("address", { required: false })}
            />
            {errors.address && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Month</label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onClick={e => setMonth(e.target.value)}
              >
                <option disabled={true} value="Not set">Select Month</option>  
                {months.map((month) => (
                  <option value={month}> {month} </option>
                ))}
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
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Year</label>
              <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              
              type="text"
              {...register("year", { required: false })}
            />
          </div>
        </div>
        <input
          type="submit"
          className="bg-black hover:text-gray-100 font-bold italic hover:bg-gray-700 text-white p-3 rounded-lg w-full cursor-pointer mt-3"
          value="Submit"
        ></input>
      </form>
    </div>
  );
};

export default SearchForm;
