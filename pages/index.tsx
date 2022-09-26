import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counters from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  function 사용자추가함수() {
    console.log("aaaaaaaa");
    fetch("/api/adduser");
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
      <h2 className="bg-red-200">박종훈은 배가 고프다</h2>
      <Counters title="박종훈" subtitle={[1, 2, 3]} />
      <button
        onClick={사용자추가함수}
        className="bg-slate-300 p-2 rounded m-2 text-2xl "
      >
        사용자추가
      </button>

      <div className="flex flex-wrap p-2">
        {users.map((user) => (
          <div key={user.id} className="border-2">
            <div className="text-2xl font-bold">
              {user.name}
              <div>({user.age}세)</div>
            </div>
            <div>{user.address}</div>
            <div>{user.favfood}</div>
            <div>{user.createAt.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
