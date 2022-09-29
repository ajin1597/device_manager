import { Post, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

// type Data = {
//   name: string;
// };

interface ResponseDataType {
  name: String;
  users: User[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    res.status(200).json({ name: "asdasdasd", users });
  } catch (err) {
    // res.status(200).json({ ok: false });
  } finally {
    //예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
