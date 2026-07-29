import React, { useState } from 'react';
import { 
  Users, PlayCircle, Clock, Award, Activity, Search, Shield, Eye, BarChart2, 
  Settings, Download, RefreshCw, Layers, CheckCircle2, ChevronRight, HardDrive, 
  Globe, Smartphone, Laptop, Sparkles, FileText, ArrowUpRight, MessageSquare, AlertCircle, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';

export default function AdminDashboard({ onBackToApp }) {
  const { user, logout } = useAuth();
  const { courses } = useCourses();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'video-analytics' | 'user-360' | 'live-monitor' | 'cms' | 'reports'
  
  // State for Admin Controls
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // CMS Editable State
  const [cmsHeroTitle, setCmsHeroTitle] = useState('Learn. Practice. Get Hired.');
  const [cmsBanner, setCmsBanner] = useState('🎉 Over 50,000+ Active Learners Enrolled! All Courses 100% Free Forever.');
  const [cmsSaved, setCmsSaved] = useState(false);

  // Mock System KPIs
  const kpis = {
    totalStudents: 52480,
    studentsOnlineNow: 142,
    totalCourses: courses.length || 6,
    totalVideos: 148,
    totalWatchHours: '12,450 hrs',
    avgWatchTime: '18.5 mins',
    completionRate: '84.2%',
    certificatesIssued: 4890,
    storageUsage: '142.5 GB / 500 GB',
    serverStatus: 'Healthy (99.98% Uptime)'
  };

  // Mock Student List for 360° Profile Inspector
  const mockStudents = [
    {
      id: 'usr_1',
      fullName: 'Alex Morgan',
      email: 'alex@fluentx.org',
      country: 'United States',
      device: 'Desktop (macOS / Chrome)',
      joinedDate: '2026-01-15',
      lastLogin: '2 mins ago',
      streak: 18,
      watchHours: '32.5 hrs',
      coursesStarted: 3,
      coursesCompleted: 2,
      quizScores: '94% Avg',
      certificates: ['Executive Communication', 'Interview Preparation Bootcamp']
    },
    {
      id: 'usr_2',
      fullName: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      country: 'India',
      device: 'Mobile (Android / Chrome)',
      joinedDate: '2026-03-10',
      lastLogin: 'Active Right Now',
      streak: 7,
      watchHours: '18.2 hrs',
      coursesStarted: 2,
      coursesCompleted: 1,
      quizScores: '88% Avg',
      certificates: ['Spoken English Mastery']
    },
    {
      id: 'usr_3',
      fullName: 'Elena Rostova',
      email: 'elena@work.de',
      country: 'Germany',
      device: 'Laptop (Windows / Edge)',
      joinedDate: '2026-04-02',
      lastLogin: '1 hour ago',
      streak: 21,
      watchHours: '45.0 hrs',
      coursesStarted: 4,
      coursesCompleted: 3,
      quizScores: '98% Avg',
      certificates: ['AI Productivity & Automation', 'STAR Interview Prep']
    }
  ];

  // Video Retention Curve Data (YouTube Studio Style)
  const retentionCurveData = [
    { second: 0, percentage: 100, rewatch: 0 },
    { second: 30, percentage: 94, rewatch: 5 },
    { second: 60, percentage: 89, rewatch: 12 },
    { second: 90, percentage: 88, rewatch: 25 }, // Rewatch Spike
    { second: 120, percentage: 76, rewatch: 8 },
    { second: 150, percentage: 65, rewatch: 4 }, // Drop-off point
    { second: 180, percentage: 62, rewatch: 6 },
    { second: 210, percentage: 60, rewatch: 15 },
    { second: 240, percentage: 58, rewatch: 2 }
  ];

  const handleSaveCMS = () => {
    setCmsSaved(true);
    setTimeout(() => setCmsSaved(false), 3000);
  };

  const handleDownloadReport = (type) => {
    const csvContent = `data:text/csv;charset=utf-8,FluentX ${type} Report\nGenerated At: ${new Date().toISOString()}\nTotal Records: 52480\nStatus: Verified`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FluentX_${type}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', padding: '2rem 0', color: '#111827' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        
        {/* Sidebar Navigation (Matching Student Dashboard Style) */}
        <aside style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E5E7EB',
          padding: '1.5rem 1rem',
          height: 'fit-content',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Brand Header */}
          <div style={{ padding: '0 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <div style={{ backgroundColor: '#F3E8FF', padding: '0.5rem', borderRadius: '12px' }}>
                <Shield size={20} style={{ color: '#6D28D9' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', margin: 0 }}>FluentX Studio</h2>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>Admin Control Center</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #F3F4F6' }} />

          {/* Nav Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { id: 'overview', label: '📊 Overview Dashboard', icon: BarChart2 },
              { id: 'video-analytics', label: '🎥 YouTube Telemetry', icon: PlayCircle },
              { id: 'user-360', label: '👤 Student 360 Profiles', icon: Users },
              { id: 'live-monitor', label: '⚡ Live User Monitor', icon: Activity },
              { id: 'cms', label: '🌐 Website CMS Manager', icon: Layers },
              { id: 'reports', label: '📂 Export Reports', icon: Download }
            ].map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: active ? '#F3E8FF' : 'transparent',
                    color: active ? '#6D28D9' : '#4B5563',
                    fontSize: '0.9rem',
                    fontWeight: active ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div style={{ borderTop: '1px solid #F3F4F6', margin: '0.5rem 0' }} />

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={onBackToApp}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                color: '#374151',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              ← Student View
            </button>
            <button
              onClick={logout}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#FEF2F2',
                color: '#EF4444',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Header Banner (Matching Student Dashboard Style) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            padding: '1.75rem 2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#6D28D9', fontWeight: '700', fontSize: '0.85rem' }}>
                <Sparkles size={16} style={{ color: '#F97316' }} /> Admin Portal Workspace
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111827', marginTop: '0.2rem', margin: 0 }}>
                {activeTab === 'overview' && 'System Overview Dashboard'}
                {activeTab === 'video-analytics' && 'YouTube Studio Video Telemetry'}
                {activeTab === 'user-360' && 'Student 360° Profile Inspector'}
                {activeTab === 'live-monitor' && 'Real-Time Active Learner Feed'}
                {activeTab === 'cms' && 'Website CMS Content Manager'}
                {activeTab === 'reports' && 'Export System Reports & Analytics'}
              </h1>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Welcome back, <strong>{user?.fullName || 'Arshdeep Singh (Admin)'}</strong>. Full platform control enabled.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={16} /> Socket.io Connected
              </span>
            </div>
          </div>

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* KPI Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {[
                  { title: 'Total Students', value: kpis.totalStudents.toLocaleString(), sub: '+1,240 this week', icon: Users, bg: '#EFF6FF', border: '#DBEAFE', color: '#2563EB' },
                  { title: 'Students Online Now', value: kpis.studentsOnlineNow, sub: 'Active WebSockets', icon: Activity, bg: '#F0FDF4', border: '#DCFCE7', color: '#16A34A' },
                  { title: 'Total Watch Hours', value: kpis.totalWatchHours, sub: 'Across all masterclasses', icon: Clock, bg: '#FFF7ED', border: '#FFEDD5', color: '#EA580C' },
                  { title: 'Completion Rate', value: kpis.completionRate, sub: 'Course finish ratio', icon: Award, bg: '#F3E8FF', border: '#E9D5FF', color: '#7E22CE' },
                  { title: 'Certificates Issued', value: kpis.certificatesIssued.toLocaleString(), sub: 'Verified QR codes', icon: Sparkles, bg: '#FEF3C7', border: '#FDE68A', color: '#D97706' }
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '20px', border: `1px solid ${kpi.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#6B7280', fontSize: '0.85rem', fontWeight: '700' }}>{kpi.title}</span>
                        <div style={{ backgroundColor: kpi.bg, padding: '0.5rem', borderRadius: '12px' }}>
                          <Icon size={20} style={{ color: kpi.color }} />
                        </div>
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111827' }}>{kpi.value}</div>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>{kpi.sub}</span>
                    </div>
                  );
                })}
              </div>

              {/* Server Health & Storage Status */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HardDrive size={20} style={{ color: '#2563EB' }} /> Storage Utilization
                  </h3>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>{kpis.storageUsage}</div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#F3F4F6', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: '28.5%', height: '100%', backgroundColor: '#2563EB', borderRadius: '9999px' }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '0.75rem', display: 'block', fontWeight: '500' }}>Video transcoded HLS files & Cloudinary blobs healthy.</span>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={20} style={{ color: '#16A34A' }} /> Server System Status
                  </h3>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#16A34A', marginBottom: '0.5rem' }}>{kpis.serverStatus}</div>
                  <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '500' }}>Express REST API & MongoDB Cluster responding in 14ms avg.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEO STUDIO ANALYTICS (YouTube Studio Style) */}
          {activeTab === 'video-analytics' && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', margin: 0 }}>Audience Retention & Rewatch Heatmap</h3>
                  <span style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>Lesson 1: Breaking the Translation Habit (Spoken English Mastery)</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ backgroundColor: '#F3E8FF', color: '#6D28D9', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700' }}>Total Views: 18,450</span>
                  <span style={{ backgroundColor: '#FFF7ED', color: '#EA580C', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700' }}>Avg Watch: 14m 20s</span>
                </div>
              </div>

              {/* Retention Curve Bar Graph Representation */}
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '220px', gap: '16px', padding: '1rem 0', borderBottom: '1px solid #F3F4F6' }}>
                {retentionCurveData.map((pt, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                    {pt.rewatch > 10 && (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#F97316', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                        🔥 Rewatch
                      </span>
                    )}
                    <div 
                      style={{ 
                        width: '100%', 
                        height: `${pt.percentage}%`, 
                        backgroundColor: pt.rewatch > 10 ? '#F97316' : '#6D28D9',
                        borderRadius: '8px 8px 0 0',
                        transition: 'height 0.3s ease'
                      }} 
                    />
                    <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>{pt.second}s</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#4B5563', flexWrap: 'wrap', gap: '1rem' }}>
                <div>💡 <strong>Spike at 90s:</strong> High rewatch frequency on STAR framework breakdown interval.</div>
                <div>⚠️ <strong>Drop-off at 150s:</strong> 11% viewers exited during summary slide.</div>
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT 360 PROFILES */}
          {activeTab === 'user-360' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Search student by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', color: '#111827', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', color: '#6B7280', borderBottom: '1px solid #E5E7EB', fontWeight: '700' }}>
                      <th style={{ padding: '1rem 1.25rem' }}>Student Name</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Country</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Streak</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Watch Time</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Quiz Avg</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.filter(s => s.fullName.toLowerCase().includes(searchTerm.toLowerCase())).map(student => (
                      <tr key={student.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '1rem 1.25rem', fontWeight: '700', color: '#111827' }}>
                          <div>{student.fullName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}>{student.email}</div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', color: '#374151' }}>{student.country}</td>
                        <td style={{ padding: '1rem 1.25rem', color: '#EA580C', fontWeight: '800' }}>🔥 {student.streak} Days</td>
                        <td style={{ padding: '1rem 1.25rem', color: '#374151' }}>{student.watchHours}</td>
                        <td style={{ padding: '1rem 1.25rem', color: '#16A34A', fontWeight: '800' }}>{student.quizScores}</td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="btn btn-primary"
                            style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem', borderRadius: '8px' }}
                          >
                            Inspect 360°
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 360° Profile Inspector Modal */}
              {selectedStudent && (
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '2px solid #6D28D9', boxShadow: '0 10px 25px rgba(109, 40, 217, 0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#111827' }}>360° Learner Profile: {selectedStudent.fullName}</h3>
                    <button onClick={() => setSelectedStudent(null)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontWeight: '800', fontSize: '1.1rem' }}>✕ Close</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.9rem', color: '#374151' }}>
                    <div><strong>Email:</strong> {selectedStudent.email}</div>
                    <div><strong>Joined Date:</strong> {selectedStudent.joinedDate}</div>
                    <div><strong>Device Telemetry:</strong> {selectedStudent.device}</div>
                    <div><strong>Certificates Earned:</strong> {selectedStudent.certificates.join(', ')}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WEBSITE CMS MANAGER */}
          {activeTab === 'cms' && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#111827' }}>No-Code Website Content Editor</h3>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#4B5563', fontWeight: '700', marginBottom: '0.4rem' }}>Homepage Hero Title</label>
                <input
                  type="text"
                  value={cmsHeroTitle}
                  onChange={(e) => setCmsHeroTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA', color: '#111827', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#4B5563', fontWeight: '700', marginBottom: '0.4rem' }}>Top Announcement Banner Text</label>
                <input
                  type="text"
                  value={cmsBanner}
                  onChange={(e) => setCmsBanner(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA', color: '#111827', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <button
                  onClick={handleSaveCMS}
                  className="btn btn-primary"
                  style={{ padding: '0.85rem 1.75rem', fontWeight: '700' }}
                >
                  {cmsSaved ? '✓ Saved & Applied Live!' : 'Publish Website Updates'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: EXPORT REPORTS */}
          {activeTab === 'reports' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Student Directory Report', desc: 'Download CSV of all 52,480 registered learners with country and watch time.', type: 'Students' },
                { title: 'Course Completion & Retention Report', desc: 'Download CSV of course completion rates and retention scores.', type: 'Courses' },
                { title: 'Quiz Performance & Scores Report', desc: 'Download detailed report of student quiz scores and attempts.', type: 'Quiz_Scores' },
                { title: 'Video Telemetry Watch Time Report', desc: 'Download second-by-second video playback metrics.', type: 'Watch_Time' }
              ].map((rep, i) => (
                <div key={i} style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: '800', color: '#111827' }}>{rep.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>{rep.desc}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadReport(rep.type)}
                    className="btn btn-primary"
                    style={{ marginTop: '1.25rem', width: '100%', padding: '0.75rem', fontSize: '0.875rem' }}
                  >
                    <Download size={16} /> Export CSV
                  </button>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
