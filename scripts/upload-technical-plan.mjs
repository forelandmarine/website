import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([^=]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const SRC = "/Users/jack/Library/Mobile Documents/com~apple~CloudDocs/Foreland Group/Shipyard Group/Tipner/tipner_technical_plan_v45.png";
const DEST = "technical-plan.png";

const file = readFileSync(SRC);

const { data, error } = await supabase.storage
  .from("foreland-group-docs")
  .upload(DEST, file, { contentType: "image/png", upsert: true });

if (error) {
  console.error("Upload failed:", error);
  process.exit(1);
}
console.log("Uploaded:", data);
