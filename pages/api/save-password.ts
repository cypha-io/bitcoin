import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";

const dbFilePath = path.join(process.cwd(), "passwords.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { password } = req.body;

      // Check if file exists and read it asynchronously
      let passwords = [];
      try {
        const data = await fs.readFile(dbFilePath, "utf-8");
        passwords = JSON.parse(data);
      // } catch (readError) {
      //   passwords = []; // If file doesn't exist, use an empty array
      // }

      passwords.push({ password, timestamp: new Date().toISOString() });

      // Write updated passwords to file
      await fs.writeFile(dbFilePath, JSON.stringify(passwords, null, 2));

      res.status(200).json({ message: "Password saved successfully" });
    } catch (error) {
      console.error("Error saving password:", error);
      res.status(500).json({ message: "Failed to save password" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
