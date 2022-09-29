import { Device } from "@prisma/client";
import { useEffect, useState } from "react";

interface DeviceCardProps {
  device: Device;
  realTime: boolean;
}

export default function DeviceCard({ device, realTime }: DeviceCardProps) {
  const [value, setValue] = useState("");
  const [timerID, setTimerID] = useState<NodeJS.Timer>();

  function sencing데이터업데이트() {
    fetch(`/api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => setValue(json.value));
  }

  useEffect(() => {
    console.log(`${device.id} - ${realTime}`);

    if (realTime) {
      const tempTimerID = setInterval(() => {
        sencing데이터업데이트();
        console.log(`[실시간]${device.id} - ${realTime}`);
      }, 5000);

      setTimerID(tempTimerID);
    } else {
      clearInterval(timerID);
    }
  }, [realTime]);

  useEffect(() => {
    sencing데이터업데이트();
  }, []);

  // console.log(device.id);
  return (
    <div
      data-comment="장비카드"
      className="bg-red-200 border-2 w-60 h-52 p-4 flex flex-col justify-between rounded-xl dark:text-white m-5 dark:bg-[#363345]"
    >
      <div className="flex justify-end ">
        <span className="text-4xl font-bold">{value ? value : "-"}</span>
        <span className="text-xl font-bold">{device.unit}</span>{" "}
        {/* = props.device.unit  */}
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500">
          {device.location} - {device.memo ? `${device.memo}` : null}
        </span>
        <span className="text-2xl font-bold">{device.product}</span>
      </div>
    </div>
  );
}
