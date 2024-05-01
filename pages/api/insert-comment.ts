// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const insertComment = async () => {
    const data = req.body;
    const room = parseInt(data.room, 10);
    const building = parseInt(data.building, 10);
    const location = parseInt(data.location, 10);
    const bathroom = parseInt(data.bathroom, 10);
    console.log("REACHING INSERT COMMENT");
    console.log("data", data);
    const { rows } =
      await sql`INSERT INTO comment (residence_id, users_id, review, room, building, bathroom, location) VALUES (${data.residence_id}, ${data.users_id}, ${data.review}, ${room}, ${building}, ${bathroom}, ${location})`;
    return rows;
  };

  const data = await insertComment();
  console.log(data);

  res.status(200).json(data);
}
