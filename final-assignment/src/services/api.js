import axios from "axios";

export const sendMessageAPI = async (message) => {
  try {
    const res = await axios.post("http://localhost:5000/chat", {
      message,
    });

    return res.data.reply;
  } catch (error) {
    throw new Error("API Error");
  }
};