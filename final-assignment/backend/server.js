import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("backend/.env") });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({
            reply: response.data.choices[0].message.content,
        });
    } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
        res.json({
            reply: "AI is currently unavailable due to API limits. This is a fallback response.",
        });

    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});