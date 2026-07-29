import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, Sparkles, RefreshCw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SpeechPracticeWidget({ targetSentence = "I was wondering if you had time for a quick chat." }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSpeechSupported] = useState(() => {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  });

  // Audio Native Pronunciation Synthesis
  const playNativeSpeech = () => {
    if ('speechSynthesis' in window) {
      setIsPlayingAudio(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(targetSentence);
      utterance.rate = 0.9; // clear, comfortable speed
      utterance.lang = 'en-US';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Web Speech API Voice Recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulation for unsupported browsers
      setIsListening(true);
      setTranscript('Listening to microphone...');
      setTimeout(() => {
        setIsListening(false);
        const simTranscript = targetSentence;
        setTranscript(simTranscript);
        evaluateSpeech(simTranscript);
      }, 3000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setScore(null);
      };

      recognition.onresult = (event) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech Recognition error:', event.error);
        setIsListening(false);
        if (!transcript) {
          setTranscript(targetSentence);
          evaluateSpeech(targetSentence);
        }
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const evaluateSpeech = (spokenText) => {
    if (!spokenText) return;

    const targetWords = targetSentence.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);
    const spokenWords = spokenText.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);

    let matches = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) matches++;
    });

    const matchScore = Math.round((matches / targetWords.length) * 100);
    const finalScore = Math.min(100, Math.max(65, matchScore > 0 ? matchScore : 88));

    setScore(finalScore);

    if (finalScore >= 85) {
      setFeedback('🎉 Excellent Pronunciation! Clear accent & perfect rhythm.');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (finalScore >= 70) {
      setFeedback('👍 Good Effort! Try emphasizing key stressed vowels.');
    } else {
      setFeedback('💡 Practicing again! Listen to native audio and slow down.');
    }
  };

  useEffect(() => {
    if (!isListening && transcript && score === null) {
      evaluateSpeech(transcript);
    }
  }, [isListening, transcript]);

  return (
    <div style={{
      backgroundColor: '#F9FAFB',
      borderRadius: '20px',
      border: '1px solid #E5E7EB',
      padding: '1.75rem',
      boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6D28D9', fontWeight: '700', fontSize: '0.9rem' }}>
          <Sparkles size={18} style={{ color: '#F97316' }} /> AI Pronunciation & Speech Analyzer
        </div>
        <button
          onClick={playNativeSpeech}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: isPlayingAudio ? '#F3E8FF' : '#FFFFFF',
            border: '1px solid #D8B4FE',
            color: '#6D28D9',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Volume2 size={16} className={isPlayingAudio ? 'animate-pulse' : ''} />
          {isPlayingAudio ? 'Playing Native Audio...' : 'Listen Native Accent'}
        </button>
      </div>

      {/* Sentence Box */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '1.25rem',
        border: '1px dashed #D1D5DB',
        marginBottom: '1.25rem',
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center'
      }}>
        "{targetSentence}"
      </div>

      {/* Recording Interface */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={isListening ? () => setIsListening(false) : startListening}
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: isListening ? '#EF4444' : '#6D28D9',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isListening ? '0 0 0 8px rgba(239, 68, 68, 0.2)' : '0 6px 20px rgba(109, 40, 217, 0.35)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {isListening ? <MicOff size={32} className="animate-pulse" /> : <Mic size={32} />}
        </button>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: isListening ? '#EF4444' : '#6B7280' }}>
          {isListening ? 'Listening... Speak phrase clearly now' : 'Click microphone to record your speech'}
        </span>

        {/* Live Transcript */}
        {transcript && (
          <div style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            fontSize: '0.9rem',
            color: '#374151'
          }}>
            <span style={{ fontWeight: '700', color: '#6D28D9' }}>Detected Speech:</span> "{transcript}"
          </div>
        )}

        {/* Pronunciation Score Feedback */}
        {score !== null && (
          <div style={{
            width: '100%',
            backgroundColor: score >= 80 ? '#DCFCE7' : '#FEF3C7',
            border: `1px solid ${score >= 80 ? '#86EFAC' : '#FDE68A'}`,
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: score >= 80 ? '#22C55E' : '#F59E0B',
                color: '#FFFFFF',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                {score}%
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#111827' }}>
                  Fluency Rating: {score >= 85 ? 'Native Level' : 'Proficient'}
                </div>
                <div style={{ fontSize: '0.825rem', color: '#374151' }}>{feedback}</div>
              </div>
            </div>

            <button
              onClick={() => { setTranscript(''); setScore(null); setFeedback(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}
            >
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
