import express, { Request, Response } from "express";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
const app = express();
env.config();

app.get(
  "/api/form/:formId",
  async (req: Request<{ formId: string }>, res: Response) => {
    const formId = req.params.formId;
    const apiKey = process.env.TYPEFORM_API_KEY || "YOUR_API_KEY"; // Use environment variable or hardcode

    try {
      const response = await axios.get(
        `https://api.typeform.com/forms/${formId}/responses`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching Typeform data:", error);
      res.status(500).send("Error fetching data");
    }
  }
);
app.get(
  "/api/form/:formId/responses",
  async (req: Request<{ formId: string }>, res: Response) => {
    const formId = req.params.formId; // Replace with your actual form ID
    const apiKey = process.env.TYPEFORM_API_KEY || "YOUR_API_KEY"; // Use environment variable or hardcode

    try {
      const response = await axios.get(
        `https://api.typeform.com/forms/${formId}/responses`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching Typeform data:", error);
      res.status(500).send("Error fetching data");
    }
  }
);
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
