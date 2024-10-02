import express, { Request, Response } from "express";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
const app = express();
env.config();
app.use(cors());

app.get(
  "/api/form/:formId",
  async (req: Request<{ formId: string }>, res: Response) => {
    const formId = req.params.formId;
    const apiKey = process.env.TYPEFORM_API_KEY || "YOUR_API_KEY"; // Use environment variable or hardcode

    try {
      const response = await axios.get(
        `https://api.typeform.com/forms/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      if (response.data?.theme?.href) {
        const theme = await axios.get(response.data?.theme?.href, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        response.data["theme"] = theme.data;
      }
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
          params: {
            page_size: 1000,
          },
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
