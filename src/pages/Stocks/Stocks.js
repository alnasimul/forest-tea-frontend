import React from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import StockForm from "../../components/Stocks/StockForm/StockForm";
import StocksTable from "../../components/Stocks/StocksTable/StocksTable";
import forestTeaApi from "../../helpers/forestTeaApi";
import './Stocks.css';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("")

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    forestTeaApi.get("/stocks").then((res) => {
      setStocks(res.data);
    });
  }, []);
  useEffect(() => {
    forestTeaApi.get(`/stocksByName/${stockName ? stockName : ""}`)
    .then(res => {
      setStocks(res.data)
    })
  }, [stockName])
  console.log(stockName)
  return (
    <Layout>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 md:gap-10 sm:flex sm:justify-between">
        <ToastContainer />
        <div className="w-full mt-5 sm:px-5 bg-white rounded-lg text-center lg:mt-20 md:mr-2">
          <div className="container flex">
            <button
              className="bg-red-700 text-white p-2 rounded flex mb-3 uppercase"
              onClick={openModal}
            >
              <FaPlus className="mt-1 mr-2" /> Add Stock Record
            </button>
            <div className="ml-2">
            <input type="text" name="" id="" className="shadow rounded border-1 border-black  h-10 p-2 font-medium text-center italic " placeholder="Search" value={stockName} onChange={e => setStockName(e.target.value)}/>
            </div>
         </div>

          <Modal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            compact={true}
          >
            <StockForm closeModal={closeModal} />
          </Modal>
          <div className="container">
            <StocksTable stocks={stocks} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stocks;
