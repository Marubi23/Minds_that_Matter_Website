import React, { useState } from 'react';
import './CompleteProfile.css';
import {
  Hand,
  Cake,
  UserCircle,
  School,
  BookOpenText,
  Phone,
  AlertCircle,
  Pill,
  StickyNote,
} from 'lucide-react';

const steps = [
  { key: 'name', icon: <Hand />, label: 'Hi there! What is your name?', type: 'text', placeholder: 'e.g. Brian Mwangi' },
  { key: 'age', icon: <Cake />, label: 'How old are you?', type: 'number', placeholder: 'e.g. 12' },
  { key: 'gender', icon: <UserCircle />, label: 'Select your gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  { key: 'school', icon: <School />, label: 'What school do you go to?', type: 'text', placeholder: 'e.g. ABC Primary School' },
  { key: 'grade', icon: <BookOpenText />, label: 'What is your grade?', type: 'text', placeholder: 'e.g. Grade 5' },
  { key: 'contactNumber', icon: <Phone />, label: 'Your contact number?', type: 'text', placeholder: 'e.g. +254 700 000 000' },
  { key: 'emergencyContact', icon: <AlertCircle />, label: 'Emergency contact number?', type: 'text', placeholder: 'e.g. +254 711 111 111' },
  { key: 'medicalConditions', icon: <Pill />, label: 'Any medical conditions or allergies?', type: 'textarea', placeholder: 'Write here...' },
  { key: 'additionalNotes', icon: <StickyNote />, label: 'Anything else we should know?', type: 'textarea', placeholder: 'Write here...' },
];

const CompleteProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
const handleSubmit = async () => {
  try {
    const res = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('✅ Profile submitted! Thank you.');
      setFormData({});
      setCurrentStep(0);
    } else {
      const error = await res.json();
      alert('❌ Error: ' + error.message);
    }
  } catch (err) {
    alert('🚫 Submission failed. Please try again.');
    console.error(err);
  }
};


  const step = steps[currentStep];
  const progressPercent = ((currentStep + 1) / steps.length) * 100;
return (
  <div className="wizard-container">
    {/* Progress Bar */}
    <div className="progress-wrapper">
      <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
    </div>
    <div className="progress-text">Step {currentStep + 1} of {steps.length}</div>

    {/* Main Flex Layout */}
    <div className="wizard-content">
      {/* Left Side: Form Card */}
      <div className="card">
        <h2 className="step-label">
          <span className="icon">{step.icon}</span>
          {step.label}
        </h2>

        {step.type === 'select' ? (
          <select name={step.key} value={formData[step.key] || ''} onChange={handleChange}>
            <option value="">-- Choose --</option>
            {step.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : step.type === 'textarea' ? (
          <textarea
            name={step.key}
            value={formData[step.key] || ''}
            onChange={handleChange}
            placeholder={step.placeholder}
          />
        ) : (
          <input
            type={step.type}
            name={step.key}
            value={formData[step.key] || ''}
            onChange={handleChange}
            placeholder={step.placeholder}
          />
        )}

        <div className="buttons">
          <button onClick={prevStep} disabled={currentStep === 0}>⬅ Back</button>
          {currentStep < steps.length - 1 ? (
            <button onClick={nextStep}>Next ➡</button>
          ) : (
            <button onClick={handleSubmit}>Finish ✅</button>
          )}
        </div>
      </div>

      {/* Right Side: Step Icon Illustration */}
      <div className="step-illustration">
        <div className="icon-large">
          {step.icon}
        </div>
      </div>
    </div>
  </div>
);

};

export default CompleteProfile;
