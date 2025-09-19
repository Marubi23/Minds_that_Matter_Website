// parents.js
import { supabase } from "./supabaseClient.js";
import bcrypt from "bcryptjs";

// Create a new parent
export async function createParent({ name, email, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("parents") // Supabase table name
      .insert([{ name, email, password: hashedPassword }]);

    if (error) throw error;
    return data[0];
  } catch (err) {
    console.error("Error creating parent:", err);
    throw err;
  }
}

// Get parent by email
export async function getParentByEmail(email) {
  const { data, error } = await supabase
    .from("parents")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  return data;
}

// Verify password
export async function verifyParentPassword(email, enteredPassword) {
  const parent = await getParentByEmail(email);
  if (!parent) return false;

  const isMatch = await bcrypt.compare(enteredPassword, parent.password);
  return isMatch ? parent : false;
}
