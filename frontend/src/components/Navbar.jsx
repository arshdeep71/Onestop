import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, User, LogOut, ChevronDown, Sparkles, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activePage, setActivePage, onOpenAuth }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'career-paths', label: 'Career Paths' },
    { id: 'live-classes', label: 'Live Sessions' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'resources', label: 'Resources' },
    { id: 'community', label: 'Community' },
    { id: 'admin-studio', label: '⚡ Admin Studio' }
  ];

  return (
    <nav role="navigation" aria-label="Main Navigation" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: '1px solid #E5E7EB',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(109, 40, 217, 0.3)'
          }}>
            <BookOpen size={24} />
          </div>
          <div>
            <span style={{ fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#111827' }}>
              Fluent<span style={{ color: '#F97316' }}>X</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: '700',
              color: '#6D28D9',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '-4px'
            }}>
              100% Free Platform
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }} className="desktop-links">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: activePage === link.id ? '700' : '500',
                color: activePage === link.id ? '#6D28D9' : '#4B5563',
                cursor: 'pointer',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => { if (activePage !== link.id) e.currentTarget.style.color = '#6D28D9'; }}
              onMouseOut={(e) => { if (activePage !== link.id) e.currentTarget.style.color = '#4B5563'; }}
            >
              {link.label}
              {activePage === link.id && (
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '3px',
                  backgroundColor: '#6D28D9',
                  borderRadius: '9999px'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Right CTA / User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: '#F3E8FF',
                  border: '1px solid #D8B4FE',
                  borderRadius: '9999px',
                  padding: '0.35rem 0.85rem 0.35rem 0.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#6D28D9',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem'
                }}>
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                  {user.fullName.split(' ')[0]}
                </span>
                <ChevronDown size={16} style={{ color: '#6B7280' }} />
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '220px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  border: '1px solid #E5E7EB',
                  padding: '0.5rem',
                  zIndex: 200,
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <div style={{ padding: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#111827' }}>{user.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                  </div>
                  <button
                    onClick={() => { setActivePage('dashboard'); setUserDropdownOpen(false); }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 0.75rem',
                      border: 'none',
                      background: 'none',
                      color: '#374151',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LayoutDashboard size={16} style={{ color: '#6D28D9' }} /> Student Dashboard
                  </button>
                  <button
                    onClick={() => { setActivePage('speaking-club'); setUserDropdownOpen(false); }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 0.75rem',
                      border: 'none',
                      background: 'none',
                      color: '#374151',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <MessageSquare size={16} style={{ color: '#F97316' }} /> Speaking Club
                  </button>
                  <div style={{ borderTop: '1px solid #F3F4F6', margin: '0.25rem 0' }} />
                  <button
                    onClick={() => { logout(); setUserDropdownOpen(false); setActivePage('home'); }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 0.75rem',
                      border: 'none',
                      background: 'none',
                      color: '#DC2626',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button 
                onClick={() => onOpenAuth('login')}
                className="btn btn-ghost"
                style={{ fontSize: '0.9rem' }}
              >
                Log In
              </button>
              <button 
                onClick={() => onOpenAuth('register')}
                className="btn btn-primary"
                style={{ fontSize: '0.9rem', padding: '0.6rem 1.25rem' }}
              >
                Get Started Free <Sparkles size={16} style={{ color: '#F97316' }} />
              </button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#111827',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setMobileMenuOpen(false); }}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                border: 'none',
                background: activePage === link.id ? '#F3E8FF' : 'transparent',
                color: activePage === link.id ? '#6D28D9' : '#374151',
                borderRadius: '12px',
                fontWeight: activePage === link.id ? '700' : '500',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </button>
          ))}
          {!user && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                className="btn btn-outline"
              >
                Log In
              </button>
              <button 
                onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .desktop-links { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
