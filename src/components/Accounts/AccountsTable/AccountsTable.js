import React, { useEffect, useState } from "react"; 
import forestTeaApi from "../../../helpers/forestTeaApi";
import TableData from "./TableData/TableData";

const AccountsTable = () => {
  const [records, setRecords] = useState([])
  useEffect(() => {
    forestTeaApi.get(`/dailyAccounts/${new Date().toDateString()}`)
    .then(res => setRecords(res.data))
  },[])
  console.log(records)
  return (
    <table className="table-auto border-separate border border-gray-400 text-sm text-gray-600 rounded">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4">Customer's Name</th>
          <th className="px-4">Phone</th>
          <th className="px-4">Email</th>
          <th className="px-4">Address</th>
          <th className="px-4">Product's Name </th>
          <th className="px-4">Quantity (Sold)</th>
          <th className="px-4">Date</th>
          <th className="px-4">Sale</th>
          <th>Status (Payment, Delivery)</th>
          <th className="px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          records.map(record =>  <TableData key={record.id} record={record}/>  )
        }
       
      </tbody>
    </table>
  );
};

export default AccountsTable;
