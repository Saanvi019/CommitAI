
import { getChangedFiles } from "./git.js";

const API_URL = "http://localhost:4000/api/generate"; 


export async function generateCommitMessages(diff) {
  const files = getChangedFiles();
  const filesList = files.length ? files.join(", ") : "unknown files";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        diff,
        filesList
      })
    });

    const data = await res.json();

    if (!data.success) {
      console.error("❌ Backend error:", data.error);
      return [{ id: 1, message: "chore: fallback commit message" }];
    }

    return data.suggestions.map((s, i) => ({
      id: i + 1,
      message: s.message
    }));

  } catch (err) {
    console.error("❌ Cannot reach CommitAI backend:", err.message);
    return [{ id: 1, message: "chore: fallback commit message" }];
  }
}

