import React, { useState } from 'react';
import { 
  Star, Clock, BookOpen, Users, CheckCircle2, Play, Award, Sparkles, Shield, ArrowLeft, ChevronDown, Lock 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CourseDetailPage({ course, onBack, onOpenLesson, onOpenAuth }) {
  const { user, enrollCourse } = useAuth();
  const [openModule, setOpenModule] = useState(0);

  if (!course) return null;

  const isEnrolled = user?.enrolledCourses?.includes(course.id);

  const handleStartCourse = () => {
    if (!user) {
      onOpenAuth('register');
      return;
    }
    enrollCourse(course.id);
    const firstLesson = course.curriculum[0]?.lessons[0];
    if (firstLesson) {
      onOpenLesson(course, firstLesson);
    }
  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem' }}>
      {/* Course Hero Banner */}
      <div style={{
        backgroundColor: '#111827',
        color: '#FFFFFF',
        padding: '3.5rem 0',
        borderBottom: '1px solid #1F2937'
      }}>
        <div className="container">
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
              cursor: 'pointer',
              marginBottom: '1.5rem'
            }}
          >
            <ArrowLeft size={16} /> Back to Courses
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="badge-free"><Sparkles size={12} /> 100% FREE</span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {course.category}
                </span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {course.level}
                </span>
              </div>

              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '1rem' }}>
                {course.title}
              </h1>

              <p style={{ fontSize: '1.1rem', color: '#D1D5DB', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {course.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Star size={16} style={{ color: '#F59E0B', fill: '#F59E0B' }} /> {course.rating} ({course.reviewsCount} reviews)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={16} style={{ color: '#8B5CF6' }} /> {course.duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={16} style={{ color: '#F97316' }} /> {course.studentsCount.toLocaleString()} Enrolled Students
                </span>
              </div>

              <button onClick={handleStartCourse} className="btn btn-accent" style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem' }}>
                {isEnrolled ? 'Continue Course' : 'Start Learning Free Now'}
              </button>
            </div>

            {/* Course Card Preview Sticky Widget */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <img src={course.coverImage} alt={course.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.25rem' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.9rem', color: '#374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                  <span>Price</span>
                  <strong style={{ color: '#22C55E' }}>100% FREE</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                  <span>Lessons</span>
                  <strong>{course.lessonsCount} Video Lessons</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                  <span>Certificate</span>
                  <strong style={{ color: '#6D28D9' }}>Verified Certificate Included</strong>
                </div>
              </div>

              <button onClick={handleStartCourse} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {isEnrolled ? 'Resume Course' : 'Enroll Free Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <div>
            {/* Learning Objectives Box */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E5E7EB',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
                What You Will Learn In This Course
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {course.learningPoints?.map((pt, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem', color: '#374151' }}>
                    <CheckCircle2 size={18} style={{ color: '#22C55E', flexShrink: 0, marginTop: '2px' }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion Tree */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E5E7EB',
              padding: '2rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '1.25rem' }}>
                Course Curriculum ({course.curriculum?.length || 0} Modules)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {course.curriculum?.map((mod, modIdx) => {
                  const isOpen = openModule === modIdx;
                  return (
                    <div key={modIdx} style={{ border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden' }}>
                      <button
                        onClick={() => setOpenModule(isOpen ? null : modIdx)}
                        style={{
                          width: '100%',
                          padding: '1.25rem 1.5rem',
                          backgroundColor: '#F9FAFB',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: '700',
                          fontSize: '1rem',
                          color: '#111827',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{mod.moduleTitle}</span>
                        <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0.5rem 1.5rem 1rem 1.5rem' }}>
                          {mod.lessons.map((les) => (
                            <div
                              key={les.id}
                              onClick={() => {
                                if (user) {
                                  onOpenLesson(course, les);
                                } else {
                                  onOpenAuth('register');
                                }
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.85rem 0',
                                borderBottom: '1px solid #F3F4F6',
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                              }}
                              className="lesson-row"
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: '#F3E8FF',
                                  color: '#6D28D9',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <Play size={14} fill="#6D28D9" />
                                </div>
                                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>{les.title}</span>
                              </div>
                              <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>{les.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Instructor Bio Box */}
          <div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E5E7EB',
              padding: '2rem',
              position: 'sticky',
              top: '90px'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '1.25rem' }}>
                Meet Your Lead Instructor
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827' }}>{course.instructor.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#6D28D9', fontWeight: '600' }}>{course.instructor.title}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>{course.instructor.experience}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.6' }}>
                {course.instructor.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
