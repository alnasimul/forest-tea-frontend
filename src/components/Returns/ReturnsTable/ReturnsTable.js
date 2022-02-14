import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import forestTeaApi from "../../../helpers/forestTeaApi";
import TableData from "../TableData/TableData";
import "./ReturnsTable.css";

const ReturnsTable = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    forestTeaApi.get(`/returns`).then((res) => setReturns(res.data));
  }, []);

  const deleteReturnData = (id) => {
    forestTeaApi.delete(`/deleteReturn/${id}`).then((res) => {
      if (res.data) {
        toast("Return data deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  };

  return (
    <>
      {returns.length > 0 ? (
        <table className="returnsTable table-auto border-b-0 border-t border-x border-gray-300 text-sm text-gray-600 rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4">Invoice No</th>
              <th className="px-4">Date</th>
              <th className="px-4">Name</th>
              <th className="px-4">Email</th>
              <th className="px-4">Phone</th>
              <th className="px-4">Grand Total</th>
              <th className="px-4">Paid</th>
              <th className="px-4">Due</th>
              <th className="px-4">Items</th>
              <th className="px-4">Action</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {returns.map((data) => (
              <TableData
                key={data._id}
                data={data}
                deleteReturnData={deleteReturnData}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-2xl text-center my-20 text-red-600 italic ">
              No records found
        </h2>
      )}
    </>
  );
};

export default ReturnsTable;
