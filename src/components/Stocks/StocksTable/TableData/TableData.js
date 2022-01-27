import React from "react";

const TableData = ({ stockItem, index }) => {
  const {
    _id,
    productName,
    productType,
    sellingUnitPrice,
    stock,
    buyingUnitPrice,
    grandTotal,
    paid,
    due,
    stockDate,
  } = stockItem;

  return (
    <tr>
      <td className="p-4 border-b border-r">{index + 1}</td>
      <td className="p-4 border-b border-r">{stockDate}</td>
      <td className="p-4 border-b border-r">{productName}</td>
      <td className="p-4 border-b border-r">{productType}</td>
      <td className="p-4 border-b border-r">{sellingUnitPrice}</td>
      <td className="p-4 border-b border-r">{stock}</td>
      <td className="p-4 border-b border-r">{buyingUnitPrice}</td>
      <td className="p-4 border-b border-r">{grandTotal}</td>
      <td className="p-4 border-b border-r text-green-700">{paid}</td>
      <td className="p-4 border-b border-r text-red-700">{due}</td>
      <td className="p-4 border-b border-r">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn hover:bg-green-800 bg-green-700 text-white text-sm font-medium">
            Update
          </button>
          <button type="button" className="btn hover:bg-red-800 bg-red-700 text-white text-sm font-medium">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableData;
