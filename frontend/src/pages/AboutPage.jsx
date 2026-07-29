import React from 'react';
import { Shield, Award, Users, BookOpen, Heart, Globe, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage({ onOpenAuth }) {
  const instructors = [
    {
      name: "Sarah Jenkins",
      title: "Senior ESL Coach & Phonetics Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      exp: "12+ Years Teaching",
      bio: "Former Oxford English examiner specializing in natural conversational fluency and accent reduction."
    },
    {
      name: "David Miller",
      title: "Grammar Author & Linguistics Professor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      exp: "15+ Years Teaching",
      bio: "Author of 3 English grammar workbooks and specialist in contextual grammar for non-native professionals."
    },
    {
      name: "Elena Rostova",
      title: "Corporate Executive Coach",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      exp: "10+ Years Corporate Training",
      bio: "Former Fortune 500 communications manager training international executives for global business growth."
    },
    {
      name: "Marcus Vance",
      title: "TEDx Speaker & Voice Strategist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      exp: "14+ Years Keynote Speaker",
      bio: "Coached over 300 TEDx speakers and CEOs to captivate audiences with vocal dynamics and body language."
    }
  ];

  return (
    <div style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#111827', color: '#FFFFFF', padding: '4.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <span style={{ color: '#F97316', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            DEMOCRATIZING GLOBAL EDUCATION
          </span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginTop: '0.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Our Mission: World-Class English Education, 100% Free For Everyone
          </h1>
          <p style={{ color: '#D1D5DB', fontSize: '1.1rem', lineHeight: '1.6' }}>
            FluentX was built on a simple premise: financial barriers should never stop ambitious individuals from acquiring English fluency, career confidence, and international opportunities.
          </p>
        </div>
      </div>

      {/* Instructors Section */}
      <div className="container" style={{ paddingTop: '4rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          <span style={{ color: '#6D28D9', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>
            Faculty & Instructors
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
            Learn From World-Class Educators
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {instructors.map((inst, idx) => (
            <div key={idx} className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
              <img src={inst.avatar} alt={inst.name} style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto', border: '3px solid #6D28D9' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827' }}>{inst.name}</h3>
              <div style={{ fontSize: '0.85rem', color: '#6D28D9', fontWeight: '600', marginBottom: '0.25rem' }}>{inst.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '1rem' }}>{inst.exp}</div>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.5' }}>{inst.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
