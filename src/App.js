import React, { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Roadmap from './components/Roadmap';
import Guide from './components/Guide';
import Notifications from './components/Notifications';
import { generateCalendarData } from './utils/calendarUtils';
import learningData from './data/learningData';
import { ProgressProvider } from './contexts/ProgressContext';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const calendarData = generateCalendarData();
  
  return (
    <ProgressProvider data={learningData}>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Header />
        
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="border-b mb-4">
              <nav className="flex space-x-4">
                <button 
                  className={`py-2 px-1 -mb-px border-b-2 ${activeTab === 'calendar' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('calendar')}
                >
                  달력 보기
                </button>
                <button 
                  className={`py-2 px-1 -mb-px border-b-2 ${activeTab === 'roadmap' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('roadmap')}
                >
                  로드맵 보기
                </button>
                <button 
                  className={`py-2 px-1 -mb-px border-b-2 ${activeTab === 'guide' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('guide')}
                >
                  사용 가이드
                </button>
              </nav>
            </div>
            
            {activeTab === 'calendar' && (
              <Calendar calendarData={calendarData} phases={learningData.phases} />
            )}
            
            {activeTab === 'roadmap' && (
              <Roadmap phases={learningData.phases} />
            )}
            
            {activeTab === 'guide' && (
              <Guide phases={learningData.phases} />
            )}
          </div>
        </div>
        
        <Notifications phases={learningData.phases} />
        
        <footer className="bg-gray-200 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>© 2025 서브컬쳐 게임 그래픽스 엔지니어 로드맵</p>
            <p className="mt-1">Mathematics for 3D Game Programming & Essential Mathematics for Games 기반 학습 계획</p>
          </div>
        </footer>
      </div>
    </ProgressProvider>
  );
}

export default App;