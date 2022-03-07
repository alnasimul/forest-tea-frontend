import React, { useEffect, useState } from "react";
import { FaCalendarDay, FaPlus, FaSearch } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SearchForm from "../../components/Sales/SearchForm/SearchForm";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import SaleForm from "../../components/Sales/SaleForm/SaleForm";
import SalesTable from "../../components/Sales/SalesTable/SalesTable";
import forestTeaApi from "../../helpers/forestTeaApi";

const Sales = () => {
  const [records, setRecords] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchForm, setSearchForm] = useState(false);
  const [salesTable, setSalesTable] = useState(true);
  const [calendar, setCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeSearchForm = () => {
    setSearchForm(false);
  };

  const openSalesTable = () => {
    setSalesTable(true);
  };

  useEffect(() => {
    forestTeaApi
      .get(`/dailyAccounts/${new Date(selectedDate).toDateString()}`)
      .then((res) => {
        setRecords(res.data);
      });
      setCalendar(false)
  }, [selectedDate]);

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

  const calculateTotalProfit = (datas) => {
    let totalProfit = 0;
    datas.map(
      (data) => (totalProfit = totalProfit + parseFloat(data.totalSaleProfit))
    );
    return totalProfit;
  };

  const getSearchRecords = (data) => {
    setRecords(data);
  };

  console.log(selectedDate)
  console.log(records)

  return (
    <Layout>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 md:gap-10 sm:flex sm:justify-between">
        <div className="w-full mt-5 sm:px-5 bg-white rounded-lg lg:mt-20 md:mr-5">
          <div className="flex">
            <button
              className="bg-red-700 hover:bg-red-800 text-white p-2 rounded  mb-3 uppercase mr-2 hidden sm:flex"
              onClick={openModal}
            >
              <FaPlus className="mt-1 mr-2" /> Sell
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex mb-3 uppercase"
              onClick={() => {
                setSearchForm(true);
                setSalesTable(false);
              }}
            >
              <FaSearch className="mt-1 mr-2" /> Search
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded flex mb-3 uppercase ml-2"
              onClick={() => {
                setCalendar(true);
                setSalesTable(false);
              }}
            >
              <FaCalendarDay className="mt-1 mr-2" /> Search by Date
            </button>
          </div>
          <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <SaleForm />
          </Modal>
          {searchForm && (
            <SearchForm
              closeSearchForm={closeSearchForm}
              openSalesTable={openSalesTable}
              getSearchRecords={getSearchRecords}
            />
          )}
          {calendar && (
            <div className="container relative p-5 sm:shadow-sm rounded sm:w-1/4 w-full mb-5 sm:flex sm:justify-center ">
              <button
                className="bg-red-700  hover:bg-red-800 p-1.5 rounded text-white absolute sm:top-0 sm:right-0 right-10 top-1 z-10"
                onClick={() => {
                  setCalendar(false)
                  openSalesTable();
                }}
              >
                Close x
              </button>
              <div className="sm:w-full relative" onClick={() => {
                openSalesTable();
                }}>
                 <div className="w-full absolute right-36 sm:relative sm:right-0">
                 <Calendar className='' onChange={setSelectedDate}  defaultValue={selectedDate} />
                </div> 
              </div>
            </div>
          )}
          {salesTable && <SalesTable records={records} stocks={stocks} />}
          {(salesTable && records.length > 0)  && (
            <h2 className="forMobile text-sm font-bold text-right italic my-3">
              <span className="bg-gray-200 rounded-lg p-2 ">
                <span>Total Sold: {calculateTotalBill(records)} ( </span>
                <span className="text-green-700">
                  {calculateTotalPaid(records)} Paid
                </span>
                <span className="text-yellow-600">
                  {" "}
                  ( {calculateTotalProfit(records)} Profit ){" "}
                </span>
                <span className="text-gray-500"> || </span>
                <span className="text-red-600">
                  {calculateDue(records)} Due
                </span>
                )
              </span>
            </h2>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
