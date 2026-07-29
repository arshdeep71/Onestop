import React, { useState } from 'react';
import { Download, FileText, Sparkles, BookOpen, Search } from 'lucide-react';
import { useCourses } from '../context/CourseContext';

export default function FreeResourcesPage({ onSelectResource }) {
  const { resources } = useCourses();
  const [filter, setFilter] = useState('All');

  const defaultResourcesList = [
    { id: 'r1', title: "Complete English Grammar PDF Cheat Sheet", category: "Grammar", type: "PDF Guide", pages: "45 Pages", downloads: "28.4k", description: "A quick visual summary of all 12 tenses, common preposition rules, and active/passive voice formulas." },
    { id: 'r2', title: "1,000 High-Frequency English Vocabulary eBook", category: "Vocabulary", type: "eBook", pages: "80 Pages", downloads: "34.1k", description: "Categorized words, collocations, audio pronunciation guide, and real-life sentence examples." },
    { id: 'r3', title: "Job Interview Q&A Preparation Master Guide", category: "Career", type: "PDF Worksheets", pages: "32 Pages", downloads: "19.8k", description: "50 STAR-method answers for difficult questions like 'Tell me about a time you failed' and salary negotiation tactics." },
    { id: 'r4', title: "Executive Business Email Templates Pack", category: "Business", type: "Templates", pages: "25 Templates", downloads: "22.6k", description: "Plug-and-play email templates for follow-ups, project updates, client proposals, and apologies." },
    { id: 'r5', title: "Daily English Pronunciation & Accent Practice Sheets", category: "Speaking", type: "Audio & PDF", pages: "15 Worksheets", downloads: "16.2k", description: "Mouth positioning guides, tongue twisters, intonation exercises, and audio drills." },
    { id: 'r6', title: "Public Speaking & Presentation Planner Workbook", category: "Soft Skills", type: "Workbook", pages: "28 Pages", downloads: "12.9k", description: "Speech structure blueprint, hook openers cheat sheet, and body language checklist." }
  ];

  const list = resources?.length ? resources : defaultResourcesList;
  const filtered = list.filter(r => filter === 'All' || r.category.toLowerCase() === filter.toLowerCase());

  return (
    <div style={{ backgroundColor: '#FAFAFA', paddingBottom: '5rem', minHeight: '90vh' }}>
      <div style={{ backgroundColor: '#FFFFFF', padding: '3.5rem 0', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <span style={{ color: '#F97316', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Instant PDF & eBook Library
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginTop: '0.25rem', marginBottom: '1rem' }}>
            Free Study Resources & Workbooks
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1rem' }}>
            Download curated PDFs, cheat sheets, and templates to accelerate your learning offline.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['All', 'Grammar', 'Vocabulary', 'Career', 'Business', 'Speaking', 'Soft Skills'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  border: filter === cat ? '1px solid #6D28D9' : '1px solid #E5E7EB',
                  backgroundColor: filter === cat ? '#6D28D9' : '#FFFFFF',
                  color: filter === cat ? '#FFFFFF' : '#4B5563',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {filtered.map((res) => (
            <div key={res.id} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: '#F3E8FF', color: '#6D28D9', fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                  {res.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '600' }}>
                  {res.downloads} Downloads
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                {res.title}
              </h3>

              <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5', marginBottom: '1.5rem', flex: 1 }}>
                {res.description}
              </p>

              <button
                onClick={() => onSelectResource(res)}
                className="btn btn-accent"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download size={16} /> Download Free ({res.pages})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
