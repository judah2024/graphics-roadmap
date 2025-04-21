import React from 'react';
import WeeklyContent from './WeekContent';
import { useProgress } from '../contexts/ProgressContext';

const Roadmap = ({ phases }) => {
  const { completedTasks, toggleTaskCompletion } = useProgress();
  
  return (
    <div className="mt-8">
      {phases.map((phase) => (
        <div key={phase.id} className="mb-10">
          <div className="bg-blue-100 p-4 rounded-lg mb-4 shadow-sm">
            <h3 className="text-xl font-bold">Phase {phase.id}: {phase.title}</h3>
            <p className="text-gray-700">{phase.period}</p>
            
            <div className="mt-4 bg-red-50 p-3 rounded-lg">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={completedTasks[`monthly-${phase.id}`] || false} 
                  onChange={() => toggleTaskCompletion(`monthly-${phase.id}`)}
                  className="mr-2 h-4 w-4 text-red-600"
                />
                <h5 className="text-sm font-semibold">월간 프로젝트: {phase.monthlyProject.title}</h5>
              </div>
              <p className="text-xs mt-1 text-gray-600">마감일: {phase.monthlyProject.deadline}</p>
              <p className="text-sm mt-2">{phase.monthlyProject.description}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {phase.weeks.map((week) => (
              <WeeklyContent 
                key={week.id} 
                week={week} 
                phaseTitle={phase.title}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
