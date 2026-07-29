import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    country: "Mexico",
    flag: "🇲🇽",
    role: "Senior Software Engineer",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    story: "Before FluentX, I used to freeze whenever my US team asked me to speak in Zoom meetings. The Spoken English Mastery course & daily practice speech tool changed everything. I recently got promoted to Lead Architect!",
    rating: 5,
    courseTaken: "Spoken English Mastery"
  },
  {
    id: 2,
    name: "Ananya Patel",
    country: "India",
    flag: "🇮🇳",
    role: "Management Consultant",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    story: "I paid over $1,200 for private English coaching before discovering FluentX. FluentX is 100x better! The interview preparation course gave me the STAR framework confidence to land my job at a top global firm.",
    rating: 5,
    courseTaken: "Interview Preparation & STAR Method"
  },
  {
    id: 3,
    name: "Jonas Weber",
    country: "Germany",
    flag: "🇩🇪",
    role: "Product Designer",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    story: "The Business English email templates and presentation skills modules are pure gold. My clients compliment me on my crisp communication now. Can't believe this entire platform is completely free!",
    rating: 5,
    courseTaken: "Business Communication & Public Speaking"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[currentIndex];

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      border: '1px solid #E5E7EB',
      padding: '3rem 2.5rem',
      boxShadow: '0 10px 30px rgba(109, 40, 217, 0.08)',
      position: 'relative'
    }}>
      <Quote size={48} style={{ color: '#F3E8FF', position: 'absolute', top: '2rem', right: '2.5rem' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'center' }}>
        <img
          src={t.photo}
          alt={t.name}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #6D28D9'
          }}
        />

        <div>
          <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.5rem' }}>
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} size={18} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
            ))}
          </div>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827' }}>
            {t.name} <span style={{ fontSize: '1.1rem' }}>{t.flag}</span>
          </h4>
          <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '600' }}>
            {t.role} • <span style={{ color: '#6D28D9' }}>{t.country}</span>
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '1.1rem',
        lineHeight: '1.7',
        color: '#374151',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        fontStyle: 'italic',
        fontWeight: '500'
      }}>
        "{t.story}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '1.25rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#6D28D9' }}>
          Completed: {t.courseTaken}
        </span>

        {/* Carousel Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#374151'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: i === currentIndex ? '#6D28D9' : '#D1D5DB',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#374151'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
