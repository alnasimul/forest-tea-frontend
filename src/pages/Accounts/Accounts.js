import React from "react";
import AccountForm from "../../components/Accounts/AccountForm/AccountForm";
import AccountsTable from "../../components/Accounts/AccountsTable/AccountsTable";
import Layout from "../../components/Layout/Layout";

const Accounts = () => {
  return (
    <Layout>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 md:gap-10 sm:flex sm:justify-between">
        <div className="w-full mt-5 sm:w-1/4 sm:px-5 bg-white rounded-lg text-center lg:mt-20 lg:mr-20 md:mr-5">
          <AccountForm />
        </div>
        <div className="w-full mt-5 sm:w-3/4 sm:px-5 bg-white rounded-lg text-center lg:mt-20  md:mr-5">
          <AccountsTable />
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
