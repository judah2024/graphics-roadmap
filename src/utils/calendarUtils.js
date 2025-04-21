import { saveAs } from 'file-saver';
import { createEvents } from 'ics';
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

// 특정 날짜에 예정된 일정 찾기 (추가 필요)
export const findTasksForDate = (date, phases) => {
  if (!date) return [];
  
  const tasks = [];
  const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
  
  phases.forEach(phase => {
    phase.weeks.forEach(week => {
      // 소 과제 마감일 체크
      if (week.smallTask && week.smallTask.deadline.includes(dateString)) {
        tasks.push({
          type: 'small',
          title: week.smallTask.title,
          weekTitle: week.title,
          phaseTitle: phase.title,
          id: `small-${week.id}`,
          deadline: week.smallTask.deadline
        });
      }
      
      // 주간 과제 마감일 체크
      if (week.weeklyTask && week.weeklyTask.deadline.includes(dateString)) {
        tasks.push({
          type: 'weekly',
          title: week.weeklyTask.title,
          weekTitle: week.title,
          phaseTitle: phase.title,
          id: `weekly-${week.id}`,
          deadline: week.weeklyTask.deadline
        });
      }
    });
    
    // 월간 프로젝트 마감일 체크
    if (phase.monthlyProject && phase.monthlyProject.deadline.includes(dateString)) {
      tasks.push({
        type: 'monthly',
        title: phase.monthlyProject.title,
        phaseTitle: phase.title,
        id: `monthly-${phase.id}`,
        deadline: phase.monthlyProject.deadline
      });
    }
  });
  
  return tasks;
};

// 달력 데이터 생성 (추가 필요)
export const generateCalendarData = () => {
  const months = [
    { year: 2025, month: 3, name: "2025년 4월", days: 30 },
    { year: 2025, month: 4, name: "2025년 5월", days: 31 },
    { year: 2025, month: 5, name: "2025년 6월", days: 30 },
    { year: 2025, month: 6, name: "2025년 7월", days: 31 },
    { year: 2025, month: 7, name: "2025년 8월", days: 31 },
    { year: 2025, month: 8, name: "2025년 9월", days: 30 },
    { year: 2025, month: 9, name: "2025년 10월", days: 31 }
  ];
  
  // 달력에 표시할 날 배열 계산
  return months.map(month => {
    const firstDay = new Date(month.year, month.month, 1);
    const firstDayOfWeek = firstDay.getDay();
    
    const calendarDays = [];
    
    // 첫 날 이전의 빈 셀
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null);
    }
    
    // 실제 날짜들
    for (let i = 1; i <= month.days; i++) {
      calendarDays.push(new Date(month.year, month.month, i));
    }
    
    return {
      ...month,
      calendarDays
    };
  });
};