import React, { useState } from 'react';
import { 
  Play, CheckCircle2, ArrowLeft, ArrowRight, BookOpen, Mic, HelpCircle, FileText, 
  Award, Sparkles, Volume2, Save, Download 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SpeechPracticeWidget from '../components/SpeechPracticeWidget';
import QuizEngine from '../components/QuizEngine';
import CertificateModal from '../components/CertificateModal';

export default function LessonPlayerPage({ course, lesson, onBack, onSelectLesson }) {
  const { user, markLessonComplete, saveNote, awardCertificate } = useAuth();
  const [activeTab, setActiveTab] = useState('practice');
  const [noteText, setNoteText] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  if (!course || !lesson) return null;

  const isCompleted = user?.completedLessons?.includes(lesson.id);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);

    // Check if course is fully finished to grant certificate
    const allLessonIds = course.curriculum.flatMap(m => m.lessons.map(l => l.id));
    const completedSet = new Set([...(user?.completedLessons || []), lesson.id]);
    const isAllDone = allLessonIds.every(id => completedSet.has(id));

    if (isAllDone) {
      const newCert = {
        id: 'cert_' + Date.now(),
        courseId: course.id,
        courseTitle: course.title,
        issueDate: new Date().toISOString().split('T')[0],
        grade: 'A+ Highest Distinction'
      };
      awardCertificate(newCert);
      setShowCertModal(true);
    }
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      saveNote({
        id: 'n_' + Date.now(),
        courseTitle: course.title,
        lessonTitle: lesson.title,
        note: noteText
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div style={{ backgroundColor: '#111827', color: '#FFFFFF', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Top Header Bar */}
      <div style={{
        backgroundColor: '#1F2937',
        borderBottom: '1px solid #374151',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'none',
            border: 'none',
            color: '#9CA3AF',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to Course
        </button>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: '700', textTransform: 'uppercase' }}>{course.title}</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>{lesson.title}</h3>
        </div>

        <button
          onClick={handleMarkComplete}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: isCompleted ? '#22C55E' : '#6D28D9',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          <CheckCircle2 size={16} /> {isCompleted ? 'Completed' : 'Mark Complete'}
        </button>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Main Player & Interactive Workspace */}
          <div>
            {/* HTML5 Video Player */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              <video
                controls
                autoPlay
                src={lesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                style={{ width: '100%', maxHeight: '420px', display: 'block' }}
              />
            </div>

            {/* Interactive Workspace Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid #374151',
              paddingBottom: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {[
                { id: 'practice', label: 'AI Speech Analyzer', icon: Mic },
                { id: 'phrases', label: 'Key Phrases', icon: BookOpen },
                { id: 'quiz', label: 'Lesson Quiz', icon: HelpCircle },
                { id: 'notes', label: 'My Study Notes', icon: FileText }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.65rem 1.1rem',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: active ? '#6D28D9' : 'transparent',
                      color: active ? '#FFFFFF' : '#9CA3AF',
                      fontWeight: active ? '700' : '500',
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={16} /> {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Workspace Contents */}
            {activeTab === 'practice' && (
              <SpeechPracticeWidget targetSentence={lesson.targetPhrase || "I was wondering if you had time for a quick chat."} />
            )}

            {activeTab === 'phrases' && (
              <div style={{ backgroundColor: '#1F2937', borderRadius: '20px', padding: '1.75rem', border: '1px solid #374151' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: '#FFFFFF' }}>
                  Target Vocabulary & Expressions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {lesson.phrases?.map((p, idx) => (
                    <div key={idx} style={{ backgroundColor: '#111827', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid #374151' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#F97316' }}>"{p.phrase}"</div>
                      <div style={{ fontSize: '0.9rem', color: '#D1D5DB', margin: '0.25rem 0' }}>Meaning: {p.meaning}</div>
                      <div style={{ fontSize: '0.85rem', color: '#9CA3AF', fontStyle: 'italic' }}>Example: {p.example}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <QuizEngine quizList={lesson.quiz} onCompleteQuiz={handleMarkComplete} />
            )}

            {activeTab === 'notes' && (
              <div style={{ backgroundColor: '#1F2937', borderRadius: '20px', padding: '1.75rem', border: '1px solid #374151' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#FFFFFF' }}>
                  Lesson Notes Exporter
                </h4>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Write down key pronunciation tips, vocabulary, or grammar rules. Saved to your profile automatically.
                </p>
                <textarea
                  rows={5}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Type your notes here..."
                  style={{
                    width: '100%',
                    backgroundColor: '#111827',
                    border: '1px solid #4B5563',
                    borderRadius: '14px',
                    padding: '1rem',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none',
                    marginBottom: '1rem'
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button onClick={handleSaveNote} className="btn btn-primary">
                    <Save size={16} /> Save Notes
                  </button>
                  {savedSuccess && <span style={{ color: '#22C55E', fontWeight: '700', fontSize: '0.85rem' }}>Saved to your Dashboard!</span>}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Curriculum Drawer */}
          <div>
            <div style={{
              backgroundColor: '#1F2937',
              borderRadius: '20px',
              border: '1px solid #374151',
              padding: '1.5rem'
            }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1rem' }}>
                Course Content
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {course.curriculum.map((mod, mIdx) => (
                  <div key={mIdx}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#8B5CF6', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      {mod.moduleTitle}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {mod.lessons.map((l) => {
                        const active = l.id === lesson.id;
                        const done = user?.completedLessons?.includes(l.id);
                        return (
                          <button
                            key={l.id}
                            onClick={() => onSelectLesson(course, l)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.75rem 0.85rem',
                              borderRadius: '10px',
                              border: 'none',
                              backgroundColor: active ? '#6D28D9' : 'transparent',
                              color: active ? '#FFFFFF' : '#D1D5DB',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: '0.85rem',
                              fontWeight: active ? '700' : '500'
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {done ? <CheckCircle2 size={16} style={{ color: '#22C55E' }} /> : <Play size={14} />}
                              {l.title}
                            </span>
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{l.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCertModal && (
        <CertificateModal certificate={{ courseTitle: course.title, studentName: user.fullName }} onClose={() => setShowCertModal(false)} />
      )}
    </div>
  );
}
