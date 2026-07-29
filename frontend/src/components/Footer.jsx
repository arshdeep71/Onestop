import React, { useState } from 'react';
import { BookOpen, Send, CheckCircle2, Heart, Globe, Shield, Award } from 'lucide-react';

export default function Footer({ setActivePage, onOpenAuth }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#111827',
      color: '#9CA3AF',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      borderTop: '1px solid #1F2937'
    }}>
      <div className="container">
        {/* Top Newsletter Grid */}
        <div style={{
          backgroundColor: '#1F2937',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '4rem',
          border: '1px solid #374151'
        }}>
          <div>
            <span style={{ color: '#F97316', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Stay Ahead of the Curve
            </span>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>
              Get Free Weekly English Tips & Daily Practice Worksheets
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginTop: '0.5rem' }}>
              Join 50,000+ ambitious professionals receiving our curated vocabulary & grammar hacks.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.75rem' }}>
            {subscribed ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                color: '#22C55E',
                padding: '0.85rem 1.25rem',
                borderRadius: '16px',
                fontWeight: '600',
                width: '100%'
              }}>
                <CheckCircle2 size={20} /> You are subscribed! Check your inbox soon.
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.25rem',
                    borderRadius: '16px',
                    border: '1px solid #4B5563',
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{ whiteSpace: 'nowrap', borderRadius: '16px' }}
                >
                  Subscribe <Send size={16} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <BookOpen size={22} />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF' }}>
                Fluent<span style={{ color: '#F97316' }}>X</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#9CA3AF', maxWidth: '320px', marginBottom: '1.5rem' }}>
              FluentX is a world-class, 100% free English learning platform designed to help students and professionals master Spoken English, Grammar, Business Communication, and Public Speaking.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: '#D1D5DB' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <Shield size={16} style={{ color: '#22C55E' }} /> 100% Free Forever
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <Award size={16} style={{ color: '#F97316' }} /> Verified Certificates
              </span>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem' }}>Free Courses</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.9rem' }}>
              <li><button onClick={() => setActivePage('courses')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Spoken English Mastery</button></li>
              <li><button onClick={() => setActivePage('courses')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>English Grammar Foundations</button></li>
              <li><button onClick={() => setActivePage('courses')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Business Communication</button></li>
              <li><button onClick={() => setActivePage('courses')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Public Speaking & Confidence</button></li>
              <li><button onClick={() => setActivePage('courses')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Interview Preparation</button></li>
              <li><button onClick={() => setActivePage('courses')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Vocabulary & Native Idioms</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem' }}>Free Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.9rem' }}>
              <li><button onClick={() => setActivePage('resources')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Grammar PDF Cheat Sheet</button></li>
              <li><button onClick={() => setActivePage('resources')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>1,000 Vocabulary eBook</button></li>
              <li><button onClick={() => setActivePage('resources')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Job Interview Q&A Guide</button></li>
              <li><button onClick={() => setActivePage('resources')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Business Email Templates</button></li>
              <li><button onClick={() => setActivePage('resources')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Pronunciation Audio Drills</button></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '1.2rem' }}>Community & Account</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.9rem' }}>
              <li><button onClick={() => setActivePage('speaking-club')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Speaking Club</button></li>
              <li><button onClick={() => setActivePage('about')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>About FluentX</button></li>
              <li><button onClick={() => onOpenAuth('login')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Student Login</button></li>
              <li><button onClick={() => onOpenAuth('register')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>Create Free Account</button></li>
              <li><button onClick={() => setActivePage('dashboard')} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', textAlign: 'left' }}>My Dashboard</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div style={{
          borderTop: '1px solid #1F2937',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>
            © {new Date().getFullYear()} FluentX Inc. Built with <Heart size={14} style={{ color: '#EF4444', display: 'inline' }} /> for global learners. All courses are completely free.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ backgroundColor: '#374151', color: '#D1D5DB', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>v2.4.0</span>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
