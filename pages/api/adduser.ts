import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { User } from "@prisma/client";

// type Data = {
//   name: string;
// };

interface Data {
  ok: boolean;
  user?: User;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await client.user.create({
      data: { name: "aaaa", age: 55, address: "아산시" },
    });
    console.log(user);
    res.status(200).json({ ok: true, user });
  } catch (err) {
    res.status(200).json({ ok: false });
  } finally {
    //예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
