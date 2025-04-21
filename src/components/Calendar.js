import React, { useState } from 'react';
import { findTasksForDate } from '../utils/calendarUtils';
import { formatDate, isSameDay } from '../utils/dateUtils';
import { useProgress } from '../contexts/ProgressContext';
import { generateSingleEventICS } from '../utils/calendarUtils';

const Calendar = ({ calendarData, phases }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { completedTasks, toggleTaskCompletion } = useProgress();
  
  const tasks = selectedDate ? findTasksForDate(selectedDate, phases) : [];
  
  // 일정 ICS 파일로 내보내기
  const handleExportToCalendar = (task) => {
    generateSingleEventICS(task);
  };
  
  return (
    <div className="mt-8">
      {calendarData.map((month, monthIndex) => (
        <div key={monthIndex} className="mb-10">
          <h3 className="font-bold text-xl mb-4">{month.name}</h3>
          <div className="grid grid-cols-7 gap-1">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="text-center font-semibold py-2">{day}</div>
            ))}
            
            {month.calendarDays.map((day, dayIndex) => {
              const dateHasTasks = day && findTasksForDate(day, phases).length > 0;
              const isSelected = selectedDate && isSameDay(selectedDate, day);
              
              // 오늘이면 특별 스타일
              const isToday = day && isSameDay(new Date(), day);
              
              return (
                <div 
                  key={dayIndex}
                  className={`h-14 border p-1 ${!day ? 'bg-gray-100' : 'cursor-pointer hover:bg-blue-50'} 
                            ${isSelected ? 'bg-blue-100' : ''}
                            ${dateHasTasks ? 'border-blue-500' : ''}
                            ${isToday ? 'ring-2 ring-red-500' : ''}`}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day && (
                    <>
                      <div className={`text-sm ${isToday ? 'font-bold' : ''}`}>{day.getDate()}</div>
                      {dateHasTasks && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 mx-auto"></div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {selectedDate && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg">{formatDate(selectedDate)}</h3>
          {tasks.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {tasks.map((task, index) => (
                <li key={index} className="py-2 px-3 bg-white rounded shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold mr-2 ${
                        task.type === 'small' ? 'bg-green-100 text-green-800' : 
                        task.type === 'weekly' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {task.type === 'small' ? '소 과제' : 
                         task.type === 'weekly' ? '주간 과제' : '월간 프로젝트'}
                      </span>
                      <span className="font-medium">{task.title}</span>
                      {task.weekTitle && <span className="text-sm text-gray-600"> ({task.weekTitle})</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={completedTasks[task.id] || false}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <button
                        onClick={() => handleExportToCalendar(task)}
                        className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded flex items-center"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        일정 내보내기
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">이 날짜에는 예정된 일정이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
