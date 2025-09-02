// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { text } = await req.json();
//     const Token = process.env.HF_TOKEN;
//     if (!Token) {
//       throw new Error("Hugging Face token is not set in environment variables");
//     }
//     const response = await fetch(
//       "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
//       {
//         headers: {
//           Authorization: `Bearer ${Token}`,
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({ inputs: text }),
//       }
//     );

//     const result = await response.json();
//     const summary = result[0]?.summary_text || "No summary generated.";

//     return NextResponse.json({ summary });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error(err.message);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     } else {
//       console.error(err);
//       return NextResponse.json(
//         { error: "Unknown error occurred" },
//         { status: 500 }
//       );
//     }
//   }
// }
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, mode, summaryLength } = await req.json();
    const Token = process.env.HF_TOKEN;

    if (!Token) {
      throw new Error("Hugging Face token is not set in environment variables");
    }

    // 🔹 Summary Length Handling
    let minLength = 30;
    let maxLength = 130;
    if (summaryLength === 0) {
      minLength = 15;
      maxLength = 60;
    }
    if (summaryLength === 2) {
      minLength = 80;
      maxLength = 250;
    }

    // 🔹 Mode Handling (prompt engineering)
    let modifiedInput = text;
    if (mode === "bullet") {
      modifiedInput = `Summarize the following text into clear bullet points:\n\n${text}`;
    } else if (mode === "custom") {
      modifiedInput = `Summarize the following text in a concise, user-friendly way:\n\n${text}`;
    }

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: modifiedInput,
          parameters: {
            min_length: minLength,
            max_length: maxLength,
          },
        }),
      }
    );

    const result = await response.json();
    const summary = result[0]?.summary_text || "No summary generated.";

    return NextResponse.json({ summary });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      console.error(err);
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
