import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";

import Toggle from "react-toggle";
import { relative } from "path";
import { PacmanLoader } from "react-spinners";

const Home: NextPage = () => {
  const [devices, setDevice] = useState<Device[]>([]);
  const [bToggle, setBToggle] = useState(true);

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.alldevice);
        setDevice(json.alldevice);
      });
  }, []);

  function 토글변경() {
    setBToggle(!bToggle);
    console.log(`--${!bToggle}`);
    if (!bToggle) {
      console.log("실시간on");
    } else {
      console.log("실시간off");
    }
  }

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
            <div className="selet-nome flex items-center space-x-2">
              {bToggle && (
                <div className="h-12 w-20">
                  <PacmanLoader color="#36d7b7" />
                </div>
              )}
              <Toggle
                id="cheese-status"
                onChange={토글변경}
                defaultChecked={bToggle}
                // defaultChecked={this.state.cheeseIsReady}
                // onChange={this.handleCheeseChange}
              />
              <label htmlFor="cheese-status">
                실시간 <span>{bToggle ? "ON" : "OFF"}</span>
              </label>
            </div>
          </div>
        </div>

        <div id="bot" className=" flex flex-wrap ">
          {devices.map((device, idx) => (
            <DeviceCard
              key={idx}
              device={device}
              realTime={bToggle}
            ></DeviceCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
