import React, { useState, useEffect } from 'react';
import { getUpcomingTasks } from '../utils/dateUtils';
import { generateSingleEventICS } from '../utils/calendarUtils';

const Notifications = ({ phases }) => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => {
    if (phases) {
      setUpcomingTasks(getUpcomingTasks(phases));
    }
  }, [phases]);
  
  // 일정 ICS 파일로 내보내기
  const handleExportToCalendar = (task) => {
    generateSingleEventICS(task);
  };
  
  if (upcomingTasks.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        
        <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
          {upcomingTasks.length}
        </span>
      </button>
      
      {showNotifications && (
        <div className="absolute bottom-14 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-500 text-white px-4 py-2 font-bold flex justify-between items-center">
            <span>다가오는 일정</span>
            <button onClick={() => setShowNotifications(false)} className="text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="p-3 border-b hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      task.type === 'small' ? 'bg-green-100 text-green-800' : 
                      task.type === 'weekly' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {task.type === 'small' ? '소 과제' : 
                       task.type === 'weekly' ? '주간 과제' : '월간 프로젝트'}
                    </span>
                    <p className="font-medium mt-1">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-1">마감일: {task.deadline}</p>
                  </div>
                  
                  <button
                    onClick={() => handleExportToCalendar(task)}
                    className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 p-1 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;