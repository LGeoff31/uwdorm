// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.residence_id) {
    return res.status(400).json({ error: "residen ID missing" });
  }
  const getResidence = async () => {
    console.log("API getting called");
    const id = req.body.residence_id;
    const { rows } = await sql`SELECT * FROM residence WHERE id=${id}`;
    // console.log("residence data", data);
    return rows;
  };
  const data = await getResidence();

  res.status(200).json(data);
}
