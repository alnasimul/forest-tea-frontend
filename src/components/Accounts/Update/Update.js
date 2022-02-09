import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";
import forestTeaApi from "../../../helpers/forestTeaApi";

const Update = ({ record, closeUpdateModal}) => {
  const {
    _id,
    customerName,
    email,
    phone,
    address,
    grandTotal,
    paid,
  } = record;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateGrandTotal, setUpdateGrandTotal] = useState(grandTotal);
  const [updatePaid, setUpdatePaid] = useState(paid);

  const onSubmit = (data) => {
    data.due = updateGrandTotal - updatePaid;
    data.paid = updatePaid;
    data.grandTotal = parseInt(updateGrandTotal);  

    try {
        forestTeaApi.patch(`/updateSaleRecord/${_id}`, data)
        .then(res => {
            if(res.data){
                toast("This sale record updated successfully...");
                closeUpdateModal();
                setTimeout(() => window.location.reload() ,1200)
            }
        })
    } catch (error) {
        toast.error(error.message)
    }

    console.log(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full px-3 mt-3">
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
          defaultValue={customerName}
          {...register("customerName", { required: true })}
        />
        {errors.customerName && (
          <span className="text-red-600">This field is required</span>
        )}
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
          defaultValue={email}
          {...register("email", { required: false })}
        />
        {errors.email && (
          <span className="text-red-600">This field is required</span>
        )}
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
          defaultValue={phone}
          {...register("phone", { required: true })}
        />
        {errors.phone && (
          <span className="text-red-600">This field is required</span>
        )}
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
          defaultValue={address}
          {...register("address", { required: true })}
        />
        {errors.address && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>
      <div className="flex flex-wrap mx-.5 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grand-total"
          >
            Grand Total
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grand-total"
            type="text"
            placeholder="Grand Total"
            value={updateGrandTotal}
            onChange={(e) => setUpdateGrandTotal(e.target.value)}
          />
          {errors.paid && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="total-sale"
          >
            Paid
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="total-sale"
            type="text"
            placeholder="Paid"
            value={updatePaid}
            onChange={(e) => setUpdatePaid(e.target.value)}
          />
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
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="due"
          >
            Due
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="due"
            type="text"
            placeholder="Due"
            value={updateGrandTotal - updatePaid}
          />
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

export default Update;
