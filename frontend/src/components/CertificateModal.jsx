import React from 'react';
import { X, Download, ShieldCheck, Award, CheckCircle2, Sparkles, Printer } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Course Certificate Modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '850px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
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

        {/* Certificate Frame Printable Area */}
        <div 
          id="certificate-print-area"
          style={{
            border: '12px solid #6D28D9',
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            backgroundColor: '#FAFAFA',
            position: 'relative',
            textAlign: 'center',
            backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Decorative Corner Ornaments */}
          <div style={{ position: 'absolute', top: '15px', left: '15px', borderTop: '3px solid #F97316', borderLeft: '3px solid #F97316', width: '40px', height: '40px' }} />
          <div style={{ position: 'absolute', top: '15px', right: '15px', borderTop: '3px solid #F97316', borderRight: '3px solid #F97316', width: '40px', height: '40px' }} />
          <div style={{ position: 'absolute', bottom: '15px', left: '15px', borderBottom: '3px solid #F97316', borderLeft: '3px solid #F97316', width: '40px', height: '40px' }} />
          <div style={{ position: 'absolute', bottom: '15px', right: '15px', borderBottom: '3px solid #F97316', borderRight: '3px solid #F97316', width: '40px', height: '40px' }} />

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6D28D9', fontWeight: '800', letterSpacing: '0.15em', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Award size={20} style={{ color: '#F97316' }} /> FluentX International Education Board
          </div>

          <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#111827', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            CERTIFICATE OF COMPLETION
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.95rem', marginBottom: '2rem' }}>
            This is to officially certify that
          </p>

          <h3 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#6D28D9', textDecoration: 'underline', textDecorationColor: '#F97316', marginBottom: '1.5rem' }}>
            {certificate.studentName || 'Alex Morgan'}
          </h3>

          <p style={{ color: '#4B5563', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
            has successfully completed all requirements, practical speaking exercises, and examinations for the professional course:
          </p>

          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #D8B4FE',
            borderRadius: '16px',
            padding: '1.25rem 2rem',
            display: 'inline-block',
            marginBottom: '2.5rem',
            boxShadow: '0 4px 14px rgba(109, 40, 217, 0.08)'
          }}>
            <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827' }}>
              {certificate.courseTitle}
            </h4>
            <span style={{ color: '#22C55E', fontWeight: '700', fontSize: '0.85rem' }}>
              Pass Grade: {certificate.grade || 'A+ Highest Distinction'}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1rem',
            alignItems: 'end',
            borderTop: '1px solid #E5E7EB',
            paddingTop: '1.75rem',
            marginTop: '1rem'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>Credential ID</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>FLX-2026-CERT-{(certificate.id || '101').toUpperCase()}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' }}>Issue Date: {certificate.issueDate || '2026-07-28'}</div>
            </div>

            <div>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)'
              }}>
                <ShieldCheck size={36} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#6D28D9', display: 'block', marginTop: '4px' }}>VERIFIED AUTHENTIC</span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.4rem', color: '#6D28D9', fontWeight: '700' }}>
                Sarah Jenkins
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#111827', borderTop: '1px solid #D1D5DB', paddingTop: '4px', display: 'inline-block' }}>
                Lead Academic Director
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.75rem' }}>
          <button onClick={onClose} className="btn btn-outline">
            Close
          </button>
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={16} /> Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
}
