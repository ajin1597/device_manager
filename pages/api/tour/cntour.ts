import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

type Data = {
  name: string;
  totalCnt?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch("http://tour.chungnam.go.kr/_prog/openapi/?func=tour&mode=getCnt")
      .then((res) => res.text())
      .then((xmlStr) => {
        parseString(xmlStr, { explicitArray: false }, function (err, result) {
          // console.log(result.item_info.item.totalCnt);
          const totalCnt = result.item_info.item.totalCnt;

          res.status(200).json({ name: "1", totalCnt });
        });
      });
    // res.status(200).json({ name: "2" });
  } catch (err) {
    res.status(200).json({ name: "박종훈" });
  }
}
