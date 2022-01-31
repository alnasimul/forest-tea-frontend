import React from "react";
import { ToastContainer } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import ReturnsTable from "../../components/Returns/ReturnsTable/ReturnsTable";

const Returns = () => {
  return (
    <Layout>
      <div className="w-full mt-5  sm:px-5 bg-white rounded-lg text-center lg:mt-20 md:mr-5">
        <ToastContainer/>  
        <div className="container">
          <ReturnsTable />
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
