import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useProgress } from '../contexts/ProgressContext';

const WeeklyContent = ({ week, phaseTitle }) => {
  const { completedTasks, toggleTaskCompletion, timeSpent, updateTimeSpent } = useProgress();
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState('');
  const [showTimeTracker, setShowTimeTracker] = useState(false);
  const [hours, setHours] = useState(timeSpent[`week-${week.id}`] || 0);
  
  // 메모 불러오기
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-week-${week.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [week.id]);
  
  // 메모 저장
  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(`notes-week-${week.id}`, newNotes);
  };
  
  // 시간 업데이트
  const handleTimeUpdate = () => {
    updateTimeSpent(`week-${week.id}`, parseFloat(hours));
    setShowTimeTracker(false);
  };
  
  return (
    <div className="border rounded-lg mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="flex justify-between items-center px-4 py-3 bg-gray-50 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <input 
            type="checkbox" 
            checked={completedTasks[`week-${week.id}`] || false} 
            onChange={(e) => {
              e.stopPropagation();
              toggleTaskCompletion(`week-${week.id}`);
            }}
            className="mr-3 h-5 w-5 text-blue-600"
          />
          <div>
            <h4 className="font-bold">{week.title}</h4>
            <p className="text-sm text-gray-600">{week.period}</p>
          </div>
        </div>
        <div className="flex items-center">
          {timeSpent[`week-${week.id}`] && (
            <span className="text-sm text-gray-600 mr-2">
              {timeSpent[`week-${week.id}`]}시간 소요
            </span>
          )}
          <svg 
            className={`w-5 h-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">주 교재:</p>
              <p className="text-sm">{week.primaryBook}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">보조 교재:</p>
              <p className="text-sm">{week.secondaryBook}</p>
            </div>
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={completedTasks[`small-${week.id}`] || false} 
                  onChange={() => toggleTaskCompletion(`small-${week.id}`)}
                  className="mr-2 h-4 w-4 text-green-600"
                />
                <h5 className="text-sm font-semibold">소 과제: {week.smallTask.title}</h5>
              </div>
              <p className="text-xs mt-1 text-gray-600">마감일: {week.smallTask.deadline}</p>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={completedTasks[`weekly-${week.id}`] || false} 
                  onChange={() => toggleTaskCompletion(`weekly-${week.id}`)}
                  className="mr-2 h-4 w-4 text-yellow-600"
                />
                <h5 className="text-sm font-semibold">주간 과제: {week.weeklyTask.title}</h5>
              </div>
              <p className="text-xs mt-1 text-gray-600">마감일: {week.weeklyTask.deadline}</p>
            </div>
          </div>
          
          {/* 시간 추적 */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-semibold text-sm">학습 시간 추적</h5>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTimeTracker(!showTimeTracker);
                }}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-2 rounded"
              >
                {showTimeTracker ? '취소' : '시간 기록'}
              </button>
            </div>
            
            {showTimeTracker && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    className="mr-2 p-1 w-20 border rounded"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="시간"
                  />
                  <span className="mr-2">시간</span>
                  <button
                    onClick={handleTimeUpdate}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
                  >
                    저장
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 메모 섹션 */}
          <div className="mt-4 pt-4 border-t">
            <h5 className="font-semibold text-sm mb-2">학습 노트 (마크다운 지원)</h5>
            <textarea
              className="w-full p-2 border rounded min-h-[150px] font-mono text-sm"
              value={notes}
              onChange={handleNotesChange}
              placeholder="이 주차 학습에 대한 메모를 남겨보세요... (마크다운 형식 지원)"
            ></textarea>
            
            {notes && (
              <div className="mt-4 bg-gray-50 p-4 rounded">
                <h6 className="text-xs font-semibold mb-2 text-gray-500">미리보기:</h6>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{notes}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyContent;