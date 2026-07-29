import React from 'react';
import { MessageSquare, Mic, Users, Trophy, Sparkles, Flame, Play, Volume2, ArrowRight } from 'lucide-react';
import SpeechPracticeWidget from '../components/SpeechPracticeWidget';
import { useCourses } from '../context/CourseContext';

export default function SpeakingClubPage({ onOpenAuth }) {
  const { speakingClub } = useCourses();

  const fallbackTopics = [
    { id: 't1', category: 'Career & Ambition', title: 'What is your dream job and why?', difficulty: 'Easy', keywords: ['Passion', 'Growth opportunity', 'Impact'] },
    { id: 't2', category: 'Tech & Future', title: 'Will AI replace jobs or make us more productive?', difficulty: 'Intermediate', keywords: ['Automation', 'Efficiency', 'Human creativity'] },
    { id: 't3', category: 'Culture & Life', title: 'What is the best advice you have ever received?', difficulty: 'Easy', keywords: ['Wisdom', 'Perspective', 'Mentorship'] }
  ];

  const topics = speakingClub?.practiceTopics || fallbackTopics;
  const leaderboard = speakingClub?.leaderboard || [
    { rank: 1, name: "Mateo Rossi", country: "Italy", points: 1420, streak: 28, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" },
    { rank: 2, name: "Amina Al-Sayed", country: "Egypt", points: 1380, streak: 24, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" },
    { rank: 3, name: "Kenji Sato", "country": "Japan", points: 1290, streak: 21, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" }
  ];

  return (
    <div style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem' }}>
      {/* Hero Banner */}
      <div style={{
        backgroundColor: '#6D28D9',
        color: '#FFFFFF',
        padding: '4rem 0',
        borderBottom: '1px solid #5B21B6'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '0.35rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700' }}>
            🎙️ FLUENTX GLOBAL SPEAKING CLUB
          </span>

          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginTop: '0.75rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Daily Practice Challenges & Voice Audio Simulator
          </h1>

          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.6', marginBottom: '2rem' }}>
            Speak out loud every single day. Master fluency with daily speech prompts, mic recording checks, and study partner rooms.
          </p>

          <button onClick={() => onOpenAuth('register')} className="btn btn-accent" style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem' }}>
            Join Speaking Club Free <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {/* Daily Speech Challenge Widget */}
          <div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#F97316', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  🔥 Today's Speaking Challenge
                </span>
                <span style={{ backgroundColor: '#FFF7ED', color: '#EA580C', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                  Target: 90 Seconds
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem' }}>
                {speakingClub?.dailyChallenge?.prompt || "Describe a moment when you overcame a big challenge in your life or career. What did you learn?"}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {speakingClub?.dailyChallenge?.tips?.map((t, idx) => (
                  <span key={idx} style={{ backgroundColor: '#F3E8FF', color: '#6D28D9', fontSize: '0.8rem', fontWeight: '600', padding: '0.25rem 0.65rem', borderRadius: '8px' }}>
                    💡 {t}
                  </span>
                ))}
              </div>

              {/* Speech Microphone Practice */}
              <SpeechPracticeWidget targetSentence="Describing a moment when I overcame a big challenge taught me resilience." />
            </div>

            {/* Practice Topic Prompts */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '1.25rem' }}>
              Practice Topic Prompts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topics.map((top) => (
                <div key={top.id} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#6D28D9' }}>
                    <span>{top.category}</span>
                    <span style={{ color: '#22C55E' }}>{top.difficulty}</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>{top.title}</h4>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {top.keywords.map((kw, i) => (
                      <span key={i} style={{ backgroundColor: '#F3F4F6', color: '#4B5563', fontSize: '0.75rem', fontWeight: '600', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Leaderboard & Live Rooms */}
          <div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1.25rem' }}>
                <Trophy size={22} /> Global Leaderboard
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {leaderboard.map((user) => (
                  <div key={user.rank} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontWeight: '800', width: '20px', color: user.rank === 1 ? '#F59E0B' : '#6B7280' }}>
                        #{user.rank}
                      </span>
                      <img src={user.avatar} alt={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#111827' }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{user.country}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#6D28D9' }}>{user.points} pts</div>
                      <div style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: '700' }}>🔥 {user.streak}d</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
