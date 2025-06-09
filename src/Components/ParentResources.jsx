import './ParentResources.css';
import { useState } from 'react';
import { FileText, Users, PieChart, MessageCircleHeart } from 'lucide-react';

const resources = [
  {
    icon: <FileText size={36} className="icon icon-blue" />,
    title: 'Performance Reports',
    description: 'View academic and behavioral performance reports for your child.',
    actionText: 'View Reports',
  },
  {
    icon: <Users size={36} className="icon icon-purple" />,
    title: 'Parent Forums',
    description: 'Connect with other parents, share strategies and experiences.',
    actionText: 'Join Forum',
  },
  {
    icon: <PieChart size={36} className="icon icon-teal" />,
    title: 'Progress Insights',
    description: 'Track your child’s learning milestones and growth areas.',
    actionText: 'Track Progress',
  },
  {
    icon: <MessageCircleHeart size={36} className="icon icon-orange" />,
    title: 'Psychiatrist Feedback',
    description: 'Read expert feedback and suggestions based on student behavior.',
    actionText: 'View Feedback',
  },
];

const ParentResources = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <div className="parent-resources-container">
      <h2 className="title">Parent Resources</h2>
      <div className="resources-grid">
        {resources.map((res, index) => (
          <div
            key={index}
            className="resource-card"
            onClick={() => setSelectedResource(res)}
          >
            <div className="icon-wrapper">{res.icon}</div>
            <h3>{res.title}</h3>
            <p>{res.description}</p>
          </div>
        ))}
      </div>

      {selectedResource && (
        <div className="modal-overlay" onClick={() => setSelectedResource(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedResource(null)}>
              ✖
            </button>
            <div className="modal-icon">{selectedResource.icon}</div>
            <h2>{selectedResource.title}</h2>
            <p>{selectedResource.description}</p>
            <button className="action-btn">{selectedResource.actionText}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentResources;
