import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Counters from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [darkMode, setdarkMode] = useState(false);
  const router = useRouter();
  const [rename, setRename] = useState("");
  function userDelete(targetID: String) {
    fetch(`/api/user/delete/${targetID}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.deletedId);
        const filterUsers = users.filter((user) => user.id !== json.deletedId);
        setUsers(filterUsers);
      });
  }

  function 이름변경(targetID: String) {
    if (!rename) return;

    const date = { name: rename };

    fetch(`/api/user/update/${targetID}`, {
      method: "POST",
      body: JSON.stringify(date),
    });

    console.log(`${targetID}의 이름을 ${rename}로 변경`);
  }

  function 사용자추가함수() {
    console.log("aaaaaaaa");
    fetch("/api/adduser")
      .then((res) => res.json())
      .then((json) => {
        setUsers([...users, json.user]);
      });
    // router.reload(); //라우터(페이지) 강제 새로고침
  }

  function toggle() {
    setdarkMode(!darkMode);

    if (!darkMode) {
      // console.log("on");
      document.documentElement.classList.add("dark");
    } else {
      // console.log("off");
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    //컴포넌트 로딩될때 한번만 실행되는 함수
    //사용자목록을 가져와서 state변수애 저장

    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  return (
    <div>
      <div className="bg-white w-full dark:bg-gray-700 dark:text-white p-4">
        {/* <h2 className="bg-red-200">박종훈은 배가 고프다</h2>
      <Counters title="박종훈" subtitle={[1, 2, 3]} /> */}
        <div className="relative ">
          <div className="border-2 w-[270px] p-2">
            <h2 className="relative left-[60px] bottom-1">사용자 정보 입력</h2>
            <div className="flex">
              <div className="w-[65px] flex justify-center">이름</div>
              <input className="border-gray-400 border-2" type="text" />{" "}
            </div>
            <div className="flex">
              <div className="w-[65px] flex justify-center">나이</div>
              <input className="border-gray-400 border-2" type="text" />{" "}
            </div>{" "}
            <div className="flex">
              <div className="w-[65px] flex justify-center">거주지</div>
              <input className="border-gray-400 border-2" type="text" />{" "}
            </div>{" "}
            <div className="flex">
              <div className="w-[65px]">선호음식</div>
              <input className="border-gray-400 border-2" type="text" />{" "}
            </div>
          </div>
          <div className="bg-black text-white p-2 m-2 rounded-full absolute top-2 right-2 z-1">
            <input
              id="toggle_dark"
              type="checkbox"
              checked={darkMode}
              onChange={toggle}
            ></input>
            <label htmlFor="toggle_dark">다크모드</label>
          </div>
          <button
            onClick={사용자추가함수}
            className="bg-slate-300 p-2 rounded m-2 text-2xl absolute left-[280px] bottom-8 dark:text-black"
          >
            사용자추가
          </button>
        </div>

        <div className="flex flex-wrap justify-center p-2 w-full ">
          {users.map((user) => (
            <div key={user.id} className="border-4 border-black m-5 p-2 ">
              <div className="text-2xl font-bold">
                {user.name}
                <div>({user.age}세)</div>
              </div>
              <div>거주지 : {user.address}</div>
              <div>선호음식 : {user.favfood}</div>
              <div>{user.createAt.toString()}</div>
              <div>{user.id}</div>

              <div className="border">
                <input
                  type="text"
                  className="border bg-red-400"
                  value={rename}
                  onChange={(e) => setRename(e.currentTarget.value)}
                />
                <button
                  className="bg-blue-500 px-1 rounded hover:bg-gray-300"
                  onClick={() => 이름변경(user.id)}
                >
                  수정
                </button>
              </div>

              <button
                onClick={() => userDelete(user.id)}
                className="bg-red-500 px-1 rounded hover:bg-gray-300"
              >
                이승기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
