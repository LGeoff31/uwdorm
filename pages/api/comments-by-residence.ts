// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getComments = async () => {
    const residence_id = req.body.residence_id;
    const { rows } =
      await sql`SELECT * FROM comment WHERE residence_id=${residence_id}`;
    return rows;
  };
  const data = await getComments();
  console.log(data);

  res.status(200).json(data);
}
