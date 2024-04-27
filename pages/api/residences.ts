// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getResidenceData = async () => {
    const { rows } = await sql`SELECT * from residence`;
    return rows;
  };

  const data = await getResidenceData();
  console.log(data);

  res.status(200).json(data);
}
