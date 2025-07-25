import * as readline from "readline";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import * as fs from "fs";

// Use ENV_FILE environment variable to specify which .env file to load
const envFile = process.env.ENV_FILE || ".env";
dotenv.config({ path: envFile });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error("Missing PUBLIC_SUPABASE_URL");
}

const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
if (!supabaseSecretKey) {
  throw new Error("Missing PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let templateId: number;
rl.question(
  "Enter the database id of the template you want to upload: ",
  async (answer) => {
    templateId = parseInt(answer, 10);
    if (isNaN(templateId)) {
      console.error("Invalid template ID. Please enter a valid number.");
      rl.close();
      return;
    }
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("id", templateId)
      .single();
    if (error) {
      console.error(`Error fetching template: ${error.message}`);
      rl.close();
      return;
    }
    if (!data) {
      console.error("Template not found, create a template via the UI first.");
      rl.close();
      return;
    }
    rl.question(
      `You are about to upload your index.html for template: ${data.name}. Do you want to proceed? (y/n)`,
      async (answer) => {
        if (answer.toLowerCase() !== "y") {
          console.log("Upload cancelled.");
          rl.close();
          return;
        }
        fs.readFile("dist/index.html", "utf8", async (err, fileData) => {
          if (err) {
            console.error("Error reading file:", err.message);
            rl.close();
            return;
          } else {
            const { data, error } = await supabase.storage
              .from("templates")
              .upload(`${templateId}.html`, fileData, { upsert: true });
            if (error) {
              console.log(`Failed to upload template: ${error.message}`);
              rl.close();
              return;
            }
            console.log("Template uploaded successfully");
            rl.close();
          }
        });
      }
    );
  }
);
