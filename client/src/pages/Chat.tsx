import { useState, useEffect, FormEvent } from "react";

interface Message {
  sender: string;
  content: string;
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (event: FormEvent) => {
    // Should be wrapped in a try/catch block to handle errors next - but how much do we say exactly?
    event.preventDefault();
    // Sender "You" can be replaced with the user's name from the database
    const userMessage: Message = { sender: "You", content: input };

    // Add user message to the chat
    setMessages((prev) => [...prev, userMessage]);

    // Call the API to get the cat's response - could have a loading state added to this to display a spinner type thing
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user123", // Replace with real user ID
        catId: "cat456", // Replace with real cat ID
        input,
      }),
    });

    const data = await res.json();
    // Sender "Whiskers" can be replaced with the cat's name from the database
    const catMessage: Message = { sender: "Whiskers", content: data.content };

    // Add cat's response to the chat
    setMessages((prev) => [...prev, catMessage]);

    // Clear input field
    setInput("");
  };

  useEffect(() => {
    //  Query the SQL for user and cat data - dependency might be interaction history
  }, []);

  return (
    <div className="flex h-screen">
      {/* Chat Messages on the Left Side? */}
      <div className="w-2/3 p-4 border-r">
        <div className="mb-4">
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

      {/* Action Buttons on the Right Side? */}
      <div className="w-1/3 p-4">
        <h2 className="text-lg font-bold mb-4">Actions</h2>
        <button className="w-full mb-2 px-4 py-2 bg-green-500 text-white">
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
