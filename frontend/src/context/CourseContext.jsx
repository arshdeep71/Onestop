import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

// Seed Fallback Data in case API is connecting
const defaultCourses = [
  {
    id: "spoken-english-mastery",
    title: "Spoken English Mastery",
    slug: "spoken-english-mastery",
    category: "Speaking",
    level: "Beginner to Intermediate",
    duration: "12 Hours • 24 Lessons",
    lessonsCount: 24,
    studentsCount: 18450,
    rating: 4.9,
    reviewsCount: 1280,
    isFree: true,
    badge: "Popular",
    coverImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Sarah Jenkins",
      title: "Senior ESL Coach & Phonetics Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      experience: "12+ Years Teaching Experience",
      bio: "Former Oxford English examiner and voice coach specializing in natural conversational fluency and accent reduction."
    },
    description: "Master natural, fluent conversational English. Eliminate hesitation, speak effortlessly in everyday situations, improve pronunciation, and build instant confidence.",
    learningPoints: [
      "Speak without pausing or translating in your head",
      "Master modern idioms, phrasal verbs, and daily expressions",
      "Improve accent, connected speech, and intonation",
      "Overcome fear of speaking with native speakers"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Foundations of Natural Speech",
        lessons: [
          {
            id: "l1",
            title: "1. Breaking the Translation Habit",
            duration: "18 min",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Learn the cognitive technique to think directly in English without translating from your native language first.",
            targetPhrase: "I was wondering if you could help me with this project.",
            phrases: [
              { phrase: "I was wondering if...", meaning: "Polite way to ask a favor", example: "I was wondering if you had time for a quick chat." },
              { phrase: "To be honest...", meaning: "Expressing sincere opinion", example: "To be honest, I prefer working in the morning." }
            ],
            quiz: [
              {
                question: "Which phrase is the most polite way to ask for assistance?",
                options: ["Give me help now", "I was wondering if you could help me", "You must help me", "Help me please"],
                answer: 1,
                explanation: "'I was wondering if...' softens the request making it extremely polite in formal and casual English."
              }
            ]
          },
          {
            id: "l2",
            title: "2. Connected Speech & Contracting Words",
            duration: "22 min",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Discover how native speakers join words together (e.g., 'gonna', 'wanna', 'shoulda') and sound smooth.",
            targetPhrase: "What are you going to do this weekend?",
            phrases: [
              { phrase: "What do you think?", meaning: "Connected as 'Whaddya think?'", example: "Whaddya think about the new strategy?" }
            ],
            quiz: [
              {
                question: "How do native speakers usually contract 'What are you going to do' in fast speech?",
                options: ["What you do", "Whaddya gonna do", "What to do", "What going to"],
                answer: 1,
                explanation: "'Whaddya gonna do' is the standard spoken contraction in informal American and British conversational English."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "english-grammar-foundations",
    title: "Complete English Grammar Masterclass",
    slug: "english-grammar-foundations",
    category: "Grammar",
    level: "All Levels",
    duration: "16 Hours • 32 Lessons",
    lessonsCount: 32,
    studentsCount: 24100,
    rating: 4.95,
    reviewsCount: 1940,
    isFree: true,
    badge: "Best Seller",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "David Miller",
      title: "Grammar Author & Linguistics Professor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      experience: "15+ Years Teaching",
      bio: "Author of 3 English grammar workbooks and specialist in contextual grammar for non-native professionals."
    },
    description: "Understand English grammar naturally without memorizing complex rules. Master tenses, prepositions, active/passive voice, and sentence structures with practical examples.",
    learningPoints: [
      "Master all 12 tenses with zero confusion",
      "Never mix up prepositions (in, on, at, by) again",
      "Construct advanced complex sentences effortlessly",
      "Write error-free emails and essays"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Tenses Made Simple",
        lessons: [
          {
            id: "lg1",
            title: "1. Present Perfect vs Simple Past Demystified",
            duration: "20 min",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Learn when to use 'I have worked' vs 'I worked' with clear real-life visual guides.",
            targetPhrase: "I have lived in London for three years.",
            phrases: [
              { phrase: "I have lived here for 3 years", meaning: "Action started in past and continues now", example: "I have lived in London since 2021." }
            ],
            quiz: [
              {
                question: "Which sentence is correct for an action finished yesterday?",
                options: ["I have visited him yesterday.", "I visited him yesterday.", "I am visiting him yesterday.", "I had visit him yesterday."],
                answer: 1,
                explanation: "Specific past time markers like 'yesterday' require Simple Past ('visited')."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "business-english-communication",
    title: "Business English & Corporate Communication",
    slug: "business-english-communication",
    category: "Business",
    level: "Intermediate to Advanced",
    duration: "14 Hours • 28 Lessons",
    lessonsCount: 28,
    studentsCount: 14200,
    rating: 4.88,
    reviewsCount: 980,
    isFree: true,
    badge: "Career Choice",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Elena Rostova",
      title: "Corporate Executive Coach",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      experience: "10+ Years Corporate Training",
      bio: "Former Fortune 500 communications manager training international executives for global business growth."
    },
    description: "Accelerate your career with elite corporate communication skills. Master executive email writing, meeting negotiations, business presentations, and cross-cultural communication.",
    learningPoints: [
      "Write high-impact corporate emails in minutes",
      "Lead international meetings with authority and clarity",
      "Negotiate politely and assertively",
      "Deliver persuasive business presentations"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Professional Email Writing",
        lessons: [
          {
            id: "lb1",
            title: "1. Writing Direct yet Courteous Emails",
            duration: "24 min",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            content: "Discover templates and tone adjustments for business communication.",
            targetPhrase: "I am writing to follow up on our previous discussion.",
            phrases: [
              { phrase: "Please find attached...", meaning: "Standard formal email attachment notification", example: "Please find attached the Q3 budget review." }
            ],
            quiz: [
              {
                question: "Which opening line is best for a professional follow-up email?",
                options: ["Why didn't you reply?", "I am writing to follow up on our previous discussion.", "Reply to me quickly.", "Hey, look at this."],
                answer: 1,
                explanation: "'I am writing to follow up...' is polite, professional, and clear."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "public-speaking-confidence",
    title: "Public Speaking & Presentation Skills",
    slug: "public-speaking-confidence",
    category: "Soft Skills",
    level: "All Levels",
    duration: "10 Hours • 20 Lessons",
    lessonsCount: 20,
    studentsCount: 11300,
    rating: 4.92,
    reviewsCount: 750,
    isFree: true,
    badge: "High Conversion",
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Marcus Vance",
      title: "TEDx Speaker & Voice Strategist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      experience: "14+ Years Keynote Speaker",
      bio: "Coached over 300 TEDx speakers and CEOs to captivate audiences with vocal dynamics and body language."
    },
    description: "Conquer stage fright, project authority, structure engaging speeches, and captivate any audience with powerful body language and vocal modulation.",
    learningPoints: [
      "Eliminate anxiety before entering any stage or Zoom call",
      "Use pause, pace, and pitch to command immediate attention",
      "Structure persuasive talks using the 3-Step Impact Framework",
      "Handle live Q&A sessions under pressure"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Voice & Body Language Mastery",
        lessons: [
          {
            id: "lp1",
            title: "1. Vocal Projection and Diaphragmatic Breathing",
            duration: "19 min",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylines.mp4",
            content: "Practical breathing exercises to eliminate vocal shakiness and project confidence.",
            targetPhrase: "Good morning ladies and gentlemen, today I want to share a story.",
            phrases: [
              { phrase: "Good morning ladies and gentlemen...", meaning: "Classic formal opening hook", example: "Good morning. Imagine a world where communication is effortless." }
            ],
            quiz: [
              {
                question: "What is the best way to project a strong speaking voice without straining your throat?",
                options: ["Shout as loud as possible", "Breathe deeply from the diaphragm", "Whisper near the microphone", "Talk very quickly"],
                answer: 1,
                explanation: "Diaphragmatic breathing powers your voice naturally without throat tension."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "interview-prep-ace-your-job",
    title: "Interview Preparation & Personality Development",
    slug: "interview-prep-ace-your-job",
    category: "Career",
    level: "Intermediate",
    duration: "9 Hours • 18 Lessons",
    lessonsCount: 18,
    studentsCount: 16900,
    rating: 4.96,
    reviewsCount: 1420,
    isFree: true,
    badge: "Top Rated",
    coverImage: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Priya Sharma",
      title: "HR Director & Career Mentor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      experience: "11+ Years Talent Acquisition",
      bio: "Interviewed 5,000+ candidates for top global tech and consulting companies."
    },
    description: "Crack job interviews at top international firms. Master behavioral STAR method responses, salary negotiations, self-introductions, and executive presence.",
    learningPoints: [
      "Craft perfect answers to 'Tell me about yourself'",
      "Master STAR method for complex behavioral interview questions",
      "Demonstrate leadership, emotional intelligence, and executive poise",
      "Negotiate job offers with confidence"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: The Winning Introduction",
        lessons: [
          {
            id: "li1",
            title: "1. 90-Second Elevator Pitch",
            duration: "21 min",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            content: "Crafting a compelling summary of your experience, key wins, and value proposition.",
            targetPhrase: "Over the past five years, I have led cross-functional engineering teams.",
            phrases: [
              { phrase: "Over the past 5 years, I have specialized in...", meaning: "Impactful introductory opening", example: "Over the past 5 years, I have led cross-functional engineering teams to launch award-winning apps." }
            ],
            quiz: [
              {
                question: "What is the STAR method in interviews?",
                options: ["State, Talk, Act, Repeat", "Situation, Task, Action, Result", "Start, Test, Analyze, Review", "Speed, Tone, Accent, Readiness"],
                answer: 1,
                explanation: "STAR stands for Situation, Task, Action, Result—the standard framework for behavioral questions."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "vocabulary-builder-pro",
    title: "Advanced Vocabulary & Idioms Mastery",
    slug: "vocabulary-builder-pro",
    category: "Vocabulary",
    level: "All Levels",
    duration: "8 Hours • 16 Lessons",
    lessonsCount: 16,
    studentsCount: 12700,
    rating: 4.91,
    reviewsCount: 890,
    isFree: true,
    badge: "Essential",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    instructor: {
      name: "Sarah Jenkins",
      title: "Senior ESL Coach & Phonetics Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      experience: "12+ Years Teaching Experience",
      bio: "Specialist in rapid vocabulary acquisition and mnemonic techniques."
    },
    description: "Expand your active vocabulary by 1,000+ high-impact words, phrases, and native idioms. Learn contextual usage for sophisticated speaking and writing.",
    learningPoints: [
      "Replace basic overused words like 'good', 'bad', 'important' with power words",
      "Understand 200+ native idioms and collocations",
      "Use spaced-repetition flashcard memory techniques",
      "Express nuanced thoughts clearly"
    ],
    curriculum: [
      {
        moduleTitle: "Module 1: Powerful Adjectives & Verbs",
        lessons: [
          {
            id: "lv1",
            title: "1. Replacing Basic Words with Power Vocabulary",
            duration: "17 min",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            content: "Transform simple sentences into sophisticated expressions instantly.",
            targetPhrase: "She paid meticulous attention to the project details.",
            phrases: [
              { phrase: "Meticulous", meaning: "Extremely careful and precise", example: "She paid meticulous attention to the final details." }
            ],
            quiz: [
              {
                question: "What is a sophisticated synonym for 'very hard working'?",
                options: ["Lazy", "Diligent", "Careless", "Quick"],
                answer: 1,
                explanation: "'Diligent' means having or showing care and conscientiousness in one's work."
              }
            ]
          }
        ]
      }
    ]
  }
];

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(defaultCourses);
  const [resources, setResources] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [speakingClub, setSpeakingClub] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resCourses, resResources, resLive, resClub] = await Promise.all([
        fetch('http://localhost:5000/api/courses').then(r => r.ok ? r.json() : null),
        fetch('http://localhost:5000/api/resources').then(r => r.ok ? r.json() : null),
        fetch('http://localhost:5000/api/live-classes').then(r => r.ok ? r.json() : null),
        fetch('http://localhost:5000/api/speaking-club').then(r => r.ok ? r.json() : null)
      ]);

      if (resCourses) setCourses(resCourses);
      if (resResources) setResources(resResources);
      if (resLive) setLiveClasses(resLive);
      if (resClub) setSpeakingClub(resClub);
    } catch (err) {
      console.log('Using local client dataset for FluentX');
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = (idOrSlug) => {
    return courses.find(c => c.id === idOrSlug || c.slug === idOrSlug) || defaultCourses[0];
  };

  return (
    <CourseContext.Provider value={{
      courses,
      resources,
      liveClasses,
      speakingClub,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      loading,
      getCourseById,
      refreshData: fetchData
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
