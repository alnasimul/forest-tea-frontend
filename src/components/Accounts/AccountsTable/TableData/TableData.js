/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Modal from "../../../Modal/Modal";
import UpdateModal from "../../../UpdateModal/UpdateModal";
import Return from "../../Return/Return";
import Update from "../../Update/Update";

const TableData = ({
  record,
  updatePaymentStatus,
  updateDeliveryStatus,
  deleteData,
}) => {
  const {
    _id,
    invoiceNo,
    customerName,
    phone,
    email,
    address,
    paymentStatus,
    deliveredStatus,
    items,
    purchaseDate,
    grandTotal,
    paid,
    due,
  } = record;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openUpdateModal = () => {
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const alertForUpdatePaymentStatus = (id, status) => {
    if (status) {
      if (window.confirm("Are you sure want to update payment status?")) {
        updatePaymentStatus(id, status);
      }
    } else {
      if (window.confirm("Are you sure want to update undo payment status?")) {
        updatePaymentStatus(id, status);
      }
    }
  };
  const alertForUpdateDeliveryStatus = (id, status) => {
    if (status) {
      if (window.confirm("Are you sure want to update delivery status?")) {
        updateDeliveryStatus(id, status);
      }
    } else {
      if (window.confirm("Are you sure want to update undo delivery status?")) {
        updateDeliveryStatus(id, status);
      }
    }
  };

  const alertForDelete = (id) => {
    if (
      window.confirm(
        "Are you sure want to delete this data? if you delete this you will lost the data permanently !"
      )
    ) {
      deleteData(id);
    }
  };
  return (
    <>
      <tr className="mb">
        <td className="px-4 border-b border-r" data-label="Invoice No" >{invoiceNo}</td>
        <td className="px-4 border-b border-r" data-label="Customer's Name">{customerName}</td>
        <td className="px-4 border-b border-r" data-label="Phone">{phone}</td>
        <td className="px-4 border-b border-r" data-label="Email">{email}</td>
        <td className="px-4 border-b border-r" data-label="Address">{address}</td>
        <td className="px-1 border-b border-r" data-label="Date">{purchaseDate}</td>
        <td className="px-1 border-b border-r" >
          <table className="table text-xs font-bold mobileTable">
            <thead>
              <tr>
                <th className="px-2">Item</th>
                <th className="px-2">Quantity</th>
                <th className="px-2">Unit Price</th>
                <th className="px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr>
                  <p className="text-center">Serial #{index + 1}</p>
                  <td className="px-2" data-label="Item">{item.item}</td>
                  <td className="px-2" data-label="Quantity">{item.itemQuantity}</td>
                  <td className="px-2" data-label="Unit Price">{item.itemUnitPrice}</td>
                  <td className="px-2" data-label="Total">{item.total} - (After {item.itemDiscount} %)</td>
                  <hr />
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td className="px-4 border-b border-r" data-label="Grand Total">{grandTotal}</td>
        <td className="px-10 border-b border-r" data-label="Paid - Due">
          {" "}
          <span className="text-green-600 font-bold"> {paid} </span>{" "}
          <span className="text-red-600 font-bold">({due})</span>{" "}
        </td>
        <td className="px-2 border-b border-r" data-label="Status (Payment, Delivery)">
          {paymentStatus ? <span> &#9989; </span> : <span> &#10060; </span>} |
          {deliveredStatus ? <span> &#9989; </span> : <span> &#10060; </span>}
        </td>
        <td className="px-4 border-b" data-label="Actions">
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
                <a
                  className="dropdown-item pe-auto cursor-pointer"
                  onClick={() => alertForUpdatePaymentStatus(_id, true)}
                >
                  <span className="text-sm font-bold py-3"> Paid </span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item pe-auto cursor-pointer"
                  onClick={() => alertForUpdateDeliveryStatus(_id, true)}
                >
                  <span className="text-sm font-bold py-3"> Delivered </span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item pe-auto cursor-pointer"
                  onClick={openUpdateModal}
                >
                  <span className="text-sm font-bold py-3"> Update </span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item pe-auto cursor-pointer hidden sm:inline-block"
                  onClick={openModal}
                >
                  <span className="text-sm font-bold py-3"> Return </span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item pe-auto cursor-pointer"
                  onClick={() => alertForDelete(_id)}
                >
                  <span className="text-sm font-bold py-3">Delete</span>
                </a>
              </li>
              <hr />
              <li>
                <a
                  className="dropdown-item pe-auto cursor-pointer"
                  onClick={() => alertForUpdatePaymentStatus(_id, false)}
                >
                  <span className="text-sm font-bold py-3">Undo Paid</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item pe-auto cursor-pointer"
                  onClick={() => alertForUpdateDeliveryStatus(_id, false)}
                >
                  <span className="text-sm font-bold py-3">
                    {" "}
                    Undo Delivered
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      {modalIsOpen && (
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <Return record={record} closeModal={closeModal} />
        </Modal>
      )}
      {updateModalIsOpen && (
        <UpdateModal updateModalIsOpen={updateModalIsOpen} closeUpdateModal={closeUpdateModal} compact={true}>
          <Update record={record} closeUpdateModal={closeUpdateModal}/>
        </UpdateModal>
      )
      }
    </>
  );
};

export default TableData;
