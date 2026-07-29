import React from 'react';
import { Star, Clock, BookOpen, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function CourseCard({ course, onSelectCourse }) {
  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Thumbnail Container */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={course.coverImage}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="course-img"
        />
        {/* Badges Overlay */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <span className="badge-free">
            <Sparkles size={12} /> FREE
          </span>
          {course.badge && (
            <span style={{
              backgroundColor: 'rgba(17, 24, 39, 0.85)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(4px)'
            }}>
              {course.badge}
            </span>
          )}
        </div>

        {/* Rating overlay bottom right */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          backgroundColor: '#FFFFFF',
          padding: '0.2rem 0.5rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.8rem',
          fontWeight: '700',
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
        }}>
          <Star size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
          <span>{course.rating}</span>
          <span style={{ color: '#6B7280', fontWeight: '400', fontSize: '0.75rem' }}>({course.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Category & Level */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#6D28D9'
        }}>
          <span>{course.category}</span>
          <span style={{ color: '#6B7280', fontWeight: '500' }}>{course.level}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '800',
          color: '#111827',
          lineHeight: '1.35',
          marginBottom: '0.5rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.875rem',
          color: '#6B7280',
          lineHeight: '1.5',
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.description}
        </p>

        {/* Course Stats row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingTop: '0.85rem',
          borderTop: '1px solid #F3F4F6',
          fontSize: '0.8rem',
          color: '#4B5563',
          marginBottom: '1.25rem',
          marginTop: 'auto'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={14} style={{ color: '#6D28D9' }} /> {course.duration}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={14} style={{ color: '#F97316' }} /> {(course.studentsCount / 1000).toFixed(1)}k Students
          </span>
        </div>

        {/* Start Learning Button */}
        <button
          onClick={() => onSelectCourse(course)}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Start Learning Free <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        .card:hover .course-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
