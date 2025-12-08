// src/components/Badge/Badge.tsx

import type { ReactNode } from 'react';
import './Badge.css'; 

export type BadgeType = 'Dot' | 'Number' | 'Text'; 
export type BadgeColor = 'Red' | 'Green' | 'Blue' | 'Grey' | 'White' | 'Black';
export type BadgeValue = number | string;

interface BadgeProps {
  type: BadgeType;
  color: BadgeColor;
  value?: BadgeValue; 
  children?: ReactNode; 
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const Badge: React.FC<BadgeProps> = ({ 
  type, 
  color, 
  value, 
  children,
  position = 'top-right' 
}) => {
  
  const defaultValues: Record<BadgeType, BadgeValue> = {
    'Number': 2, 
    'Text': 'New', 
    'Dot': '',
  };
  
  const displayValue = (
    type !== 'Dot' && value === undefined 
    ? defaultValues[type] 
    : value
  );

  const badgeClassName = `nile-badge nile-badge--${color.toLowerCase()} nile-badge--${type.replace(/\s+/g, '-').toLowerCase()}`;

  const renderContent = () => {
    switch (type) {
      case 'Dot':
        return null; 
      case 'Number':
      case 'Text':
        return <span>{displayValue}</span>; 
      default:
        return null;
    }
  };

  if (children) {
    const wrapperClassName = `nile-badge-wrapper nile-badge-wrapper--${position}`;
    
    return (
      <div className="nile-badge-container--wrapped">
        {children}
        <div className={wrapperClassName}>
          <div className={badgeClassName}>
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  // Mode Inline
  return <div className={badgeClassName}>{renderContent()}</div>;
};

export default Badge;