import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const getTestData = async () => {
    const { rows } = await sql`SELECT * from test_table where id=0`;
    return rows;
  };

  const data = await getTestData();
  console.log(data);

  res.status(200).json({ name: "John Doe" });
}
