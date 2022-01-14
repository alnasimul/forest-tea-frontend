import React from "react";
import { Link } from "react-router-dom";

const TableData = ({ record }) => {
  const {
    _id,
    customerName,
    phone,
    email,
    productName,
    address,
    quantity,
    paymentStatus,
    deliveredStatus,
    purchaseDate,
    totalSale,
  } = record;
  return (
    <tr>
      <td className="px-4">{customerName}</td>
      <td className="px-4">{phone}</td>
      <td className="px-4">{email}</td>
      <td className="px-4">{address}</td>
      <td className="px-4">{productName}</td>
      <td className="px-4">{quantity}</td>
      <td className="px-4">{purchaseDate}</td>
      <td className="px-4">{totalSale}</td>
      <td className="px-4">
        {paymentStatus ? <span> &#9989; </span> : <span> &#10060; </span>} |{" "}
        {deliveredStatus ? <span> &#9989; </span> : <span> &#10060; </span>}
      </td>
      <td>
        <div className="dropdown">
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded  dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link to="" className="dropdown-item pe-auto" onClick={``}>
                <span className="text-sm font-bold py-3"> Paid </span>
              </Link>
            </li>
            <li>
              <Link to="" className="dropdown-item pe-auto" onClick={``}>
                <span className="text-sm font-bold py-3"> Delivered </span>
              </Link>
            </li>
            <li>
              <Link to="" className="dropdown-item pe-auto" onClick={``}>
                <span className="text-sm font-bold py-3"> Edit </span>
              </Link>
            </li>
            <li>
              <Link to="" className="dropdown-item pe-auto" onClick={``}>
                <span className="text-sm font-bold py-3">Delete</span>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="" className="dropdown-item pe-auto" onClick={``}>
                <span className="text-sm font-bold py-3">Undo Paid</span>
              </Link>
            </li>
            <li>
              <Link to="" className="dropdown-item pe-auto" onClick={``}>
                <span className="text-sm font-bold py-3"> Undo Delivered</span>
              </Link>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default TableData;
