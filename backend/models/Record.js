// models/Record.js
const recordSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  avatar: { type: String, required: true },
  pin: { type: String, required: true },
  school: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  hasPaid: { type: Boolean, default: false }, // ✅ subscription flag
  subscriptionExpiry: { type: Date },         // optional, if you want expiry
  createdAt: { type: Date, default: Date.now }
});
