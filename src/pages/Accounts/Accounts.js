import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AccountForm from "../../components/Accounts/AccountForm/AccountForm";
import AccountsTable from "../../components/Accounts/AccountsTable/AccountsTable";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import forestTeaApi from "../../helpers/forestTeaApi";

const Accounts = () => {
  const [records, setRecords] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    forestTeaApi
      .get(`/dailyAccounts/${new Date().toDateString()}`)
      .then((res) => {
        setRecords(res.data);
      });
  }, []);

  const calculateTotalBill = (datas) => {
    let total = 0;
    datas.map((data) => (total = total + parseInt(data.grandTotal)));
    return total;
  };

  const calculateTotalPaid = (datas) => {
    let total = 0;
    datas.map((data) => (total = total + parseInt(data.paid)));
    return total;
  };
  const calculateDue = (datas) => {
    let totalDue = 0;
    datas.map((data) => (totalDue = totalDue + parseInt(data.due)));
    return totalDue;
  };
  return (
    <Layout>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 md:gap-10 sm:flex sm:justify-between">
        <div className="w-full mt-5  sm:px-5 bg-white rounded-lg text-center lg:mt-20 md:mr-5">
          <button
                className="bg-red-700 text-white p-2 rounded flex mb-3 uppercase"
                onClick={openModal}
              >
                <FaPlus className="mt-1 mr-2" /> Add Sale Record
          </button>
          <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <AccountForm />
          </Modal>
          <AccountsTable records={records} />
          <h2 className="text-sm font-bold text-right italic my-3">
            <span className="bg-gray-200 rounded-lg p-2 ">
              <span>Total Sold: {calculateTotalBill(records)} ( </span>
              <span className="text-green-700">
                {calculateTotalPaid(records)} Paid
              </span>
              <span className="text-gray-500"> || </span>
              <span className="text-red-600">
                {calculateDue(records)} Due
              </span>
              )
            </span>
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
