import React from 'react';
import { useProgress } from '../contexts/ProgressContext';

const Header = () => {
  const { calculateProgress, data } = useProgress();
  const progress = calculateProgress(data.phases);
  
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">서브컬쳐 게임 그래픽스 엔지니어 로드맵</h1>
        <p className="mt-2">6개월 학습 계획 (2025년 4월 - 10월)</p>
        
        <div className="mt-4 w-full bg-blue-200 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-white h-4 rounded-full animate-progress"
            style={{ width: `${progress}%`, animationDuration: '1.5s', animationFillMode: 'forwards' }}
          ></div>
        </div>
        <div className="text-sm mt-1">전체 진행률: {progress}%</div>
      </div>
    </header>
  );
};

export default Header;