import React, { useState, useRef } from 'react';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    school: '',
    grade: '',
    contactNumber: '',
    emergencyContact: '',
    medicalConditions: '',
    additionalNotes: '',
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  // Handle image upload & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.age || isNaN(formData.age) || formData.age < 3 || formData.age > 18)
      errs.age = 'Valid age between 3 and 18 required';
    if (!formData.gender) errs.gender = 'Gender is required';
    if (!formData.school.trim()) errs.school = 'School is required';
    if (!formData.grade.trim()) errs.grade = 'Grade is required';
    if (!formData.contactNumber.trim()) errs.contactNumber = 'Contact number required';
    if (!formData.emergencyContact.trim()) errs.emergencyContact = 'Emergency contact required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Here: submit to backend or localStorage
      alert('Profile completed successfully! Psychiatrist will have access.');
      // Example save to localStorage (for demo)
      const savedProfile = {
        ...formData,
        profilePicUrl: preview,
      };
      localStorage.setItem('studentProfile', JSON.stringify(savedProfile));
      // Optionally clear form or redirect user
    }
  };

  return (
    <div className="profile-page">
      <h1>Complete Your Student Profile</h1>
      <p>This information will be accessible to your psychiatrist to provide personalized care.</p>

      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <div className="profile-pic-section">
          <label htmlFor="profilePic" className="profile-pic-label">
            {preview ? (
              <img src={preview} alt="Profile Preview" className="profile-pic-preview" />
            ) : (
              <div className="profile-pic-placeholder">Upload Profile Picture</div>
            )}
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            hidden
          />
        </div>
        {errors.profilePic && <p className="error">{errors.profilePic}</p>}

        <label>
          Full Name <span className="required">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Brian Mwangi"
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Age <span className="required">*</span>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 12"
            min="3"
            max="18"
            required
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </label>

        <label>
          Gender <span className="required">*</span>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Prefer not to say</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </label>

        <label>
          School Name <span className="required">*</span>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="e.g. ABC Primary School"
            required
          />
          {errors.school && <p className="error">{errors.school}</p>}
        </label>

        <label>
          Grade/Class <span className="required">*</span>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="e.g. Grade 5"
            required
          />
          {errors.grade && <p className="error">{errors.grade}</p>}
        </label>

        <label>
          Contact Number <span className="required">*</span>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="e.g. +254 700 000 000"
            required
          />
          {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
        </label>

        <label>
          Emergency Contact Number <span className="required">*</span>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="e.g. +254 711 111 111"
            required
          />
          {errors.emergencyContact && <p className="error">{errors.emergencyContact}</p>}
        </label>

        <label>
          Medical Conditions / Allergies (if any)
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            placeholder="Please list any relevant medical info"
          />
        </label>

        <label>
          Additional Notes
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Anything else you'd like the psychiatrist to know"
          />
        </label>

        <button type="submit" className="submit-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
