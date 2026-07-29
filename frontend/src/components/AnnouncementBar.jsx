import React, { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';

export default function AnnouncementBar({ onExploreClick }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{
      backgroundColor: '#6D28D9',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      textAlign: 'center',
      position: 'relative',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        <Sparkles size={16} style={{ color: '#F97316' }} />
        <span><strong>🎉 Join 50,000+ Students Learning English 100% Free</strong> — New Spoken English & Interview Prep Bootcamps Live Now!</span>
      </div>
      <button 
        onClick={onExploreClick}
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: '#ffffff',
          border: 'none',
          padding: '0.2rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
      >
        Explore <ArrowRight size={12} />
      </button>
    </div>
  );
}
