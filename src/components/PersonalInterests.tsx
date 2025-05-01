import './styles/PersonalInterests.css';
import { FaBook, FaRunning, FaUtensils } from 'react-icons/fa';

const PersonalInterests = () => {
  const interests = [
    {
      icon: <FaBook />,
      title: 'Reading',
      description: 'Tech books & articles'
    },
    {
      icon: <FaRunning />,
      title: 'Running',
      description: 'Daily fitness routine'
    },
    {
      icon: <FaUtensils />,
      title: 'Cooking',
      description: 'Exploring cuisines'
    }
  ];

  return (
    <div className="interests-sidebar">
      <h3 className="interests-title">Personal Interests</h3>
      <div className="interests-list">
        {interests.map((interest, index) => (
          <div key={index} className="interest-item">
            <div className="interest-icon">
              {interest.icon}
            </div>
            <div className="interest-content">
              <h4>{interest.title}</h4>
              <p>{interest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInterests; 