import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fluentx_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_demo',
      fullName: 'Alex Morgan',
      email: 'alex@fluentx.org',
      country: 'United States',
      learningGoal: 'Speak English With Confidence',
      streak: 7,
      dailyGoalMinutes: 20,
      dailyProgressMinutes: 15,
      enrolledCourses: ['spoken-english-mastery', 'english-grammar-foundations'],
      completedLessons: ['l1', 'lg1'],
      notes: [
        { id: 'n1', courseTitle: 'Spoken English Mastery', lessonTitle: '1. Breaking the Translation Habit', note: 'Use pauses strategically instead of saying umm or err.' }
      ],
      certificates: [
        { id: 'cert_101', courseId: 'spoken-english-mastery', courseTitle: 'Spoken English Mastery', issueDate: '2026-07-20', grade: 'A+' }
      ]
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('fluentx_token') || 'demo_token');

  useEffect(() => {
    if (user) {
      localStorage.setItem('fluentx_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fluentx_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('fluentx_token', token);
    } else {
      localStorage.removeItem('fluentx_token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend server offline, using local fallback auth');
    }

    // Local fallback login
    const mockUser = {
      id: 'usr_' + Date.now(),
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      country: 'United States',
      learningGoal: 'Speak English With Confidence',
      streak: 1,
      dailyGoalMinutes: 20,
      dailyProgressMinutes: 5,
      enrolledCourses: ['spoken-english-mastery'],
      completedLessons: [],
      notes: [],
      certificates: []
    };
    setUser(mockUser);
    setToken('fallback_token_' + Date.now());
    return { success: true };
  };

  const register = async (userData) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend server offline, using local fallback registration');
    }

    const newMockUser = {
      id: 'usr_' + Date.now(),
      fullName: userData.fullName || 'New Student',
      email: userData.email,
      country: userData.country || 'International',
      learningGoal: userData.learningGoal || 'General Fluency',
      streak: 1,
      dailyGoalMinutes: 20,
      dailyProgressMinutes: 0,
      enrolledCourses: ['spoken-english-mastery'],
      completedLessons: [],
      notes: [],
      certificates: []
    };
    setUser(newMockUser);
    setToken('fallback_token_' + Date.now());
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fluentx_user');
    localStorage.removeItem('fluentx_token');
  };

  const markLessonComplete = (lessonId) => {
    if (!user) return;
    if (user.completedLessons.includes(lessonId)) return;

    setUser(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
      dailyProgressMinutes: Math.min(prev.dailyGoalMinutes, prev.dailyProgressMinutes + 10)
    }));
  };

  const enrollCourse = (courseId) => {
    if (!user) return;
    if (user.enrolledCourses.includes(courseId)) return;

    setUser(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId]
    }));
  };

  const saveNote = (noteObj) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      notes: [noteObj, ...(prev.notes || [])]
    }));
  };

  const awardCertificate = (cert) => {
    if (!user) return;
    const exists = user.certificates?.some(c => c.courseId === cert.courseId);
    if (!exists) {
      setUser(prev => ({
        ...prev,
        certificates: [...(prev.certificates || []), cert]
      }));
    }
  };

  const [authError, setAuthError] = useState(null);

  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      authError,
      clearAuthError,
      login,
      register,
      logout,
      markLessonComplete,
      enrollCourse,
      saveNote,
      awardCertificate
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
