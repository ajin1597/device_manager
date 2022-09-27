import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="HOME">
      <div className="h-full p-6 space-y-7">
        <div id="top" className=" flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold">Hello SunMoon👍</div>
            <div className="text-gray-500">Wellcome back to home</div>
          </div>
          <Link href={"/setting"}>
            <button className="space-x-2 flex py-4 px-5 border-2 rounded-2xl items-center bg-sky-300 hover:bg-blue-500 dark:bg-gray-500 dark:hover:bg-gray-700 ">
              <span>Add Device</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div id="mid">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Linked to you</div>
            <div>실시간 버튼</div>
          </div>
        </div>

        <div id="bot" className=" flex flex-wrap ">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((device, idx) => (
            <div
              key={idx}
              data-comment="장비카드"
              className="bg-red-200 border-2 w-60 h-52 p-4 flex flex-col justify-between rounded-xl dark:text-white m-5 dark:bg-[#363345]"
            >
              <div className="flex justify-end ">
                <span className="text-4xl font-bold">25</span>
                <span className="text-xl font-bold">%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">안방 - 멤멤</span>
                <span className="text-2xl font-bold">샤오미 공기청정기</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
