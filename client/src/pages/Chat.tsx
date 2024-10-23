import { useState, useEffect, FormEvent } from "react";

// The message interface will be replaced with the actual message schema once its working in base form
interface Message {
  sender: string;
  content: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (event: FormEvent) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const userMessage: Message = { sender: "You", content: input };

    // Add user message to the chat
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Use full URL if backend is on a different port (adjust as needed)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user123", // Replace with real user ID
          catId: "cat456", // Replace with real cat ID
          input,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      // Will be replaced with actual cat name in real schema
      const catMessage: Message = { sender: "Whiskers", content: data.content };

      // Add cat's response to the chat
      setMessages((prev) => [...prev, catMessage]);
    } catch (error) {
      console.error("Error during chat interaction:", error);
    }

    // Clear input field
    setInput("");
  };

  useEffect(() => {
    //  Query the SQL for user and cat data - dependency might be interaction history
  }, []);

  return (
    <div className="flex h-screen">
      {/* Chat Messages on the Left Side? */}
      <div className="w-2/3 p-4 border-r-color_1 border-r">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Chat with CatName</h2>
          <p>
            We will have an image wrap this whole thing and make it the
            catChatBackground set in the user profile?
          </p>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === "You" ? "text-right" : ""}`}
            >
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
        {/* handleSend is the async POST request to the openAI API */}
        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            className="border p-2 flex-grow"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white"
          >
            Send
          </button>
        </form>
      </div>

      {/* Action Buttons on the Right Side */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        <button className="w-full mb-2 px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors duration-200">
          Play
        </button>
        <button className="w-full mb-2 px-4 py-2 bg-yellow-500 text-white">
          Feed
        </button>
        <button className="w-full mb-2 px-4 py-2 bg-red-500 text-white">
          Gift
        </button>
      </div>
    </div>
  );
}
