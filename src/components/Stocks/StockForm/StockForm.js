import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import forestTeaApi from "../../../helpers/forestTeaApi";

const StockForm = ({closeModal}) => {
  const [stock, setStock] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [paid, setPaid] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
    data.sellingUnitPrice = parseFloat(data.sellingUnitPrice)
    data.stock = parseFloat(stock);
    data.buyingUnitPrice = parseFloat(unitPrice);
    data.grandTotal = stock * unitPrice;
    data.paid = parseFloat(paid);
    data.due = parseFloat(stock * unitPrice - paid);
    data.stockDate = new Date().toDateString();
    data.month = months[new Date().getMonth()];
    data.year = new Date().getFullYear();

    if(stock && unitPrice && paid){
        try {
            forestTeaApi.post('/addStock', data)
            .then( res => {
                if (res.data){
                    toast('This Stock Item Successfully Added To Database');
                    setTimeout(() => {
                        closeModal();
                        window.location.reload()
                    },1000)
                }
            })
        } catch (error) {
            
        }
    }else{
        toast.error("Stock, Buying Unit Price, Paid Fields Are Empty Or Individual field empty please try again with valid values")
    }
    console.log(data);
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap mx-.5 mb-2">
        <div className="w-full  md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Product Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder=""
            {...register("productName", { required: true })}
          />
          {errors.productName && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Product Type
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder=""
            {...register("productType", { required: true })}
          />
          {errors.productType && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Unit Price (Selling)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder=""
            {...register("sellingUnitPrice", { required: true })}
          />
          {errors.sellingUnitPrice && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
      </div>
      <div className="w-full px-3 mt-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Availabe Stock
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder=""
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Unit Price (Buying)
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder=""
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
        />
      </div>
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Grand Total
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder=""
          value={stock * unitPrice}
        />
      </div>
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Paid
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder=""
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
        />
      </div>

      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Due
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder=""
          value={stock * unitPrice - paid}
        />
      </div>

      <input
        type="submit"
        className="bg-black hover:text-gray-100 font-bold italic hover:bg-gray-700 text-white p-3 rounded-lg w-full cursor-pointer mt-3"
        value="Submit"
      ></input>
    </form>
  );
};

export default StockForm;
