import { useState } from "react";

interface CounterProps {
  title: String;
  subtitle: String | Number | Number[];
}

const Counters = (props: CounterProps) => {
  const [timer, setTimer] = useState(0);

  return (
    <div>
      <div>{props.title}</div>
      <div>{props.subtitle.toString()}</div>

      <h2>체지방 : {timer}</h2>
      <button onClick={() => setTimer(timer + 1)}>+1</button>
      <button onClick={() => setTimer(timer - 1)}>-1</button>
    </div>
  );
};

export default Counters;
