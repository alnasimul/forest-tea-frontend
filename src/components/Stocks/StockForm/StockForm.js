/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import moment from "moment";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import forestTeaApi from "../../../helpers/forestTeaApi";
import "./StockForm.css";

const StockForm = ({ closeModal }) => {
  const [supplierName, setSupplierName] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountTk, setDiscountTk] = useState(0);
  const [vat, setVat] = useState(0);
  const [vatTk, setVatTk] = useState(0);
  const [transport, setTransport] = useState(0);
  const [other, setOther] = useState(0);
  const [grade, setGrade] = useState("");
  const [stock, setStock] = useState(0);
  const [buyingUnitPrice, setBuyingUnitPrice] = useState(0);
  const [sellingUnitPrice, setSellingUniPrice] = useState(0);
  const [paid, setPaid] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "purchasedItems", // unique name htmlFor your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

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

  const clearField = () => {
    setSupplierName("")
    setInvoiceNo("");
    setStock(0);
    setBuyingUnitPrice(0);
    setSellingUniPrice(0);
    setTransport(0);
    setOther(0);
    setPaid(0)
    setVat(0);
    setVatTk(0);
    setDiscount(0);
    setDiscountTk(0);
    setProductName("");
    setProductType("");
    setGrade("");
    setManufacturer("");
    setPurchaseDate();
    setExpDate("");
    setBank("");
    setBranch("");
    setNotes("")
  };

  const onSubmit = (data) => {
    console.log("data", data);
    
      try {
        forestTeaApi.post(`/addStock`,data)
        .then( res =>{ 
          if(res.data) {
            toast("Purchased items inserted successfully");
            closeModal();
            setTimeout(() =>{ window.location.reload(); }, 1500)
        }
      })
      } catch (error) {
        
      }
  };

  console.log(fields)
 
  // console.log(formState)
  return (
    <form className="w-full text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <div className="flex flex-wrap mx-.5 mb-2">
          <div className="w-full  md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Supplier Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full  md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Invoice No
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full  md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Purchase Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
              placeholder=""
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full  md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Exp Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
              placeholder=""
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full  md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Product Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full  md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Manufacturer
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Ex/Batch
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Size/Grade
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Quantity
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Purchase Rate
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={buyingUnitPrice}
              onChange={(e) => setBuyingUnitPrice(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Selling Rate
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={sellingUnitPrice}
              onChange={(e) => setSellingUniPrice(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Transport
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Other Cost
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
            {error && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Vat %
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={vat}
              onChange={(e) => setVat(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Vat Tk
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={vatTk}
              onChange={(e) => setVatTk(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Discount %
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Discount Tk
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={discountTk}
              onChange={(e) => setDiscountTk(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Grand Total
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={
                discount > 0
                  ? parseFloat(stock) * parseFloat(buyingUnitPrice) +
                    parseFloat(transport) +
                    parseFloat(other) +
                    (parseFloat(stock) *
                      parseFloat(buyingUnitPrice) *
                      parseFloat(vat)) /
                      100 +
                    parseFloat(vatTk) -
                    (parseFloat(stock) *
                      parseFloat(buyingUnitPrice) *
                      parseFloat(discount)) /
                      100 -
                    parseFloat(discountTk)
                  : parseFloat(stock) * parseFloat(buyingUnitPrice) +
                    parseFloat(transport) +
                    parseFloat(other) +
                    (parseFloat(stock) *
                      parseFloat(buyingUnitPrice) *
                      parseFloat(vat)) /
                      100 +
                    parseFloat(vatTk) -
                    parseFloat(discountTk)
              }
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
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
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Due
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={
                discount > 0
                  ? parseFloat(stock) * parseFloat(buyingUnitPrice) +
                    parseFloat(transport) +
                    parseFloat(other) +
                    (parseFloat(stock) *
                      parseFloat(buyingUnitPrice) *
                      parseFloat(vat)) /
                      100 +
                    parseFloat(vatTk) -
                    (parseFloat(stock) *
                      parseFloat(buyingUnitPrice) *
                      parseFloat(discount)) /
                      100 -
                    parseFloat(discountTk) -
                    parseFloat(paid)
                  : parseFloat(stock) * parseFloat(buyingUnitPrice) +
                    parseFloat(transport) +
                    parseFloat(other) +
                    (parseFloat(stock) *
                      parseFloat(buyingUnitPrice) *
                      parseFloat(vat)) /
                      100 +
                    parseFloat(vatTk) -
                    parseFloat(discountTk) -
                    parseFloat(paid)
              }
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Bank
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Branch
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              cols="50"
              rows="2"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
            ></textarea>
          </div>
          <div
            className="w-full md:w-1/6  mb-6 md:mb-0"
            style={{ marginTop: "45px" }}
          >
            <a
              className="w-full bg-black text-white py-3 px-24 rounded cursor-pointer"
              onClick={() =>
                {(supplierName && productName && manufacturer && productType && invoiceNo && grade && stock && buyingUnitPrice && sellingUnitPrice && purchaseDate && expDate) ?
               append({
                  supplierName,
                  productNameWithGradeAndCategory:
                    productName + " - " + grade + " - " + productType,
                  productName,
                  invoiceNo,
                  purchaseDate,
                  expDate,
                  manufacturer,
                  productType,
                  grade,
                  stock: parseFloat(stock),
                  buyingUnitPrice: parseFloat(buyingUnitPrice),
                  transport: parseFloat(transport),
                  other: parseFloat(other),
                  sellingUnitPrice: parseFloat(sellingUnitPrice),
                  vat: parseFloat(vat),
                  vatTk: parseFloat(vatTk),
                  discount: parseFloat(discount),
                  discountTk: parseFloat(discountTk),
                  grandTotal:
                    discount > 0
                      ? parseFloat(stock) * parseFloat(buyingUnitPrice) +
                        parseFloat(transport) +
                        parseFloat(other) +
                        (parseFloat(stock) *
                          parseFloat(buyingUnitPrice) *
                          parseFloat(vat)) /
                          100 +
                        parseFloat(vatTk) -
                        (parseFloat(stock) *
                          parseFloat(buyingUnitPrice) *
                          parseFloat(discount)) /
                          100 -
                        parseFloat(discountTk)
                      : parseFloat(stock) * parseFloat(buyingUnitPrice) +
                        parseFloat(transport) +
                        parseFloat(other) +
                        (parseFloat(stock) *
                          parseFloat(buyingUnitPrice) *
                          parseFloat(vat)) /
                          100 +
                        parseFloat(vatTk) -
                        parseFloat(discountTk),
                  paid,
                  due:
                    discount > 0
                      ? parseFloat(stock) * parseFloat(buyingUnitPrice) +
                        parseFloat(transport) +
                        parseFloat(other) +
                        (parseFloat(stock) *
                          parseFloat(buyingUnitPrice) *
                          parseFloat(vat)) /
                          100 +
                        parseFloat(vatTk) -
                        (parseFloat(stock) *
                          parseFloat(buyingUnitPrice) *
                          parseFloat(discount)) /
                          100 -
                        parseFloat(discountTk) -
                        parseFloat(paid)
                      : parseFloat(stock) * parseFloat(buyingUnitPrice) +
                        parseFloat(transport) +
                        parseFloat(other) +
                        (parseFloat(stock) *
                          parseFloat(buyingUnitPrice) *
                          parseFloat(vat)) /
                          100 +
                        parseFloat(vatTk) -
                        parseFloat(discountTk) -
                        parseFloat(paid),
                  bank,
                  branch,
                  notes,
                  month: months[new Date().getMonth()],
                  year: new Date().getFullYear(),
                  stockOut: false,
                })
                 : toast.error("Please check all input fields to add data")
                 clearField();
                }
              }
            >
              Add
            </a>
          </div>
        </div>
      </div>
      <div className="w-full text-sm purchaseItems">
        <table className="table text-gray-600">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Supplier</th>
              <th>Invoice</th>
              <th>Date</th>
              <th>Name</th>
              <th>Ex</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>P. Rate</th>
              <th>S. Rate</th>
              <th>Transport</th>
              <th>Other</th>
              <th>Vat</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Bank</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              return (
                <tr key={field.id}>
                  <td>{index + 1}</td>
                  <td>{field.supplierName}</td>
                  <td>{field.invoiceNo}</td>
                  <td>
                    ({field.purchaseDate}) - ({field.expDate})
                  </td>
                  <td>{field.productName}</td>
                  <td>{field.productType}</td>
                  <td>{field.grade}</td>
                  <td>{field.stock}</td>
                  <td>{field.buyingUnitPrice}</td>
                  <td>{field.sellingUnitPrice}</td>
                  <td>{field.transport}</td>
                  <td>{field.other}</td>
                  <td>
                    {field.vat} % {field.vatTk} Tk
                  </td>
                  <td>
                    {field.discount} % {field.discountTk} Tk
                  </td>
                  <td>{field.grandTotal}</td>
                  <td>
                    {field.bank} ({field.branch})
                  </td>
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
      <input
        type="submit"
        className="bg-black hover:text-gray-100 font-bold italic hover:bg-gray-700 text-white p-3 rounded-lg w-full cursor-pointer mt-3"
        value="Purchase"
      ></input>
    </form>
  );
};

export default StockForm;
