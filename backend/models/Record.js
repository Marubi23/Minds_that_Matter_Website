// records.js
import { supabase } from "./supabaseClient.js";
import bcrypt from "bcryptjs";

// Create a new student record
export async function createRecord({ fullName, avatar, pin, school, age, gender }) {
  try {
    // Optional: hash the PIN for security
    const hashedPin = await bcrypt.hash(pin, 10);

    const { data, error } = await supabase
      .from("records")
      .insert([{
        fullName,
        avatar,
        pin: hashedPin,
        school,
        age,
        gender,
        hasPaid: false,
        subscriptionExpiry: null
      }]);

    if (error) throw error;
    return data[0];
  } catch (err) {
    console.error("Error creating student record:", err);
    throw err;
  }
}

// Get record by avatar
export async function getRecordByAvatar(avatar) {
  const { data, error } = await supabase
    .from("records")
    .select("*")
    .eq("avatar", avatar)
    .single();

  if (error) throw error;
  return data;
}

// Verify student PIN
export async function verifyRecordPin(avatar, enteredPin) {
  const student = await getRecordByAvatar(avatar);
  if (!student) return false;

  const isMatch = await bcrypt.compare(enteredPin, student.pin);
  return isMatch ? student : false;
}
