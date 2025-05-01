import React, { useEffect, useState } from 'react';
import { WorkExperience as WorkExperienceType, parseWorkExperience } from '../services/workExperienceService';
import { calculateTotalExperience, formatDuration } from '../utils/dateUtils';
import './styles/WorkExperience.css';

const WorkExperience: React.FC = () => {
    const [experiences, setExperiences] = useState<WorkExperienceType[]>([]);
    const [totalExperience, setTotalExperience] = useState('');

    useEffect(() => {
        const loadExperience = async () => {
            const data = await parseWorkExperience();
            setExperiences(data);

            const total = calculateTotalExperience(
                data.map(exp => ({ startDate: exp.startDate, endDate: exp.endDate }))
            );
            setTotalExperience(formatDuration(total));
        };

        loadExperience();
    }, []);

    return (
        <div className="experience-section">
            <h2>Work Experience <span className="total-exp">{totalExperience}</span></h2>
            <div className="journey-timeline">
                {experiences.map((exp, index) => (
                    <div key={index} className="journey-item">
                        <div className="journey-content">
                            <div className="company-card">
                                <div>
                                    <h3 className="company-name">{exp.company}</h3>
                                    <p className="position">{exp.position}</p>
                                    <p className="location">{exp.location}</p>
                                </div>
                                <div>
                                    <div className="duration-badge">{exp.formattedDuration}</div>
                                    <div className="year-badge">{exp.duration}</div>
                                </div>
                            </div>
                        </div>
                        {index < experiences.length - 1 && <div className="journey-connector" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkExperience; 