import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [memo, setMemo] = useState("");

  function devicePlusButton() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    setProduct("");
    setLocation("");
    setUnit("");
    setMemo("");
  }

  return (
    <Layout title="HOME">
      <div className="text-l font-bold p-6 space-y-6">
        <div
          data-comment={"장비추가버튼"}
          className="flex justify-end"
          onClick={devicePlusButton}
        >
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
        </div>

        <div
          id="container_add_device"
          data-comment={"장비리스트"}
          className="space-y-5 "
        >
          <hr />
          <div className="text-2xl font-bold ">Device`s</div>
          <div className="flex flex-col space-y-2">
            <span>제품명 *</span>
            <input
              type={"text"}
              value={product}
              onChange={(e) => setProduct(e.currentTarget.value)}
              placeholder="제품명을 입력하세요"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />

            <span>설치위치 *</span>
            <input
              type={"text"}
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
              placeholder="거실, 안방... etc"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />

            <span>단위 *</span>
            <input
              type={"text"}
              value={unit}
              onChange={(e) => setUnit(e.currentTarget.value)}
              placeholder="측정단위 (%, cm)"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />

            <span>메모 *</span>
            <input
              type={"text"}
              value={memo}
              onChange={(e) => setMemo(e.currentTarget.value)}
              placeholder="메모를 입력하세요"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />
          </div>

          <button className="border-2 mt-3 w-full p-3 rounded-xl hover:bg-[#5492FF] dark:bg-gray-500 dark:hover:bg-gray-700">
            등록
          </button>

          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
