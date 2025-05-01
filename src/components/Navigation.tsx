import { Link, useLocation } from 'react-router-dom';
import './styles/Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-text">Portfolio</span>
          </Link>
        </div>
        <div className="nav-menu">
          <ul className="nav-list">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/" className="nav-link">
                <span className="link-text">Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 