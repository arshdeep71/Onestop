import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizEngine({ quizList = [], onCompleteQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!quizList || quizList.length === 0) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center', color: '#6B7280' }}>
        No quiz questions for this lesson yet.
      </div>
    );
  }

  const currentQ = quizList[currentIndex];
  const progressPercentage = Math.round(((currentIndex + 1) / quizList.length) * 100);

  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedOption === currentQ.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
      if (score + (selectedOption === currentQ.answer ? 1 : 0) === quizList.length) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      if (onCompleteQuiz) onCompleteQuiz();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsSubmitted(false);
  };

  if (showResult) {
    const finalPct = Math.round((score / quizList.length) * 100);
    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E5E7EB',
        padding: '2.5rem',
        textAlign: 'center',
        boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: finalPct >= 70 ? '#DCFCE7' : '#FEF3C7',
          color: finalPct >= 70 ? '#22C55E' : '#F59E0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto'
        }}>
          <Award size={40} />
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
          Quiz Complete! Score: {finalPct}%
        </h3>
        <p style={{ color: '#6B7280', margin: '0.5rem 0 1.5rem 0' }}>
          {finalPct >= 70
            ? 'Awesome job! You demonstrated complete comprehension of this lesson concept.'
            : 'Good effort! Review the lesson material and try again to get 100%.'}
        </p>
        <button onClick={handleRestart} className="btn btn-outline" style={{ display: 'inline-flex', gap: '0.4rem' }}>
          <RefreshCw size={16} /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #E5E7EB',
      padding: '2rem',
      boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
    }}>
      {/* Header progress */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#6D28D9'
      }}>
        <span><HelpCircle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Question {currentIndex + 1} of {quizList.length}</span>
        <span>Score: {score}</span>
      </div>

      {/* Question Title */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {currentQ.options.map((opt, idx) => {
          let bg = '#FFFFFF';
          let border = '#E5E7EB';
          let color = '#374151';

          if (selectedOption === idx) {
            bg = '#F3E8FF';
            border = '#6D28D9';
            color = '#6D28D9';
          }

          if (isSubmitted) {
            if (idx === currentQ.answer) {
              bg = '#DCFCE7';
              border = '#22C55E';
              color = '#15803D';
            } else if (selectedOption === idx && idx !== currentQ.answer) {
              bg = '#FEE2E2';
              border = '#EF4444';
              color = '#B91C1C';
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelectOption(idx)}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                border: `2px solid ${border}`,
                backgroundColor: bg,
                color: color,
                fontWeight: '600',
                cursor: isSubmitted ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <span>{opt}</span>
              {isSubmitted && idx === currentQ.answer && <CheckCircle2 size={20} style={{ color: '#22C55E' }} />}
              {isSubmitted && selectedOption === idx && idx !== currentQ.answer && <XCircle size={20} style={{ color: '#EF4444' }} />}
            </div>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isSubmitted && currentQ.explanation && (
        <div style={{
          backgroundColor: '#F9FAFB',
          borderLeft: '4px solid #6D28D9',
          padding: '1rem 1.25rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: '#374151'
        }}>
          <strong>Explanation:</strong> {currentQ.explanation}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="btn btn-primary"
            style={{ opacity: selectedOption === null ? 0.6 : 1 }}
          >
            Check Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="btn btn-accent">
            {currentIndex + 1 === quizList.length ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
