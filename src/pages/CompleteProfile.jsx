import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CompleteProfile.css"; // CSS for styling

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",      // kept for UI but won’t be saved
    gender: "",   // kept for UI but won’t be saved
    school: "",
    avatar: "",
    pin: "",
  });

  const navigate = useNavigate();

  const steps = ["Full Name", "Age", "Gender", "School", "Avatar"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ validation before next step
  const nextStep = () => {
    if (step === 1 && !formData.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (step === 2 && (!formData.age || formData.age <= 0)) {
      alert("Please enter a valid age.");
      return;
    }
    if (step === 3 && !formData.gender) {
      alert("Please select your gender.");
      return;
    }
    if (step === 4 && !formData.school.trim()) {
      alert("Please enter your school.");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const finalData = { ...formData, pin };

    await axios.post("http://localhost:5000/api/records", finalData);

    navigate("/pin", {
      state: {
        pin,
        name: finalData.fullName,
        avatar: finalData.avatar,
      },
    });

    setFormData({
      fullName: "",
      age: "",
      gender: "",
      school: "",
      avatar: "",
      pin: "",
    });
    setStep(1);
  } catch (err) {
    console.error("❌ Error creating profile:", err);
    alert("Error creating profile");
  }
};

  return (
    <div className="profile-form">
      <h2 className="form-title">Complete Student Profile</h2>

      {/* Progress Bar */}
      <div className="progress-bar">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`step ${step === index + 1 ? "active" : ""} ${
              step > index + 1 ? "completed" : ""
            }`}
          >
            {index + 1}
            <span>{label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <div className="form-buttons">
              <button type="button" onClick={nextStep}>
                Next ➡
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <div className="form-buttons">
              <button type="button" onClick={prevStep}>
                ⬅ Back
              </button>
              <button type="button" onClick={nextStep}>
                Next ➡
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="form-buttons">
              <button type="button" onClick={prevStep}>
                ⬅ Back
              </button>
              <button type="button" onClick={nextStep}>
                Next ➡
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-step">
            <label>School</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
            />
            <div className="form-buttons">
              <button type="button" onClick={prevStep}>
                ⬅ Back
              </button>
              <button type="button" onClick={nextStep}>
                Next ➡
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="form-step">
            <label>Choose Your Avatar</label>
            <div className="avatar-grid">
              {["cat.jpeg", "duck.jpeg", "jokey.jpeg", "panda.jpeg"].map(
                (file, index) => (
                  <img
                    key={index}
                    src={`/avatars/${file}`}
                    alt={`Avatar ${index + 1}`}
                    className={`avatar-option ${
                      formData.avatar === `/avatars/${file}` ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, avatar: `/avatars/${file}` })
                    }
                  />
                )
              )}
            </div>
            <div className="form-buttons">
              <button type="button" onClick={prevStep}>
                ⬅ Back
              </button>
              <button type="submit" className="submit-btn">
                🎉 Finish
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CompleteProfile;
