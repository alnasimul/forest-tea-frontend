/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forestTeaApi from "../../../helpers/forestTeaApi";

const Edit = ({ record }) => {
  const { _id, customerName, email, phone, address, items, grandTotal, paid } =
    record;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  let { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "items", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  let [previousItems, setPreviousItems] = useState([...items])
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [updateGrandTotal, setUpdateGrandTotal] = useState(grandTotal);
  const [updatePaid, setUpdatePaid] = useState(paid);

  //setDiscount(discount > 0 ? (quantity * unitPrice) - ((quantity * unitPrice) * (discount/100)) : quantity*unitPrice)

  useEffect(() => calculateGrandTotal(), [fields]);

  const clearField = () => {
    setItem("");
    setQuantity(0);
    setUnitPrice(0);
    setDiscount(0);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "itemInput") {
      setItem(e.target.value);
    } else if (e.target.name === "itemQuantity") {
      setQuantity(e.target.value);
    } else if (e.target.name === "unitPrice") {
      setUnitPrice(e.target.value);
    } else if (e.target.name === "itemDiscount") {
      setDiscount(e.target.value);
    }
  };

  const handleUpdateChange = (e, index, item) => {
    e.preventDefault();

    const modifyItem = {...item}

    if(e.target.name === "updateItem+"+index){
      modifyItem.item = e.target.value
    }
    else if(e.target.name === "updateQuantity+"+index){
      modifyItem.itemQuantity = e.target.value
    }
    else if(e.target.name === "updateUnitPrice+"+index){
      modifyItem.itemUnitPrice = e.target.value
    }
    else if(e.target.name === "updateDiscount+"+index){
      modifyItem.itemDiscount = e.target.value
    }
    else if(e.target.name === "updateTotal+"+index){
      modifyItem.total = e.target.value
    }
    console.log(modifyItem);
    setPreviousItems([...items, modifyItem])
  }

  const calculateGrandTotal = () => {
    let total = 0;
    items.map((field) => (total = total + field.total));
    console.log(total);
    setUpdateGrandTotal(total);
  };

  const onSubmit = (data) => {
    data.due = grandTotal - paid;
    data.paid = parseFloat(paid);
    data.grandTotal = grandTotal;

    try {
      forestTeaApi.post(`/insertDailyAccountRecord`, data).then((res) => {
        if (res.data) {
          toast("This Account record insterted successfully to database...");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    } catch (error) {}
    console.log(data);
  };

  console.log(previousItems)

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex bg-gray-100 p-3 rounded-lg">
        <div className="w-1/3 ">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="items"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Add items
              </label>

              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                id="items"
                name="itemInput"
                value={item}
                onChange={(e) => handleChange(e)}
              />
              {errors.requiredField && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="product-quantity"
              >
                Quantity
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="product-quantity"
                type="text"
                placeholder=""
                required
                name="itemQuantity"
                //  {...register("itemQuantity")}
                value={quantity}
                onChange={(e) => handleChange(e)}
              />
              {errors.quantity && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="unit-price"
              >
                Unit Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="unit-price"
                type="text"
                placeholder=""
                name="unitPrice"
                required
                value={unitPrice}
                onChange={(e) => handleChange(e)}
              />
              {errors.unitPrice && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="discount"
              >
                Discount
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="discount"
                type="text"
                placeholder="%"
                name="itemDiscount"
                value={discount}
                onChange={(e) => handleChange(e)}
              />
              {errors.discount && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="total"
              >
                Total
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="total"
                type="text"
                value={
                  discount > 0
                    ? quantity * unitPrice -
                      quantity * unitPrice * (discount / 100)
                    : quantity * unitPrice
                }
              />
            </div>
          </div>
          <a
            onClick={() => {
              append({
                item,
                itemQuantity: parseFloat(quantity),
                itemUnitPrice: parseFloat(unitPrice),
                itemDiscount: parseFloat(discount),
                total:
                  discount > 0
                    ? quantity * unitPrice -
                      quantity * unitPrice * (discount / 100)
                    : quantity * unitPrice,
              });
              clearField();
            }}
            className="bg-black p-2 rounded-lg text-sm text-white font-medium cursor-pointer "
          >
            Add item
          </a>
        </div>
        <div className="w-1/3">
          {previousItems.map((item, index) => (
            <div key={index} className="mr-10 w-full flex flex-wrap">
              <div className="w-1/5 mr-.5">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={item.item}
                  name={`updateItem+${index}`}
                  onChange={(e) => handleUpdateChange(e, index, item)}
                  className="p-1 border border-gray-200 rounded mb-3"
                />
              </div>

              <div className="w-1/5 mr-.5">
                <label htmlFor="">Quantity</label>
                <input
                  type="text"
                  value={item.itemQuantity}
                  name={`updateQuantity+${index}`}
                  onChange={(e) => handleUpdateChange(e, index)}
                  className="p-1  border border-gray-200 rounded mb-3"
                />
              </div>
              <div className="w-1/5 mr-.5">
                <label htmlFor="">Unit Price</label>
                <input
                  type="text"
                  value={item.itemUnitPrice}
                  name={`updateUnitPrice+${index}`}
                  onChange={(e) => handleUpdateChange(e, index)}
                  className="p-1 border border-gray-200 rounded mb-3"
                />
              </div>
              <div className="w-1/5 mr-.5">
                <label htmlFor="">Discount %</label>
                <input
                  type="text"
                  value={item.itemDiscount}
                  name={`updateDiscount+${index}`}
                  onChange={(e) => handleUpdateChange(e, index)}
                  className="p-1 border border-gray-200 rounded mb-3"
                />
              </div>
             <div className="w-1/5 mr-.5">
             <label htmlFor="">Total</label>
              <input
                type="text"
                value={
                  item.itemDiscount > 0
                    ? item.itemQuantity * item.itemUnitPrice -
                      (item.itemQuantity *
                        item.itemUnitPrice *
                        item.itemDiscount) /
                        100
                    : item.itemQuantity * item.itemUnitPrice
                }
                name={`updateTotal+${index}`}
                onChange={(e) => handleUpdateChange(e, index)}
                className="p-1 border border-gray-200 rounded mb-3"
              />
             </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="w-1/3 bg-white p-3 border rounded-lg">
          <table className="table text-gray-600">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                return (
                  <tr
                    key={field.id} // important to include key with field's id
                  >
                    <td> {index + 1} </td>
                    <td> {field.item} </td>
                    <td> {field.itemQuantity} </td>
                    <td> {field.itemUnitPrice} </td>
                    <td> {field.itemDiscount} % </td>
                    <td> {field.total} </td>
                    <td className="text-red-700 hover:text-red-800">
                      {" "}
                      <FaTrash
                        onClick={() => remove(index)}
                        className="mt-1 ml-2 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

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
            value={paid}
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

export default Edit;
