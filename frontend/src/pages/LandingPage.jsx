import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, Play, CheckCircle2, Star, Shield, Award, Users, BookOpen, Clock, 
  Download, Mic, Video, HelpCircle, ChevronDown, Zap, FileText, Globe, MessageSquare, Check
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import SpeechPracticeWidget from '../components/SpeechPracticeWidget';
import { useCourses } from '../context/CourseContext';

export default function LandingPage({ setActivePage, onSelectCourse, onOpenAuth, onSelectResource }) {
  const { courses, resources, liveClasses, selectedCategory, setSelectedCategory } = useCourses();
  const toggleFaq = (index) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  const categories = ['All', 'Speaking', 'Grammar', 'Business', 'Soft Skills', 'Career', 'Vocabulary'];

  const stats = [
    { number: '50,000+', label: 'Active Students', icon: Users, color: '#6D28D9' },
    { number: '500+', label: 'Free Video Lessons', icon: BookOpen, color: '#8B5CF6' },
    { number: '30+', label: 'Structured Courses', icon: Award, color: '#F97316' },
    { number: '100%', label: 'Free Forever', icon: Shield, color: '#22C55E' },
    { number: '95%', label: 'Completion Rate', icon: Star, color: '#F59E0B' }
  ];

  const learningPaths = [
    { title: 'Beginner English', icon: '🌱', level: 'Level 1', desc: 'Build basic sentence structures, everyday vocabulary, and simple conversation confidence.', count: '6 Courses' },
    { title: 'Intermediate English', icon: '🚀', level: 'Level 2', desc: 'Eliminate hesitation, refine tenses, and speak naturally in social & workplace settings.', count: '8 Courses' },
    { title: 'Advanced English', icon: '⚡', level: 'Level 3', desc: 'Master native idioms, complex grammar nuances, and sophisticated vocabulary.', count: '5 Courses' },
    { title: 'Professional Communication', icon: '💼', level: 'Career', desc: 'Executive email writing, workplace negotiations, and international business etiquette.', count: '4 Courses' },
    { title: 'Interview Success', icon: '🎯', level: 'Career', desc: 'Ace high-stakes interviews with the STAR method and executive self-introductions.', count: '3 Courses' },
    { title: 'Public Speaking & TED Talks', icon: '🎙️', level: 'Leadership', desc: 'Conquer stage fright, project vocal authority, and captivate any audience.', count: '4 Courses' }
  ];

  const whyChooseUs = [
    { title: '100% Free Courses', desc: 'No hidden fees, subscriptions, or credit cards required. High quality education for everyone.', icon: Shield, color: '#22C55E' },
    { title: 'Expert Instructors', desc: 'Learn from certified ESL coaches, TEDx speakers, and corporate HR directors.', icon: Award, color: '#6D28D9' },
    { title: 'Speech Analyzer', desc: 'Practice speaking into your microphone and get instant AI pronunciation feedback.', icon: Mic, color: '#F97316' },
    { title: 'Interactive Quizzes', desc: 'Reinforce every lesson with instant-grading quizzes and progress tracking.', icon: CheckCircle2, color: '#8B5CF6' },
    { title: 'Verified Certificates', desc: 'Earn downloadable certificates of completion to share on your resume and LinkedIn.', icon: Sparkles, color: '#F59E0B' },
    { title: 'Mobile Friendly', desc: 'Learn anytime, anywhere on smartphone, tablet, or desktop seamlessly.', icon: Globe, color: '#3B82F6' },
    { title: 'Download Notes & PDFs', desc: 'Access comprehensive cheat sheets, eBooks, and exercise workbooks anytime.', icon: FileText, color: '#EC4899' },
    { title: 'Speaking Club', desc: 'Join global daily speaking challenges and practice rooms with real study partners.', icon: MessageSquare, color: '#10B981' }
  ];

  const faqs = [
    {
      q: 'How are all courses on FluentX completely FREE?',
      a: 'FluentX is funded by global educational sponsors and open-access grants committed to breaking financial barriers in language education. All video lessons, quizzes, resources, and certificates are 100% free with no hidden charges.'
    },
    {
      q: 'Can complete beginners join FluentX?',
      a: 'Absolutely! We offer dedicated Beginner English Learning Paths starting from basic sentence building up to advanced professional fluency.'
    },
    {
      q: 'Will I receive a certificate upon finishing a course?',
      a: 'Yes! Once you complete all video lessons and pass the course quizzes, a verified certificate of completion with a unique credential ID will be issued in your dashboard.'
    },
    {
      q: 'Can I practice my English speaking skills on the site?',
      a: 'Yes! FluentX features an AI Speech Analyzer that listens to your microphone and provides instant pronunciation feedback, along with a daily Speaking Club for partner practice.'
    },
    {
      q: 'Can I download lesson notes and study offline?',
      a: 'Yes! Our Free Resources hub provides downloadable PDF cheat sheets, vocabulary eBooks, interview workbooks, and email templates.'
    }
  ];

  return (
    <div>
      {/* 3. Hero Section */}
      <section style={{
        backgroundColor: '#FFFFFF',
        paddingTop: '4rem',
        paddingBottom: '5rem',
        borderBottom: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#F3E8FF',
              color: '#6D28D9',
              fontSize: '0.85rem',
              fontWeight: '700',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              marginBottom: '1.5rem'
            }}>
              <Sparkles size={16} style={{ color: '#F97316' }} /> World's #1 Free English Learning Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: '800',
              color: '#111827',
              lineHeight: '1.15',
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem'
            }}>
              Speak English With <span style={{
                background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Unstoppable Confidence.</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#4B5563',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '560px'
            }}>
              Master spoken English, grammar, communication skills, vocabulary, interview preparation, public speaking, and business English through structured, completely free courses.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button
                onClick={() => onOpenAuth('register')}
                className="btn btn-primary"
                style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
              >
                Start Learning Free <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setActivePage('courses')}
                className="btn btn-outline"
                style={{ padding: '0.9rem 1.75rem', fontSize: '1.05rem' }}
              >
                Browse All Courses
              </button>
            </div>

            {/* Micro Social Proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', marginStyle: '-0.5rem' }}>
                {['photo-1534528741775-53994a69daeb', 'photo-1507003211169-0a1dd7228f2d', 'photo-1573496359142-b8d87734a5a2', 'photo-1500648767791-00dcc994a43e'].map((img, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=100&q=80`}
                    alt="Learner"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '2px solid #FFFFFF',
                      marginLeft: i > 0 ? '-10px' : 0
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#4B5563' }}>
                <div style={{ display: 'flex', gap: '0.2rem', color: '#F59E0B' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" />)}
                  <strong style={{ color: '#111827', marginLeft: '4px' }}>4.9/5</strong>
                </div>
                <span>Joined by 50,000+ ambitious global learners</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 20px 40px rgba(109, 40, 217, 0.12)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Students practicing English online"
                style={{ width: '100%', height: '340px', objectFit: 'cover' }}
              />

              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#6D28D9', textTransform: 'uppercase' }}>
                    Live Speaking Practice
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#22C55E', fontWeight: '700' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} /> 1,420 Practice Rooms Active
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                  Master Natural Accent & Instant Fluency
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                  Practice speaking phrases in real time with audio AI analysis and real global partners.
                </p>

                {/* Floating Micro Badge */}
                <div style={{
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#DCFCE7',
                    color: '#22C55E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800'
                  }}>
                    <Check size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Pronunciation Score: 96%</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Natural cadence and stress achieved!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trusted Statistics */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {stats.map((st, i) => {
              const IconComp = st.icon;
              return (
                <div key={i} className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: `${st.color}15`,
                    color: st.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <IconComp size={24} />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', letterSpacing: '-0.02em' }}>
                    {st.number}
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6B7280', marginTop: '0.25rem' }}>
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Courses */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span style={{ color: '#F97316', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Structured Learning Paths
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
              Featured Premium Free Courses
            </h2>
            <p style={{ color: '#6B7280', fontSize: '1rem', marginTop: '0.5rem' }}>
              Handcrafted curriculum designed by world-class linguists and communication strategists.
            </p>

            {/* Category Filter Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem'
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    border: selectedCategory === cat ? '1px solid #6D28D9' : '1px solid #E5E7EB',
                    backgroundColor: selectedCategory === cat ? '#6D28D9' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {courses
              .filter(c => selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase())
              .map((c) => (
                <CourseCard key={c.id} course={c} onSelectCourse={onSelectCourse} />
              ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button onClick={() => setActivePage('courses')} className="btn btn-outline" style={{ padding: '0.85rem 2rem' }}>
              View All 30+ Courses <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Learning Paths */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span style={{ color: '#6D28D9', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step-by-Step Growth
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
              Curated Learning Roadmaps
            </h2>
            <p style={{ color: '#6B7280', fontSize: '1rem', marginTop: '0.5rem' }}>
              Choose your goal and follow a step-by-step track tailored to your current fluency.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {learningPaths.map((path, idx) => (
              <div key={idx} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2.2rem' }}>{path.icon}</span>
                  <span style={{
                    backgroundColor: '#F3E8FF',
                    color: '#6D28D9',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px'
                  }}>
                    {path.level}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                  {path.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: '1.5', marginBottom: '1.5rem', flex: 1 }}>
                  {path.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#4B5563' }}>{path.count}</span>
                  <button onClick={() => setActivePage('courses')} style={{ background: 'none', border: 'none', color: '#6D28D9', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                    Start Track <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive Learning Showcase (Voice Analyzer Demo) */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: '#F97316', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Real-Time Voice AI
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem', marginBottom: '1rem' }}>
                Test Your Pronunciation Right Now
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Try our live Speech Analyzer tool right here! Listen to native English voice synthesis, record yourself through your microphone, and receive instant fluency scoring.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Instant accuracy score matching native cadence',
                  'Phonetic pronunciation tips for tricky English sounds',
                  'Unlimited free speech drills across all courses'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={18} style={{ color: '#22C55E' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SpeechPracticeWidget targetSentence="I was wondering if you had time for a quick chat." />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Learn With FluentX */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ color: '#6D28D9', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              The FluentX Advantage
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
              Why 50,000+ Students Choose FluentX
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card" style={{ padding: '1.75rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Free Resources Library */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span style={{ color: '#F97316', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Instant PDF & Workbooks
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
              Free Study Resources & Cheat Sheets
            </h2>
            <p style={{ color: '#6B7280', fontSize: '1rem', marginTop: '0.5rem' }}>
              Download curated study guides, vocabulary books, and interview templates completely free.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {resources.slice(0, 3).map((res) => (
              <div key={res.id} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{
                    backgroundColor: '#F3E8FF',
                    color: '#6D28D9',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px'
                  }}>
                    {res.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '600' }}>
                    {res.downloads} Downloads
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                  {res.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5', marginBottom: '1.5rem', flex: 1 }}>
                  {res.description}
                </p>
                <button
                  onClick={() => onSelectResource(res)}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Download size={16} /> Download Free ({res.pages})
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setActivePage('resources')} className="btn btn-ghost" style={{ fontWeight: '700', color: '#6D28D9' }}>
              Explore Full Resource Library <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Student Testimonials */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span style={{ color: '#6D28D9', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Student Transformations
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
              Hear From Our Global Graduates
            </h2>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* 11. Weekly Live Classes */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span style={{ color: '#F97316', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Interactive Live Masterclasses
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
              Upcoming Free Live Sessions
            </h2>
            <p style={{ color: '#6B7280', fontSize: '1rem', marginTop: '0.5rem' }}>
              Join live interactive workshops hosted by top instructors with live Q&A.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {liveClasses.map((lc) => (
              <div key={lc.id} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <img
                    src={lc.instructorAvatar}
                    alt={lc.instructor}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#111827' }}>{lc.instructor}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Instructor</div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#F3E8FF',
                  color: '#6D28D9',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  alignSelf: 'flex-start',
                  marginBottom: '0.75rem'
                }}>
                  {lc.badge}
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                  {lc.topic}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.5rem', flex: 1 }}>
                  📅 {lc.date} • ⏱️ {lc.duration}
                </p>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Video size={16} /> Reserve Free Seat ({lc.attendees} Attending)
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQ Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#6D28D9', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Clear Answers
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden',
                    transition: 'all 0.2s'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '1.05rem',
                      color: '#111827',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#6D28D9' }} />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15. Final CTA */}
      <section style={{
        backgroundColor: '#6D28D9',
        color: '#FFFFFF',
        padding: '5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.35rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em' }}>
            START YOUR JOURNEY TODAY
          </span>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginTop: '1rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Transform Your English Fluency Free Forever.
          </h2>

          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Join 50,000+ students mastering Spoken English, Grammar, Business Communication, and Public Speaking. No credit card required.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => onOpenAuth('register')}
              className="btn btn-accent"
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            >
              Start Learning Free <ArrowRight size={20} />
            </button>
            <button
              onClick={() => setActivePage('courses')}
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '1.05rem'
              }}
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
