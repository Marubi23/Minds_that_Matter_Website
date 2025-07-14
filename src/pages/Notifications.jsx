import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, Calendar, Clock } from 'lucide-react';
import './Notifications.css'; 

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/notifications') // adjust if hosted elsewhere
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch notifications:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="notifications-page">
      <h2><Bell size={24} /> Notifications</h2>

      {loading ? (
        <p className="loading-text">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="empty-text">No notifications to show.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li key={notif._id} className="notification-item">
              <div className="notif-content">
                <p className="notif-message">{notif.message}</p>
                <div className="notif-meta">
                  <Calendar size={14} />
                  <span>{new Date(notif.createdAt).toLocaleDateString()}</span>
                  <Clock size={14} />
                  <span>{new Date(notif.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
