import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResourceModal from './components/ResourceModal';

import LandingPage from './pages/LandingPage';
import CourseCatalogPage from './pages/CourseCatalogPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPlayerPage from './pages/LessonPlayerPage';
import StudentDashboard from './pages/StudentDashboard';
import FreeResourcesPage from './pages/FreeResourcesPage';
import SpeakingClubPage from './pages/SpeakingClubPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './components/admin/AdminDashboard';

function MainAppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeResource, setActiveResource] = useState(null);
  const [authModalMode, setAuthModalMode] = useState(null); // 'login' | 'register' | null

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Navigation Handlers
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setActivePage('course-detail');
    window.scrollTo(0, 0);
  };

  const handleOpenLesson = (course, lesson) => {
    setSelectedCourse(course);
    setSelectedLesson(lesson);
    setActivePage('lesson-player');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
  };

  const handleCloseAuth = () => {
    setAuthModalMode(null);
  };

  const handleAuthSuccess = () => {
    setAuthModalMode(null);
    setActivePage('dashboard');
    window.scrollTo(0, 0);
  };

  // Render Page Content based on activePage
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <LandingPage
            setActivePage={handleNavigate}
            onSelectCourse={handleSelectCourse}
            onOpenAuth={handleOpenAuth}
            onSelectResource={(res) => setActiveResource(res)}
          />
        );
      case 'courses':
        return (
          <CourseCatalogPage
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'course-detail':
        return (
          <CourseDetailPage
            course={selectedCourse}
            onBack={() => handleNavigate('courses')}
            onOpenLesson={handleOpenLesson}
            onOpenAuth={handleOpenAuth}
          />
        );
      case 'lesson-player':
        return (
          <LessonPlayerPage
            course={selectedCourse}
            lesson={selectedLesson}
            onBack={() => handleNavigate('course-detail')}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
          />
        );
      case 'resources':
        return (
          <FreeResourcesPage
            onSelectResource={(res) => setActiveResource(res)}
            onOpenAuth={handleOpenAuth}
          />
        );
      case 'speaking-club':
        return (
          <SpeakingClubPage
            onOpenAuth={handleOpenAuth}
          />
        );
      case 'about':
        return (
          <AboutPage
            setActivePage={handleNavigate}
            onOpenAuth={handleOpenAuth}
          />
        );
      case 'dashboard':
        return (
          <StudentDashboard
            setActivePage={handleNavigate}
            onSelectCourse={handleSelectCourse}
            onOpenLesson={handleOpenLesson}
          />
        );
      case 'admin-studio':
        return (
          <AdminDashboard
            onBackToApp={() => handleNavigate('home')}
          />
        );
      default:
        return (
          <LandingPage
            setActivePage={handleNavigate}
            onSelectCourse={handleSelectCourse}
            onOpenAuth={handleOpenAuth}
            onSelectResource={(res) => setActiveResource(res)}
          />
        );
    }
  };

  // Hide Navbar and Footer when inside Lesson Player or Admin Studio view
  const isCustomLayout = activePage === 'lesson-player' || activePage === 'admin-studio';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isCustomLayout && (
        <>
          <AnnouncementBar onExplore={() => handleNavigate('courses')} />
          <Navbar
            activePage={activePage}
            setActivePage={handleNavigate}
            onOpenAuth={handleOpenAuth}
          />
        </>
      )}

      <main style={{ flex: 1 }}>
        {renderContent()}
      </main>

      {!isCustomLayout && (
        <Footer
          setActivePage={handleNavigate}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {/* Auth Modals */}
      {authModalMode === 'login' && (
        <LoginPage
          onClose={handleCloseAuth}
          onSwitchToRegister={() => setAuthModalMode('register')}
          onSuccess={handleAuthSuccess}
        />
      )}

      {authModalMode === 'register' && (
        <RegisterPage
          onClose={handleCloseAuth}
          onSwitchToLogin={() => setAuthModalMode('login')}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Resource Download Modal */}
      {activeResource && (
        <ResourceModal
          resource={activeResource}
          onClose={() => setActiveResource(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <MainAppContent />
      </CourseProvider>
    </AuthProvider>
  );
}

