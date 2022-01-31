import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../Modal/Modal";
import Return from "../../Return/Return";

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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
      <tr className="">
        <td className="px-4 border-b border-r">{invoiceNo}</td>
        <td className="px-4 border-b border-r">{customerName}</td>
        <td className="px-4 border-b border-r">{phone}</td>
        <td className="px-4 border-b border-r">{email}</td>
        <td className="px-4 border-b border-r">{address}</td>
        <td className="px-1 border-b border-r">{purchaseDate}</td>
        <td className="px-1 border-b border-r">
          <table className="table table-striped text-xs font-bold">
            <thead>
              <tr>
                <th className="px-2">Item</th>
                <th className="px-2">Quantity</th>
                <th className="px-2">Unit Price</th>
                <th className="px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr>
                  <td className="px-2">{item.item}</td>
                  <td className="px-2">{item.itemQuantity}</td>
                  <td className="px-2">{item.itemUnitPrice}</td>
                  <td className="px-2">{item.total} - (After {item.itemDiscount} %)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td className="px-4 border-b border-r">{grandTotal}</td>
        <td className="px-10 border-b border-r">
          {" "}
          <span className="text-green-600 font-bold"> {paid} </span>{" "}
          <span className="text-red-600 font-bold">({due})</span>{" "}
        </td>
        <td className="px-2 border-b border-r ">
          {paymentStatus ? <span> &#9989; </span> : <span> &#10060; </span>} |
          {deliveredStatus ? <span> &#9989; </span> : <span> &#10060; </span>}
        </td>
        <td className="px-4 border-b">
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
                <Link
                  to=""
                  className="dropdown-item pe-auto"
                  onClick={() => alertForUpdatePaymentStatus(_id, true)}
                >
                  <span className="text-sm font-bold py-3"> Paid </span>
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="dropdown-item pe-auto"
                  onClick={() => alertForUpdateDeliveryStatus(_id, true)}
                >
                  <span className="text-sm font-bold py-3"> Delivered </span>
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="dropdown-item pe-auto"
                  onClick={openModal}
                >
                  <span className="text-sm font-bold py-3"> Return </span>
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="dropdown-item pe-auto"
                  onClick={() => alertForDelete(_id)}
                >
                  <span className="text-sm font-bold py-3">Delete</span>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to=""
                  className="dropdown-item pe-auto"
                  onClick={() => alertForUpdatePaymentStatus(_id, false)}
                >
                  <span className="text-sm font-bold py-3">Undo Paid</span>
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="dropdown-item pe-auto"
                  onClick={() => alertForUpdateDeliveryStatus(_id, false)}
                >
                  <span className="text-sm font-bold py-3">
                    {" "}
                    Undo Delivered
                  </span>
                </Link>
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
    </>
  );
};

export default TableData;
