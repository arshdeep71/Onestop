import React, { useState } from 'react';
import { Search, Sparkles, Filter, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../context/CourseContext';

export default function CourseCatalogPage({ onSelectCourse }) {
  const { courses, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useCourses();

  const categories = ['All', 'Speaking', 'Grammar', 'Business', 'Soft Skills', 'Career', 'Vocabulary'];

  const filtered = courses.filter((c) => {
    // Perform search filtration based on title and category
    const matchesCategory = selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem', minHeight: '90vh' }}>
      {/* Search Header Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '3.5rem 0',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <span style={{ color: '#6D28D9', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Explore 100% Free Catalog
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem', marginBottom: '1rem' }}>
            Master Any English & Communication Skill
          </h1>

          {/* Search Bar */}
          <div style={{ position: 'relative', maxWidth: '540px', margin: '0 auto 1.75rem auto' }}>
            <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses (e.g. Grammar, Public Speaking, Interview)..."
              style={{
                width: '100%',
                padding: '1rem 1.25rem 1rem 3.2rem',
                borderRadius: '9999px',
                border: '1px solid #D1D5DB',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.2rem',
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
      </div>

      {/* Courses Grid */}
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827' }}>
            {selectedCategory === 'All' ? 'All Courses' : `${selectedCategory} Courses`} ({filtered.length})
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>All 100% Free Forever</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} onSelectCourse={onSelectCourse} />
          ))}
        </div>
      </div>
    </div>
  );
}
