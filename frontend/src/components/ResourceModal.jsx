import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export default function ResourceModal({ resource, onClose }) {
  const [downloaded, setDownloaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!resource) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
    setDownloaded(true);
    // Trigger simulated download blob
    const element = document.createElement("a");
    const file = new Blob([
      `FluentX Free Educational Material\nResource: ${resource.title}\nCategory: ${resource.category}\n\nDescription: ${resource.description}\n\nThank you for learning with FluentX - Premium English Learning Platform! Website: https://fluentx.org`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resource.title.replace(/\s+/g, '_')}_FluentX.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F3F4F6',
            border: 'none',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4B5563'
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          backgroundColor: '#F3E8FF',
          color: '#6D28D9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem'
        }}>
          <FileText size={32} />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#F97316', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          <Sparkles size={14} /> 100% Free Downloadable Resource
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem' }}>
          {resource.title}
        </h3>

        <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          {resource.description}
        </p>

        <div style={{
          backgroundColor: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '2rem'
        }}>
          <span>Format: <strong style={{ color: '#6D28D9' }}>{resource.type}</strong></span>
          <span>Size: <strong style={{ color: '#111827' }}>{resource.pages}</strong></span>
          <span>Total Downloads: <strong style={{ color: '#F97316' }}>{resource.downloads}</strong></span>
        </div>

        {downloaded ? (
          <div style={{
            backgroundColor: '#DCFCE7',
            color: '#15803D',
            padding: '1rem',
            borderRadius: '16px',
            textAlign: 'center',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={20} /> Resource File Downloaded Successfully!
          </div>
        ) : (
          <button
            onClick={handleDownload}
            className="btn btn-accent"
            style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
          >
            <Download size={18} /> Download Resource Now (FREE)
          </button>
        )}
      </div>
    </div>
  );
}
