import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Device } from "@prisma/client";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [alldevice, setAlldevice] = useState<Device[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [sencingvalue, setSencingValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setAlldevice(json.alldevice));
  }, []);

  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    setDeviceId(event.currentTarget.value);
    // console.log(event.currentTarget.value);
  }

  function 센서값변경(event: React.ChangeEvent<HTMLInputElement>) {
    const inputStr: string = event.currentTarget.value;

    setSencingValue(inputStr);
  }

  function 등록버튼클릭() {
    const data = { value: sencingvalue };
    fetch(`/api/sencing/${deviceId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  return (
    <Layout title="DATA">
      <h2>
        <div>
          <div className="flex flex-col justify-between m-4">
            <div className="text-3xl font-bold">Select Device</div>
            <div className="mt-5">
              <select
                className="h-12 ring-2 ring-black text-gray-800 px-2 w-full"
                onChange={장치종류변경}
              >
                {alldevice.map((device, idx) => {
                  return (
                    <option key={idx} value={device.id}>
                      {device.type}-{device.location}-{device.memo}
                    </option> //type, local~, memo
                  );
                })}
              </select>
            </div>
            <div className="mt-7">장비ID : {deviceId}</div>
            {/* select 에서 map함수로 돌린 id값 넣어주기 */}
            <div className="mt-7">Value</div>
            <input
              type="number"
              className="mt-3 border-2 text-2xl"
              value={sencingvalue}
              onChange={센서값변경}
            />
            <button
              className="border-2 mt-3 p-3 rounded-xl hover:bg-[#5492FF] dark:bg-gray-500 dark:hover:bg-gray-700"
              onClick={등록버튼클릭}
            >
              등록
            </button>
          </div>
        </div>
      </h2>
    </Layout>
  );
};

export default Home;
