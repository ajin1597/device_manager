import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Sencing } from "@prisma/client";

interface Data {
  ok: boolean;
  value?: number;
  error?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  // 405 allow method check
  if (request.method !== "GET" && request.method !== "POST") {
    return response.status(405).json({
      ok: false,
      error: "=============",
    });
  }

  const { deviceId } = request.query;
  if (!deviceId) {
    return response.status(200).json({
      ok: false,
      error: "장치id를 입력해주세요",
    });
  }

  try {
    switch (request.method) {
      case "GET":
        const result = await client.sencing.findFirst({
          where: {
            deviceId: deviceId.toString(),
          },
          select: {
            // 필드를 선택할 수 있음
            // 선택한 필드만 가져오려면 boolean
            value: true,
          },
          orderBy: {
            // 정렬
            createAt: "desc", // createAt 기준으로 오름차순으로 정렬
          },
        });
        response.status(200).json({ ok: false, value: result?.value });
        break;
      case "POST":
        const obj = JSON.parse(request.body);

        if (true == isNaN(obj.value)) {
          return response.status(500).json({ ok: false, error: "숫자입력" });
        }

        const value = Number(obj.value);

        const sencingResult = await client.sencing.create({
          data: { value: value, deviceId: deviceId.toString() },
        });

        response.status(200).json({ ok: true });
        break;
      default:
        console.log(request.body);
    }
  } catch (err) {
    response.status(400).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
