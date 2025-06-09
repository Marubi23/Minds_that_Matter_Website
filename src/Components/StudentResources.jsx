import './StudentResources.css';
import { useState } from 'react';
import { PlayCircle, Gamepad2, BookOpen, Heart } from 'lucide-react';

const resources = [
  {
    icon: <PlayCircle size={36} className="icon icon-indigo" />,
    title: "Learning Videos",
    description: "Watch engaging videos to improve understanding in Math, English, and more.",
    actionText: "Start Watching",
  },
  {
    icon: <Gamepad2 size={36} className="icon icon-pink" />,
    title: "Educational Games",
    description: "Play interactive games to reinforce concepts and boost motivation.",
    actionText: "Play Now",
  },
  {
    icon: <BookOpen size={36} className="icon icon-green" />,
    title: "Read-Along Stories",
    description: "Read and listen to narrated storybooks that improve literacy and attention.",
    actionText: "Read a Story",
  },
  {
    icon: <Heart size={36} className="icon icon-red" />,
    title: "Mindfulness Activities",
    description: "Practice calming exercises like deep breathing to maintain focus.",
    actionText: "Begin Exercise",
  },
];

const StudentResources = () => {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <div className="student-resources-container">
      <h2 className="title">Student Resources</h2>
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

export default StudentResources;
