
import React from 'react';

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V22h4v-7.34" />
    <path d="M12 9h.01" />
    <path d="M18.8 9c.2-2.1.2-4.4-.2-6.2" />
    <path d="M5.2 9c-.2-2.1-.2-4.4.2-6.2" />
    <path d="M12 9C7 9 7 2 12 2s5 7 0 7z" />
  </svg>
);

export default TrophyIcon;
