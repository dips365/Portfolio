import React, { useEffect, useState } from 'react';
import './styles/Portfolio.css';
import './styles/ContactInfo.css';
import { Experience, parseExperience } from '../services/experienceService';
import { calculateTotalExperience, formatDuration } from '../utils/dateUtils';
import WorkExperience from './WorkExperience';

const Portfolio: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [totalExperience, setTotalExperience] = useState('');

  useEffect(() => {
    const loadExperience = async () => {
      const data = await parseExperience();
      setExperiences(data);
      
      const total = calculateTotalExperience(
        data.map(exp => ({ startDate: exp.startDate, endDate: exp.endDate }))
      );
      setTotalExperience(formatDuration(total));
    };

    loadExperience();
  }, []);

  return (
    <div className="portfolio-container">
      <div className="profile-section">
        <div className="profile-image-container">
          <div className="profile-image-placeholder">
            <span className="initials">DS</span>
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">Dipen Shah</h1>
          <h2 className="profile-title">Senior Consultant</h2>
          <p className="profile-description">
            Seasoned Cloud Engineer with {totalExperience} of experience in architecting and implementing innovative cloud solutions. 
            Expert in Azure, SharePoint, and Power Platform, with a proven track record of delivering scalable, 
            user-friendly applications. Combining technical expertise with a problem-solving mindset to drive 
            business success through technology innovation.
          </p>
        </div>
      </div>
      
      <WorkExperience />
    </div>
  );
};

export default Portfolio; 