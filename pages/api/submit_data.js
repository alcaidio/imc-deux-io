import { google } from "googleapis";
import { computeBMI } from "../../utils/bmi";

const connect = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  return google.sheets({
    auth,
    version: "v4",
  });
};

async function handler(req, res) {
  const database = connect();

  if (req.method === "POST") {
    const { name, size, weight, birthDate } = req.body;
    const createdDate = Date.now();
    const id = createdDate.toString(16);
    const bmi = computeBMI(size, weight);

    try {
      await database.spreadsheets.values.append({
        spreadsheetId: process.env.DATABASE_ID,
        range: process.env.RANGE,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[id, name, size, weight, birthDate, createdDate, bmi]],
        },
      });

      return await res
        .status(201)
        .json({ id, name, size, weight, birthDate, createdDate, bmi });
    } catch (err) {
      res.status(400).send({ error: "bad request" });
    }
  }

  if (req.method === "GET") {
    try {
      const result = await database.spreadsheets.values.get({
        spreadsheetId: process.env.DATABASE_ID,
        range: process.env.RANGE,
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(400).send({ error: "bad request" });
    }
  }
}

export default handler;
