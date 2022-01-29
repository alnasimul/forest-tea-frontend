import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import forestTeaApi from "../../../helpers/forestTeaApi";

const Edit = ({closeModal, stockItem}) => {
   const {
        _id,
        productName,
        productType,
        sellingUnitPrice,
        stock,
        buyingUnitPrice,
        paid,
      } = stockItem;
    
  const [updateStock, setUpdateStock] = useState(stock);
  const [updateUnitPrice, setUpdateUnitPrice] = useState(buyingUnitPrice);
  const [updatePaid, setUpdatePaid] = useState(paid);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    data.sellingUnitPrice = parseFloat(data.sellingUnitPrice)
    data.stock = parseFloat(updateStock);
    data.buyingUnitPrice = parseFloat(updateUnitPrice);
    data.grandTotal = updateStock * updateUnitPrice;
    data.paid = parseFloat(updatePaid);
    data.due = parseFloat(updateStock * updateUnitPrice - updatePaid);
    
    if(updateStock && updateUnitPrice && updatePaid){
        try {
            forestTeaApi.patch(`/updateStock/${_id}`, data)
            .then( res => {
                if (res.data){
                    toast('This stock item successfully updated to database');
                    closeModal();
                    setTimeout(() => {
                        window.location.reload()
                    },1000)
                }
            })
        } catch (error) {
            
        }
    }else{
        toast.error("Either stock, buying unit Price, paid fields are empty or Individual field is empty please try again with valid values")
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
            defaultValue={productName}
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
            defaultValue={productType}
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
            defaultValue={sellingUnitPrice}
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
          value={updateStock}
          onChange={(e) => setUpdateStock(e.target.value)}
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
          value={updateUnitPrice}
          onChange={(e) => setUpdateUnitPrice(e.target.value)}
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
          value={updateStock * updateUnitPrice}
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
          value={updatePaid}
          onChange={(e) => setUpdatePaid(e.target.value)}
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
          value={updateStock * updateUnitPrice - updatePaid}
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

export default Edit;
