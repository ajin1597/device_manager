import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="HOME">
      <h2 className="">
        <div>
          <div className="flex flex-col justify-between m-4">
            <div className="text-3xl font-bold">Select Device</div>
            <div className="mt-5">메뉴박스</div>
            <div className="mt-7">장비ID : </div>
            <div className="mt-7">Value</div>
            <input type="text" className="mt-3 border-2 " />
            <button className="border-2 mt-3 p-3 rounded-xl hover:bg-[#5492FF] dark:bg-gray-500 dark:hover:bg-gray-700">
              등록
            </button>
          </div>
        </div>
      </h2>
    </Layout>
  );
};

export default Home;
