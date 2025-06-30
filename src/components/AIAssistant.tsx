import { useState } from "react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    const res = await fetch("/api/ask-ai", {
      method: "POST",
      body: JSON.stringify({ prompt: input, context: "Crop: Tomato, Region: Kathmandu" }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Ask the Farming Assistant</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="e.g. Why are my chili leaves yellow?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={askAI}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}
