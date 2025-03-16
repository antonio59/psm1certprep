'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, BookOpen, Library, Trophy, PlayCircle, PauseCircle, Volume2 } from 'lucide-react';
import { useStore } from '../store/useStore';

interface DashboardProps {
  userId: string | null;
}

const Dashboard = ({ userId }: DashboardProps) => {
  const router = useRouter();
  const { progress, initializeProgress } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (userId) {
      initializeProgress(userId);
    }
  }, [userId, initializeProgress]);

  const stats = [
    {
      label: 'Flashcards Mastered',
      value: progress.completedFlashcards.length,
      icon: Brain,
      color: 'bg-blue-500',
    },
    {
      label: 'Exams Completed',
      value: progress.completedExams.length,
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      label: 'Average Score',
      value: Object.values(progress.examScores).length
        ? Math.round(
            Object.values(progress.examScores).reduce((a, b) => a + b, 0) /
              Object.values(progress.examScores).length
          )
        : 0,
      icon: Trophy,
      color: 'bg-purple-500',
    },
  ];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PSM I Certification Prep
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master the Professional Scrum Master I certification with comprehensive
          study materials, practice exams, and flashcards.
        </p>
      </div>

      {/* Audio Player */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Volume2 className="h-5 w-5 mr-2" />
          Scrum Guide Audio Guide
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <PauseCircle className="h-8 w-8 text-indigo-600" />
            ) : (
              <PlayCircle className="h-8 w-8 text-indigo-600" />
            )}
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <audio
            ref={audioRef}
            src="/scrum-guide.wav"
            className="hidden"
            onEnded={() => setIsPlaying(false)}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Listen to the complete Scrum Guide while studying. Perfect for auditory learners and multitasking.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-lg shadow-md p-6 text-center"
          >
            <div
              className={`${color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
            <p className="text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => router.push('/flashcards')}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Flashcards
          </h2>
          <p className="text-gray-600">
            Review key Scrum concepts with our comprehensive flashcard system.
            Track your progress and focus on areas that need improvement.
          </p>
        </div>

        <div
          onClick={() => router.push('/mock-exams')}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Mock Exams
          </h2>
          <p className="text-gray-600">
            Practice with realistic exam simulations. Time-bound tests with
            detailed explanations for each question.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;