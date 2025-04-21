import { createEvents } from 'ics';
import { saveAs } from 'file-saver';
import { formatDateForCalendar } from './dateUtils';

// ICS 파일 생성 함수
export const generateICSFile = (tasks, filename = 'graphics-roadmap-events.ics') => {
  const events = tasks.map(task => {
    const [year, month, day] = formatDateForCalendar(task.deadline).split('-').map(Number);
    
    return {
      title: `[${task.type === 'small' ? '소 과제' : task.type === 'weekly' ? '주간 과제' : '월간 프로젝트'}] ${task.title}`,
      description: `${task.phaseTitle}${task.weekTitle ? ' - ' + task.weekTitle : ''}`,
      start: [year, month, day],
      duration: { days: 1 },
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      categories: ['그래픽스 로드맵', task.type]
    };
  });

  createEvents(events, (error, value) => {
    if (error) {
      console.error(error);
      return;
    }
    
    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    saveAs(blob, filename);
  });
};

// 단일 일정에 대한 ICS 파일 생성
export const generateSingleEventICS = (task) => {
  const taskName = task.title.replace(/[^a-zA-Z0-9가-힣]/g, '-');
  generateICSFile([task], `${taskName}-일정.ics`);
};

// 모든 일정에 대한 ICS 파일 생성
export const generateAllEventsICS = (phases) => {
  const allTasks = [];
  
  phases.forEach(phase => {
    phase.weeks.forEach(week => {
      if (week.smallTask) {
        allTasks.push({
          type: 'small',
          title: week.smallTask.title,
          deadline: week.smallTask.deadline,
          weekTitle: week.title,
          phaseTitle: phase.title
        });
      }
      
      if (week.weeklyTask) {
        allTasks.push({
          type: 'weekly',
          title: week.weeklyTask.title,
          deadline: week.weeklyTask.deadline,
          weekTitle: week.title,
          phaseTitle: phase.title
        });
      }
    });
    
    if (phase.monthlyProject) {
      allTasks.push({
        type: 'monthly',
        title: phase.monthlyProject.title,
        deadline: phase.monthlyProject.deadline,
        phaseTitle: phase.title
      });
    }
  });
  
  generateICSFile(allTasks, '그래픽스-로드맵-전체일정.ics');
};