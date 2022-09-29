import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Device } from "@prisma/client";

interface Data {
  ok: boolean;
  id?: string;
  error?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "DELETE") {
  }

  try {
    const { deviceid } = request.query;

    const deleteDevice = await client.device.delete({
      where: {
        id: deviceid?.toString(),
      },
    });

    console.log(deleteDevice);

    response.status(200).json({ ok: true, id: deleteDevice.id });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
