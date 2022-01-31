import React from "react";

const TableData = ({ data, deleteReturnData }) => {
  const {
    _id,
    items,
    customerName,
    email,
    phone,
    invoiceNo,
    returnDate,
    grandTotal,
    paid,
    due,
  } = data;

  const alertForDeleteData = (id) => {
      if(window.confirm("Are you sure want to delete this return data?")){
          deleteReturnData(id)
      }
  }

  return (
    <tr>
      <td className="px-2 border-b border-r"> {invoiceNo} </td>
      <td className="px-2 border-b border-r"> {returnDate} </td>
      <td className="px-2 border-b border-r"> {customerName} </td>
      <td className="px-2 border-b border-r"> {email} </td>
      <td className="px-2 border-b border-r"> {phone} </td>
      <td className="px-2 border-b border-r"> {grandTotal} </td>
      <td className="px-2 border-b border-r"> {paid} </td>
      <td className="px-2 border-b border-r"> {due} </td>
      <td className="px-2 border-b border-r">
        <table className="table table-striped text-xs font-bold">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr>
                <td className="px-2">{item.item}</td>
                <td className="px-2">{item.itemQuantity}</td>
                <td className="px-2">{item.itemUnitPrice}</td>
                <td className="px-2">
                {item.total} - (After {item.itemDiscount} %)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
      <td className="px-1 border-b border-r">
          <button className="bg-red-700 text-white hover:bg-red-800 p-2 rounded" onClick={() => alertForDeleteData(_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableData;
