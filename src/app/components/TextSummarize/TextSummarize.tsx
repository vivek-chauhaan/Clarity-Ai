"use client";
// import { useState } from "react";

// const TextSummarize = () => {
//   const [inputText, setInputText] = useState("");
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSummarize = async () => {
//     if (!inputText.trim()) return;
//     setLoading(true);

//     try {
//       const res = await fetch("/api/summarize", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: inputText }),
//       });

//       const data = await res.json();
//       setSummary(data.summary || "No summary found.");
//     } catch (err) {
//       console.error(err);
//       setSummary("❌ Error generating summary.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
//         {/* Left Side */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
//           <h2 className="text-xl font-semibold mb-4">Enter Text</h2>
//           <textarea
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder="Paste your text here..."
//             className="w-full h-60 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={handleSummarize}
//             disabled={loading}
//             className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? "Summarizing..." : "Summarize"}
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4">Summary</h2>
//           <div className="h-60 border border-gray-200 rounded-xl p-3 overflow-y-auto">
//             {summary ? (
//               <p className="text-gray-700">{summary}</p>
//             ) : (
//               <p className="text-gray-400 italic">
//                 Your summarized text will appear here...
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextSummarize;

"use client";
import { useState } from "react";

export default function SummarizerUI() {
  const [mode, setMode] = useState("paragraph");
  const [summaryLength, setSummaryLength] = useState(1); // 0 = short, 1 = medium, 2 = long
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          mode,
          summaryLength,
        }),
      });

      const data = await res.json();
      setSummary(data.summary || "No summary found.");
    } catch (err) {
      console.error(err);
      setSummary("❌ Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4 mb-6">
          {/* Modes */}
          <div className="flex gap-4 text-sm font-medium">
            {["paragraph", "bullet", "custom"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`pb-1 border-b-2 ${
                  mode === m
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {m === "paragraph" && "Paragraph"}
                {m === "bullet" && "Bullet Points"}
                {m === "custom" && "Custom"}
              </button>
            ))}
          </div>

          {/* Summary Length Slider */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">Summary Length:</span>
            <span>Short</span>
            <input
              type="range"
              min="0"
              max="2"
              value={summaryLength}
              onChange={(e) => setSummaryLength(Number(e.target.value))}
              className="w-32 accent-green-600"
            />
            <span>Long</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Enter Text</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full h-60 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Upload Doc
              </button>
              <button
                onClick={handleSummarize}
                disabled={loading}
                className="bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Summarizing..." : "Summarize"}
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Summary</h2>
            <div className="h-60 border border-gray-200 rounded-xl p-3 overflow-y-auto">
              {summary ? (
                mode === "bullet" ? (
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {summary
                      .split(/\n|•|- /)
                      .map(
                        (line, i) =>
                          line.trim() && <li key={i}>{line.trim()}</li>
                      )}
                  </ul>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{summary}</p>
                )
              ) : (
                <p className="text-gray-400 italic">
                  Your summarized text will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
