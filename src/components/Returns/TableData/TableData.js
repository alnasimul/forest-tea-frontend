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
    <tr className="mb">
      <td className="px-2 border-b border-r" data-label="Invoice No"> {invoiceNo} </td>
      <td className="px-2 border-b border-r" data-label="Date"> {returnDate} </td>
      <td className="px-2 border-b border-r" data-label="Name"> {customerName} </td>
      <td className="px-2 border-b border-r" data-label="Email"> {email} </td>
      <td className="px-2 border-b border-r" data-label="Phone"> {phone} </td>
      <td className="px-2 border-b border-r" data-label="Grand Total"> {grandTotal} </td>
      <td className="px-2 border-b border-r" data-label="Paid"> {paid} </td>
      <td className="px-2 border-b border-r" data-label="Due"> {due} </td>
      <td className="px-2 border-b border-r">
        <table className="table text-xs font-bold mobileTable">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr>
                 <p className="text-center">Serial #{index + 1}</p>
                <td className="px-2" data-label="Item">{item.item}</td>
                <td className="px-2" data-label="Quantity">{item.itemQuantity}</td>
                <td className="px-2" data-label="Unit Price">{item.itemUnitPrice}</td>
                <td className="px-2" data-label="Total">
                {item.total} - (After {item.itemDiscount} %)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
      <td className="px-1 border-b border-r" data-label="Action">
          <button className="bg-red-700 text-white hover:bg-red-800 p-2 rounded" onClick={() => alertForDeleteData(_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableData;
