import React from "react";
import Layout from "../../components/Layout/Layout";
import brandLogo from "../../assets/brandLogoEdited01.png";

const Home = () => {
  return (
    <Layout>
      <div className="container flex justify-center my-20 ">
        <div className="opacity-25">
          <img src={brandLogo} alt="" width={700} height={600} />
          <p className="italic text-center text-xl text-green-800 font-bold ml-3">
            Take the natural tea taste
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
