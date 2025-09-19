require('dotenv').config();
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const addPsychiatrist = async () => {
  try {
    const hashedPassword = await bcrypt.hash('felo2305', 10);

    const { data, error } = await supabase
      .from('psychiatrists') // your Supabase table name
      .insert([{ name: 'Dr. Felix', email: 'felixmarubi@gmail.com', password: hashedPassword }]);

    if (error) throw error;

    console.log('✅ Psychiatrist added:', data[0]);
  } catch (err) {
    console.error('❌ Error adding psychiatrist:', err);
  }
};

addPsychiatrist();
