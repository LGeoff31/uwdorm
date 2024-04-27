// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const insertComment = async () => {
    const data = req.body;
    console.log("data", data);
    const { rows } =
      await sql`INSERT INTO comment (residence_id, users_id, review) VALUES (${data.residence_id}, ${data.users_id}, ${data.review})`;
    return rows;
  };

  const data = await insertComment();
  console.log(data);

  res.status(200).json(data);
}
