import React, { useState } from 'react';
import { 
  Users, PlayCircle, Clock, Award, Activity, Search, Shield, Eye, BarChart2, 
  Settings, Download, RefreshCw, Layers, CheckCircle2, ChevronRight, HardDrive, 
  Globe, Smartphone, Laptop, Sparkles, FileText, ArrowUpRight, MessageSquare, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';

export default function AdminDashboard({ onBackToApp }) {
  const { user } = useAuth();
  const { courses } = useCourses();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'video-analytics' | 'user-360' | 'live-monitor' | 'cms' | 'reports'
  
  // State for Admin Controls
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState('v1');
  
  // CMS Editable State
  const [cmsHeroTitle, setCmsHeroTitle] = useState('Master Conversational English With Confidence');
  const [cmsBanner, setCmsBanner] = useState('🎉 Over 50,000+ Students Enrolled! All Courses 100% Free Forever.');
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
      streak: 14,
      watchHours: '32.5 hrs',
      coursesStarted: 3,
      coursesCompleted: 2,
      quizScores: '94% Avg',
      certificates: ['Spoken English Mastery', 'English Grammar Foundations']
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
      certificates: ['Business English Pro', 'STAR Interview Prep']
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

  // Handler for Saving CMS Settings
  const handleSaveCMS = () => {
    setCmsSaved(true);
    setTimeout(() => setCmsSaved(false), 3000);
  };

  // Handler for Report CSV Download
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
    <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', color: '#F8FAFC', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#1E293B', borderRight: '1px solid #334155', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ backgroundColor: '#6D28D9', padding: '0.5rem', borderRadius: '10px' }}>
              <Shield size={20} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>FluentX Studio</h2>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600' }}>Admin Control Center</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'overview', label: 'Overview Dashboard', icon: BarChart2 },
            { id: 'video-analytics', label: 'Video Studio Analytics', icon: PlayCircle },
            { id: 'user-360', label: 'Student 360 Profiles', icon: Users },
            { id: 'live-monitor', label: 'Live User Monitor', icon: Activity },
            { id: 'cms', label: 'Website CMS Manager', icon: Layers },
            { id: 'reports', label: 'Export Reports', icon: Download }
          ].map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: active ? '#6D28D9' : 'transparent',
                  color: active ? '#FFFFFF' : '#94A3B8',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Back Button */}
        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={onBackToApp}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1px solid #334155',
              backgroundColor: '#0F172A',
              color: '#F8FAFC',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            ← Exit Admin Portal
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {/* Header Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0 }}>
              {activeTab === 'overview' && 'System Overview Dashboard'}
              {activeTab === 'video-analytics' && 'YouTube Studio Video Telemetry'}
              {activeTab === 'user-360' && 'Student 360° Profile Inspector'}
              {activeTab === 'live-monitor' && 'Real-Time Active Learner Feed'}
              {activeTab === 'cms' && 'Website CMS & Content Editor'}
              {activeTab === 'reports' && 'Export System Reports & Analytics'}
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
              Welcome back, <strong>Admin ({user?.fullName || 'Superadmin'})</strong>. Real-time engine connected.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ backgroundColor: '#1E293B', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', color: '#22C55E', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={14} /> Socket.io Live
            </span>
          </div>
        </header>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {[
                { title: 'Total Students', value: kpis.totalStudents.toLocaleString(), sub: '+1,240 this week', icon: Users, color: '#3B82F6' },
                { title: 'Students Online Now', value: kpis.studentsOnlineNow, sub: 'Active WebSockets', icon: Activity, color: '#22C55E' },
                { title: 'Total Watch Hours', value: kpis.totalWatchHours, sub: 'Across all lessons', icon: Clock, color: '#F97316' },
                { title: 'Completion Rate', value: kpis.completionRate, sub: 'Course finish ratio', icon: Award, color: '#8B5CF6' },
                { title: 'Certificates Issued', value: kpis.certificatesIssued.toLocaleString(), sub: 'Verified QR codes', icon: Sparkles, color: '#F59E0B' }
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div key={idx} style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: '600' }}>{kpi.title}</span>
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '10px' }}>
                        <Icon size={20} style={{ color: kpi.color }} />
                      </div>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#F8FAFC' }}>{kpi.value}</div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '500' }}>{kpi.sub}</span>
                  </div>
                );
              })}
            </div>

            {/* Server Health & Storage Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HardDrive size={18} style={{ color: '#3B82F6' }} /> Storage Utilization
                </h3>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{kpis.storageUsage}</div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#334155', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '28.5%', height: '100%', backgroundColor: '#3B82F6' }} />
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.75rem', display: 'block' }}>Video transcoded files & Cloudinary blobs healthy.</span>
              </div>

              <div style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={18} style={{ color: '#22C55E' }} /> Server System Status
                </h3>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#22C55E', marginBottom: '0.5rem' }}>{kpis.serverStatus}</div>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Express REST API & MongoDB Cluster responding in 14ms avg.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIDEO STUDIO ANALYTICS (YouTube Studio Style) */}
        {activeTab === 'video-analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Audience Retention & Rewatch Heatmap</h3>
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Lesson 1: Breaking the Translation Habit (Spoken English Mastery)</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: '#334155', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Total Views: 18,450</span>
                  <span style={{ backgroundColor: '#334155', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>Avg Watch: 14m 20s</span>
                </div>
              </div>

              {/* Retention Curve Bar Graph Representation */}
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '220px', gap: '12px', padding: '1rem 0', borderBottom: '1px solid #334155' }}>
                {retentionCurveData.map((pt, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                    {pt.rewatch > 10 && (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#F97316', color: '#FFF', padding: '2px 4px', borderRadius: '4px', fontWeight: '700' }}>
                        🔥 Rewatch
                      </span>
                    )}
                    <div 
                      style={{ 
                        width: '100%', 
                        height: `${pt.percentage}%`, 
                        backgroundColor: pt.rewatch > 10 ? '#F97316' : '#6D28D9',
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.3s ease'
                      }} 
                    />
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{pt.second}s</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.85rem', color: '#94A3B8' }}>
                <div>💡 <strong>Spike at 90s:</strong> High rewatch frequency on vocabulary breakdown interval.</div>
                <div>⚠️ <strong>Drop-off at 150s:</strong> 11% viewers exited during summary slide.</div>
              </div>
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
                style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#1E293B', color: '#FFF', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0F172A', color: '#94A3B8', borderBottom: '1px solid #334155' }}>
                    <th style={{ padding: '1rem' }}>Student Name</th>
                    <th style={{ padding: '1rem' }}>Country</th>
                    <th style={{ padding: '1rem' }}>Streak</th>
                    <th style={{ padding: '1rem' }}>Watch Time</th>
                    <th style={{ padding: '1rem' }}>Quiz Avg</th>
                    <th style={{ padding: '1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.filter(s => s.fullName.toLowerCase().includes(searchTerm.toLowerCase())).map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '1rem', fontWeight: '600' }}>
                        <div>{student.fullName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{student.email}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>{student.country}</td>
                      <td style={{ padding: '1rem', color: '#F97316', fontWeight: '700' }}>🔥 {student.streak} Days</td>
                      <td style={{ padding: '1rem' }}>{student.watchHours}</td>
                      <td style={{ padding: '1rem', color: '#22C55E', fontWeight: '700' }}>{student.quizScores}</td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => setSelectedStudent(student)}
                          style={{ backgroundColor: '#6D28D9', color: '#FFF', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
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
              <div style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '16px', border: '1px solid #6D28D9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>360° Learner Profile: {selectedStudent.fullName}</h3>
                  <button onClick={() => setSelectedStudent(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontWeight: '700' }}>✕ Close</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
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
          <div style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>No-Code Website Content Editor</h3>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem' }}>Homepage Hero Title</label>
              <input
                type="text"
                value={cmsHeroTitle}
                onChange={(e) => setCmsHeroTitle(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0F172A', color: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem' }}>Top Announcement Banner Text</label>
              <input
                type="text"
                value={cmsBanner}
                onChange={(e) => setCmsBanner(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0F172A', color: '#FFF' }}
              />
            </div>

            <div>
              <button
                onClick={handleSaveCMS}
                style={{ backgroundColor: '#22C55E', color: '#FFF', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
              >
                {cmsSaved ? '✓ Saved & Applied Live!' : 'Publish Website Updates'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: EXPORT REPORTS */}
        {activeTab === 'reports' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'Student Directory Report', desc: 'Download CSV of all 52,480 registered learners with country and watch time.', type: 'Students' },
              { title: 'Course Completion & Retention Report', desc: 'Download CSV of course completion rates and retention scores.', type: 'Courses' },
              { title: 'Quiz Performance & Scores Report', desc: 'Download detailed report of student quiz scores and attempts.', type: 'Quiz_Scores' },
              { title: 'Video Telemetry Watch Time Report', desc: 'Download second-by-second video playback metrics.', type: 'Watch_Time' }
            ].map((rep, i) => (
              <div key={i} style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{rep.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{rep.desc}</p>
                </div>
                <button
                  onClick={() => handleDownloadReport(rep.type)}
                  style={{ marginTop: '1rem', backgroundColor: '#6D28D9', color: '#FFF', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Download size={16} /> Export CSV
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
