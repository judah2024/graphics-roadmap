import { useState, useEffect } from 'react';

// 로컬 스토리지에서 진행 상황 관리
const useProgressTracker = () => {
  const [completedTasks, setCompletedTasks] = useState({});
  const [timeSpent, setTimeSpent] = useState({});
  
  useEffect(() => {
    const savedProgress = localStorage.getItem('graphicsRoadmapProgress');
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    }
    
    const savedTimeSpent = localStorage.getItem('graphicsRoadmapTimeSpent');
    if (savedTimeSpent) {
      setTimeSpent(JSON.parse(savedTimeSpent));
    }
  }, []);
  
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = { ...completedTasks };
    updatedTasks[taskId] = !updatedTasks[taskId];
    setCompletedTasks(updatedTasks);
    localStorage.setItem('graphicsRoadmapProgress', JSON.stringify(updatedTasks));
  };
  
  const updateTimeSpent = (taskId, hours) => {
    const updatedTimeSpent = { ...timeSpent };
    updatedTimeSpent[taskId] = hours;
    setTimeSpent(updatedTimeSpent);
    localStorage.setItem('graphicsRoadmapTimeSpent', JSON.stringify(updatedTimeSpent));
  };
  
  const calculateProgress = (phases) => {
    if (!phases) return 0;
    
    const totalTasks = phases.length * 3 + // 월간 프로젝트
                      phases.reduce((acc, phase) => acc + phase.weeks.length * 3, 0); // 주차별 과제들
    
    const completedCount = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completedCount / totalTasks) * 100);
  };
  
  return { completedTasks, toggleTaskCompletion, timeSpent, updateTimeSpent, calculateProgress };
};

export default useProgressTracker;