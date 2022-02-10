import React from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import StockForm from "../../components/Stocks/StockForm/StockForm";
import StocksTable from "../../components/Stocks/StocksTable/StocksTable";
import forestTeaApi from "../../helpers/forestTeaApi";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);

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
  return (
    <Layout>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 md:gap-10 sm:flex sm:justify-between">
        <ToastContainer />
        <div className="w-full mt-5  sm:px-5 bg-white rounded-lg text-center lg:mt-20 md:mr-5">
          <div className="container">
            <button
              className="bg-red-700 text-white p-2 rounded flex mb-3 uppercase"
              onClick={openModal}
            >
              <FaPlus className="mt-1 mr-2" /> Add Stock Record
            </button>
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
