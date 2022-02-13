import React from "react";
import { useState } from "react";
import Modal from "../../../Modal/Modal";
import Edit from "../../Edit/Edit";

const TableData = ({ stockItem, index, deleteStock }) => {
  const {
    _id,
    productName,
    grade,
    productType,
    sellingUnitPrice,
    stock,
    buyingUnitPrice,
    grandTotal,
    paid,
    due,
    stockDate,
  } = stockItem;

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const alertForDelete = (id) => {
    if (window.confirm("Are you sure want to delete this stock item?")) {
      deleteStock(id);
    }
  };

  return (
    <>
      <tr>
        <td className="p-4 border-b border-r" data-label="Serial">{index + 1}</td>
        <td className="p-4 border-b border-r" data-label="Date">{stockDate}</td>
        <td className="p-4 border-b border-r" data-label="Name">{productName}</td>
        <td className="p-4 border-b border-r" data-label="Grade">{grade}</td>
        <td className="p-4 border-b border-r" data-label="Category">{productType}</td>
        <td className="p-4 border-b border-r" data-label="Selling (Unit Price)">{sellingUnitPrice}</td>
        <td className="p-4 border-b border-r" data-label="Buying (Unit Price)">{buyingUnitPrice}</td>
        <td className="p-4 border-b border-r" data-label="Available Stocks">{stock} Kg</td>
        <td className="p-4 border-b border-r" data-label="Grand Total">{grandTotal}</td>
        <td className="p-4 border-b border-r text-green-700" data-label="Paid">{paid}</td>
        <td className="p-4 border-b border-r text-red-700" data-label="Due">{due}</td>
        <td className="p-4 border-b border-r" data-label="Actions">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn hover:bg-green-800 bg-green-700 text-white text-sm font-medium"
              onClick={openModal}
            >
              Update
            </button>
            <button
              type="button"
              className="btn hover:bg-red-800 bg-red-700 text-white text-sm font-medium"
              onClick={() => alertForDelete(_id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      {modalIsOpen && (
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} compact={true}>
          <Edit stockItem={stockItem} closeModal={closeModal}/>
        </Modal>
      )}
    </>
  );
};

export default TableData;
