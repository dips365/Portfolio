import React, { useEffect, useState } from 'react';
import './styles/ContactSidebar.css';
import fm from 'front-matter';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub, FaTwitter, FaWordpress } from 'react-icons/fa';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter?: string;
  wordpress?: string;
}

const icons = [
  { key: 'email', icon: <MdEmail />, label: 'Email' },
  { key: 'linkedin', icon: <FaLinkedin />, label: 'LinkedIn' },
  { key: 'github', icon: <FaGithub />, label: 'GitHub' },
  { key: 'twitter', icon: <FaTwitter />, label: 'Twitter' },
  { key: 'wordpress', icon: <FaWordpress />, label: 'WordPress' },
];

const ContactSidebar: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    fetch('/content/contact.md')
      .then(res => res.text())
      .then(text => {
        const { attributes } = fm<ContactInfo>(text);
        setContactInfo(attributes as ContactInfo);
      });
  }, []);

  return (
    <div className="contact-sidebar">
      {contactInfo &&
        icons.map(({ key, icon, label }) => {
          if ((key === 'twitter' && !contactInfo.twitter) || (key === 'wordpress' && !contactInfo.wordpress)) return null;
          return (
            <div className="contact-sidebar-item" key={key}>
              <div className="contact-sidebar-icon">{icon}</div>
              <div className="contact-sidebar-tooltip">
                {label === 'Email' && (
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                )}
                {label === 'LinkedIn' && (
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    {contactInfo.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {label === 'GitHub' && (
                  <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
                    {contactInfo.github.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {label === 'Twitter' && contactInfo.twitter && (
                  <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer">
                    {contactInfo.twitter.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {label === 'WordPress' && contactInfo.wordpress && (
                  <a href={contactInfo.wordpress} target="_blank" rel="noopener noreferrer">
                    {contactInfo.wordpress.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ContactSidebar; 