import React, { useState } from 'react';
import { X, User, Mail, Lock, Globe, Target, ArrowRight, BookOpen, AlertCircle, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ onClose, onSwitchToLogin, onSuccess }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: 'United States',
    learningGoal: 'Speak English With Confidence'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // Update formData state keys dynamically based on input name attributes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '540px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: '90vh',
          overflowY: 'auto'
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
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
            Fluent<span style={{ color: '#F97316' }}>X</span>
          </span>
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
          Create Your Free Account
        </h2>
        <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Join 50,000+ students and get instant 100% free access to all courses, speech analyzers, and certificates.
        </p>

        {error && (
          <div style={{
            backgroundColor: '#FEE2E2',
            color: '#B91C1C',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Sarah Jenkins"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sarah@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                Country
              </label>
              <div style={{ position: 'relative' }}>
                <Globe size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
              Primary Learning Goal
            </label>
            <div style={{ position: 'relative' }}>
              <Target size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <select
                name="learningGoal"
                value={formData.learningGoal}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                  borderRadius: '12px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Speak English With Confidence">Speak English With Confidence</option>
                <option value="Career & Business Communication">Career & Business Communication</option>
                <option value="Ace Job Interviews">Ace Job Interviews</option>
                <option value="Public Speaking & Presentations">Public Speaking & Presentations</option>
                <option value="Grammar & Writing Mastery">Grammar & Writing Mastery</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Creating Account...' : 'Create Free Account'} <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <button
            onClick={() => {
              if (onClose) onClose();
              if (onSwitchToLogin) onSwitchToLogin();
            }}
            style={{ background: 'none', border: 'none', color: '#6D28D9', fontWeight: '700', cursor: 'pointer' }}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
