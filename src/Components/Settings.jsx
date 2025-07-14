import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Video, FileText, Users, Calendar, Settings as SettingsIcon,
  Bell, Clock, ClipboardList, UserCheck
} from 'lucide-react';
import '../Components/Settings.css';

function Settings() {
  const [showPasscode, setShowPasscode] =useState(false);
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    phone: '',
    notifications: {
      emailAlerts: true,
      sessionReminders: true,
      reportConfirmations: true,
    },
    theme: 'light',
    timezone: 'Africa/Nairobi',
    password: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('psychiatrist'));
    if (stored) {
      setSettings(prev => ({
        ...prev,
        name: stored.name || '',
        password: stored.password || '',
        ...stored.settings,
      }));
    }
  }, []);

  const saveSettings = () => {
    const current = JSON.parse(localStorage.getItem('psychiatrist')) || {};
    const updated = { ...current, name: settings.name, password: settings.password, settings };
    localStorage.setItem('psychiatrist', JSON.stringify(updated));
    alert('✅ Settings saved!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }));
  };

  const handleThemeToggle = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings(prev => ({ ...prev, theme: newTheme }));
    document.body.setAttribute('data-theme', newTheme);
  };

  const logout = () => {
    localStorage.removeItem('psychiatrist');
    window.location.href = '/login';
  };

  const displayName = settings.name?.startsWith("Dr.") ? settings.name : `Dr. ${settings.name}`;

  return (
    <div className="settings-layout">
      <aside className="settings-sidebar">
        <h2>Settings</h2>
        <nav>
          <Link to="/dashboard"><Home size={16} /> Dashboard</Link>
          <Link to="/createroom"><Video size={16} /> Start Session</Link>
          <Link to="/view-rooms"><ClipboardList size={16} /> Past Consultations</Link>
          <Link to="/records"><Users size={16} /> View Student Records</Link>
          <Link to="/reports"><FileText size={16} /> Reports</Link>
          <Link to="/settings" className="active-link"><SettingsIcon size={16} /> Settings</Link>
        </nav>
      </aside>

      <main className="settings-main">
        <header className="settings-header">
          <div>
            <h1> {displayName}</h1>
            <p>Manage your profile, preferences, and security {displayName}.</p>
          </div>
        </header>

        <section className="settings-panel">
          <div className="settings-section">
            <h3>👤 Profile</h3>
            <label>Name:</label>
            <input type="text" name="name" value={settings.name} onChange={handleInputChange} />

            <label>Email:</label>
            <input type="email" name="email" value={settings.email} onChange={handleInputChange} />

            <label>Phone:</label>
            <input type="tel" name="phone" value={settings.phone} onChange={handleInputChange} />
          </div>

          <div className="settings-section">
            <h3>🔔 Notifications</h3>
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={() => handleNotificationToggle('emailAlerts')}
              /> Email Alerts
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.sessionReminders}
                onChange={() => handleNotificationToggle('sessionReminders')}
              /> Session Reminders
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.notifications.reportConfirmations}
                onChange={() => handleNotificationToggle('reportConfirmations')}
              /> Report Submission Confirmations
            </label>
          </div>

          <div className="settings-section">
            <h3>🔐 Security</h3>
            <label>Change Password:</label>
            <input
              type={showPasscode ? 'text':'password'}
              name="password"
              value={settings.password}
              onChange={handleInputChange}
              
            />
            <button className="logout-btn" onClick={logout}>🚪 Logout</button>
            <button className='show-pass' type='button' onClick={() =>setShowPasscode(!showPasscode)} aria-label='Toggle passcode visibility'>
               {showPasscode ? '🙈 Hide' : '👁️ Show password'}
            </button>
          </div>

          <div className="settings-section">
            <h3>🛠️ Preferences</h3>
            <label>Theme:</label>
            <button onClick={handleThemeToggle}>
              Switch to {settings.theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>

            <label>Time Zone:</label>
            <select name="timezone" value={settings.timezone} onChange={handleInputChange}>
              <option value="Africa/Nairobi">Africa/Nairobi</option>
              <option value="UTC">UTC</option>
              <option value="Asia/Dubai">Asia/Dubai</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </div>

          <button className="save-btn" onClick={saveSettings}>💾 Save Changes</button>
        </section>
      </main>
    </div>
  );
}

export default Settings;
