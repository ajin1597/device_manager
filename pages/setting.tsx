import { Device } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [unit, setUnit] = useState("");
  const [memo, setMemo] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [alldevice, setAlldevice] = useState<Device[]>([]);
  const router = useRouter();

  function ClearForm() {
    setProduct("");
    setLocation("");
    setType("");
    setUnit("");
    setMemo("");
    setErrMessage("");
  }

  function 장치삭제(장치ID: string) {
    if (!장치ID) return;

    fetch(`/api/device/${장치ID}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok === true) {
          console.log(json.id);

          const tempArr = alldevice.filter((devices) => devices.id !== json.id);

          setAlldevice(tempArr);
        }
      });
    //서버에 삭제 요청
  }

  function devicePlusButton() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    ClearForm();
  }

  // <select> change
  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.currentTarget.value);
  }

  function 장비등록() {
    console.log("등록");

    //입력부에 데이터있는지 확인

    if (!product) {
      setErrMessage("제품명을 입력해주세요");
      return;
    } else if (!location) {
      setErrMessage("설치위치을 입력해주세요");
      return;
    } else if (!type) {
      setErrMessage("장치종류을 선택해주세요");
      return;
    } else if (!unit) {
      setErrMessage("단위을 입력해주세요");
      return;
    }

    setErrMessage("");
    // ★서버에 body로 실어서 보낼 데이터
    const data = {
      product,
      location,
      type,
      unit,
      memo,
    };
    console.log(data);

    fetch("../api/device/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ok) {
          document
            .querySelector("#container_add_device")
            ?.classList.toggle("hidden");

          const tempArr = [...alldevice, json.device];
          setAlldevice(tempArr);
          ClearForm();
        } else {
          setErrMessage("등록실패");
        }
      });
    //전송완료시 입력창초기화

    //서버로 데이터전송
  }

  useEffect(() => {
    fetch("api/device/all")
      .then((res) => res.json())
      .then((json) => setAlldevice(json.alldevice));
  }, []);

  return (
    <Layout title="SETTING">
      <div className="text-l font-bold p-6 space-y-6">
        <div
          data-comment={"장비추가버튼"}
          className="flex justify-end"
          onClick={devicePlusButton}
        >
          <button className="space-x-2 flex py-4 px-5 border-2 rounded-2xl items-center bg-gradient-to-t from-cyan-500 to-blue-500 dark:bg-gradient-to-t from-gray-500 to-gray-700 dark:hover:bg-gray-700 ">
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
          className="space-y-5 hidden"
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

            <span>장치종류 *</span>
            <select
              className="h-12 ring-2 ring-black text-gray-800 px-2"
              onChange={장치종류변경}
            >
              <option hidden>장치종류 선택</option>
              <option value="TEMP">온도 센서</option>
              <option value="HUMI">습도 센서</option>
              <option value="CO2">CO2 센서</option>
            </select>

            <span>단위 *</span>
            <input
              type={"text"}
              value={unit}
              onChange={(e) => setUnit(e.currentTarget.value)}
              placeholder="측정단위 (%, cm)"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />

            <span>메모</span>
            <input
              type={"text"}
              value={memo}
              onChange={(e) => setMemo(e.currentTarget.value)}
              placeholder="메모를 입력하세요"
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />
          </div>
          {errMessage ? <div className="text-red-500">{errMessage}</div> : null}

          <button
            className="border-2 mt-3 w-full p-3 rounded-xl hover:bg-[#5492FF] dark:bg-gray-500 dark:hover:bg-gray-700"
            onClick={장비등록}
          >
            등록
          </button>

          <hr />
        </div>

        <div data-comment={"장비삭제메뉴"}>
          <h2 className="text-3xl">장치목록</h2>

          {0 < alldevice.length ? null : <div>장치를 등록 해주세요</div>}

          {alldevice.map((device, idx) => (
            <div
              className="flex justify-between items-center border-b-2"
              key={idx}
            >
              <div>
                <div>id: {device.id}</div>
                <div>
                  {device.type}-{device.location} ({device.memo})
                </div>
              </div>
              <button
                onClick={() => 장치삭제(device.id)}
                className="bg-red-200 p-2 rounded-xl hover:bg-blue-300 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
