import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "MongoDB connected successfully!" });
  } catch (error: unknown) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  }
}
