// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const insertContactInfo = async () => {
    const data = req.body;
    const firstName = data.insertFirstName;
    const lastName = data.insertLastName;
    const email = data.insertEmail;
    const message = data.insertMessage;
    console.log("REACHING INSERT CONTACT INFO");
    const { rows } =
      await sql`INSERT INTO contact_info (firstname, lastname, email, message) VALUES (${firstName}, ${lastName}, ${email}, ${message})`;
    return rows;
  };

  const data = await insertContactInfo();
  console.log(data);

  res.status(200).json(data);
}
