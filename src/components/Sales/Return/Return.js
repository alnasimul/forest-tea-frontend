/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forestTeaApi from "../../../helpers/forestTeaApi";
import SearchedItems from "../SaleForm/SearchedItems/SearchedItems";

const Return = ({ record, stocks }) => {
  const { _id, customerName, email, phone, address, items, invoiceNo, grandTotal, paid } =
    record;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "items", // unique name htmlFor your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const [searchedItems, setSearchedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({})
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [updateGrandTotal, setUpdateGrandTotal] = useState(grandTotal);
  const [expense, setExpense] = useState(0);
  const [returnSaleProfit, setReturnSaleProfit] = useState(0);
  const [updatePaid, setUpdatePaid] = useState(paid);

  //setDiscount(discount > 0 ? (quantity * unitPrice) - ((quantity * unitPrice) * (discount/100)) : quantity*unitPrice)
  
  useEffect(() => {
    calculateGrandTotal()
    calculateTotalSaleProfit()
  }, [fields]);
  useEffect(() => getProducts(), [item])
  useEffect(() => prepend(items), [])

  

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

  
  const calculateGrandTotal = () => {
    let total = 0;
    fields.map((field) => (total = total + field.total));
    console.log(total);
    setUpdateGrandTotal(total);
  };

  const calculateTotalSaleProfit = () => {
    let total = 0;
    fields.map((field) => (total = total + field.totalProfit));
    console.log(total);
    setReturnSaleProfit(total);
  };

  const getProducts = () => {
    if(item){
      forestTeaApi.get(`/getProductByName/${item}`)
      .then(res => setSearchedItems(res.data))
    }
  }

  const selectProduct = (item) => {
    setSelectedItem(item)
    setUnitPrice(item.sellingUnitPrice)
    setSearchedItems([])
  }

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
    data.invoiceNo = parseInt(invoiceNo)
    data.due = updateGrandTotal - updatePaid;
    data.paid = updatePaid;
    data.grandTotal = parseInt(updateGrandTotal);
    data.returnSaleProfit = parseFloat(returnSaleProfit);
    data.returnDate = new Date().toDateString();
    data.month = months[new Date().getMonth()];
    data.year = new Date().getFullYear();

    try {
      forestTeaApi.post(`/returnItems`, data).then((res) => {
        if (res.data) {
          toast("Items returned successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
      forestTeaApi.patch(`/returnProductsStocksQuantity`,data.items)
       .then(res => console.log(res.data))
    } catch (error) {}
    console.log(data);
  };

  console.log("fields",fields);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex bg-gray-100 p-3 rounded-lg">
        <div className="w-2/4 ">
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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

              {searchedItems.length > 0 && (
                <div className="bg-white p-3 mx-1 rounded border ">
                  {searchedItems.map((item) => (
                    <SearchedItems
                      key={item._id}
                      item={item}
                      selectProduct={selectProduct}
                    />
                  ))}
                </div>
              )}

              {/* <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  defaultValue=""
                  onClick={(e) => {
                    setProductId(e.target.value)
                    getItemAndPrice()
                  }}
                >
                  <option disabled={true} value={``}>
                    Select Item
                  </option>
                  {stocks.map((stock) => (
                    <option
                      value={stock._id} 
                    >
                      {stock.productName} - {stock.productType}
                    </option>
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
              </div> */}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Packeging
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onClick={(e) => {
                    setExpense(e.target.value);
                  }}
                >
                  <option disabled={true} value={``}>
                    Select
                  </option>
                  <option value={0}>Lose</option>
                  <option value={7}>Packed</option>
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
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="product-quantity"
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
                htmlFor="unit-price"
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
                htmlFor="discount"
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
                htmlFor="total"
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
              ( item && quantity > 0) &&
              append({
                item: selectedItem.productName,
                productId: selectedItem._id,
                itemQuantity: parseFloat(quantity),
                itemUnitPrice: parseFloat(unitPrice),
                itemDiscount: parseFloat(discount),
                expense: parseFloat(expense),
                package: expense > 0 ? "Packed" : "Lose",
                itemProfit:
                  parseFloat(unitPrice) -
                  selectedItem.buyingUnitPrice -
                  expense,
                total:
                  discount > 0
                    ? quantity * unitPrice -
                      quantity * unitPrice * (discount / 100)
                    : quantity * unitPrice,
                totalProfit:
                  discount > 0
                    ? quantity * unitPrice -
                      quantity * selectedItem.buyingUnitPrice -
                      quantity * expense -
                      quantity * unitPrice * (discount / 100)
                    : quantity * unitPrice -
                      quantity * selectedItem.buyingUnitPrice -
                      quantity * expense,
              });
              clearField();
            }}
            className="bg-black p-2 rounded-lg text-sm text-white font-medium cursor-pointer "
          >
            Add item
          </a>
        </div>
        <div className="w-2/4 bg-white p-3 border rounded-lg">
          <table className="table text-gray-600">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Profit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                return (
                  <tr
                    key={field.id} // important to include key with field's id
                  >
                    <td>  {index + 1} </td>
                    <td>  {field.item} </td>
                    <td> {field.itemQuantity} </td>
                    <td> {field.itemUnitPrice} </td>
                    <td> {field.itemDiscount} % </td>
                    <td> {field.total} </td>
                    <td> {field.totalProfit} </td>
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
          htmlFor="customer-name"
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
          htmlFor="customer-email"
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
          htmlFor="customer-phone"
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
          htmlFor="customer-address"
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
            htmlFor="grand-total"
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
            htmlFor="total-sale"
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
            htmlFor="grid-state"
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
            htmlFor="due"
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

export default Return;
