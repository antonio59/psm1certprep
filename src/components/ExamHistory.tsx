import React from 'react';
import { Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useStore, getExamStats } from '../store/useStore';

const ExamHistoryComponent = () => {
  const { examHistory } = useStore();
  const stats = getExamStats(examHistory);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Exams</p>
              <p className="text-2xl font-semibold">{stats.totalExams}</p>
            </div>
            <Award className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-semibold">{Math.round(stats.averageScore)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Latest Score</p>
              <p className="text-2xl font-semibold">
                {examHistory[0]?.score ?? 'N/A'}%
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ready for Certification</p>
              <p className="text-2xl font-semibold">
                {stats.readyForCertification ? 'Yes' : 'Not Yet'}
              </p>
            </div>
            <CheckCircle className={`h-8 w-8 ${stats.readyForCertification ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Exam History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {examHistory.map((exam) => (
            <div key={exam.examId} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Exam {exam.examId}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(exam.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    exam.score >= 85 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {exam.score}%
                  </p>
                  <p className="text-sm text-gray-500">
                    {exam.questionsCorrect}/{exam.questionsAttempted} correct
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamHistoryComponent;