import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const User = await client.user.create({
      data: { name: "aaaa", age: 55, address: "아산시" },
    });
    res.status(200).json({ name: "aaaaaaaaaaaaaaaaaaaa" });
  } catch (err) {
    res.status(200).json({ name: "nononononono" });
  }
}
