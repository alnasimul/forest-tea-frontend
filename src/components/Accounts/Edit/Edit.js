import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forestTeaApi from "../../../helpers/forestTeaApi";

const Edit = ({ record, closeModal }) => {
  const {
    _id,
    customerName,
    phone,
    email,
    productName,
    address,
    quantity,
    due,
    totalBill,
    paid
  } = record;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    try {
      forestTeaApi
        .patch(`/updateDailyAccountRecord/${_id}`, data)
        .then((res) => {
          if (res.data) {
            toast("This Account record updated successfully to database...");
            closeModal();
            window.location.reload();
          }
        });
    } catch (error) {}
    console.log(data);
  };
  return (
    <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl text-center font-bold italic">
        Edit <span className="text-red-600">{customerName}'s</span> Record
      </h1>
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
            for="product-name"
          >
            Product's Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="product-name"
            type="text"
            placeholder="Product Name"
            defaultValue={productName}
            {...register("productName", { required: true })}
          />
          {errors.productName && (
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
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
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
            defaultValue={quantity}
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="total-bill"
          >
            Total Bill
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="total-bill"
            type="text"
            placeholder="Bill"
            defaultValue={totalBill}
            {...register("totalBill", { required: true })}
          />
          {errors.totalBill && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
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
            defaultValue={paid}
            {...register("paid", { required: true })}
          />
          {errors.paid && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
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
            defaultValue={due}
            {...register("due", { required: true })}
          />
          {errors.due && (
            <span className="text-red-600">This field is required</span>
          )}
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

export default Edit;
