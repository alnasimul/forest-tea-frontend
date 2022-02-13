import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forestTeaApi from "../../../helpers/forestTeaApi";
import TableData from "./TableData/TableData";
import './SalesTable.css';

const SalesTable = ({ records }) => {
  const updatePaymentStatus = (id, status) => {
    try {
      forestTeaApi
        .patch(`/updatePaymentStatus/${id}`, { status })
        .then((res) => {
          if (res.data) {
            toast("Payment status updated successfully...");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDeliveryStatus = (id, status) => {
    try {
      forestTeaApi
        .patch(`/updateDeliveryStatus/${id}`, { status })
        .then((res) => {
          if (res.data) {
            toast("Delivery status updated successfully...");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = (id) => {
    console.log(id);
    try {
      forestTeaApi.delete(`/deleteRecord/${id}`).then((res) => {
        if (res.data) {
          toast("This record deleted successfully from database ...");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
    } catch (error) {}
  };

  return (
    <>
      {records.length > 0 ? (
        <table className="table w-full table-auto border-b-0 border-t border-x border-gray-300 text-sm text-gray-600 rounded">
          <thead className="bg-gray-200">
            <ToastContainer />
            <tr>
              <th className="px-4">Invoice No</th>
              <th className="px-4">Customer's Name</th>
              <th className="px-4">Phone</th>
              <th className="px-4">Email</th>
              <th className="px-4">Address</th>
              <th className="px-4">Date</th>
              <th>Items (Sold)</th>
              <th className="px-10">Total - (Profit)</th>
              <th className="px-1">Paid - Due</th>
              <th>Status (Payment, Delivery)</th>
              <th className="px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {records.map((record) => (
              <TableData
                key={record.id}
                record={record}
                updatePaymentStatus={updatePaymentStatus}
                updateDeliveryStatus={updateDeliveryStatus}
                deleteData={deleteData}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-2xl text-center mt-10 text-red-600 italic ">
          No records found
        </h2>
      )}
    </>
  );
};

export default SalesTable;
