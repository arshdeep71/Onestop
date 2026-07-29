import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, PlayCircle, Award, FileText, Mic, Download, User, 
  Settings, LogOut, Flame, Clock, CheckCircle2, ArrowRight, Sparkles, Star, Calendar, MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import CertificateModal from '../components/CertificateModal';

export default function StudentDashboard({ setActivePage, onSelectCourse, onOpenLesson }) {
  const { user, logout } = useAuth();
  const { courses } = useCourses();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCert, setSelectedCert] = useState(null);

  if (!user) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem' }}>Please Log In to View Your Dashboard</h2>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Track your courses, daily goals, learning streak, and earned certificates.</p>
        <button onClick={() => setActivePage('home')} className="btn btn-primary">Return Home</button>
      </div>
    );
  }

  const enrolledCourses = courses.filter(c => user.enrolledCourses?.includes(c.id)) || [courses[0]];
  const continueCourse = enrolledCourses[0] || courses[0];

  const sidebarNav = [
    { id: 'dashboard', label: '🏠 Dashboard', icon: LayoutDashboard },
    { id: 'my-courses', label: '📚 My Learning', icon: BookOpen },
    { id: 'continue', label: '🎥 Continue Learning', icon: PlayCircle },
    { id: 'learning-paths', label: '🎯 Learning Paths', icon: Sparkles },
    { id: 'interview-prep', label: '💼 Interview Prep', icon: Award },
    { id: 'speaking', label: '🗣 Communication Skills', icon: Mic },
    { id: 'mentorship', label: '🤝 1-on-1 Mentorship', icon: MessageSquare },
    { id: 'live-classes', label: '🎥 Live Classes', icon: Calendar },
    { id: 'meetings', label: '📅 My Meetings', icon: Clock },
    { id: 'resources', label: '📂 Resources & Notes', icon: FileText },
    { id: 'certificates', label: '🏆 Certificates', icon: Award },
    { id: 'progress', label: '📈 Progress Graph', icon: Flame },
    { id: 'profile', label: '👤 Profile & Settings', icon: User }
  ];

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '90vh', padding: '2rem 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        {/* Sidebar Navigation */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E5E7EB',
          padding: '1.5rem 1rem',
          height: 'fit-content',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          {/* User Profile Summary Header */}
          <div style={{ padding: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#6D28D9',
              color: '#FFFFFF',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem'
            }}>
              {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.fullName}</div>
              <div style={{ fontSize: '0.75rem', color: '#22C55E', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Flame size={12} fill="#F97316" color="#F97316" /> {user.streak || 7} Day Streak!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'speaking') {
                      setActivePage('speaking-club');
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: isActive ? '#F3E8FF' : 'transparent',
                    color: isActive ? '#6D28D9' : '#4B5563',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={18} style={{ color: isActive ? '#6D28D9' : '#6B7280' }} />
                  {item.label}
                </button>
              );
            })}

            <div style={{ borderTop: '1px solid #F3F4F6', margin: '0.5rem 0' }} />

            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#EF4444',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Main View Container */}
        <div>
          {/* Welcome Header */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            padding: '2rem',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#6D28D9', fontWeight: '700', fontSize: '0.85rem' }}>
                <Sparkles size={16} style={{ color: '#F97316' }} /> Career Acceleration Platform
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111827', marginTop: '0.2rem' }}>
                Welcome back, {user.fullName.split(' ')[0]} 👋
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.95rem', marginTop: '0.25rem', fontWeight: '500' }}>
                Continue building your skills today — <strong>Learn • Practice • Get Hired</strong>
              </p>
            </div>

            {/* Streak & Today's Progress Cards */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: '#FFF7ED',
                border: '1px solid #FFEDD5',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', color: '#EA580C', fontWeight: '800', fontSize: '1.3rem' }}>
                  <Flame size={20} fill="#EA580C" /> 🔥 {user.streak || 18} Days
                </div>
                <div style={{ fontSize: '0.75rem', color: '#C2410C', fontWeight: '700', marginTop: '0.2rem' }}>Learning Streak</div>
              </div>

              <div style={{
                backgroundColor: '#F3E8FF',
                border: '1px solid #E9D5FF',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#6D28D9', fontWeight: '800', fontSize: '1.2rem' }}>
                  35 mins learned
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7E22CE', fontWeight: '700', marginTop: '0.2rem' }}>2 Courses • 1 Interview Completed</div>
              </div>
            </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9A3412' }}>Learning Streak</div>
              </div>

              <div style={{
                backgroundColor: '#F0FDF4',
                border: '1px solid #DCFCE7',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#15803D', fontWeight: '800', fontSize: '1.3rem' }}>
                  {user.dailyProgressMinutes || 15}/{user.dailyGoalMinutes || 20} min
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#166534' }}>Daily Goal</div>
              </div>
            </div>
          </div>

          {/* Continue Learning Highlight Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.75rem',
            boxShadow: '0 10px 25px rgba(109, 40, 217, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                CONTINUE LEARNING
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '0.5rem' }}>
                {continueCourse.title}
              </h3>
              <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Next Lesson: Breaking the Translation Habit (18 min)
              </p>
            </div>

            <button
              onClick={() => onOpenLesson(continueCourse, continueCourse.curriculum[0].lessons[0])}
              className="btn btn-accent"
              style={{ padding: '0.85rem 1.75rem' }}
            >
              <PlayCircle size={20} /> Resume Lesson
            </button>
          </div>

          {/* Enrolled Courses Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
              My Enrolled Courses ({enrolledCourses.length})
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {enrolledCourses.map((c) => (
                <div key={c.id} className="card" style={{ padding: '1.25rem' }}>
                  <img src={c.coverImage} alt={c.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.85rem' }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '0.85rem' }}>{c.lessonsCount} Lessons • {c.level}</p>
                  
                  {/* Progress bar */}
                  <div style={{ backgroundColor: '#F3F4F6', borderRadius: '9999px', height: '8px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                    <div style={{ width: '45%', backgroundColor: '#6D28D9', height: '100%', borderRadius: '9999px' }} />
                  </div>

                  <button onClick={() => onSelectCourse(c)} className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}>
                    View Curriculum
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 1-on-1 Mentorship & Live Meeting Booker Widget */}
          <div style={{
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ color: '#F97316', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🤝 1-on-1 Mentorship & Zoom Live Sessions
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                Book 1-on-1 Mock Interview or Executive Mentorship
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', margin: 0 }}>
                Practice live HR & Technical interviews with certified career coaches and receive real-time feedback.
              </p>
            </div>
            <button className="btn btn-accent" style={{ padding: '0.75rem 1.5rem', fontWeight: '700' }}>
              📅 Schedule Session
            </button>
          </div>

          {/* Certificates Showcase */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            padding: '1.75rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} style={{ color: '#F97316' }} /> My Earned Certificates ({user.certificates?.length || 1})
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {(user.certificates || [{ id: 'cert_101', courseId: 'spoken-english-mastery', courseTitle: 'Spoken English Mastery', issueDate: '2026-07-20', grade: 'A+' }]).map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    border: '1px solid #D8B4FE',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    backgroundColor: '#F3E8FF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6D28D9', textTransform: 'uppercase' }}>VERIFIED CERTIFICATE</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', marginTop: '0.2rem' }}>{cert.courseTitle}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.25rem' }}>Issued: {cert.issueDate}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', padding: '0.5rem', fontSize: '0.85rem' }}
                  >
                    View & Print Certificate
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedCert && (
        <CertificateModal certificate={{ ...selectedCert, studentName: user.fullName }} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
}
