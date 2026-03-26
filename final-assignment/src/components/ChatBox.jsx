import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "../redux/chatSlice";
import { useState, useEffect, useRef } from "react";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(addUserMessage(input));
    dispatch(sendMessage(input));
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        height: "500px",
        background: "#fff",
        padding: "15px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-start" : "flex-end",
              margin: "6px 0",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "15px",
                background:
                  msg.role === "user" ? "#007bff" : "#28a745",
                color: "#fff",
                maxWidth: "70%",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && <p style={{ color: "#888", display: "flex", justifyContent: "flex-end"  }}>Typing...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div ref={bottomRef}></div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            background: "#007bff",
            color: "#fff",
            border: "none",
          }}
        >
          Send
        </button>
        
      </div>
    </div>
  );
};

export default ChatBox;