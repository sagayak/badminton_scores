
import React from 'react';

const ShuttlecockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.5 5.5C18.5 8.53757 15.5376 11 12.5 11C9.46243 11 6.5 8.53757 6.5 5.5L4 4L6 2H19L21 4L18.5 5.5Z" />
    <path d="M12.5 11L13 22H12L12.5 11Z" transform="rotate(15 12.5 16.5)" />
    <path d="M12.5 11L13 22H12L12.5 11Z" transform="rotate(-15 12.5 16.5)" />
    <path d="M12.5 11L13 22H12L12.5 11Z" transform="rotate(45 12.5 16.5)" />
    <path d="M12.5 11L13 22H12L12.5 11Z" transform="rotate(-45 12.5 16.5)" />
  </svg>
);

export default ShuttlecockIcon;
