import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { Device } from "@prisma/client";
import { json } from "stream/consumers";

interface Data {
  ok: boolean;
  device?: Device;
  error?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  // 405 allow method check
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, error: `지원X 메서드` });
    return;
  }

  const { product, location, type, unit, memo } = JSON.parse(request.body);
  console.log(memo);

  //입력필드 검증
  if (true) {
    if (!product)
      return response.status(200).json({ ok: false, error: "제품명이 없어요" });

    if (!location)
      return response
        .status(200)
        .json({ ok: false, error: "설치위치가 없어요" });
    if (!type)
      return response
        .status(200)
        .json({ ok: false, error: "장치종류이 없어요" });
    if (!unit)
      return response.status(200).json({ ok: false, error: "단위가 없어요" });
  }

  try {
    //Device row Create

    const device = await client.device.create({
      data: {
        product,
        location,
        type,
        unit,
        memo,
      },
    });
    console.log(device);
    response.status(200).json({ ok: true, device });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던 없던 실행되는 블럭
    await client.$disconnect();
  }
}
