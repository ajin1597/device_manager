import type { NextPage } from "next";
import Counters from "../components/Counter";

const Home: NextPage = () => {
  return (
    <div>
      <h2 className="bg-red-200">박종훈은 배가 고프다</h2>
      <Counters title="박종훈" subtitle={[1, 2, 3]} />
    </div>
  );
};

export default Home;
