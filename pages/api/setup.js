import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const session = await getSession({ req });
  if (!session) res.end();

  if (req.method === "POST") {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: req.body.name,
        company: req.body.company,
      },
    });
    res.end();
  }
}