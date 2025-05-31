import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

function AttentionMonitor({ onAttentionDrop }) {
  const videoRef = useRef();
  const [status, setStatus] = useState('Loading models...');

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
      setStatus('Models loaded');
      startVideo();
    };

    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        const detections = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );
        if (!detections) {
          setStatus('No face detected 😐');
          if (onAttentionDrop) onAttentionDrop();
        } else {
          setStatus('Student is present 🙂');
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [onAttentionDrop]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="320"
          height="240"
          style={{ borderRadius: '10px', border: '2px solid #ccc' }}
        />
        <img
          src="/robot.gif"
          alt="Robot Assistant"
          style={{
            position: 'absolute',
            top: 0,
            right: -80,
            width: '100px',
            height: '100px',
          }}
        />
      </div>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}

export default AttentionMonitor;
