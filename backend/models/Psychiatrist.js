// psychiatrists.js
import { supabase } from "./supabaseClient.js";
import bcrypt from "bcryptjs";

// Create a new psychiatrist
export async function createPsychiatrist({ name, email, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("psychiatrists")
      .insert([{ name, email, password: hashedPassword }]);

    if (error) throw error;
    return data[0];
  } catch (err) {
    console.error("Error creating psychiatrist:", err);
    throw err;
  }
}

// Get psychiatrist by email
export async function getPsychiatristByEmail(email) {
  const { data, error } = await supabase
    .from("psychiatrists")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  return data;
}

// Verify password
export async function verifyPsychiatristPassword(email, enteredPassword) {
  const psychiatrist = await getPsychiatristByEmail(email);
  if (!psychiatrist) return false;

  const isMatch = await bcrypt.compare(enteredPassword, psychiatrist.password);
  return isMatch ? psychiatrist : false;
}
