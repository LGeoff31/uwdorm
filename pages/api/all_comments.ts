// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getAllComments = async () => {
    const { rows } = await sql`SELECT * FROM comment`;
    return rows;
  };
  const data = await getAllComments();
  console.log(data);

  res.status(200).json(data);
}
